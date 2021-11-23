export enum SurveiesTypes {
  LOAD_REQUEST_LIST = '@surveies/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@surveies/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@surveies/list/LOAD_FAILURE',
  LOAD_REQUEST_GET_LIST_CSV = '@surveies/listCsv/LOAD_REQUEST',
  LOAD_SUCCESS_GET_LIST_CSV = '@surveies/listCsv/LOAD_SUCCESS',
  LOAD_FAILURE_GET_LIST_CSV = '@surveies/listCsv/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID = '@surveies/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@surveies/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@surveies/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@surveies/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@surveies/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@surveies/submit/LOAD_FAILURE',
}

export interface Alternative {
  id: number;
  idQuestion: number;
  option: string;
  is_justify: boolean;
  QuestionId: number;
  userId: number;
}

export interface Question {
  id: number;
  idSection: number;
  type: number;
  question: string;
  required: boolean;
  SectionId: number;
  typesId: number;
  userId: number;
  alternatives: Alternative[];
}

export interface Section {
  id: number;
  idSurvey: number;
  title: string;
  description: string;
  active: boolean;
  SurveyId: number;
  questions: Question[];
}

export interface Survey {
  id: number;
  version: number;
  title: string;
  description: string;
  active: boolean;
  date: Date;
  sections: Section[];
}

export interface BaseSurveies {
  count: number;
  rows: Survey[];
}

export type Surveies = BaseSurveies & Survey;

export interface SurveiesState {
  readonly data: Surveies;
  readonly dataId: Survey;
  readonly paginator: number[];
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
