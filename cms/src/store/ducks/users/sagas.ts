import { downloadData, handleResponse } from '@/utils/http';
import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError, types } from '@/utils/error';
import * as actions from './actions';
import ToastMessage, { typesToast } from '@/components/shared/Toast';

export function* list({ payload }: any) {
  try {
    if (payload) {
      const { page = 1, limit = 10, keyword, order } = payload;
      const sorter = order ? Object.keys(order).map(key => `${key},${order[key]}`).join('') : null;
      const response: any = yield* call(service.client.get,
        `/cms/users/search`, {
        params: {
          page,
          limit,
          keyword: keyword || null,
          order: sorter
        }
      });
      yield put(actions.loadListSuccess(response.data));
    }
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Users);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadListFailure(err));
  }
}

export function* listRoles({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, `/cms/users/roles`);
    yield put(actions.loadRolesSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Users);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadRolesFailure(err));
  }
}

export function* getListCSV({ payload }: any) {
  const { keyword = '', order } = payload;
  try {
    const sorter = order ? Object.keys(order).map(key => `${key},${order[key]}`).join('') : null;
    downloadData(
      handleResponse(yield* call(
        service.client.get,
        `/cms/users/download`,
        { responseType: 'blob', params: { keyword, order: sorter } })),
    );
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.GenericCsv);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
  }
}

export function* fetch({ payload }: any) {
  const { id } = payload;
  try {
    const response: any = yield* call(service.client.get, `/cms/users/${id}`);
    yield put(actions.loadFetchSuccess({
      ...response.data
    }));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Users);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadFetchFailure(err));
  }
}

export function* submit({ payload }: any) {
  try {
    const {
      cpf,
      email,
      name,
      acceptedTerms,
      idRole,
      idDnitUnit,
      idCity,
      regionalSuperintendence,
      idState,
      birthDate,
      phones,
      instituitions
    } = payload;

    const params = {
      cpf,
      email,
      name,
      acceptedTerms,
      idRole,
      idDnitUnit,
      idCity,
      regionalSuperintendence,
      idState,
      birthDate,
      phones,
      instituitions
    }
    let methodType = 'post';
    if (payload.id) {
      methodType = 'put';
      params['id'] = payload.id
    }

    const response: any = yield* call(service.client[methodType], `/cms/users`, params);
    yield put(actions.loadSubmitSuccess(response.data));
    yield active({ payload: response.data });
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Users);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadSubmitFailure(err));
  }
}

export function* active({ payload }: any) {
  try {
    const { id, situation = true } = payload;
    const response: any = yield* call(service.client.put, `/cms/users/activate`, { id, situation });
    yield list({ payload })
    yield put(actions.loadActiveSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Users);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadActiveFailure(err));
  }
}

export function* releaseAccess({ payload }: any) {
  const { id } = payload;
  try {
    yield* call(service.client.post, `/cms/users/releaseAccess`, { id });
    yield put(actions.loadReleaseAccessResponse({ response: 2 }));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Users);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadReleaseAccessResponse({ response: 3 }));
  }
}
