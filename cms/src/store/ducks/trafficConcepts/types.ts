export enum TrafficConceptsTypes {
  LOAD_REQUEST_FETCH_ID = '@trafficConcepts/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@trafficConcepts/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@trafficConcepts/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_LIST = '@trafficConcepts/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@trafficConcepts/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@trafficConcepts/list/LOAD_FAILURE',
  LOAD_REQUEST_DELETE_ID = '@trafficConcepts/delete/LOAD_REQUEST',
  LOAD_SUCCESS_DELETE_ID = '@trafficConcepts/delete/LOAD_SUCCESS',
  LOAD_FAILURE_DELETE_ID = '@trafficConcepts/delete/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@trafficConcepts/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@trafficConcepts/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@trafficConcepts/submit/LOAD_FAILURE',
  SORT_FILTER = '@trafficConcepts/sort/SORT_FILTER',
  LOAD_REQUEST_GET_LIST_CSV = '@trafficConcepts/listCsv/LOAD_REQUEST',
  LOAD_SUCCESS_GET_LIST_CSV = '@trafficConcepts/listCsv/LOAD_SUCCESS',
  LOAD_FAILURE_GET_LIST_CSV = '@trafficConcepts/listCsv/LOAD_FAILURE',
}

export interface Theme {
  id: number;
  name: string;
}

export interface SubTheme {
  id: number;
  name: string;
  theme: Theme;
}

export interface SchoolYear {
  ordinal: number;
  subTheme: SubTheme;
}

export interface TrafficConcept {
  id: number;
  description: string;
  idSchoolYear: number;
  schoolYear: SchoolYear;
}

export interface BaseTrafficConcepts {
  count: number;
  rows: TrafficConcept[];
}

export type TrafficConcepts = BaseTrafficConcepts;

export interface TrafficConceptsState {
  readonly data: TrafficConcepts;
  readonly paginator: number[];
  readonly dataId: TrafficConcept;
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
