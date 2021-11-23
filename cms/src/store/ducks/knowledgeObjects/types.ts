export enum KnowledgeObjectsTypes {
  LOAD_REQUEST_FETCH_ID = '@knowledgeObjects/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@knowledgeObjects/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@knowledgeObjects/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_DELETE_ID = '@knowledgeObjects/delete/LOAD_REQUEST',
  LOAD_SUCCESS_DELETE_ID = '@knowledgeObjects/delete/LOAD_SUCCESS',
  LOAD_FAILURE_DELETE_ID = '@knowledgeObjects/delete/LOAD_FAILURE',
  LOAD_REQUEST_LIST = '@knowledgeObjects/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@knowledgeObjects/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@knowledgeObjects/list/LOAD_FAILURE',
  LOAD_REQUEST_GET_LIST_CSV = '@knowledgeObjects/listCsv/LOAD_REQUEST',
  LOAD_SUCCESS_GET_LIST_CSV = '@knowledgeObjects/listCsv/LOAD_SUCCESS',
  LOAD_FAILURE_GET_LIST_CSV = '@knowledgeObjects/listCsv/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@knowledgeObjects/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@knowledgeObjects/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@knowledgeObjects/submit/LOAD_FAILURE',
}

export interface KnowledgeArea {
  id: number;
  description: string;
}

export interface Discipline {
  id: number;
  name: string;
  knowledgeArea: KnowledgeArea;
}

export interface KnowledgeObject {
  id: number;
  idDiscipline: number;
  idSchoolYear: number;
  description: string;
  discipline: Discipline;
  schoolYear: any[];
}

export interface BaseKnowledgeObjects {
  count: number;
  rows: KnowledgeObject[];
}

export type KnowledgeObjects = BaseKnowledgeObjects & KnowledgeObject;

export interface KnowledgeObjectsState {
  readonly data: KnowledgeObjects;
  readonly paginator: number[];
  readonly dataId: KnowledgeObject;
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
