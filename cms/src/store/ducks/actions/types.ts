export enum ActionsTypes {
  LOAD_REQUEST_FETCH_ID = '@actions/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@actions/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@actions/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_LIST = '@actions/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@actions/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@actions/list/LOAD_FAILURE',
  LOAD_REQUEST_PUBLISH = '@actions/publish/LOAD_REQUEST',
  LOAD_SUCCESS_PUBLISH = '@actions/publish/LOAD_SUCCESS',
  LOAD_FAILURE_PUBLISH = '@actions/publish/LOAD_FAILURE',
  LOAD_REQUEST_GET_LIST_CSV = '@actions/listCsv/LOAD_REQUEST',
  LOAD_SUCCESS_GET_LIST_CSV = '@actions/listCsv/LOAD_SUCCESS',
  LOAD_FAILURE_GET_LIST_CSV = '@actions/listCsv/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@actions/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@actions/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@actions/submit/LOAD_FAILURE',
  LOAD_REQUEST_GET_ID_ATTACHMENTS = '@actions/getIdAttachments/LOAD_REQUEST',
  LOAD_SUCCESS_GET_ID_ATTACHMENTS = '@actions/getIdAttachments/LOAD_SUCCESS',
  LOAD_FAILURE_GET_ID_ATTACHMENTS = '@actions/getIdAttachments/LOAD_FAILURE',
}

export interface Action {
  id: number;
  idUser: number;
  date: Date;
  description: string;
  endDate?: Date;
  excludedDate?: Date;
  isCover: boolean;
  isPublished: boolean;
  summary: string;
  title: string;
  attachments?: FilesObj[];
  images?: FilesObj[];
  idProject?: number;
  project: Project;
}

export interface Project {
  id: number;
  title: string;
}

export interface Mime {
  suffix: string;
}

export interface FilesObj {
  id: number;
  name: string;
  default: boolean;
  mime: Mime;
  uri?: string
}

export interface ListAction {
  count: number;
  rows: Action[];
}

export interface Actions extends Action, ListAction { }

export interface ActionsState {
  readonly data: Actions;
  readonly paginator: number[];
  readonly dataId: Action;
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
