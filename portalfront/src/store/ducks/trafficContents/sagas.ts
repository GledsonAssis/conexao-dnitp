import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError } from '@/utils/error';
import * as actions from './actions';

export function* fetchOne({ payload }: any) {
  if (payload) {
    const { idSchoolYear } = payload;
    const queryYear = idSchoolYear ? `idSchoolYear=${idSchoolYear}` : '';

    try {
      const response: any = yield* call(service.client.get, `/trafficContents?${queryYear}`);
      yield put(actions.loadFetchSuccess(response.data));
    } catch (err) {
      console.log(err.response);
      const parser = parseError(err.error.response);
      yield put(actions.loadFetchFailure(parser));
    }
  }
}
