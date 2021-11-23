export enum HighlightsTypes {
  LOAD_REQUEST_LIST = '@highlights/list/LOAD_REQUEST',
  LOAD_SUCCESS_LIST = '@highlights/list/LOAD_SUCCESS',
  LOAD_FAILURE_LIST = '@highlights/list/LOAD_FAILURE',
}

export interface BaseHighlights {
  date: string;
  extra: string;
  id: number;
  imageId: number;
  imageName: string;
  position: number;
  summary: string;
  title: string;
  type: string;
  imageUrl: any;
  icon: string;
  detailsUrl: string;
}

export type Highlights = BaseHighlights;

export interface HighlightsState {
  readonly data: Highlights[];
  readonly paginator: number[];
  readonly loading: boolean;
  readonly error: boolean;
  readonly errors: any;
}
