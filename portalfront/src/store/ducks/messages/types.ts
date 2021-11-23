export enum MessagesTypes {
  LOAD_REQUEST_FETCH_INBOX = '@messages/fetch_inbox/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_INBOX = '@messages/fetch_inbox/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_INBOX = '@messages/fetch_inbox/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_SEND = '@messages/fetch_send/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_SEND = '@messages/fetch_send/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_SEND = '@messages/fetch_send/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@messages/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@messages/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@messages/submit/LOAD_FAILURE',
  LOAD_REQUEST_SUBMITATTACHMENT = '@messages/submitAttachment/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMITATTACHMENT = '@messages/submitAttachment/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMITATTACHMENT = '@messages/submitAttachment/LOAD_FAILURE',
  LOAD_REQUEST_GET_ATTACHMENT = '@messages/getAttachment/LOAD_REQUEST',
  LOAD_SUCCESS_GET_ATTACHMENT = '@messages/getAttachment/LOAD_SUCCESS',
  LOAD_FAILURE_GET_ATTACHMENT = '@messages/getAttachment/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID = '@messages/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@messages/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@messages/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_DELETE = '@messages/DELETE/LOAD_REQUEST',
  LOAD_SUCCESS_DELETE = '@messages/DELETE/LOAD_SUCCESS',
  LOAD_FAILURE_DELETE = '@messages/DELETE/LOAD_FAILURE',
  LOAD_REQUEST_MESSAGES_TYPES = '@messages/MESSAGES_TYPES/LOAD_REQUEST',
  LOAD_SUCCESS_MESSAGES_TYPES = '@messages/MESSAGES_TYPES/LOAD_SUCCESS',
  LOAD_FAILURE_MESSAGES_TYPES = '@messages/MESSAGES_TYPES/LOAD_FAILURE',
  LOAD_REQUEST_LIST_USERS_TO_SEND = '@messages/LIST_USERS_TO_SEND/LOAD_REQUEST',
  LOAD_SUCCESS_LIST_USERS_TO_SEND = '@messages/LIST_USERS_TO_SEND/LOAD_SUCCESS',
  LOAD_FAILURE_LIST_USERS_TO_SEND = '@messages/LIST_USERS_TO_SEND/LOAD_FAILURE',
  LOAD_REQUEST_LIST_USERS_FILTERED = '@messages/LIST_USERS_FILTERED/LOAD_REQUEST',
  LOAD_SUCCESS_LIST_USERS_FILTERED = '@messages/LIST_USERS_FILTERED/LOAD_SUCCESS',
  LOAD_FAILURE_LIST_USERS_FILTERED = '@messages/LIST_USERS_FILTERED/LOAD_FAILURE',

  LOAD_REQUEST_LIST_INSTITUTIONS = '@messages/LIST_INSTITUTIONS/LOAD_REQUEST',
  LOAD_SUCCESS_LIST_INSTITUTIONS = '@messages/LIST_INSTITUTIONS/LOAD_SUCCESS',
  LOAD_FAILURE_LIST_INSTITUTIONS = '@messages/LIST_INSTITUTIONS/LOAD_FAILURE',
  LOAD_REQUEST_LIST_LOCAL_UNITS = '@messages/LIST_LOCAL_UNITS/LOAD_REQUEST',
  LOAD_SUCCESS_LIST_LOCAL_UNITS = '@messages/LIST_LOCAL_UNITS/LOAD_SUCCESS',
  LOAD_FAILURE_LIST_LOCAL_UNITS = '@messages/LIST_LOCAL_UNITS/LOAD_FAILURE',
  LOAD_REQUEST_LIST_PROFILES = '@messages/LIST_PROFILES/LOAD_REQUEST',
  LOAD_SUCCESS_LIST_PROFILES = '@messages/LIST_PROFILES/LOAD_SUCCESS',
  LOAD_FAILURE_LIST_PROFILES = '@messages/LIST_PROFILES/LOAD_FAILURE',
  LOAD_REQUEST_LIST_SUPERINTENDENCES = '@messages/LIST_SUPERINTENDENCES/LOAD_REQUEST',
  LOAD_SUCCESS_LIST_SUPERINTENDENCES = '@messages/LIST_SUPERINTENDENCES/LOAD_SUCCESS',
  LOAD_FAILURE_LIST_SUPERINTENDENCES = '@messages/LIST_SUPERINTENDENCES/LOAD_FAILURE',

  SORT_FILTER = '@messages/sort/SORT_FILTER',
}

export interface IdName {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  attachment: Attachment[];
}

export interface Attachment {
  name: string;
  id: number;
  attachmentType: AttachmentsType;
}

export interface BaseMessages {
  id: number;
  dateTimeLastResponse: Date;
  idMessageType: number,
  idUserFrom: number,
  idUserRecipient: number,
  subject: string;
  unread?: number;
  type?: IdName;
  status?: IdName;
  from?: User;
  recipient?: User;
  idParentMessage?: number;
  messageAttachments?: Attachment[];
  reply?: Reply[];
}
interface AttachmentsType {
  id: number;
  name: string;
  mime: {
    media: string;
    suffix: string;
  };
}

interface Reply {
  id: number;
  dateTime: Date;
  text: string;
  replyFrom: User;
}

interface RegionalSuperintendence {
  id: number;
  identification: string;
}

export interface SuperintendencesUnits {
  addressId: number;
  UFId: number;
  idRegionalSuperintendence: number;
  email: string;
  address: string;
  RegionalSuperintendence: RegionalSuperintendence;
  cities: any;
  UF: string;
  cityName: string;
  id: number;
  idAddress: number;
  idUFSuperintendence: number;
  identification: string;
  phones: string;
  street: string;
}

interface SuperintendencesUnitsWithCount {
  count: number;
  rows: SuperintendencesUnits[];
}

export interface Institutions {
  id: number;
  name: string;
  idDnit: number;
}

export type Messages = BaseMessages;

export interface MessagesState {
  readonly data: Messages[];
  readonly cronCheck: boolean;
  readonly dataInbox: Messages[];
  readonly dataSend: Messages[];
  readonly paginator: number[];
  readonly dataById: Messages;
  readonly loading: boolean;
  readonly error: boolean;
  readonly messagesTypes: IdName[];
  readonly userList: User[];
  readonly userListFiltered: User[];
  readonly institutionsList: Institutions[];
  readonly localUnitsList: SuperintendencesUnitsWithCount;
  readonly profilesList: IdName[];
  readonly superintendencesList: SuperintendencesUnitsWithCount;
}
