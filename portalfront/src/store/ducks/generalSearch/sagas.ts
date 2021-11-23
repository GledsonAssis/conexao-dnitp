import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError } from '@/utils/error';
import * as actions from './actions';

export function* list({ payload }: any) {
  try {
    const response: any = yield* call(service.client.post, '/general-search', payload);
    yield put(actions.loadListSuccess(response.data));
  } catch (err) {
    const parser = parseError(err.error.response);
    yield put(actions.loadListFailure(parser));
  }
}
