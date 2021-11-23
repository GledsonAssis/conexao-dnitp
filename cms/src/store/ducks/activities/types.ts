export enum ActivitiesTypes {
  LOAD_REQUEST_SEARCH_ACTIVITES = '@activities/search/LOAD_REQUEST',
  LOAD_SUCCESS_SEARCH_ACTIVITES = '@activities/search/LOAD_SUCCESS',
  LOAD_FAILURE_SEARCH_ACTIVITES = '@activities/search/LOAD_FAILURE',
  LOAD_REQUEST_SEARCH_ACTIVITY_ACTIVITES = '@activities/searchActivity/LOAD_REQUEST',
  LOAD_SUCCESS_SEARCH_ACTIVITY_ACTIVITES = '@activities/searchActivity/LOAD_SUCCESS',
  LOAD_FAILURE_SEARCH_ACTIVITY_ACTIVITES = '@activities/searchActivity/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID = '@activities/fetch_id/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@activities/fetch_id/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@activities/fetch_id/LOAD_FAILURE',
  LOAD_REQUEST_GET_ATTACHMENT = '@activities/get_attachment/LOAD_REQUEST',
  LOAD_SUCCESS_GET_ATTACHMENT = '@activities/get_attachment/LOAD_SUCCESS',
  LOAD_FAILURE_GET_ATTACHMENT = '@activities/get_attachment/LOAD_FAILURE',
  LOAD_REQUEST_PUBLISH = '@activities/publish/LOAD_REQUEST',
  LOAD_SUCCESS_PUBLISH = '@activities/publish/LOAD_SUCCESS',
  LOAD_FAILURE_PUBLISH = '@activities/publish/LOAD_FAILURE',
  LOAD_REQUEST_GET_LIST_CSV = '@activities/listCsv/LOAD_REQUEST',
  LOAD_SUCCESS_GET_LIST_CSV = '@activities/listCsv/LOAD_SUCCESS',
  LOAD_FAILURE_GET_LIST_CSV = '@activities/listCsv/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@activities/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@activities/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@activities/submit/LOAD_FAILURE',
  SORT_FILTER = '@activities/sort/SORT_FILTER',
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

export interface SchoolYear {
  id: number;
  ordinal: number;
  subTheme: SubTheme;
}

export interface TrafficConcept {
  id: number;
  description: string;
  schoolYear: SchoolYear;
}

export interface KnowledgeArea {
  description: string;
}

export interface Discipline {
  id: number;
  name: string;
  knowledgeArea: KnowledgeArea;
}

export interface BaseActivities {
  count: number;
  rows: Activity[];
}

export interface TrafficScope {
  id: number;
  description: string;
}

export interface UserInstituition {
  id: number;
  idUser: number;
  idInstituition: number;
  idInstituicaoEnsino: number;
  idUsuario: number;
}

export interface Instituition {
  id: number;
  name: string;
  UserInstituition: UserInstituition;
}

export interface Author {
  id: number;
  name: string;
  instituitions: Instituition[];
}

export interface Initiative {
  id: number;
  title: string;
  author: Author;
}

export interface TrafficContent {
  id: number;
  description: string;
}

export interface Skill {
  id: number;
  description: string;
  idTransitCompetence: number;
}

export interface KnowledgeArea {
  id: number;
  description: string;
}

export interface Discipline {
  id: number;
  name: string;
  color: string;
  knowledgeArea: KnowledgeArea;
}

export interface KnowledgeObject {
  id: number;
  description: string;
}

export interface Mime {
  media: string;
  suffix: string;
}

export interface File {
  id: number;
  name: string;
  mime: Mime;
  default: boolean;
  uri?: string
}

export interface Attachment {
  id: number;
  name: string;
  files: File[];
}

export interface Activity {
  id: number;
  idInitiative: number;
  code: string;
  date: Date;
  duration: string;
  evaluation: string;
  otherConnections: string;
  reference: string;
  resource: string;
  teachingArticulation: string;
  teachingGuide: string;
  title: string;
  excludedDate?: any;
  trafficScope: TrafficScope[];
  trafficConcept: TrafficConcept;
  initiative: Initiative;
  trafficContent: TrafficContent[];
  skills: Skill[];
  discipline: Discipline;
  knowledgeObject: KnowledgeObject[];
  attachments: Attachment[];
  userEvaluation?: any;
  isPublished: boolean;
}

export interface ActivityRequest {
  id: number;
  code: string;
  duration: string;
  evaluation: string;
  otherConnections: string;
  reference: string;
  resource: string;
  teachingArticulation: string;
  teachingGuide: string;
  title: string;
  theme: string;
  subTheme: string;
  schoolYear: number;
  knowledgeArea: number;
  idConcept: number;
  trafficContent: number[];
  idDiscipline: number;
  knowledgeObject: number[];
  isPublished: boolean;
  idInitiative: number;
  trafficScope: number[];
  skills: number[];
}

export type Highlights = BaseActivities & Activity & Activity[];

export interface ActivitiesState {
  readonly data: BaseActivities & Activity[];
  readonly dataId: Activity;
  readonly paginator: number[];
  readonly loading: boolean;
  readonly searched: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}