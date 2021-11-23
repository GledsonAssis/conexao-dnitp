export enum ExternalLinksTypes {
  LOAD_REQUEST_FETCH_ID = '@externalLinks/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@externalLinks/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@externalLinks/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_LIST = '@externalLinks/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@externalLinks/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@externalLinks/list/LOAD_FAILURE',
  LOAD_REQUEST_PUBLISH = '@externalLinks/publish/LOAD_REQUEST',
  LOAD_SUCCESS_PUBLISH = '@externalLinks/publish/LOAD_SUCCESS',
  LOAD_FAILURE_PUBLISH = '@externalLinks/publish/LOAD_FAILURE',
  LOAD_REQUEST_GET_LIST_CSV = '@externalLinks/listCsv/LOAD_REQUEST',
  LOAD_SUCCESS_GET_LIST_CSV = '@externalLinks/listCsv/LOAD_SUCCESS',
  LOAD_FAILURE_GET_LIST_CSV = '@externalLinks/listCsv/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@externalLinks/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@externalLinks/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@externalLinks/submit/LOAD_FAILURE',
}

export interface Course {
  id: number;
  description: string;
  summary: string;
  title: string;
  link: string;
  excludedDate?: Date;
  isPublished: boolean;
}

export interface ListCourse {
  count: number;
  rows: Course[];
}

export interface ExternalLinks extends Course, ListCourse { }

export interface ExternalLinksState {
  readonly data: ExternalLinks;
  readonly paginator: number[];
  readonly dataId: Course;
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
