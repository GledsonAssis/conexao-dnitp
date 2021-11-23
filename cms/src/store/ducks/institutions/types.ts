export enum InstitutionsTypes {
  LOAD_REQUEST_FETCH_ID = '@institutions/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@institutions/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@institutions/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_DELETE_ID = '@institutions/delete/LOAD_REQUEST',
  LOAD_SUCCESS_DELETE_ID = '@institutions/delete/LOAD_SUCCESS',
  LOAD_FAILURE_DELETE_ID = '@institutions/delete/LOAD_FAILURE',
  LOAD_REQUEST_LIST = '@institutions/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@institutions/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@institutions/list/LOAD_FAILURE',
  LOAD_REQUEST_GET_LIST_CSV = '@institutions/listCsv/LOAD_REQUEST',
  LOAD_SUCCESS_GET_LIST_CSV = '@institutions/listCsv/LOAD_SUCCESS',
  LOAD_FAILURE_GET_LIST_CSV = '@institutions/listCsv/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@institutions/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@institutions/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@institutions/submit/LOAD_FAILURE',
}

export interface State {
  id: number;
  initials: string;
  code: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  state: State;
}

export interface Address {
  idCity: number;
  id: number;
  cep: string;
  complement?: string;
  district: string;
  number?: number;
  street: string;
  city: City;
}

export interface RegionalSuperintendence {
  id: number;
  identificacao: string;
}

export interface DnitUnit {
  id: number;
  identificacao: string;
  RegionalSuperintendence: RegionalSuperintendence;
}

export interface Phone {
  id: number;
  DDD: string;
  number: string;
}

export interface StudentsPerCycle {
  idEducationalInstitution?: number;
  idSchoolYear: number;
  amountStudents: number;
}

export interface DnitUnitCity {
  id: number;
  name: string;
}

export interface Institution {
  id: number;
  idInep: number;
  idTeachingNetwork: number;
  dnitUnitId: number;
  name: string;
  participaConexaoDnit: boolean;
  quantidadeAlunos: number;
  quantidadeProfessores: number;
  address: Address;
  dnitUnit: DnitUnit;
  phones: Phone[];
  isDF: boolean;
  joinProgram: boolean;
  latitude: number;
  longitude: number;
  dnitUnitCity: DnitUnitCity;
  studentsPerCycle: StudentsPerCycle[];
}

export interface BaseInstitutions {
  count: number;
  rows: Institution[];
}

export type Institutions = BaseInstitutions & Institution;

export interface InstitutionsState {
  readonly data: Institutions;
  readonly paginator: number[];
  readonly dataId: Institution;
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
