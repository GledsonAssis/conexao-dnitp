import { downloadData, handleResponse } from '@/utils/http';
import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError, types } from '@/utils/error';
import * as actions from './actions';
import ToastMessage, { typesToast } from '@/components/shared/Toast';

export function* search({ payload }: any) {
  try {
    const { page = 1, limit = 10, keyword, order, idSchoolYear = null } = payload;
    const sorter = order ? Object.keys(order).map(key => `${key},${order[key]}`).join('') : null;
    const response: any = yield* call(service.client.get,
      `/cms/activities`, {
      params: {
        page,
        limit,
        idSchoolYear,
        keyword,
        order: sorter
      }
    });

    yield put(actions.loadListSuccess(response.data));

  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Activities);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadListFailure(err));
  }
}

export function* searchActivities({ payload }: any) {
  try {
    const { page = 1, limit = 10, keyword, order, idSchoolYear = null } = payload;
    const sorter = order ? Object.keys(order).map(key => `${key},${order[key]}`).join('') : null;
    const response: any = yield* call(service.client.post,
      `/activities/search`, {
      ...payload
    });

    yield put(actions.loadSearchSuccess(response.data));

  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Activities);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR });
    yield put(actions.loadSearchFailure(err));
  }
}

export function* publish({ payload }: any) {
  const { id, isPublished } = payload;
  try {
    const response: any = yield* call(service.client.post, `/cms/activities/publish`, { id, isPublished });
    yield put(actions.loadPublishSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Activities);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadPublishFailure(err));
  }
}

export function* fetchId({ payload }: any) {
  if (payload) {
    try {
      const response: any = yield* call(service.client.get, `/activities/${payload.id}`);
      yield put(actions.loadFetchIdSuccess(response.data));
    } catch (err) {
      let parser = err.error?.response?.data;
      if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
        parser = yield parseError(err.response, types.Activities);
      }
      ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
      yield put(actions.loadFetchIdFailure(err));
    }
  }
}

export function* getAttachment({ payload }: any) {
  const { id } = payload;
  try {
    downloadData(
      handleResponse(yield* call(service.client.get, `/cms/activity/attachments/${id}`, { responseType: 'blob' })),
    );
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Activities);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
  }
}

export function* getListCSV({ payload }: any) {
  try {
    const { keyword = '', order } = payload;
    const sorter = order ? Object.keys(order).map(key => `${key},${order[key]}`).join('') : null;
    downloadData(
      handleResponse(yield* call(
        service.client.get,
        `/cms/activities/download`,
        { responseType: 'blob', params: { keyword, order: sorter } })),
    );
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.GenericCsv);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
  }
}

export function* submit({ payload }: any) {
  try {
    const { body, isPublished = false } = payload;
    const params = { ...body, isPublished }
    let methodType = 'post';
    if (payload.id) {
      methodType = 'put';
      params['id'] = payload.id
    }
    const response: any = yield* call(service.client[methodType], `/cms/activities`, params);
    yield submitAttachments({ payload: { id: response.data.id, attachments: payload.atachments.listFilesTeacher, idFileType: 1 } });
    yield submitAttachments({ payload: { id: response.data.id, attachments: payload.atachments.listFilesStudent, idFileType: 2 } });

    yield deleteAttachment({ payload: { listFilesToDelete: payload.atachments.listFilesTeacherToDelete } })
    yield deleteAttachment({ payload: { listFilesToDelete: payload.atachments.listFilesStudentToDelete } })

    yield put(actions.loadSubmitSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Activities);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadSubmitFailure(err));
  }
}

function* submitAttachments({ payload }: any) {
  const { id, attachments, idFileType } = payload;
  try {
    if (attachments.length) {
      const body = new FormData();
      body.append('idActivity', id);
      body.append('idFileType', idFileType);
      attachments.forEach((file: File) => { body.append('data', file, file.name) });

      const response: any = yield* call(service.client.post, `/cms/activities/attachments`, body);
      yield put(actions.loadSubmitSuccess(response.data));
    }
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Activities);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadSubmitFailure(err));
  }
};

function* deleteAttachment({ payload }: any) {
  try {
    for (let item of payload.listFilesToDelete) {
      yield* call(service.client.delete, `/cms/activities/attachments/${item}`);
    }
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.Activities);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
  }
};
