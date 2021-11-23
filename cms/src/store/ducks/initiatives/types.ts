export enum InitiativesTypes {
  LOAD_REQUEST_LIST_BY_STATUS = '@initiatives/initiativesByStatus/LOAD_REQUEST',
  LOAD_SUCCESS_LIST_BY_STATUS = '@initiatives/initiativesByStatus/LOAD_SUCCESS',
  LOAD_FAILURE_LIST_BY_STATUS = '@initiatives/initiativesByStatus/LOAD_FAILURE',
  LOAD_REQUEST_LIST_STATUS = '@initiatives/initiativesStatus/LOAD_REQUEST',
  LOAD_SUCCESS_LIST_STATUS = '@initiatives/initiativesStatus/LOAD_SUCCESS',
  LOAD_FAILURE_LIST_STATUS = '@initiatives/initiativesStatus/LOAD_FAILURE',
  LOAD_REQUEST_FETCH = '@initiatives/fetch/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH = '@initiatives/fetch/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH = '@initiatives/fetch/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@initiatives/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@initiatives/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@initiatives/submit/LOAD_FAILURE',
  LOAD_REQUEST_SUBMITATTACHMENT = '@initiatives/submitAttachment/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMITATTACHMENT = '@initiatives/submitAttachment/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMITATTACHMENT = '@initiatives/submitAttachment/LOAD_FAILURE',
  LOAD_REQUEST_GET_ATTACHMENT = '@initiatives/getAttachment/LOAD_REQUEST',
  LOAD_SUCCESS_GET_ATTACHMENT = '@initiatives/getAttachment/LOAD_SUCCESS',
  LOAD_FAILURE_GET_ATTACHMENT = '@initiatives/getAttachment/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID = '@initiatives/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@initiatives/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@initiatives/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_GET_LIST_CSV = '@initiatives/listCsv/LOAD_REQUEST',
  LOAD_SUCCESS_GET_LIST_CSV = '@initiatives/listCsv/LOAD_SUCCESS',
  LOAD_FAILURE_GET_LIST_CSV = '@initiatives/listCsv/LOAD_FAILURE',
  SORT_FILTER = '@initiatives/sort/SORT_FILTER',
}

export interface Status {
  id: number;
  name: string;
}

export interface State {
  id: number;
  initials: string;
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

export interface Instituition {
  id: number;
  dnitUnitId: number;
  name: string;
  dnitUnit: DnitUnit;
}

export interface Author {
  id: number;
  name: string;
  idDnitUnit?: number;
  city: City;
  DnitUnit: DnitUnit;
  instituitions: Instituition[];
  attachment: Attachment[];
}

export interface Stage {
  id: number;
  name: string;
}

export interface Evaluator {
  id: number,
  name: string,
  attachment: Attachment[]
}
export interface Evaluation {
  id: number,
  rejected: boolean,
  accepted: boolean,
  evaluator: Evaluator
}

export interface Initiative {
  id: number;
  idUser: number;
  authorId: number;
  comment?: any;
  date: Date;
  description: string;
  title: string;
  author: Author;
  evaluation?: Evaluation;
  status: Status;
  stage: Stage;
  idStatus: number;
  idInitiativeStageStatus: number;
  statusId: number;
  stageId: number;
  evaluation_history: EvaluationHistory[];
  attachments: Attachment[];
  audio?: any;
}

export interface EvaluationHistory {
  id: number;
  text: string;
  date: Date;
}

export interface Mime {
  media: string;
  suffix: string;
}

export interface Attachment {
  id: number;
  name: string;
  idInitiative: number;
  mime: Mime;
}

export interface BaseInitiatives {
  count: number;
  rows: Initiative[];
}

export type Initiatives = BaseInitiatives & Initiative;

export interface InitiativesState {
  readonly data: Initiatives;
  readonly initiativesByStatus: (Initiative & Status)[];
  readonly dataId: Initiative;
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
