export enum StatesTypes {
  LOAD_REQUEST_LIST = '@States/statesList/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@States/statesList/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@States/statesList/LOAD_FAILURE',
  LOAD_REQUEST_CITIES = '@States/citiesList/LOAD_REQUEST',
  LOAD_SUCCESS_CITIES = '@States/citiesList/LOAD_SUCCESS',
  LOAD_FAILURE_CITIES = '@States/citiesList/LOAD_FAILURE',
  LOAD_REQUEST_INSTITUITIONS = '@States/institutionsList/LOAD_REQUEST',
  LOAD_SUCCESS_INSTITUITIONS = '@States/institutionsList/LOAD_SUCCESS',
  LOAD_FAILURE_INSTITUITIONS = '@States/institutionsList/LOAD_FAILURE',
  LOAD_REQUEST_FIELDKNOWLEDGES = '@States/fieldKnowledges/LOAD_REQUEST',
  LOAD_SUCCESS_FIELDKNOWLEDGES = '@States/fieldKnowledges/LOAD_SUCCESS',
  LOAD_FAILURE_FIELDKNOWLEDGES = '@States/fieldKnowledges/LOAD_FAILURE',
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

export interface FieldKnowledge {
  id: number,
  description: string
}

export interface Institutions extends idName {
  address: Address,
  dnitUnit: DntiUnit,
  phones: Phones[],
  dnitUnitCity: any
}

export interface Cities {
  ibgeCode: number
  id: number
  idState: number
  name: string
}

export interface States {
  id: number;
  initials: string;
  name: string;
}

export interface StatesState {
  readonly data: States[];
  readonly cities: Cities[];
  readonly paginator: number[];
  readonly institutions: Institutions[];
  readonly fieldKnowledges: FieldKnowledge[];
  readonly loading: boolean;
  readonly error: boolean;
}
