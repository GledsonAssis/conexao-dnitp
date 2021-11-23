import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError, types } from '@/utils/error';
import * as actions from './actions';
import ToastMessage, { typesToast } from '@/components/shared/Toast';

export function* fetchOne({ payload }: any) {
  if (payload) {
    const { id } = payload;

    try {
      const response: any = yield* call(service.client.get, `/trafficScopes/${id}`);
      yield put(actions.loadFetchSuccess(response.data));
    } catch (err) {
      let parser = err.error?.response?.data;
      if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
        parser = yield parseError(err.response, types.TrafficScopes);
      }
      ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
      yield put(actions.loadFetchFailure(err));
    }
  }
}

export function* deleteOne({ payload }: any) {
  if (payload) {
    const { id } = payload;

    try {
      const response: any = yield* call(service.client.delete, `/trafficScopes/${id}`);
      yield put(actions.loadDeleteSuccess(response.data));
    } catch (err) {
      let parser = err.error?.response?.data;
      if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
        parser = yield parseError(err.response, types.TrafficScopes);
      }
      ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
      yield put(actions.loadDeleteFailure(err));
    }
  }
}

export function* submit({ payload }: any) {
  try {
    const {
      description,
      idSchoolYear
    } = payload;

    const params = {
      description,
      idSchoolYear
    }
    let methodType = 'post';
    if (payload.id) {
      methodType = 'put';
      params['id'] = payload.id
    }

    const response: any = yield* call(service.client[methodType], `/cms/trafficScopes`, params);

    yield put(actions.loadSubmitSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.TrafficScopes);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadSubmitFailure(err));
  }
}


export function* list({ payload }: any) {
  try {
    if (payload) {
      const { page = 1, limit = 10, order, idTrafficContent } = payload;
      const sorter = order ? Object.keys(order).map(key => `${key},${order[key]}`).join('') : null;
      const response: any = yield* call(service.client.get, `/cms/trafficScopes`,
        {
          params: {
            page,
            limit,
            order: sorter,
            idTrafficContent: idTrafficContent.toString(),
            // ...payload
          }
        })
      yield put(actions.loadListSuccess(response.data));
    } else {
      const response: any = yield* call(service.client.get, `/cms/trafficScopes`);
      yield put(actions.loadListSuccess(response.data));
    }
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.TrafficScopes);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadListFailure(err));
  }
}
