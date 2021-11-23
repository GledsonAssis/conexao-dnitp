export enum SubjectsTypes {
  LOAD_REQUEST_FETCH_ID = '@subjects/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@subjects/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@subjects/fetchId/LOAD_FAILURE',
  SORT_FILTER = '@subjects/sort/SORT_FILTER',
}

export interface KnowledgeArea {
  id: number;
  description: string;
}

export interface knowledgeObject {
  id: number;
  description: string;
}

export interface Discipline {
  id: number;
  name: string;
  color: string;
  knowledgeArea: KnowledgeArea;
}

export interface SchoolYear {
  ordinal: number;
  color: string;
  year: number;
}

export interface coverSubjects {
  description: string;
  discipline: Discipline;
  id: number;
  idDiscipline: number;
  idSchoolYear: number;
  schoolYear: SchoolYear[];
}

export interface coverSubjects {
  count: number;
  rows: coverSubjects[];
}

export type Subjects = coverSubjects;

export interface SubjectsState {
  readonly data: Subjects;
  readonly paginator: number[];
  readonly loading: boolean;
  readonly error: boolean;
}
