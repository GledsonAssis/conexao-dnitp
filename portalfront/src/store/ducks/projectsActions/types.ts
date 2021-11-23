export enum ProjectsActionsTypes {
  LOAD_REQUEST_FETCH_ID = '@projectsActions/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@projectsActions/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@projectsActions/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_HIGHLIGHTS = '@projectsActions/highlights/LOAD_REQUEST',
  LOAD_SUCCESS_HIGHLIGHTS = '@projectsActions/highlights/LOAD_SUCCESS',
  LOAD_FAILURE_HIGHLIGHTS = '@projectsActions/highlights/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_RATING = '@projectsActions/fetchIdRating/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_RATING = '@projectsActions/fetchIdRating/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_RATING = '@projectsActions/fetchIdRating/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_IMAGES = '@projectsActions/fetchIdImages/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_IMAGES = '@projectsActions/fetchIdImages/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_IMAGES = '@projectsActions/fetchIdImages/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_ACTIONS = '@projectsActions/fetchIdActions/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_ACTIONS = '@projectsActions/fetchIdActions/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_ACTIONS = '@projectsActions/fetchIdActions/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_COMMENTS = '@projectsActions/fetchIdComments/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_COMMENTS = '@projectsActions/fetchIdComments/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_COMMENTS = '@projectsActions/fetchIdComments/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_ATTACHMENTS = '@projectsActions/fetchIdAttachments/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_ATTACHMENTS = '@projectsActions/fetchIdAttachments/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_ATTACHMENTS = '@projectsActions/fetchIdAttachments/LOAD_FAILURE',
  LOAD_REQUEST_GET_ID_ATTACHMENTS = '@projectsActions/getIdAttachments/LOAD_REQUEST',
  LOAD_SUCCESS_GET_ID_ATTACHMENTS = '@projectsActions/getIdAttachments/LOAD_SUCCESS',
  LOAD_FAILURE_GET_ID_ATTACHMENTS = '@projectsActions/getIdAttachments/LOAD_FAILURE',
  SET_RATE_REQUEST = '@projectsActions/setRating/SET_RATE_REQUEST',
  SET_RATE_SUCCESS = '@projectsActions/setRating/SET_RATE_SUCCESS',
  SET_RATE_FAILURE = '@projectsActions/setRating/SET_RATE_FAILURE',
  LOAD_REQUEST_SUBMIT_NEW_COMMENT = '@projectsActions/SUBMIT_NEW_COMMENT/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT_NEW_COMMENT = '@projectsActions/SUBMIT_NEW_COMMENT/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT_NEW_COMMENT = '@projectsActions/SUBMIT_NEW_COMMENT/LOAD_FAILURE',
  LOAD_REQUEST_DELETE_COMMENT = '@projectsActions/DELETE_COMMENT/LOAD_REQUEST',
  LOAD_SUCCESS_DELETE_COMMENT = '@projectsActions/DELETE_COMMENT/LOAD_SUCCESS',
  LOAD_FAILURE_DELETE_COMMENT = '@projectsActions/DELETE_COMMENT/LOAD_FAILURE',
  SORT_FILTER = '@projectsActions/sort/SORT_FILTER',
}

export interface BaseProjectsActions {
  cover: coverProjectsActions;
  list: listProjectsActions[];
}

export interface listProjectsActions {
  date: string;
  updateDate: string;
  description: string;
  endDate: string;
  id: number;
  isCover: boolean;
  isPublished: boolean;
  summary: string;
  title: string;
}

export interface coverProjectsActions {
  date: string;
  updateDate: string;
  description: string;
  endDate: string;
  id: number;
  isCover: boolean;
  isPublished: boolean;
  summary: string;
  title: string;
}

export interface fetchProjectsActions extends coverProjectsActions {
  author: {
    id: number;
    name: string;
  };
  excludedDate: null;
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

export interface ProjectsActions extends BaseProjectsActions, fetchProjectsActions { }

export interface ProjectsActionsState {
  readonly data: ProjectsActions[];
  readonly highlights: ProjectsActions;
  readonly paginator: number[];
  readonly dataById: dataById;
  readonly loading: boolean;
  readonly error: boolean;
}
