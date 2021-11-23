export enum TrafficContentsTypes {
  LOAD_REQUEST_FETCH_ID = '@trafficContents/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@trafficContents/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@trafficContents/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_LIST = '@trafficContents/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@trafficContents/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@trafficContents/list/LOAD_FAILURE',
  LOAD_REQUEST_DELETE_ID = '@trafficContents/delete/LOAD_REQUEST',
  LOAD_SUCCESS_DELETE_ID = '@trafficContents/delete/LOAD_SUCCESS',
  LOAD_FAILURE_DELETE_ID = '@trafficContents/delete/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@trafficContents/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@trafficContents/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@trafficContents/submit/LOAD_FAILURE',
  SORT_FILTER = '@trafficContents/sort/SORT_FILTER',
  LOAD_REQUEST_GET_LIST_CSV = '@trafficContents/listCsv/LOAD_REQUEST',
  LOAD_SUCCESS_GET_LIST_CSV = '@trafficContents/listCsv/LOAD_SUCCESS',
  LOAD_FAILURE_GET_LIST_CSV = '@trafficContents/listCsv/LOAD_FAILURE',
}

export interface TrafficConcept {
  id: number;
  description: string;
  idSchoolYear: number;
}

export interface Skill {
  id?: number;
  description: string;
}

export interface TrafficScope {
  id?: number;
  description: string;
  skills: Skill[];
}

export interface TrafficContent {
  id: number;
  description: string;
  trafficConceptId: number;
  trafficConcept: TrafficConcept;
  trafficScope: TrafficScope[];
}

export interface TrafficContentRequest {
  idSchoolYear: number;
  idTransitConcept: number;
  description: string;
  trafficScope: TrafficScope[];
}

export interface BaseTrafficContents {
  count: number;
  rows: TrafficContent[];
}

export type TrafficContents = BaseTrafficContents;

export interface TrafficContentsState {
  readonly data: TrafficContents;
  readonly paginator: number[];
  readonly dataId: TrafficContent;
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
