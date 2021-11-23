import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError } from '@/utils/error';
import { downloadData, handleResponse } from '@/utils/http';
import { EnvsConfig } from '@/infra/config/envs.config';
import * as initiatives from './actions';
import { Initiatives } from './types';

export function* fetchAll() {
  try {
    const response: any = yield* call(service.client.get, '/initiatives');
    yield put(initiatives.loadFetchSuccess(response.data));
  } catch (err) {
    console.log(err.error);
    // const parser = parseError(err.error.response);
    console.log(err.error)
    // yield put(initiatives.loadFetchFailure(parser));
  }
}

export function* fetchId({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, `/initiatives/${payload.id}`);
    yield put(initiatives.loadFetchIdSuccess(response.data));
  } catch (err) {
    // const parser = parseError(err.error.response);
    console.log(err.error)
    // yield put(initiatives.loadFetchIdFailure(parser));
  }
}

export function* submitInitiative({ payload }: any) {
  const { description, title } = payload;
  try {
    const response: any = yield* call(service.client.post, '/initiatives', { description, title });
    yield submitAttachments(payload.attachments, response.data)

    yield fetchAll()

    yield put(initiatives.loadSubmitSuccess(response.data));
  } catch (err) {
    // const parser = parseError(err.error.response);
    console.log(err.error)
    // yield put(initiatives.loadSubmitFailure(parser));
  }
}

function* submitAttachments(attachments = [], initiative: Initiatives) {
  try {
    if (!attachments || !attachments.length) return attachments;
    const totalSize = attachments.reduce((acc, file) => acc + file.size, 0);
    const promiseAttachments = <any>[];

    if (totalSize >= EnvsConfig.apiMaxSize()) {
      attachments.forEach(function* (attach) {
        attach.size <= EnvsConfig.apiMaxSize() &&
          promiseAttachments.push(
            yield* submitInitiativeAttachments({
              idInitiative: initiative.id,
              attachments: [attach],
            }),
          );
      });
    } else {
      promiseAttachments.push(
        yield* submitInitiativeAttachments({
          idInitiative: initiative.id,
          attachments,
        }),
      );
    }

    yield put(initiatives.loadSubmitAttachmentSuccess(promiseAttachments));
  } catch (err: any) {
    // const parser = parseError(err.error.response);
    console.log(err.error)
    // yield put(initiatives.loadSubmitAttachmentFailure(parser));
  }
}

function* submitInitiativeAttachments({ idInitiative = null as number, attachments = [] as File[] }) {
  const body = new FormData();

  body.append('idInitiative', String(idInitiative));
  attachments.forEach((file: File) => {
    body.append('data', file, file.name);
  });

  const response: any = yield* call(service.client.post, '/initiatives/attachments', body);
  return response;
}

export function* getAttachment({ payload }: any) {
  const { id } = payload;
  try {
    downloadData(
      handleResponse(yield* call(service.client.get, `/initiatives/attachments/${id}`, { responseType: 'blob' })),
    );
  } catch (err) { }
}
