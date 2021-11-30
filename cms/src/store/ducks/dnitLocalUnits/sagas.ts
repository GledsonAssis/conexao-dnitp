import { downloadData, handleResponse } from '@/utils/http';
import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError, types } from '@/utils/error';
import * as actions from './actions';
import ToastMessage, { typesToast } from '@/components/shared/Toast';

export function* list({ payload }: any) {
  try {
    if (payload) {
      const { page = 1, limit = 10, keyword = '', order, idRegionalSuperintendence = null } = payload;
      const sorter = order ? Object.keys(order).map(key => `${key},${order[key]}`).join('') : null;
      const response: any = yield* call(service.client.get,
        `/cms/dnit-units/locals`, {
        params: {
          page,
          limit: typeof limit === 'number' ? limit : null,
          keyword,
          idRegionalSuperintendence: +idRegionalSuperintendence ? +idRegionalSuperintendence : null,
          order: sorter
        }
      });
      yield put(actions.loadListSuccess(response.data));
    } else {
      const response: any = yield* call(service.client.get, `/cms/dnit-units/locals`);
      yield put(actions.loadListSuccess(response.data));
    }
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.DnitLocalUnits);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadListFailure(err));
  }
}

export function* listCitiesByIdLocalUnit({ payload }: any) {
  try {
    if (payload) {
      const { id } = payload;
      const response: any = yield* call(service.client.get, `/cms/dnit/units/${id}/cities`);
      yield put(actions.loadListCitiesByIdLocalUnitSuccess(response.data));
    }
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.DnitLocalUnits);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadListCitiesByIdLocalUnitFailure(err));
  }
}

export function* listSuperintendences({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, `/cms/dnit-units/superintendences`);
    yield put(actions.loadListSuperintendencesSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.DnitLocalUnits);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadListSuperintendencesFailure(err));
  }
}

export function* listRoads({ payload }: any) {
  try {
    const { idUf = null } = payload;

    const response: any = yield* call(service.client.get, `/cms/dnit-units/roads/uf`,
      {
        params: {
          idUf
        }
      });
    yield put(actions.loadListRoadsSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.DnitLocalUnits);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadListRoadsFailure(err));
  }
}

export function* getListCSV({ payload }: any) {
  const { keyword = '', order } = payload;
  try {
    const sorter = order ? Object.keys(order).map(key => `${key},${order[key]}`).join('') : null;
    downloadData(
      handleResponse(yield* call(
        service.client.post,
        `/cms/dnit/units/download`,
        { local: true, responseType: 'blob', params: { keyword, order: sorter, local: 1 } })),
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
    const response: any = yield* call(service.client.get, `/cms/dnit/units/${id}`);
    yield put(actions.loadFetchSuccess({
      ...response.data
    }));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.DnitLocalUnits);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadFetchFailure(err));
  }
}

export function* deleteOne({ payload }: any) {
  const { id } = payload;
  try {
    const response: any = yield* call(service.client.delete, `/cms/dnit/units/${id}`);
    yield put(actions.loadDeleteSuccess({
      ...response.data
    }));
    yield list(payload);
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.DnitLocalUnits);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadDeleteFailure(err));
  }
}

export function* submit({ payload }: any) {
  try {
    const {
      isFederalDistrict,
      identification,
      phones,
      email,
      address,
      idRegionalSuperintendence,
      cities,
      roads
    } = payload;

    const params = {
      isFederalDistrict,
      identification,
      phones,
      email,
      address,
      idRegionalSuperintendence,
      cities,
      roads
    }
    let methodType = 'post';
    if (payload.id) {
      methodType = 'put';
      params['id'] = payload.id
    }

    const response: any = yield* call(service.client[methodType], `/cms/dnit/unit`, params);

    yield put(actions.loadSubmitSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.DnitLocalUnits);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadSubmitFailure(err));
  }
}
