import { call, put } from 'typed-redux-saga';
import service from '@/infra/services';
import { parseError, types } from '@/utils/error';
import * as actions from './actions';
import { downloadData, handleResponse } from '@/utils/http';
import ToastMessage, { typesToast } from '@/components/shared/Toast';

export function* listInitiatives({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, '/reports/initiatives', {
      params: {
        situation: payload?.situation,
        dateInit: payload?.dateInit,
        dateEnd: payload?.dateEnd,
        educationalInstitution: payload?.educationalInstitution,
        idRegionalSuperintendence: payload?.idRegionalSuperintendence,
        localUnit: payload?.localUnit,
        limit: payload?.limit || 10,
        page: payload?.page || 1,
      }
    });
    yield put(actions.loadReportsInitiativesListSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.ReportsInitiatives);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadReportsInitiativesListFailure(err));
  }
}

export function* listInteractivities({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, '/reports/interactivity', {
      params: {
        type: payload?.type,
        dateInit: payload?.dateInit,
        dateEnd: payload?.dateEnd,
        category: payload?.category,
        uf: payload?.uf,
        limit: payload?.limit || 10,
        page: payload?.page || 1,
      }
    });
    yield put(actions.loadReportsInteractivitiesListSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.ReportsInteractivity);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadReportsInteractivitiesListFailure(err));
  }
}

export function* listProjects({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, '/reports/projects', {
      params: {
        type: payload?.type,
        dateInit: payload?.dateInit,
        dateEnd: payload?.dateEnd,
        category: payload?.category,
        idRegionalSuperintendence: payload?.idRegionalSuperintendence,
        localUnit: payload?.localUnit,
        limit: payload?.limit || 10,
        page: payload?.page || 1,
      }
    });
    yield put(actions.loadReportsProjectsListSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.ReportsProjects);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadReportsProjectsListFailure(err));
  }
}

export function* listMessages({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, '/reports/messages', {
      params: {
        type: payload?.type,
        situation: payload?.situation,
        dateInit: payload?.dateInit,
        dateEnd: payload?.dateEnd,
        idRegionalSuperintendence: payload?.idRegionalSuperintendence,
        localUnit: payload?.localUnit,
        limit: payload?.limit || 10,
        page: payload?.page || 1,
      }
    });
    yield put(actions.loadReportsMessagesListSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.ReportsMessages);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadReportsMessagesListFailure(err));
  }
}

export function* listDownloads({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, '/reports/downloads', {
      params: {
        dateInit: payload?.dateInit,
        dateEnd: payload?.dateEnd,
        educationalInstitution: payload?.educationalInstitution,
        idRegionalSuperintendence: payload?.idRegionalSuperintendence,
        year: payload?.year,
        localUnit: payload?.localUnit,
        discipline: payload?.discipline,
        activity: payload?.activity,
        limit: payload?.limit || 10,
        page: payload?.page || 1,
      }
    });
    yield put(actions.loadReportsDownloadsListSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.ReportsDownloads);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadReportsDownloadsListFailure(err));
  }
}

export function* listParticipants({ payload }: any) {
  try {
    const response: any = yield* call(service.client.get, '/reports/participants', {
      params: {
        dateInit: payload?.dateInit,
        dateEnd: payload?.dateEnd,
        educationalInstitution: payload?.educationalInstitution,
        idRegionalSuperintendence: payload?.idRegionalSuperintendence,
        localUnit: payload?.localUnit,
        role: payload?.role,
        active: payload?.active,
        limit: payload?.limit || 10,
        page: payload?.page || 1,
      }
    });
    yield put(actions.loadReportsParticipantsListSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.ReportsParticipants);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadReportsParticipantsListFailure(err));
  }
}

export function* listSurveies({ payload }: any) {
  try {
    const response: any = yield* call(service.client.post, '/reports/survey', {
      ...payload?.body
    });
    yield put(actions.loadReportsSurveiesListSuccess(response.data));
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.ReportsSurvey);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
    yield put(actions.loadReportsSurveiesListFailure(err));
  }
}

export function* getListCSV({ payload }: any) {
  try {
    const { typeList = '', params = null } = payload
    downloadData(
      handleResponse(yield* call(
        service.client.get,
        `/reports/${typeList}/download`,
        { responseType: 'blob', params })),
    );
  } catch (err) {
    let parser = err.error?.response?.data;
    if (!err.error?.response?.data?.message || !err.error?.response?.data?.code) {
      parser = yield parseError(err.response, types.GenericCsv);
    }
    ToastMessage({ message: parser.message, type: typesToast.TOAST_ERROR })
  }
}
