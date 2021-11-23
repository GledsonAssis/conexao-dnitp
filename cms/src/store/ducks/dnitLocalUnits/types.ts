export enum DnitLocalUnitsTypes {
  LOAD_REQUEST_FETCH_ID = '@dnitLocalUnits/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@dnitLocalUnits/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@dnitLocalUnits/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_DELETE_ID = '@dnitLocalUnits/delete/LOAD_REQUEST',
  LOAD_SUCCESS_DELETE_ID = '@dnitLocalUnits/delete/LOAD_SUCCESS',
  LOAD_FAILURE_DELETE_ID = '@dnitLocalUnits/delete/LOAD_FAILURE',
  LOAD_REQUEST_LIST = '@dnitLocalUnits/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@dnitLocalUnits/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@dnitLocalUnits/list/LOAD_FAILURE',
  LOAD_REQUEST_LIST_CITIES_BY_LOCAL_UNIT = '@dnitLocalUnits/listByLocalUnit/LOAD_REQUEST',
  LOAD_SUCCESS_LIST_CITIES_BY_LOCAL_UNIT = '@dnitLocalUnits/listByLocalUnit/LOAD_SUCCESS',
  LOAD_FAILURE_LIST_CITIES_BY_LOCAL_UNIT = '@dnitLocalUnits/listByLocalUnit/LOAD_FAILURE',
  LOAD_REQUEST_LIST_SUPERINTENDENCES = '@dnitLocalUnits/listSuperintendences/LOAD_REQUEST',
  LOAD_SUCCESS_LIST_SUPERINTENDENCES = '@dnitLocalUnits/listSuperintendences/LOAD_SUCCESS',
  LOAD_FAILURE_LIST_SUPERINTENDENCES = '@dnitLocalUnits/listSuperintendences/LOAD_FAILURE',
  LOAD_REQUEST_LIST_ROADS = '@dnitLocalUnits/listRoads/LOAD_REQUEST',
  LOAD_SUCCESS_LIST_ROADS = '@dnitLocalUnits/listRoads/LOAD_SUCCESS',
  LOAD_FAILURE_LIST_ROADS = '@dnitLocalUnits/listRoads/LOAD_FAILURE',
  LOAD_REQUEST_GET_LIST_CSV = '@dnitLocalUnits/listCsv/LOAD_REQUEST',
  LOAD_SUCCESS_GET_LIST_CSV = '@dnitLocalUnits/listCsv/LOAD_SUCCESS',
  LOAD_FAILURE_GET_LIST_CSV = '@dnitLocalUnits/listCsv/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@dnitLocalUnits/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@dnitLocalUnits/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@dnitLocalUnits/submit/LOAD_FAILURE',
}

export interface Superintendence {
  id: number;
  idAddress: number;
  idUFSuperintendence: number;
  identification: string;
  street: string;
  cityName: string;
  UF: string;
  phones: string;
}

export interface Superintendences {
  count: number;
  rows: Superintendence[];
}

export interface Road {
  id: number;
  name: string;
}

export interface Roads {
  count: number;
  rows: Road[];
}

export interface State {
  id: number;
  code: number;
  initials: string;
  name: string;
}

export interface City {
  id: number;
  name: string;
  state: State;
}

export interface Address {
  id: number;
  idCity: number;
  cep: string;
  complement: string;
  district: string;
  number?: number;
  street: string;
  city: City;
}

export interface Phone {
  id: number;
  DDD: string;
  number: string;
}

export interface RegionalSuperintendence {
  id: number;
  identification: string;
}

export interface DnitLocalUnit {
  id: number;
  addressId: number;
  UFId?: any;
  idRegionalSuperintendence: number;
  email?: any;
  identification: string;
  address: Address;
  phones: Phone[];
  RegionalSuperintendence: RegionalSuperintendence;
  UF?: any;
  cities: (number & City)[];
  idUFSuperintendence?: any;
  roads: Road[];
}

export interface BaseDnitLocalUnits {
  count: number;
  rows: DnitLocalUnit[];
}

export interface DnitLocalUnitRequest {
  address: Address;
  id?: number;
  identification: string;
  phones: Phone[];
  idUFSuperintendence?: number;
}

export type DnitLocalUnits = BaseDnitLocalUnits & DnitLocalUnit;

export interface DnitLocalUnitsState {
  readonly data: DnitLocalUnits;
  readonly superintendences: Superintendences;
  readonly roads: Roads;
  readonly cities: City[];
  readonly paginator: number[];
  readonly dataId: DnitLocalUnit;
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
