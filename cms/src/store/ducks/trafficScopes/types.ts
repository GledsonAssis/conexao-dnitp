export enum TrafficScopesTypes {
  LOAD_REQUEST_FETCH_ID = '@trafficScopes/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@trafficScopes/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@trafficScopes/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_LIST = '@trafficScopes/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@trafficScopes/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@trafficScopes/list/LOAD_FAILURE',
  LOAD_REQUEST_DELETE_ID = '@trafficScopes/delete/LOAD_REQUEST',
  LOAD_SUCCESS_DELETE_ID = '@trafficScopes/delete/LOAD_SUCCESS',
  LOAD_FAILURE_DELETE_ID = '@trafficScopes/delete/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@trafficScopes/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@trafficScopes/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@trafficScopes/submit/LOAD_FAILURE',
  SORT_FILTER = '@trafficScopes/sort/SORT_FILTER',
}

export interface Skill {
  id: number;
  description: string;
}

export interface TrafficScope {
  id: number;
  description: string;
  idTrafficContent: number;
  skills: Skill[];
}

export interface BaseTrafficScopes {
  count: number;
  rows: TrafficScope[];
}

export type TrafficScopes = BaseTrafficScopes;

export interface TrafficScopesState {
  readonly data: TrafficScopes;
  readonly paginator: number[];
  readonly dataId: TrafficScope;
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
