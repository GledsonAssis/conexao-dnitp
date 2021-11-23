export enum UsersTypes {
  LOAD_REQUEST_FETCH = '@users/fetch/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH = '@users/fetch/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH = '@users/fetch/LOAD_FAILURE',
  LOAD_REQUEST_LIST = '@users/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@users/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@users/list/LOAD_FAILURE',
  LOAD_REQUEST_GET_LIST_CSV = '@users/listCsv/LOAD_REQUEST',
  LOAD_SUCCESS_GET_LIST_CSV = '@users/listCsv/LOAD_SUCCESS',
  LOAD_FAILURE_GET_LIST_CSV = '@users/listCsv/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@users/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@users/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@users/submit/LOAD_FAILURE',
  LOAD_REQUEST_ACTIVE = '@users/active/LOAD_REQUEST',
  LOAD_SUCCESS_ACTIVE = '@users/active/LOAD_SUCCESS',
  LOAD_FAILURE_ACTIVE = '@users/active/LOAD_FAILURE',
  LOAD_REQUEST_ROLES = '@users/roles/LOAD_REQUEST',
  LOAD_SUCCESS_ROLES = '@users/roles/LOAD_SUCCESS',
  LOAD_FAILURE_ROLES = '@users/roles/LOAD_FAILURE',
  LOAD_REQUEST_RELEASEACCESS = '@users/releaseAccess/LOAD_REQUEST',
  LOAD_RESPONSE_RELEASEACCESS = '@users/releaseAccess/LOAD_RESPONSE',
}

export interface State {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  state: State;
}

export interface RegionalSuperintendence {
  id: number;
  identification: string;
}

export interface DnitUnit {
  id: number;
  identification: string;
  RegionalSuperintendence: RegionalSuperintendence;
}

export interface Role {
  id: number;
  name: string;
}

export interface SchoolBonds {
  id: number;
  name: string;
}

export interface Phone {
  id: number;
  idPhoneType: number;
  DDD: string;
  number: number;
}

export interface Instituition {
  id: number;
  name: string;
}

export interface Roles {
  id: number;
  name: string;
}

export interface EducationalInstitution {
  id?: any;
  name?: string;
}

export interface User {
  id: number;
  addressId?: any;
  cpf: string;
  email: string;
  name: string;
  DnitUnitId?: number;
  schoolBondsId?: number;
  roleId: number;
  ativo: boolean;
  registerDate: Date;
  city: City;
  DnitUnit: DnitUnit;
  role: Role;
  schoolBonds: SchoolBonds;
  phones: Phone[];
  instituitions: Instituition[];
  educationalInstitution: EducationalInstitution;
  birthDate: string;
  idCity: number;
  idRole: number;
  idDnitUnit?: any;
  active: boolean;
  attachment: any[];
}

export interface BaseUsers {
  count: number;
  rows: User[];
}

export type Users = BaseUsers & User;

export interface UsersState {
  readonly data: Users;
  readonly roles: Roles[];
  readonly paginator: number[];
  readonly releaseAccess: number;
  readonly dataId: User;
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
