export enum CoursesTypes {
  LOAD_REQUEST_FETCH_ID = '@courses/fetchId/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID = '@courses/fetchId/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID = '@courses/fetchId/LOAD_FAILURE',
  LOAD_REQUEST_HIGHLIGHTS = '@courses/highlights/LOAD_REQUEST',
  LOAD_SUCCESS_HIGHLIGHTS = '@courses/highlights/LOAD_SUCCESS',
  LOAD_FAILURE_HIGHLIGHTS = '@courses/highlights/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_RATING = '@courses/fetchIdRating/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_RATING = '@courses/fetchIdRating/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_RATING = '@courses/fetchIdRating/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_IMAGES = '@courses/fetchIdImages/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_IMAGES = '@courses/fetchIdImages/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_IMAGES = '@courses/fetchIdImages/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_COMMENTS = '@courses/fetchIdComments/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_COMMENTS = '@courses/fetchIdComments/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_COMMENTS = '@courses/fetchIdComments/LOAD_FAILURE',
  LOAD_REQUEST_FETCH_ID_ATTACHMENTS = '@courses/fetchIdAttachments/LOAD_REQUEST',
  LOAD_SUCCESS_FETCH_ID_ATTACHMENTS = '@courses/fetchIdAttachments/LOAD_SUCCESS',
  LOAD_FAILURE_FETCH_ID_ATTACHMENTS = '@courses/fetchIdAttachments/LOAD_FAILURE',
  LOAD_REQUEST_GET_ID_ATTACHMENTS = '@courses/getIdAttachments/LOAD_REQUEST',
  LOAD_SUCCESS_GET_ID_ATTACHMENTS = '@courses/getIdAttachments/LOAD_SUCCESS',
  LOAD_FAILURE_GET_ID_ATTACHMENTS = '@courses/getIdAttachments/LOAD_FAILURE',
  SET_RATE_REQUEST = '@courses/setRating/SET_RATE_REQUEST',
  SET_RATE_SUCCESS = '@courses/setRating/SET_RATE_SUCCESS',
  SET_RATE_FAILURE = '@courses/setRating/SET_RATE_FAILURE',
  LOAD_REQUEST_SUBMIT_NEW_COMMENT = '@courses/SUBMIT_NEW_COMMENT/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT_NEW_COMMENT = '@courses/SUBMIT_NEW_COMMENT/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT_NEW_COMMENT = '@courses/SUBMIT_NEW_COMMENT/LOAD_FAILURE',
  LOAD_REQUEST_DELETE_COMMENT = '@courses/DELETE_COMMENT/LOAD_REQUEST',
  LOAD_SUCCESS_DELETE_COMMENT = '@courses/DELETE_COMMENT/LOAD_SUCCESS',
  LOAD_FAILURE_DELETE_COMMENT = '@courses/DELETE_COMMENT/LOAD_FAILURE',
  SORT_FILTER = '@courses/sort/SORT_FILTER',
}

export interface BaseCourses {
  cover: coverCourses;
  list: listCourses[];
}

interface listCourses {
  date: string;
  description: string;
  endDate: string;
  id: number;
  isCover: boolean;
  isPublished: boolean;
  summary: string;
  title: string;
  excludedDate: string;
  link: string;
  modifyDate: string;
  type: number;
}

export interface coverCourses {
  date: string;
  description: string;
  endDate: string;
  id: number;
  isCover: boolean;
  isPublished: boolean;
  summary: string;
  title: string;
  excludedDate: string;
  link: string;
  modifyDate: string;
  type: number;
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

export interface Courses extends BaseCourses, coverCourses { }

export interface CoursesState {
  readonly data: Courses[];
  readonly highlights: Courses;
  readonly paginator: number[];
  readonly dataById: dataById;
  readonly loading: boolean;
  readonly error: boolean;
}
