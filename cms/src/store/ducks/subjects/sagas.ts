import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError, types } from '@/utils/error';
import * as actions from './actions';
import ToastMessage, { typesToast } from '@/components/shared/Toast';

export function* fetchOne({ payload }: any) {
  if (payload) {
    const { idDiscipline, idSchoolYear } = payload;
    const queryYear = idSchoolYear ? `idSchoolYear=${idSchoolYear}` : '';
    const queryDisciplines = idDiscipline ? `idDiscipline=${idDiscipline}` : '';

    try {
      const response: any = yield* call(service.client.get, `/cms/discipline/subjects?${queryYear}&${queryDisciplines}`);
      yield put(actions.loadFetchSuccess(response.data));
    } catch (err) {
      console.log(err.response);
      let parser = err.error?.response?.data;
      if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
        parser = yield parseError(err.response, types.Subjects);
      }
      ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
      yield put(actions.loadFetchFailure(err));
    }
  }
}
