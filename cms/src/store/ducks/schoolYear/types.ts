export enum SchoolYearsTypes {
  LOAD_REQUEST_LIST = '@schoolYears/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@schoolYears/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@schoolYears/list/LOAD_FAILURE',
  LOAD_REQUEST_SCHOOLBONDS = '@schoolbonds/list/LOAD_REQUEST',
  LOAD_SUCCESS_SCHOOLBONDS = '@schoolbonds/list/LOAD_SUCCESS',
  LOAD_FAILURE_SCHOOLBONDS = '@schoolbonds/list/LOAD_FAILURE',
}

export interface Theme {
  id: number;
  name: string;
}

export interface SubTheme {
  id: number;
  name: string;
  theme: Theme;
}

export interface BaseSchoolYears {
  id: number;
  idSubTheme: number;
  color: string;
  ordinal: number;
  startYear: boolean;
  subTheme: SubTheme;
}

export type SchoolYears = BaseSchoolYears;

export interface SchoolYearsState {
  readonly data: SchoolYears[];
  readonly paginator: number[];
  readonly schoolbonds: SubTheme[];
  readonly loading: boolean;
  readonly error: boolean;
}
