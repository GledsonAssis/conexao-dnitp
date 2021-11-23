import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError } from '@/utils/error';
import * as actions from './actions';

export function* list() {
  try {
    const response: any = yield* call(service.client.get, '/schoolYear');
    yield put(actions.loadListSuccess(response.data));
  } catch (err) {
    const parser = parseError(err.error.response);
    yield put(actions.loadListFailure(parser));
  }
}

export function* schoolbonds() {
  try {
    const response: any = yield* call(service.client.get, '/schoolbonds');
    yield put(actions.loadSchoolBondsSuccess(response.data));
  } catch (err) {
    const parser = parseError(err.error.response);
    yield put(actions.loadSchoolBondsFailure(parser));
  }
}
