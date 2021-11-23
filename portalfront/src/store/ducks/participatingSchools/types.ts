export enum ParticipatingSchoolsTypes {
  LOAD_REQUEST_LIST = '@participating-schools/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@participating-schools/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@participating-schools/list/LOAD_FAILURE',
}

export interface ListParticipatingSchools {
  count: number;
  rows: BaseParticipatingSchools[];
}

export interface BaseParticipatingSchools {
  id: number;
  idInep: number;
  idTeachingNetwork: number;
  dnitUnitId: number;
  name: string;
  participaConexaoDnit: boolean;
  quantidadeAlunos: number;
  quantidadeProfessores: number;
  address: Address;
  dnitUnit: Dnitunit;
  phones: Phones[];
}

interface Address {
  id: number;
  cep: string;
  street: string;
  city: City;
}

interface City {
  id: number;
  name: string;
  state: State;
}

interface State {
  id: number;
  initials: string;
}

interface Dnitunit {
  id: number;
  identificacao: string;
  RegionalSuperintendence: RegionalSuperintendence;
}

interface RegionalSuperintendence {
  id: number;
  identificacao: string;
}

interface Phones {
  id: number;
  DDD: string;
  number: string;
}

export interface ParticipatingSchools extends BaseParticipatingSchools, ListParticipatingSchools {}

export interface ParticipatingSchoolsState {
  readonly data: ListParticipatingSchools;
  readonly paginator: number[];
  readonly loading: boolean;
  readonly error: boolean;
}
