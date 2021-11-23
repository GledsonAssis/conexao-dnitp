import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError } from '@/utils/error';
import * as actions from './actions';

export function* list() {
  try {
    const response: any = yield* call(service.client.get, '/states');
    yield put(actions.loadListSuccess(response.data));
  } catch (err) {
    console.log(err);
    const parser = parseError(err.error.response);
    yield put(actions.loadListFailure(parser));
  }
}

export function* citiesList() {
  try {
    const response: any = yield* call(service.client.get, '/cities');
    yield put(actions.loadCitiesListSuccess(response.data));
  } catch (err) {
    console.log(err);
    const parser = parseError(err.error.response);
    yield put(actions.loadCitiesListFailure(parser));
  }
}

export function* institutionsList({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, `/cities/${payload.idCity}/institutions`);
    yield put(actions.loadInstitutionsSuccess(response.data));
  } catch (err) {
    const parser = parseError(err.error.response);
    yield put(actions.loadInstitutionsFailure(parser));
  }
}
