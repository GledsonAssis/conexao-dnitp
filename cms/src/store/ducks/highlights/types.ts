export enum HighlightsTypes {
  LOAD_REQUEST_LIST = '@highlights/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@highlights/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@highlights/list/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@highlights/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@highlights/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@highlights/submit/LOAD_FAILURE',
}

export interface Highlight {
  id: number;
  title: string;
  type: string;
  highlighted: boolean;
  position?: number;
  creationDate: Date;
  modifyDate: Date;
}

export interface BaseHighlights {
  count: number;
  rows: Highlight[];
}

export type Highlights = BaseHighlights & Highlight;

export interface HighlightsState {
  readonly data: Highlights;
  readonly paginator: number[];
  readonly loading: boolean;
  readonly error: boolean;
  readonly submited: boolean;
}
