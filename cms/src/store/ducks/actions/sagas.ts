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
      const response: any = yield* call(service.client.get,
        `/cms/actions?page=${page}&limit=${limit}${(keyword ? `&keyword=${keyword}` : '')
        }${(order ? `&order=${order}` : '')}`);
      yield put(actions.loadListSuccess(response.data));
    } else {
      const response: any = yield* call(service.client.get, `/cms/actions`);
      yield put(actions.loadListSuccess(response.data));
    }
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Actions);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadListFailure(err));
  }
}

export function* publish({ payload }: any) {
  const { id, isPublished } = payload;
  try {
    const response: any = yield* call(service.client.post, `/cms/actions/publish`, { id, isPublished });
    yield put(actions.loadPublishSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Actions);
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
      handleResponse(yield* call(
        service.client.get,
        `/cms/actions/download/${(
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
    const response: any = yield* call(service.client.get, `/actions/${id}`);
    const responseAttachments: any = yield* call(service.client.get, `/actions/${id}/attachments`);
    const responseImages: any = yield* call(service.client.get, `/actions/${id}/images`);
    yield put(actions.loadFetchSuccess({
      ...response.data,
      attachments: responseAttachments.data,
      images: responseImages.data
    }));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Actions);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadFetchFailure(err));
  }
}

export function* submit({ payload }: any) {
  try {
    const { type, title, summary, link, description, isPublished = false, isCover = false } = payload;
    const params = { type, title, summary, link, description, isPublished, isCover }
    let methodType = 'post';
    if (payload.id) {
      methodType = 'put';
      params['id'] = payload.id
    }

    const response: any = yield* call(service.client[methodType], `/cms/actions`, params);

    yield submitAttachments({ payload: { id: response.data.id, attachments: payload.listFiles } });
    yield submitImages({ payload: { id: response.data.id, images: payload.listImages } });

    yield put(actions.loadSubmitSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Actions);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadSubmitFailure(err));
  }
}

function* submitAttachments({ payload }: any) {
  const { id, attachments } = payload;
  try {
    if (attachments.length) {
      const body = new FormData();
      body.append('idAction', id);
      attachments.forEach((file: File) => { body.append('data', file, file.name) });

      const response: any = yield* call(service.client.post, `/cms/actions/attachments`, body);
      yield put(actions.loadSubmitSuccess(response.data));
    }
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Actions);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadSubmitFailure(err));
  }
};

function* submitImages({ payload }: any) {
  const { id, images } = payload;
  try {
    if (images.length) {
      const body = new FormData();
      body.append('idAction', id);
      images.forEach((file: File) => { body.append('data', file, file.name) });

      const response: any = yield* call(service.client.post, `/cms/actions/images`, body);
      yield put(actions.loadSubmitSuccess(response.data));
    }
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Actions);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadSubmitFailure(err));
  }
};

export function* getAttachment({ payload }: any) {
  const { id } = payload;
  try {
    downloadData(
      handleResponse(yield* call(service.client.get, `/actions/attachments/${id}`, { responseType: 'blob' })),
    );
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Actions);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
  }
}
