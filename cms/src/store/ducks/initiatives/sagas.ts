import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError, types } from '@/utils/error';
import { downloadData, handleResponse } from '@/utils/http';
import * as initiatives from './actions';
import ToastMessage, { typesToast } from '@/components/shared/Toast';

export function* initiativesByStatus({ payload }: any) {
  try {
    const response: any = yield* call(service.client.post, `/initiatives-by-status`,
      { ...payload });
    yield put(initiatives.loadListByStatusSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Initiatives);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(initiatives.loadListByStatusFailure(err));
  }
}

export function* initiativesStatus({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, `/initiatives-status`,
      { ...payload });
    yield put(initiatives.loadListStatusSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Initiatives);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(initiatives.loadListStatusFailure(err));
  }
}

export function* list({ payload }: any) {
  try {
    const { page = 1, limit = 10, keyword = null, typeList = '' } = payload;
    const response: any = yield* call(service.client.get, `/cms/initiatives/${typeList}`,
      { params: { page, limit, keyword } });
    yield put(initiatives.loadListSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Initiatives);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(initiatives.loadListFailure(err));
  }
}

export function* fetch({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, `/initiatives/${payload.id}`);
    yield put(initiatives.loadFetchSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Initiatives);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(initiatives.loadFetchFailure(err));
  }
}

export function* submitInitiative({ payload }: any) {
  try {
    const {
      typeList = '',
      accepted,
      idInitiative,
      comment,
      idInitiativeEvaluation
    } = payload;
    const response: any = yield* call(service.client.post, `/cms/initiative/${typeList}`, {
      accepted,
      idInitiative,
      comment,
      idInitiativeEvaluation
    });

    yield put(initiatives.loadSubmitSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Initiatives);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(initiatives.loadSubmitFailure(err));
  }
}

export function* getAttachment({ payload }: any) {
  const { id } = payload;
  try {
    downloadData(
      handleResponse(yield* call(service.client.get, `/initiatives/attachments/${id}`, { responseType: 'blob' })),
    );
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Initiatives);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
  }
}

export function* getListCSV({ payload }: any) {
  try {
    const { typeList = '', keyword = '' } = payload
    downloadData(
      handleResponse(yield* call(
        service.client.get,
        `/cms/initiatives/${typeList}/download`,
        { responseType: 'blob', params: { keyword } })),
    );
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.GenericCsv);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
  }
}
