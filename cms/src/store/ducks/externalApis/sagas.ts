import axios from 'axios';
import { put } from 'typed-redux-saga';
import * as actions from './actions';
import { parseError, types } from '@/utils/error';
import ToastMessage, { typesToast } from '@/components/shared/Toast';

export function* fetchZipCode({ payload }: any) {
  try {
    const { cep } = payload;
    const response: any = yield axios({
      method: 'get',
      url: `https://viacep.com.br/ws/${cep}/json/`,
    });
    if (response.data.erro) {
      const parser = yield parseError({ status: 400, data: { error: 'cep-invalid' } }, types.ComponentsAddress);
      ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
      yield put(actions.loadViaCepZipCodeFailure(parser));
    } else {
      yield put(actions.loadViaCepZipCodeSuccess(response.data));
    }
  } catch (err) {
    const parser = yield parseError(err.response, types.ComponentsAddress);
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadViaCepZipCodeFailure(err));
  }
}
