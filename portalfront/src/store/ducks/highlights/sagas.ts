import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError, types } from '@/utils/error';
import * as actions from './actions';

export function* list() {
  try {
    const response: any = yield call(service.client.get, '/highlights');
    yield put(actions.loadListSuccess(response.data));
  } catch (err) {
    const parser = yield parseError(err?.error?.response, types.Highlights);
    yield put(actions.loadListFailure(parser));
  }
}
