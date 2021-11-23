import { downloadData, handleResponse } from '@/utils/http';
import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError } from '@/utils/error';
import * as actions from './actions';

export function* highlights() {
  try {
    const response: any = yield* call(service.client.get, '/projects');
    yield put(actions.loadHighlightsSuccess(response.data));
  } catch (err) {
    const parser = parseError(err.error.response);
    yield put(actions.loadHighlightsFailure(parser));
  }
}

export function* fetchOne({ payload }: any) {
  const { id } = payload;
  try {
    const response: any = yield* call(service.client.get, `/projects/${id}`);
    yield put(actions.loadFetchSuccess(response.data));
  } catch (err) {
    console.log(err.response);
    const parser = parseError(err.error.response);
    yield put(actions.loadFetchFailure(parser));
  }
}

export function* fetchAttachments({ payload }: any) {
  const { id } = payload;
  try {
    const response: any = yield* call(service.client.get, `/projects/${id}/attachments`);
    yield put(actions.loadFetchAttachmentsSuccess(response.data));
  } catch (err) {
    console.log(err.response);
    const parser = parseError(err.error.response);
    yield put(actions.loadFetchAttachmentsFailure(parser));
  }
}

export function* fetchComments({ payload }: any) {
  const { id } = payload;
  try {
    const response: any = yield* call(service.client.get, `/projects/${id}/comments`);
    yield put(actions.loadFetchCommentsSuccess(response.data));
  } catch (err) {
    console.log(err.response);
    const parser = parseError(err.error.response);
    yield put(actions.loadFetchCommentsFailure(parser));
  }
}

export function* fetchActions({ payload }: any) {
  const { id } = payload;
  try {
    const response: any = yield* call(service.client.get, `/projects/${id}/actions`);
    yield put(actions.loadFetchActionsSuccess(response.data));
  } catch (err) {
    console.log(err.response);
    const parser = parseError(err.error.response);
    yield put(actions.loadFetchActionsFailure(parser));
  }
}

export function* fetchImages({ payload }: any) {
  const { id } = payload;
  try {
    const response: any = yield* call(service.client.get, `/projects/${id}/images`);
    yield put(actions.loadFetchImagesSuccess(response.data));
  } catch (err) {
    console.log(err.response);
    const parser = parseError(err.error.response);
    yield put(actions.loadFetchImagesFailure(parser));
  }
}

export function* fetchRating({ payload }: any) {
  const { id } = payload;
  try {
    const response: any = yield* call(service.client.get, `/projects/${id}/rating`);
    yield put(actions.loadFetchRatingSuccess(response.data));
  } catch (err) {
    console.log(err.response);
    const parser = parseError(err.error.response);
    yield put(actions.loadFetchRatingFailure(parser));
  }
}

export function* getAttachment({ payload }: any) {
  const { id } = payload;
  try {
    downloadData(
      handleResponse(yield* call(service.client.get, `/projects/attachments/${id}`, { responseType: 'blob' })),
    );
  } catch (err) {
    console.log(err);
  }
}

export function* setRate({ payload }: any) {
  try {
    const response: any = yield* call(service.client.post, `/projects/rating`, payload);
    yield put(actions.setRateSuccess(response.data));
  } catch (err) {
    console.log(err.response);
    const parser = parseError(err.error.response);
    yield put(actions.setRateFailure(parser));
  }
}

export function* submitNew({ payload }: any) {
  try {
    const response: any = yield* call(service.client.post, '/projects/comments', payload);
    yield put(actions.loadSubmitNewSuccess(response.data));
    const responseList: any = yield* call(service.client.get, `/projects/${payload.idProject}/comments`);
    yield put(actions.loadFetchCommentsSuccess(responseList.data));
  } catch (err) {
    const parser = parseError(err.error.response);
    yield put(actions.loadSubmitNewFailure(parser));
  }
}

export function* deleteComment({ payload }: any) {
  const { idProject, id } = payload;
  try {
    const response: any = yield* call(service.client.delete, `/projects/${idProject}/comments/${id}`);
    yield put(actions.loadDeleteCommentSuccess(response.data));
    const responseList: any = yield* call(service.client.get, `/projects/${idProject}/comments`);
    yield put(actions.loadFetchCommentsSuccess(responseList.data));
  } catch (err) {
    const parser = parseError(err.error.response);
    yield put(actions.loadDeleteCommentFailure(parser));
  }
}
