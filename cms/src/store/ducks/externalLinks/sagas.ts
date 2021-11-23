import { downloadData, handleResponse } from '@/utils/http';
import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError, types } from '@/utils/error';
import * as actions from './actions';
import ToastMessage, { typesToast } from '@/components/shared/Toast';

export function* list({ payload }: any) {
  try {
    let response: any
    if (payload) {
      const { page = 1, limit = 10, keyword, order } = payload;
      response = yield* call(service.client.get,
        `/cms/externalLinks?page=${page}&limit=${limit}${(keyword ? `&keyword=${keyword}` : '')
        }${(order ? `&order=${order}` : '')}`);
    } else {
      response = yield* call(service.client.get, `/cms/externalLinks`);
    }
    yield put(actions.loadListSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.ExternalLinks);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadListFailure(err));
  }
}

export function* publish({ payload }: any) {
  const { id, isPublished } = payload;
  try {
    const response: any = yield* call(service.client.post, `/cms/externalLinks/publish`, { id, isPublished });
    yield put(actions.loadPublishSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.ExternalLinks);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadPublishFailure(err));
  }
}

export function* getListCSV({ payload }: any) {
  const { keyword = '', order } = payload;
  try {
    const sorter = order ? Object.keys(order).map(key => `${key},${order[key]}`).join('') : null;
    downloadData(
      handleResponse(yield* call(service.client.get,
        `/cms/externalLinks/download/${(
          keyword ? `?keyword=${keyword}` : '')}${(
            order ? `${!keyword ? '?' : '&'}order=${sorter}` : '')}`,
        { responseType: 'blob' })),
    );
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.GenericCsv);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
  }
}

export function* fetchOne({ payload }: any) {
  const { id } = payload;
  try {
    const response: any = yield* call(service.client.get, `/externalLinks/${id}`);
    yield put(actions.loadFetchSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.ExternalLinks);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadFetchFailure(err));
  }
}

export function* submit({ payload }: any) {
  try {
    const { type, title, summary, link, description, isPublished = false } = payload;
    const params = { type, title, summary, link, description, isPublished }
    let methodType = 'post';
    if (payload.id) {
      methodType = 'put';
      params['id'] = payload.id
    }
    const response: any = yield* call(service.client[methodType], `/cms/externalLinks`, params);

    yield put(actions.loadSubmitSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.ExternalLinks);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadSubmitFailure(err));
  }
}
