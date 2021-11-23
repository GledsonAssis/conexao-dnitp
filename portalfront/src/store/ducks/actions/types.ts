export enum ActionsTypes {
  LOAD_REQUEST_FETCH_ID = '@actions/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@actions/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@actions/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_HIGHLIGHTS = '@actions/highlights/LOAD_REQUEST',
  LOAD_SUCCESS_HIGHLIGHTS = '@actions/highlights/LOAD_SUCCESS',
  LOAD_FAILURE_HIGHLIGHTS = '@actions/highlights/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_RATING = '@actions/fetchIdRating/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_RATING = '@actions/fetchIdRating/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_RATING = '@actions/fetchIdRating/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_IMAGES = '@actions/fetchIdImages/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_IMAGES = '@actions/fetchIdImages/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_IMAGES = '@actions/fetchIdImages/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_COMMENTS = '@actions/fetchIdComments/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_COMMENTS = '@actions/fetchIdComments/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_COMMENTS = '@actions/fetchIdComments/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_ATTACHMENTS = '@actions/fetchIdAttachments/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_ATTACHMENTS = '@actions/fetchIdAttachments/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_ATTACHMENTS = '@actions/fetchIdAttachments/LOAD_FAILURE',
  LOAD_REQUEST_GET_ID_ATTACHMENTS = '@actions/getIdAttachments/LOAD_REQUEST',
  LOAD_SUCCESS_GET_ID_ATTACHMENTS = '@actions/getIdAttachments/LOAD_SUCCESS',
  LOAD_FAILURE_GET_ID_ATTACHMENTS = '@actions/getIdAttachments/LOAD_FAILURE',
  SET_RATE_REQUEST = '@actions/setRating/SET_RATE_REQUEST',
  SET_RATE_SUCCESS = '@actions/setRating/SET_RATE_SUCCESS',
  SET_RATE_FAILURE = '@actions/setRating/SET_RATE_FAILURE',
  LOAD_REQUEST_SUBMIT_NEW_COMMENT = '@actions/SUBMIT_NEW_COMMENT/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT_NEW_COMMENT = '@actions/SUBMIT_NEW_COMMENT/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT_NEW_COMMENT = '@actions/SUBMIT_NEW_COMMENT/LOAD_FAILURE',
  LOAD_REQUEST_DELETE_COMMENT = '@actions/DELETE_COMMENT/LOAD_REQUEST',
  LOAD_SUCCESS_DELETE_COMMENT = '@actions/DELETE_COMMENT/LOAD_SUCCESS',
  LOAD_FAILURE_DELETE_COMMENT = '@actions/DELETE_COMMENT/LOAD_FAILURE',
  SORT_FILTER = '@actions/sort/SORT_FILTER',
}

export interface BaseActions {
  cover: coverActions;
  list: listActions[];
}

interface listActions {
  date: Date;
  description: string;
  endDate: string;
  id: number;
  isCover: boolean;
  isPublished: boolean;
  summary: string;
  title: string;
}

export interface coverActions {
  date: string;
  description: string;
  endDate: Date;
  id: number;
  isCover: boolean;
  isPublished: boolean;
  summary: string;
  title: string;
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
  replies: any[]; // TODO: tipar
}

export interface dataById {
  images: ImagesType[];
  attachments: AttachmentsType[];
  comments: CommentsType[];
  rating: any;
}

export interface Actions extends BaseActions, coverActions { }

export interface ActionsState {
  readonly data: Actions[];
  readonly highlights: Actions;
  readonly paginator: number[];
  readonly dataById: dataById;
  readonly loading: boolean;
  readonly error: boolean;
}
