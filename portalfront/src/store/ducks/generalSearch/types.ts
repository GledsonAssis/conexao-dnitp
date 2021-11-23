export enum GeneralSearchTypes {
  LOAD_REQUEST_LIST = '@GENERALSEARCH/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@GENERALSEARCH/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@GENERALSEARCH/list/LOAD_FAILURE',
}

export interface BaseGeneralSearch {
  description: string;
  id: number;
  idProject: number;
  title: string;
  type: string;
  date: Date;
}

export type GeneralSearch = BaseGeneralSearch;

export interface GeneralSearchState {
  readonly data: GeneralSearch[];
  readonly paginator: number[];
  readonly loading: boolean;
  readonly error: boolean;
}
