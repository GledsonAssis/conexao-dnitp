export enum DisciplinesTypes {
  LOAD_REQUEST_LIST = '@disciplines/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@disciplines/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@disciplines/list/LOAD_FAILURE',
}

export interface BaseDisciplines {
  color: string;
  corHexa: string;
  id: number;
  idKnoledgeArea: number;
  name: string;
}

export type Disciplines = BaseDisciplines;

export interface DisciplinesState {
  readonly data: Disciplines[];
  readonly paginator: number[];
  readonly loading: boolean;
  readonly error: boolean;
}
