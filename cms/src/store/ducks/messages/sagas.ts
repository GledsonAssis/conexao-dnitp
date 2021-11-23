import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError, types } from '@/utils/error';
import { downloadData, handleResponse } from '@/utils/http';
import { EnvsConfig } from '@/infra/config/envs.config';
import * as messages from './actions';
import { Messages } from './types';
import ToastMessage, { typesToast } from '@/components/shared/Toast';

export function* fetchAllInbox() {
  try {
    const response: any = yield* call(service.client.get, '/cms/messages/inbox');
    yield put(messages.loadInboxFetchSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Messages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(messages.loadInboxFetchFailure(err));
  }
}

export function* fetchAllSend() {
  try {
    const response: any = yield* call(service.client.get, '/cms/messages/send');
    yield put(messages.loadSendFetchSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Messages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(messages.loadSendFetchFailure(err));
  }
}

export function* destroy({ payload }: any) {
  try {
    const { idArr } = payload;
    const responseArr = [];
    for (const id in idArr) {
      const response: any = yield* call(service.client.delete, `/cms/messages/${idArr[id]}`);
      responseArr.push(response);
    }
    yield* fetchAllInbox();
    yield* fetchAllSend();
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Messages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
  }
}

export function* messageTypes() {
  try {
    const response: any = yield* call(service.client.get, '/messagestypes');
    yield put(messages.loadMessagesTypesSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Messages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(messages.loadMessagesTypesFailure(err));
  }
}

export function* messageStatus() {
  try {
    const response: any = yield* call(service.client.get, '/messagesstatus');
    yield put(messages.loadMessagesStatusSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Messages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(messages.loadMessagesStatusFailure(err));
  }
}

export function* fetchId({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, `/cms/messages/${payload.id}`);
    yield readId({ payload });
    yield put(messages.loadFetchIdSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Messages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(messages.loadFetchIdFailure(err));
  }
}

export function* readId({ payload }: any) {
  try {
    const response: any = yield* call(service.client.put, '/cms/messages/read', { idMessage: payload.id });
    return response;
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Messages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    return err;
  }
}

export function* submitMessage({ payload }: any) {
  // const { description, title,  } = payload;
  try {
    const response: any = yield* call(service.client.post, '/cms/messages', payload);
    // yield submitAttachments(payload.attachments, response.data).throw(function* (e: any) { });

    yield fetchAllInbox().throw(function* (e: any) { });
    yield fetchAllSend().throw(function* (e: any) { });

    yield put(messages.loadSubmitSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Messages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(messages.loadSubmitFailure(err));
  }
}

function* submitAttachments(attachments = [], initiative: Messages) {
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

    yield put(messages.loadSubmitAttachmentSuccess(promiseAttachments));
  } catch (err: any) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Messages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(messages.loadSubmitAttachmentFailure(err));
  }
}

function* submitInitiativeAttachments({ idInitiative = null as number, attachments = [] as File[] }) {
  const body = new FormData();

  body.append('idInitiative', String(idInitiative));
  attachments.forEach((file: File) => {
    body.append('data', file, file.name);
  });

  const response: any = yield* call(service.client.post, '/cms/messages/attachments', body);
  return response;
}

export function* getAttachment({ payload }: any) {
  const { id } = payload;
  try {
    downloadData(
      handleResponse(yield* call(service.client.get, `/cms/messages/attachments/${id}`, { responseType: 'blob' })),
    );
  } catch (err) { }
}

export function* userList({ payload }: any) {
  try {
    const response: any = yield* call(service.client.post, '/cms/messages/compose/recipients', payload);
    yield put(messages.loadListUsersSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Messages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(messages.loadListUsersFailure(err));
  }
}

export function* userListFiltered({ payload }: any) {
  try {
    const response: any = yield* call(service.client.post, '/cms/messages/compose/recipients', payload);
    yield put(messages.loadListUsersFilteredSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Messages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(messages.loadListUsersFilteredFailure(err));
  }
}

export function* profileList({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, `/cms/users/roles?withAll=${false}&validateRole=${true}`);
    yield put(messages.loadRolesSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Messages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(messages.loadRolesFailure(err));
  }
}

export function* superintendencesList({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, `/cms/dnitunits/superintendences?withAll=${true}`);
    yield put(messages.loadSuperintendencesSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Messages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(messages.loadSuperintendencesFailure(err));
  }
}

export function* localUnitsList({ payload }: any) {
  try {
    const response: any = yield* call(
      service.client.get,
      `/cms/dnitunits/locals?withAll=${true}&superintendencesIds=[${payload}]`,
    );
    yield put(messages.loadLocalUnitSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Messages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(messages.loadLocalUnitFailure(err));
  }
}

export function* institutionsList({ payload }: any) {
  try {
    const response: any = yield* call(service.client.post, '/cms/institutions/dnitunits', payload);
    yield put(messages.loadInstitutionsSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Messages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(messages.loadInstitutionsFailure(err));
  }
}
