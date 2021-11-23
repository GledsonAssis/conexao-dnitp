import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError } from '@/utils/error';
import * as actions from './actions';

export function* list() {
  try {
    const response: any = yield* call(service.client.get, '/disciplines');
    yield put(actions.loadListSuccess(response.data));
  } catch (err) {
    const parser = parseError(err.error.response);
    yield put(actions.loadListFailure(parser));
  }
}
