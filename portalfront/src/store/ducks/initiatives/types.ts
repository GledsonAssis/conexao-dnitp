export enum InitiativesTypes {
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
  SORT_FILTER = '@initiatives/sort/SORT_FILTER',
}

interface Status {
  id: number;
  name: string;
}

interface Stage {
  id: number;
  name: string;
}

export interface BaseInitiatives {
  id: number;
  idStatus: number;
  idInitiativeStageStatus: number;
  idUser: number;
  comment: number;
  date: Date;
  description: string;
  title: string;
  statusId: number;
  stageId: number;
  authorId: number;
  author: Author;
  status: Status;
  stage: Stage;
  evaluation_history: EvaluationHistory[];
  attachments: AttachmentsType[];
  audio: number;
  evaluation: number;
}

export interface AttachmentsType {
  id: number;
  name: string;
  idInitiative: number;
  mime: {
    media: string;
    suffix: string;
  };
}

interface Author {
  id: number;
  name: string;
  idDnitUnit: number;
  attachment: any[];
  DnitUnit: number;
  institutions: any[];
}

interface EvaluationHistory {
  id: number;
  text: string;
  date: Date;
}

export type Initiatives = BaseInitiatives;

export interface InitiativesState {
  readonly data: Initiatives[];
  readonly paginator: number[];
  readonly dataById: Initiatives;
  readonly loading: boolean;
  readonly error: boolean;
}
