export enum TrafficContentsTypes {
  LOAD_REQUEST_FETCH_ID = '@trafficContents/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@trafficContents/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@trafficContents/fetchId/LOAD_FAILURE',
  SORT_FILTER = '@trafficContents/sort/SORT_FILTER',
}

export interface Skills {
  id: number;
  description: string;
}

export interface trafficScope {
  id: number;
  description: string;
  skills: Skills[];
}

export interface trafficTheme {
  id: number;
  name: string;
}

export interface trafficSubTheme {
  id: number;
  name: string;
  theme: trafficTheme;
}

export interface trafficConcept {
  id: number;
  description: string;
  idSchoolYear: number;
  schoolYear: {
    id: number;
    ordinal: number;
    subTheme: trafficSubTheme;
  };
}

export interface trafficContent {
  id: number;
  description: string;
  idSchoolYear: number;
}

export interface BaseTrafficContents {
  id: number;
  description: string;
  trafficConceptId: number;
  trafficConcept: trafficConcept;
  trafficScope: trafficScope[];
}

export interface AttachmentsType {
  id: number;
  name: string;
  mime: {
    media: string;
    suffix: string;
  };
}

export interface ImagesType {
  id: number;
  name: string;
  default: boolean;
  mime: {
    suffix: string;
  };
}

export interface CommentsType {
  id: string;
  comment: string;
  dateTime: Date;
  author: {
    id: string;
    email: string;
    name: string;
    attachment: {
      id: number;
      attachmentType: {
        id: number;
        name: string;
      };
    }[];
  };
  replies: any[];
}

export interface dataById {
  images: ImagesType[];
  attachments: AttachmentsType[];
  comments: CommentsType[];
  rating: any;
}

export type TrafficContents = BaseTrafficContents;

export interface TrafficContentsState {
  readonly data: TrafficContents[];
  readonly highlights: TrafficContents;
  readonly paginator: number[];
  readonly dataById: dataById;
  readonly loading: boolean;
  readonly error: boolean;
}
