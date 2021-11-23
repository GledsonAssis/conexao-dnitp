import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError, types } from '@/utils/error';
import * as actions from './actions';
import ToastMessage, { typesToast } from '@/components/shared/Toast';

interface ParamsRequest {
  participaConexaoDnit: boolean;
  page: number;
  limit: number;
  uf?: string;
}

export function* list({ payload }: any) {
  try {
    const limit = payload && payload.limit ? payload.limit : 10;
    const page = payload && payload.page ? payload.page : 1;
    const uf = payload.uf;
    const participaConexaoDnit = true;
    const params: ParamsRequest = {
      participaConexaoDnit,
      page,
      limit,
    };

    if (uf && uf !== 'all') {
      params.uf = uf;
    }

    const response: any = yield* call(service.client.get, '/cms/institutions', {
      params,
    });
    yield put(actions.loadListSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.ParticipatingSchools);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadListFailure(err));
  }
}
