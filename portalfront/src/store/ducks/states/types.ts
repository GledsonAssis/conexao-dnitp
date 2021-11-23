export enum StatesTypes {
  LOAD_REQUEST_LIST = '@states/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@states/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@states/list/LOAD_FAILURE',
  LOAD_REQUEST_CITIES = '@cities/list/LOAD_REQUEST',
  LOAD_SUCCESS_CITIES = '@cities/list/LOAD_SUCCESS',
  LOAD_FAILURE_CITIES = '@cities/list/LOAD_FAILURE',
  LOAD_REQUEST_INSTITUITIONS = '@institutions/list/LOAD_REQUEST',
  LOAD_SUCCESS_INSTITUITIONS = '@institutions/list/LOAD_SUCCESS',
  LOAD_FAILURE_INSTITUITIONS = '@institutions/list/LOAD_FAILURE',
}

export interface idName {
  id: number;
  name: string;
}

interface Address {
  id: number,
  idCity: number,
  cep: string,
  street: string,
  city: idName
}

interface DntiUnit {
  id: number,
  identification: string
}

interface Phones {
  DDD: string,
  number: string
}

export interface Institutions extends idName {
  address: Address,
  dnitUnit: DntiUnit,
  phones: Phones[],
  dnitUnitCity: any
}

export interface BaseCities {
  ibgeCode: number
  id: number
  idState: number
  name: string
}

export interface BaseStates {
  id: number;
  initials: string;
  name: string;
}

export type Cities = BaseCities;
export type States = BaseStates;

export interface StatesState {
  readonly data: States[];
  readonly cities: Cities[];
  readonly paginator: number[];
  readonly institutions: Institutions[];
  readonly loading: boolean;
  readonly error: boolean;
}
