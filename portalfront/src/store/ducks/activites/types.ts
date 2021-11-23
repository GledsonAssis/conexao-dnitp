import { Discipline, knowledgeObject, SchoolYear } from '../subjects/types';
import { Skills, trafficConcept, trafficContent, trafficScope } from '../trafficContents/types';

export enum ActivitesTypes {
  LOAD_REQUEST_SEARCH_ACTIVITES = '@activites/search/LOAD_REQUEST',
  LOAD_SUCCESS_SEARCH_ACTIVITES = '@activites/search/LOAD_SUCCESS',
  LOAD_FAILURE_SEARCH_ACTIVITES = '@activites/search/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID = '@activites/fetch_id/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@activites/fetch_id/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@activites/fetch_id/LOAD_FAILURE',
  LOAD_REQUEST_GET_ATTACHMENT = '@activites/get_attachment/LOAD_REQUEST',
  LOAD_SUCCESS_GET_ATTACHMENT = '@activites/get_attachment/LOAD_SUCCESS',
  LOAD_FAILURE_GET_ATTACHMENT = '@activites/get_attachment/LOAD_FAILURE',
  SEARCH_REDIRECT_PROPS = '@activites/search_redirect_props/SEARCH_REDIRECT_PROPS',
  SET_DATA_PROPS = '@activites/set_data_props/SET_DATA_PROPS',
  CLEAR_DATA_PROPS = '@activites/clear_data_props/CLEAR_DATA_PROPS',
  SORT_FILTER = '@activites/sort/SORT_FILTER',
  LOAD_REQUEST_FETCH_SURVEY = '@activites/fetch_survey/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_SURVEY = '@activites/fetch_survey/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_SURVEY = '@activites/fetch_survey/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT_SURVEY = '@activites/submit_survey/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT_SURVEY = '@activites/submit_survey/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT_SURVEY = '@activites/submit_survey/LOAD_FAILURE',
}

export enum typeQuestion {
  TEXT = 1,
  ONE_CHOICE = 2,
  MULTI_CHOICE = 3
}

export interface SearchActivites {
  id: number;
  discipline: Discipline;
  schoolYear: SchoolYear;
  title: string;
}

interface filesItens {
  id: number;
  name: string;
  mine: any;
}

export interface attachmentsItens {
  id: number;
  name: string;
  files: filesItens[];
}

export interface Activites {
  id: number;
  idInitiative: number;
  code: string;
  date: string;
  duration: string;
  evaluation: number;
  otherConnections: number;
  reference: number;
  resource: string;
  teachingArticulation: string;
  teachingGuide: string;
  title: string;
  excludedDate: number;
  trafficScope: trafficScope[];
  trafficConcept: trafficConcept;
  initiative: number;
  trafficContent: trafficContent[];
  skills: Skills[];
  discipline: Discipline;
  knowledgeObject: knowledgeObject[];
  attachments: attachmentsItens[];
  userEvaluation: number;
}

export interface Alternative {
  id: number;
  idQuestion: number;
  option: string;
  is_justify: boolean;
  QuestionId: number;
  justify?: string;
  selected?: boolean;
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

export interface Answer {
  id: number;
  version: number;
  title: string;
  description: string;
  active: boolean;
  date: Date;
  sections: Section[];
}

export interface Survey {
  idActivity: string;
  idUser: number;
  answered: boolean;
  answer: Answer;
}

export interface ActivitesState {
  readonly data: SearchActivites[];
  readonly fetchId: Activites;
  readonly fetchSurvey: Survey;
  readonly paginator: number[];
  readonly dataProps: any;
  readonly loading: boolean;
  readonly searched: boolean;
  readonly error: boolean;
}
