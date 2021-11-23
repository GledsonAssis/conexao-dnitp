import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError } from '@/utils/error';
import { downloadData, handleResponse } from '@/utils/http';
import { EnvsConfig } from '@/infra/config/envs.config';
import * as messages from './actions';
import { Messages } from './types';

export function* fetchAllInbox({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, '/messages/inbox');
    yield put(messages.loadInboxFetchSuccess({ data: response.data, cron: Boolean(payload?.cron) }));
  } catch (err) {
    console.log(err)
    // const parser = parseError(err.error.response);
    // yield put(messages.loadInboxFetchFailure(parser));
  }
}

export function* fetchAllSend() {
  try {
    const response: any = yield* call(service.client.get, '/messages/send');
    yield put(messages.loadSendFetchSuccess(response.data));
  } catch (err) {
    console.log(err)
    // const parser = parseError(err.error.response);
    // yield put(messages.loadSendFetchFailure(parser));
  }
}

export function* destroy({ payload }: any) {
  try {
    const { idArr } = payload;
    const responseArr = [];
    for (const id in idArr) {
      const response: any = yield* call(service.client.delete, `/messages/${idArr[id]}`);
      responseArr.push(response);
    }
    yield* fetchAllInbox({});
    yield* fetchAllSend();
  } catch (err) {
    console.log(err);
  }
}

export function* messageTypes() {
  try {
    const response: any = yield* call(service.client.get, '/messagestypes');
    yield put(messages.loadMessagesTypesSuccess(response.data));
  } catch (err) {
    console.log(err)
    // const parser = parseError(err.error.response);
    // yield put(messages.loadMessagesTypesFailure(parser));
  }
}

export function* fetchId({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, `/messages/${payload.id}`);
    yield readId({ payload });
    yield put(messages.loadFetchIdSuccess(response.data));
  } catch (err) {
    console.log(err)
    // const parser = parseError(err.error.response);
    // yield put(messages.loadFetchIdFailure(parser));
  }
}

export function* readId({ payload }: any) {
  try {
    const response: any = yield* call(service.client.put, '/messages/read', { idMessage: payload.id });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export function* submitMessage({ payload }: any) {
  try {
    // const response: any = yield* call(service.client.post, '/messages', payload);
    const response = {
      data: [
        {
          dateTimeLastResponse: new Date("2021-10-22T00:56:50.362Z"),
          id: 16523,
          idMessageType: 6,
          idUserFrom: 3916,
          idUserRecipient: 4307,
          subject: "Anexo Email"
        }
      ]
    }
    const [responseData] = response.data;
    yield submitAttachments(payload.attachments, responseData)

    yield fetchAllInbox({})
    yield fetchAllSend()

    yield put(messages.loadSubmitSuccess(response.data));
  } catch (err) {
    console.log(err)
    // const parser = parseError(err.error.response);
    // yield put(messages.loadSubmitFailure(parser));
  }
}

function* submitAttachments(attachments = [], message: Messages) {
  console.log(attachments)
  console.log(message)
  try {
    if (!attachments || !attachments.length) return attachments;
    const totalSize = attachments.reduce((acc, file) => acc + file.size, 0);
    const promiseAttachments = <any>[];

    if (totalSize >= EnvsConfig.apiMaxSize()) {
      attachments.forEach(function* (attach) {
        attach.size <= EnvsConfig.apiMaxSize() &&
          promiseAttachments.push(
            yield* submitMessagesAttachments({
              idMessage: message.id,
              attachments: [attach],
            }),
          );
      });
    } else {
      promiseAttachments.push(
        yield* submitMessagesAttachments({
          idMessage: message.id,
          attachments,
        }),
      );
    }

    yield put(messages.loadSubmitAttachmentSuccess(promiseAttachments));
  } catch (err: any) {
    console.log(err)
    // const parser = parseError(err.error.response);
    // yield put(messages.loadSubmitAttachmentFailure(parser));
  }
}

function* submitMessagesAttachments({ idMessage = null as number, attachments = [] as File[] }) {
  const body = new FormData();

  body.append('idMessage', String(idMessage));
  attachments.forEach((file: File) => {
    body.append('data', file, file.name);
  });

  const response: any = yield* call(service.client.post, '/messages/attachments', body);
  return response;
}

export function* getAttachment({ payload }: any) {
  const { id } = payload;
  try {
    downloadData(
      handleResponse(yield* call(service.client.get, `/messages/attachments/${id}`, { responseType: 'blob' })),
    );
  } catch (err) { }
}

export function* userList({ payload }: any) {
  try {
    const response: any = yield* call(service.client.post, '/messages/compose/recipients', payload);
    yield put(messages.loadListUsersSuccess(response.data));
  } catch (err) {
    console.log(err)
    // const parser = parseError(err.error.response);
    // yield put(messages.loadListUsersFailure(parser));
  }
}

export function* userListFiltered({ payload }: any) {
  try {
    const response: any = yield* call(service.client.post, '/messages/compose/recipients', payload);
    yield put(messages.loadListUsersFilteredSuccess(response.data));
  } catch (err) {
    console.log(err)
    // const parser = parseError(err.error.response);
    // yield put(messages.loadListUsersFilteredFailure(parser));
  }
}

export function* profileList({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, `/users/roles?withAll=${false}&validateRole=${true}`);
    yield put(messages.loadRolesSuccess(response.data));
  } catch (err) {
    console.log(err)
    // const parser = parseError(err.error.response);
    // yield put(messages.loadRolesFailure(parser));
  }
}

export function* superintendencesList({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, `/dnitunits/superintendences?withAll=${true}`);
    yield put(messages.loadSuperintendencesSuccess(response.data));
  } catch (err) {
    console.log(err)
    // const parser = parseError(err.error.response);
    // yield put(messages.loadSuperintendencesFailure(parser));
  }
}

export function* localUnitsList({ payload }: any) {
  try {
    console.log(payload);
    const response: any = yield* call(
      service.client.get,
      `/dnitunits/locals?withAll=${true}&superintendencesIds=[${payload}]`,
    );
    yield put(messages.loadLocalUnitSuccess(response.data));
  } catch (err) {
    console.log(err)
    // const parser = parseError(err.error.response);
    // yield put(messages.loadLocalUnitFailure(parser));
  }
}

export function* institutionsList({ payload }: any) {
  try {
    const response: any = yield* call(service.client.post, '/institutions/dnitunits', payload);
    yield put(messages.loadInstitutionsSuccess(response.data));
  } catch (err) {
    console.log(err)
    // const parser = parseError(err.error.response);
    // yield put(messages.loadInstitutionsFailure(parser));
  }
}
