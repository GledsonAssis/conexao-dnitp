export enum RegionalSuperintendencesTypes {
  LOAD_REQUEST_FETCH_ID = '@baseRegionalSuperintendences/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@baseRegionalSuperintendences/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@baseRegionalSuperintendences/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_DELETE_ID = '@baseRegionalSuperintendences/delete/LOAD_REQUEST',
  LOAD_SUCCESS_DELETE_ID = '@baseRegionalSuperintendences/delete/LOAD_SUCCESS',
  LOAD_FAILURE_DELETE_ID = '@baseRegionalSuperintendences/delete/LOAD_FAILURE',
  LOAD_REQUEST_LIST = '@baseRegionalSuperintendences/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@baseRegionalSuperintendences/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@baseRegionalSuperintendences/list/LOAD_FAILURE',
  LOAD_REQUEST_GET_LIST_CSV = '@baseRegionalSuperintendences/listCsv/LOAD_REQUEST',
  LOAD_SUCCESS_GET_LIST_CSV = '@baseRegionalSuperintendences/listCsv/LOAD_SUCCESS',
  LOAD_FAILURE_GET_LIST_CSV = '@baseRegionalSuperintendences/listCsv/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@baseRegionalSuperintendences/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@baseRegionalSuperintendences/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@baseRegionalSuperintendences/submit/LOAD_FAILURE',
}

export interface State {
  id: number;
  code: number;
  initials: string;
  name: string;
}

export interface City {
  name: string;
  state: State;
}

export interface Address {
  id: number;
  idCity: number;
  cep: string;
  complement?: string;
  district: string;
  number?: number;
  street: string;
  city: City;
  idState?: number;
  citySelected?: number;
}

export interface Phone {
  id?: number;
  DDD: string;
  number: string;
}

export interface UF {
  code: number;
  initials: string;
  name: string;
}

export interface RegionalSuperintendence {
  id: number;
  addressId: number;
  UFId: number;
  idRegionalSuperintendence?: any;
  email?: any;
  identification: string;
  address: Address;
  phones: Phone[];
  RegionalSuperintendence?: any;
  UF: UF;
  cities: any[];
}

export interface BaseRegionalSuperintendences {
  count: number;
  rows: RegionalSuperintendence[];
}

export interface RegionalSuperintendenceRequest {
  address: Address;
  id?: number;
  identification: string;
  phones: Phone[];
  idUFSuperintendence?: number;
}

export type RegionalSuperintendences = BaseRegionalSuperintendences & RegionalSuperintendence;

export interface RegionalSuperintendencesState {
  readonly data: RegionalSuperintendences;
  readonly paginator: number[];
  readonly dataId: RegionalSuperintendence;
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
