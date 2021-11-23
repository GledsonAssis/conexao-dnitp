import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError } from '@/utils/error';
import * as actions from './actions';

interface ParamsRequest {
  participaConexaoDnit: boolean;
  page: number;
  limit: number;
  uf?: string;
}

export function* list({ payload }: any) {
  try {
    const limit = payload?.limit || 10;
    const page = payload?.page || 1;
    const uf = payload?.uf;
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
    console.log(err);
    const parser = parseError(err.error.response);
    yield put(actions.loadListFailure(parser));
  }
}
