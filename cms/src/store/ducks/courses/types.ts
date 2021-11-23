export enum CoursesTypes {
  LOAD_REQUEST_FETCH_ID = '@courses/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@courses/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@courses/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_LIST = '@courses/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@courses/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@courses/list/LOAD_FAILURE',
  LOAD_REQUEST_PUBLISH = '@courses/publish/LOAD_REQUEST',
  LOAD_SUCCESS_PUBLISH = '@courses/publish/LOAD_SUCCESS',
  LOAD_FAILURE_PUBLISH = '@courses/publish/LOAD_FAILURE',
  LOAD_REQUEST_GET_LIST_CSV = '@courses/listCsv/LOAD_REQUEST',
  LOAD_SUCCESS_GET_LIST_CSV = '@courses/listCsv/LOAD_SUCCESS',
  LOAD_FAILURE_GET_LIST_CSV = '@courses/listCsv/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@courses/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@courses/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@courses/submit/LOAD_FAILURE',
  LOAD_REQUEST_GET_ID_ATTACHMENTS = '@courses/getIdAttachments/LOAD_REQUEST',
  LOAD_SUCCESS_GET_ID_ATTACHMENTS = '@courses/getIdAttachments/LOAD_SUCCESS',
  LOAD_FAILURE_GET_ID_ATTACHMENTS = '@courses/getIdAttachments/LOAD_FAILURE',
}

export interface Course {
  date: Date;
  description: string;
  endDate: Date;
  excludedDate?: Date;
  id: number;
  isCover: boolean;
  isPublished: boolean;
  link: string;
  summary: string;
  title: string;
  type: number;
  modifyDate: Date;
  idUser?: number;
  isHighlight?: boolean;
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

export interface ListCourse {
  count: number;
  rows: Course[];
}

export interface Courses extends Course, ListCourse { }

export interface CoursesState {
  readonly data: Courses;
  readonly paginator: number[];
  readonly dataId: Course;
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
