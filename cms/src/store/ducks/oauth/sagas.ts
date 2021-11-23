import { call, put } from 'redux-saga/effects';
import service from '@/infra/services';
import { parseError, types } from '@/utils/error';
import Session from '@/utils/Session';
import {
  loadLoginSuccess,
  loadLoginFailure,
  loadLogoutSuccess,
  loadModeratorSuccess,
  loadModeratorFailure
} from './actions';
import ToastMessage, { typesToast } from '@/components/shared/Toast';

export function* loadLogin({ payload }: any) {
  try {
    yield atualizarUltimoAcesso();
    const responseUser = yield getProfile();
    yield put(loadLoginSuccess(responseUser.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Auth);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(loadLoginFailure(err));
  }
}

export function* loadLogout() {
  yield Session.logout();
  yield put(loadLogoutSuccess({}));
}

function* getProfile() {
  try {
    const response = yield call(service.client.get, '/users/profile');
    yield Session.setUser(response.data);
    return response;
  } catch (err) {
    throw err;
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
    const response = yield call(service.client.get, `/users/${session.id}/ismoderator`);
    yield put(loadModeratorSuccess(response));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Auth);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(loadModeratorFailure(err));
  }
}
