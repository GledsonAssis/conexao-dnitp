import { MessagesTypes } from './types';

export const loadInboxFetchRequest = (data?: any) => ({
  type: MessagesTypes.LOAD_REQUEST_FETCH_INBOX,
  payload: data,
});
export const loadInboxFetchSuccess = (data: any) => ({
  type: MessagesTypes.LOAD_SUCCESS_FETCH_INBOX,
  payload: data,
});
export const loadInboxFetchFailure = (err: any) => ({
  type: MessagesTypes.LOAD_FAILURE_FETCH_INBOX,
  payload: err,
});

export const loadSendFetchRequest = (data?: any) => ({
  type: MessagesTypes.LOAD_REQUEST_FETCH_SEND,
  payload: data,
});
export const loadSendFetchSuccess = (data: any) => ({
  type: MessagesTypes.LOAD_SUCCESS_FETCH_SEND,
  payload: data,
});
export const loadSendFetchFailure = (err: any) => ({
  type: MessagesTypes.LOAD_FAILURE_FETCH_SEND,
  payload: err,
});

export const loadSubmitRequest = (data?: any) => ({
  type: MessagesTypes.LOAD_REQUEST_SUBMIT,
  payload: data,
});
export const loadSubmitSuccess = (data: any) => ({
  type: MessagesTypes.LOAD_SUCCESS_SUBMIT,
  payload: data,
});
export const loadSubmitFailure = (err: any) => ({
  type: MessagesTypes.LOAD_FAILURE_SUBMIT,
  payload: err,
});

export const loadSubmitAttachmentSuccess = (data: any) => ({
  type: MessagesTypes.LOAD_SUCCESS_SUBMITATTACHMENT,
  payload: data,
});
export const loadSubmitAttachmentFailure = (err: any) => ({
  type: MessagesTypes.LOAD_FAILURE_SUBMITATTACHMENT,
  payload: err,
});

export const loadFetchIdRequest = (data?: any) => ({
  type: MessagesTypes.LOAD_REQUEST_FETCH_ID,
  payload: data,
});
export const loadFetchIdSuccess = (data: any) => ({
  type: MessagesTypes.LOAD_SUCCESS_FETCH_ID,
  payload: data,
});
export const loadFetchIdFailure = (err: any) => ({
  type: MessagesTypes.LOAD_FAILURE_FETCH_ID,
  payload: err,
});

export const loadGetAttachmentsRequest = (data?: any) => ({
  type: MessagesTypes.LOAD_REQUEST_GET_ATTACHMENT,
  payload: data,
});
export const loadGetAttachmentsSuccess = (data: any) => ({
  type: MessagesTypes.LOAD_SUCCESS_GET_ATTACHMENT,
  payload: data,
});
export const loadGetAttachmentsFailure = (err: any) => ({
  type: MessagesTypes.LOAD_FAILURE_GET_ATTACHMENT,
  payload: err,
});

export const loadDeleteRequest = (data?: any) => ({
  type: MessagesTypes.LOAD_REQUEST_DELETE,
  payload: data,
});
export const loadDeleteSuccess = (data: any) => ({
  type: MessagesTypes.LOAD_SUCCESS_DELETE,
  payload: data,
});
export const loadDeleteFailure = (err: any) => ({
  type: MessagesTypes.LOAD_FAILURE_DELETE,
  payload: err,
});

export const loadMessagesTypesRequest = (data?: any) => ({
  type: MessagesTypes.LOAD_REQUEST_MESSAGES_TYPES,
  payload: data,
});
export const loadMessagesTypesSuccess = (data: any) => ({
  type: MessagesTypes.LOAD_SUCCESS_MESSAGES_TYPES,
  payload: data,
});
export const loadMessagesTypesFailure = (err: any) => ({
  type: MessagesTypes.LOAD_FAILURE_MESSAGES_TYPES,
  payload: err,
});

export const loadListUsersRequest = (data?: any) => ({
  type: MessagesTypes.LOAD_REQUEST_LIST_USERS_TO_SEND,
  payload: data,
});
export const loadListUsersSuccess = (data: any) => ({
  type: MessagesTypes.LOAD_SUCCESS_LIST_USERS_TO_SEND,
  payload: data,
});
export const loadListUsersFailure = (err: any) => ({
  type: MessagesTypes.LOAD_FAILURE_LIST_USERS_TO_SEND,
  payload: err,
});

export const loadRolesRequest = (data?: any) => ({
  type: MessagesTypes.LOAD_REQUEST_LIST_PROFILES,
  payload: data,
});
export const loadRolesSuccess = (data: any) => ({
  type: MessagesTypes.LOAD_SUCCESS_LIST_PROFILES,
  payload: data,
});
export const loadRolesFailure = (err: any) => ({
  type: MessagesTypes.LOAD_FAILURE_LIST_PROFILES,
  payload: err,
});

export const loadSuperintendencesRequest = (data?: any) => ({
  type: MessagesTypes.LOAD_REQUEST_LIST_SUPERINTENDENCES,
  payload: data,
});
export const loadSuperintendencesSuccess = (data: any) => ({
  type: MessagesTypes.LOAD_SUCCESS_LIST_SUPERINTENDENCES,
  payload: data,
});
export const loadSuperintendencesFailure = (err: any) => ({
  type: MessagesTypes.LOAD_FAILURE_LIST_SUPERINTENDENCES,
  payload: err,
});

export const loadLocalUnitRequest = (data?: any) => ({
  type: MessagesTypes.LOAD_REQUEST_LIST_LOCAL_UNITS,
  payload: data,
});
export const loadLocalUnitSuccess = (data: any) => ({
  type: MessagesTypes.LOAD_SUCCESS_LIST_LOCAL_UNITS,
  payload: data,
});
export const loadLocalUnitFailure = (err: any) => ({
  type: MessagesTypes.LOAD_FAILURE_LIST_LOCAL_UNITS,
  payload: err,
});

export const loadInstitutionsRequest = (data?: any) => ({
  type: MessagesTypes.LOAD_REQUEST_LIST_INSTITUTIONS,
  payload: data,
});
export const loadInstitutionsSuccess = (data: any) => ({
  type: MessagesTypes.LOAD_SUCCESS_LIST_INSTITUTIONS,
  payload: data,
});
export const loadInstitutionsFailure = (err: any) => ({
  type: MessagesTypes.LOAD_FAILURE_LIST_INSTITUTIONS,
  payload: err,
});

export const loadListUsersFilteredRequest = (data?: any) => ({
  type: MessagesTypes.LOAD_REQUEST_LIST_USERS_FILTERED,
  payload: data,
});
export const loadListUsersFilteredSuccess = (data: any) => ({
  type: MessagesTypes.LOAD_SUCCESS_LIST_USERS_FILTERED,
  payload: data,
});
export const loadListUsersFilteredFailure = (err: any) => ({
  type: MessagesTypes.LOAD_FAILURE_LIST_USERS_FILTERED,
  payload: err,
});
