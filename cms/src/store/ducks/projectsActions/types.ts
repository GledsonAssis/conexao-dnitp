export enum ProjectActionsTypes {
  LOAD_REQUEST_FETCH_ID = '@projectActions/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@projectActions/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@projectActions/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_LIST = '@projectActions/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@projectActions/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@projectActions/list/LOAD_FAILURE',
  LOAD_REQUEST_PUBLISH = '@projectActions/publish/LOAD_REQUEST',
  LOAD_SUCCESS_PUBLISH = '@projectActions/publish/LOAD_SUCCESS',
  LOAD_FAILURE_PUBLISH = '@projectActions/publish/LOAD_FAILURE',
  LOAD_REQUEST_GET_LIST_CSV = '@projectActions/listCsv/LOAD_REQUEST',
  LOAD_SUCCESS_GET_LIST_CSV = '@projectActions/listCsv/LOAD_SUCCESS',
  LOAD_FAILURE_GET_LIST_CSV = '@projectActions/listCsv/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@projectActions/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@projectActions/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@projectActions/submit/LOAD_FAILURE',
  LOAD_REQUEST_GET_ID_ATTACHMENTS = '@projectActions/getIdAttachments/LOAD_REQUEST',
  LOAD_SUCCESS_GET_ID_ATTACHMENTS = '@projectActions/getIdAttachments/LOAD_SUCCESS',
  LOAD_FAILURE_GET_ID_ATTACHMENTS = '@projectActions/getIdAttachments/LOAD_FAILURE',
}

export interface Project {
  id: number;
  title: string;
}

export interface ProjectAction {
  id: number;
  idProject: number;
  date: Date;
  description: string;
  endDate?: any;
  excludedDate?: Date;
  isPublished: boolean;
  summary: string;
  title: string;
  idUser: number;
  project: Project;
  attachments?: FilesObj[];
  images?: FilesObj[];
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

export interface ListProjectAction {
  count: number;
  rows: ProjectAction[];
}

export interface ProjectActions extends ProjectAction, ListProjectAction { }

export interface ProjectActionsState {
  readonly data: ProjectActions;
  readonly paginator: number[];
  readonly dataId: ProjectAction;
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
