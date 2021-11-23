export enum ProjectsTypes {
  LOAD_REQUEST_FETCH_ID = '@projects/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@projects/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@projects/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_HIGHLIGHTS = '@projects/highlights/LOAD_REQUEST',
  LOAD_SUCCESS_HIGHLIGHTS = '@projects/highlights/LOAD_SUCCESS',
  LOAD_FAILURE_HIGHLIGHTS = '@projects/highlights/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_RATING = '@projects/fetchIdRating/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_RATING = '@projects/fetchIdRating/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_RATING = '@projects/fetchIdRating/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_IMAGES = '@projects/fetchIdImages/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_IMAGES = '@projects/fetchIdImages/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_IMAGES = '@projects/fetchIdImages/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_ACTIONS = '@projects/fetchIdActions/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_ACTIONS = '@projects/fetchIdActions/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_ACTIONS = '@projects/fetchIdActions/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_COMMENTS = '@projects/fetchIdComments/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_COMMENTS = '@projects/fetchIdComments/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_COMMENTS = '@projects/fetchIdComments/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_ATTACHMENTS = '@projects/fetchIdAttachments/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_ATTACHMENTS = '@projects/fetchIdAttachments/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_ATTACHMENTS = '@projects/fetchIdAttachments/LOAD_FAILURE',
  LOAD_REQUEST_GET_ID_ATTACHMENTS = '@projects/getIdAttachments/LOAD_REQUEST',
  LOAD_SUCCESS_GET_ID_ATTACHMENTS = '@projects/getIdAttachments/LOAD_SUCCESS',
  LOAD_FAILURE_GET_ID_ATTACHMENTS = '@projects/getIdAttachments/LOAD_FAILURE',
  SET_RATE_REQUEST = '@projects/setRating/SET_RATE_REQUEST',
  SET_RATE_SUCCESS = '@projects/setRating/SET_RATE_SUCCESS',
  SET_RATE_FAILURE = '@projects/setRating/SET_RATE_FAILURE',
  LOAD_REQUEST_SUBMIT_NEW_COMMENT = '@projects/SUBMIT_NEW_COMMENT/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT_NEW_COMMENT = '@projects/SUBMIT_NEW_COMMENT/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT_NEW_COMMENT = '@projects/SUBMIT_NEW_COMMENT/LOAD_FAILURE',
  LOAD_REQUEST_DELETE_COMMENT = '@projects/DELETE_COMMENT/LOAD_REQUEST',
  LOAD_SUCCESS_DELETE_COMMENT = '@projects/DELETE_COMMENT/LOAD_SUCCESS',
  LOAD_FAILURE_DELETE_COMMENT = '@projects/DELETE_COMMENT/LOAD_FAILURE',
  SORT_FILTER = '@projects/sort/SORT_FILTER',
}

export interface BaseProjects {
  cover: coverProjects;
  list: listProjects[];
}

export interface listProjects {
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

export interface coverProjects {
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

export interface fetchProjects extends coverProjects {
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

export interface ActionsType {
  id: number;
  idProject: number;
  date: Date;
  description: string;
  endDate: Date;
  excludedDate: Date;
  isPublished: boolean;
  summary: string;
  title: string;
  idUser: number;
}

export interface dataById {
  images: ImagesType[];
  attachments: AttachmentsType[];
  comments: CommentsType[];
  rating: any;
  actions: ActionsType[];
}

export interface Projects extends BaseProjects, fetchProjects { }

export interface ProjectsState {
  readonly data: Projects[];
  readonly highlights: Projects;
  readonly paginator: number[];
  readonly dataById: dataById;
  readonly loading: boolean;
  readonly error: boolean;
}
