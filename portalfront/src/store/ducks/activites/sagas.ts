import { authorizationOptions, downloadData, handleResponse } from '@/utils/http';
import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError } from '@/utils/error';
import * as actions from './actions';

export function* search({ payload }: any) {
  if (payload) {
    try {
      const response: any = yield* call(service.client.post, '/activities/search', payload);
      yield put(actions.loadSearchSuccess(response.data));
    } catch (err) {
      console.log(err.response);
      const parser = parseError(err.error.response);
      yield put(actions.loadSearchFailure(parser));
    }
  }
}

export function* searchRedirect({ payload }: any) {
  if (payload) {
    try {
      yield put(actions.setDataProps(payload));
      // window.location.href = '/atividades';
    } catch (err) {
      console.log(err.response);
    }
  }
}

export function* fetchId({ payload }: any) {
  if (payload) {
    try {
      const response: any = yield* call(service.client.get, `/activities/${payload.id}`);
      yield put(actions.loadFetchIdSuccess(response.data));
    } catch (err) {
      console.log(err.response);
      const parser = parseError(err.error.response);
      yield put(actions.loadFetchIdFailure(parser));
    }
  }
}

export function* getAttachment({ payload }: any) {
  const { id } = payload;
  try {
    downloadData(
      handleResponse(yield* call(service.client.get, `/activity/attachments/${id}`, { responseType: 'blob' })),
    );
  } catch (err) {
    console.log(err);
  }
}

export function* fetchSurvey({ payload }: any) {
  if (payload) {
    try {
      const response: any = yield* call(service.client.get, `/survey`,
        { params: { idActivity: payload.id } });
      yield put(actions.loadFetchSurveySuccess(response.data));
    } catch (err) {
      console.log(err.response);
      const parser = parseError(err.error.response);
      yield put(actions.loadFetchSurveyFailure(parser));
    }
  }
}

export function* submitSurvey({ payload }: any) {
  if (payload) {
    try {
      const response: any = yield* call(service.client.post, `/survey`, payload.params);
      yield put(actions.loadSubmitSurveySuccess(response.data));
    } catch (err) {
      console.log(err.response);
      const parser = parseError(err.error.response);
      yield put(actions.loadSubmitSurveyFailure(parser));
    }
  }
}
