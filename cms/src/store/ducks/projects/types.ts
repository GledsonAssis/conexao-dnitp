export enum ProjectsTypes {
  LOAD_REQUEST_FETCH_ID = '@projects/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@projects/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@projects/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_LIST = '@projects/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@projects/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@projects/list/LOAD_FAILURE',
  LOAD_REQUEST_PUBLISH = '@projects/publish/LOAD_REQUEST',
  LOAD_SUCCESS_PUBLISH = '@projects/publish/LOAD_SUCCESS',
  LOAD_FAILURE_PUBLISH = '@projects/publish/LOAD_FAILURE',
  LOAD_REQUEST_GET_LIST_CSV = '@projects/listCsv/LOAD_REQUEST',
  LOAD_SUCCESS_GET_LIST_CSV = '@projects/listCsv/LOAD_SUCCESS',
  LOAD_FAILURE_GET_LIST_CSV = '@projects/listCsv/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@projects/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@projects/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@projects/submit/LOAD_FAILURE',
  LOAD_REQUEST_GET_ID_ATTACHMENTS = '@projects/getIdAttachments/LOAD_REQUEST',
  LOAD_SUCCESS_GET_ID_ATTACHMENTS = '@projects/getIdAttachments/LOAD_SUCCESS',
  LOAD_FAILURE_GET_ID_ATTACHMENTS = '@projects/getIdAttachments/LOAD_FAILURE',
}

export interface Project {
  id: number;
  date: Date;
  description: string;
  endDate?: any;
  excludedDate?: Date;
  isCover: boolean;
  isPublished: boolean;
  summary: string;
  title: string;
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

export interface ListProject {
  count: number;
  rows: Project[];
  list?: Project[];
}

export interface Projects extends Project, ListProject { }

export interface ProjectsState {
  readonly data: Projects;
  readonly paginator: number[];
  readonly dataId: Project;
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
