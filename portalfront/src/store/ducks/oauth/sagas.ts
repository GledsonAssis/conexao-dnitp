import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError, types } from '@/utils/error';
import Session from '@/utils/Session';
import {
  loadLoginSuccess,
  loadLoginFailure,
  loadLogoutSuccess,
  loadModeratorSuccess,
  loadModeratorFailure,
  loadProfileSuccess,
  loadProfileFailure,
  loadSubmitSuccess,
  loadSubmitFailure
} from './actions';

export function* loadLogin({ payload }: any) {
  try {
    yield getToken({ payload });
    yield atualizarUltimoAcesso();
    const responseUser = yield call(service.client.get, '/users/profile');
    yield Session.setUser(responseUser.data);
    if (!responseUser.data.primeiroAcessoGovbr) {
      window.location.href = '/perfil';
    }
    yield put(loadLoginSuccess(responseUser.data));
  } catch (err) {
    const parser = yield parseError(err?.error?.response, types.Auth);
    yield put(loadLoginFailure(parser));
  }
}

export function* loadLogout() {
  yield Session.logout();
  yield put(loadLogoutSuccess({}));
}

export function* getToken({ payload }: any) {
  try {
    const response: any = yield* call(service.client_auth.get, '/token', {
      headers: {
        "govbr-code": payload.code
      }
    });
    yield Session.login(response.data);
    return response;
  } catch (err) {
    console.log('error Get', err);
    throw err;
  }
}

export function* getProfile() {
  try {
    const response = yield call(service.client.get, '/users/profile');
    yield Session.setUser(response.data);
    yield put(loadProfileSuccess(response.data));
  } catch (err) {
    const parser = yield parseError(err?.error?.response, types.Auth);
    yield put(loadProfileFailure(parser));
  }
}

function* atualizarUltimoAcesso() {
  try {
    const response = yield call(service.client.post, '/users/updateLastAccess');
    return response;
  } catch (err) {
    return err;
  }
}

export function* isModerator() {
  try {
    const session = yield Session.getUser()
    if (session.id) {
      const response = yield call(service.client.get, `/users/${session.id}/ismoderator`);
      yield put(loadModeratorSuccess(response));
    }
  } catch (err) {
    const parser = parseError(err.error.response);
    yield put(loadModeratorFailure(parser));
  }
}

export function* submit({ payload }: any) {
  try {
    const response = yield call(service.client.put, `/users`, payload);
    yield Session.setUser(response.data);
    yield put(loadSubmitSuccess(response));
  } catch (err) {
    const parser = parseError(err.error.response);
    yield put(loadSubmitFailure(parser));
  }
}
