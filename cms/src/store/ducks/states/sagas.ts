import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError, types } from '@/utils/error';
import * as actions from './actions';
import ToastMessage, { typesToast } from '@/components/shared/Toast';

export function* list() {
  try {
    const response: any = yield* call(service.client.get, '/states');
    yield put(actions.loadListSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.States);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadListFailure(err));
  }
}

export function* citiesList() {
  try {
    const response: any = yield* call(service.client.get, '/cities');
    yield put(actions.loadCitiesListSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.States);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadCitiesListFailure(err));
  }
}

export function* institutionsList({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, `/cities/${payload.id}/institutions`);
    yield put(actions.loadInstitutionsSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.States);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadInstitutionsFailure(err));
  }
}

export function* fieldKnowledgesList({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, `/fieldKnowledges`);
    yield put(actions.loadFieldKnowledgesSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.States);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadFieldKnowledgesFailure(err));
  }
}
