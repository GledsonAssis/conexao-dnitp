export enum SchoolYearsTypes {
  LOAD_REQUEST_LIST = '@schoolYears/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@schoolYears/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@schoolYears/list/LOAD_FAILURE',
  LOAD_REQUEST_SCHOOLBONDS = '@schoolbonds/list/LOAD_REQUEST',
  LOAD_SUCCESS_SCHOOLBONDS = '@schoolbonds/list/LOAD_SUCCESS',
  LOAD_FAILURE_SCHOOLBONDS = '@schoolbonds/list/LOAD_FAILURE',
}

export interface idName {
  id: number;
  name: string;
}

export interface BaseSchoolYears {
  color: string;
  id: number;
  idSubTheme: number;
  ordinal: number;
  startYear: boolean;
  subTheme: idName;
}

export type SchoolYears = BaseSchoolYears;

export interface SchoolYearsState {
  readonly data: SchoolYears[];
  readonly paginator: number[];
  readonly schoolbonds: idName[];
  readonly loading: boolean;
  readonly error: boolean;
}
