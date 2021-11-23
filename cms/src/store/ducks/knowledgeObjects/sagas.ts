import { downloadData, handleResponse } from '@/utils/http';
import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError, types } from '@/utils/error';
import * as actions from './actions';
import ToastMessage, { typesToast } from '@/components/shared/Toast';

export function* list({ payload }: any) {
  try {
    if (payload) {
      const { page = 1, limit = 10, keyword, order, searchDnit = 3 } = payload;
      const sorter = order ? Object.keys(order).map(key => `${key},${order[key]}`).join('') : null;
      const response: any = yield* call(service.client.get,
        `/cms/knowledgeObjects`, {
        params: {
          page,
          limit,
          keyword: keyword || null,
          searchDnit,
          order: sorter,
          ...payload
        }
      });
      yield put(actions.loadListSuccess(response.data));
    }
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.KnowledgeObjects);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadListFailure(err));
  }
}

export function* getListCSV({ payload }: any) {
  const { keyword = '', order } = payload;
  try {
    const sorter = order ? Object.keys(order).map(key => `${key},${order[key]}`).join('') : null;
    downloadData(
      handleResponse(yield* call(
        service.client.get,
        `/cms/knowledgeObjects/download`,
        {
          params: {
            keyword,
            order: sorter
          },
          responseType: 'blob'
        })),
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
    const response: any = yield* call(service.client.get, `/discipline/subjects/${id}`);
    yield put(actions.loadFetchSuccess({
      ...response.data
    }));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.KnowledgeObjects);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadFetchFailure(err));
  }
}

export function* deleteOne({ payload }: any) {
  const { id } = payload;
  try {
    const response: any = yield* call(service.client.delete, `/cms/knowledgeObjects/${id}`);
    yield put(actions.loadDeleteSuccess({
      ...response.data
    }));
    yield list(payload);
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.KnowledgeObjects);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadDeleteFailure(err));
  }
}

export function* submit({ payload }: any) {
  try {
    const {
      idDiscipline,
      idFieldKnowledges,
      idSchoolYear,
      description
    } = payload;

    const params = {
      idDiscipline,
      idFieldKnowledges,
      idSchoolYear,
      description
    }
    let methodType = 'post';
    if (payload.id) {
      methodType = 'put';
      params['id'] = payload.id
    }

    const response: any = yield* call(service.client[methodType], `/cms/knowledgeObjects`, params);

    yield put(actions.loadSubmitSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.KnowledgeObjects);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadSubmitFailure(err));
  }
}
