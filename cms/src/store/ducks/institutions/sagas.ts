import { downloadData, handleResponse } from '@/utils/http';
import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import * as actions from './actions';
import { parseError, types } from '@/utils/error';
import ToastMessage, { typesToast } from '@/components/shared/Toast';

export function* list({ payload }: any) {
  try {
    if (payload) {
      const { page = 1, limit = 10, keyword, order, searchDnit = 3 } = payload;
      const sorter = order ? Object.keys(order).map(key => `${key},${order[key]}`).join('') : null;
      const response: any = yield* call(service.client.get,
        `/cms/institutions`, {
        params: {
          page,
          limit,
          keyword: keyword || null,
          dnitUnitId: payload.dnitUnitId,
          participaConexaoDnit: payload.participaConexaoDnit || null,
          searchDnit,
          order: sorter
        }
      });
      yield put(actions.loadListSuccess(response.data));
    }
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Institutions);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadListFailure(err));
  }
}

export function* getListCSV({ payload }: any) {
  const { keyword = '', order, searchDnit = null } = payload;
  try {
    const sorter = order ? Object.keys(order).map(key => `${key},${order[key]}`).join('') : null;
    downloadData(
      handleResponse(yield* call(
        service.client.get,
        `/cms/institutions/download`,
        {
          params: {
            searchDnit,
            keyword,
            order: sorter
          }, responseType: 'blob'
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
    if (id) {
      const response: any = yield* call(service.client.get, `/cms/institutions/${id}`);
      yield put(actions.loadFetchSuccess({
        ...response.data
      }));
    }
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Institutions);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadFetchFailure(err));
  }
}

export function* deleteOne({ payload }: any) {
  const { id } = payload;
  try {
    if (id) {
      const response: any = yield* call(service.client.delete, `/cms/institutions/${id}`);
      yield put(actions.loadDeleteSuccess({
        ...response.data
      }));
      yield list(payload);
    }
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Institutions);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadDeleteFailure(err));
  }
}

export function* submit({ payload }: any) {
  try {
    const {
      idTeachingNetwork,
      isDF,
      joinProgram,
      identification,
      idInep,
      phones,
      quantidadeAlunos,
      quantidadeProfessores,
      latitude,
      longitude,
      address,
      studentsPerCycle,
      regionalSuperintendence,
      idDnit,
      idDnitUnitCity,
      name
    } = payload;

    const params = {
      idTeachingNetwork,
      isDF,
      joinProgram,
      identification,
      idInep,
      phones,
      quantidadeAlunos,
      quantidadeProfessores,
      latitude,
      longitude,
      address,
      studentsPerCycle,
      regionalSuperintendence,
      idDnit,
      idDnitUnitCity,
      name
    }
    let methodType = 'post';
    if (payload.id) {
      methodType = 'put';
      params['id'] = payload.id
    }

    const response: any = yield* call(service.client[methodType], `/cms/institutions`, params);

    yield put(actions.loadSubmitSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Institutions);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadSubmitFailure(err));
  }
}
