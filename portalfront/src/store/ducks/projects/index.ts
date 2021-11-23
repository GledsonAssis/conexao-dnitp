import { Reducer } from 'redux';
import { imageParser } from '@/utils/parsers';
import { ProjectsState, ProjectsTypes } from './types';

const INITAL_STATE: ProjectsState = {
  data: [],
  dataById: {
    images: [],
    rating: null,
    comments: [],
    attachments: [],
    actions: [],
  },
  highlights: <any>null,
  paginator: [],
  error: false,
  loading: false,
};

const reducer: Reducer<ProjectsState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case ProjectsTypes.LOAD_REQUEST_HIGHLIGHTS:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case ProjectsTypes.LOAD_SUCCESS_HIGHLIGHTS:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        highlights: action.payload,
        paginator: action.payload.paginate,
      };
    case ProjectsTypes.LOAD_FAILURE_HIGHLIGHTS:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case ProjectsTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case ProjectsTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        data: [action.payload],
        paginator: action.payload.paginate,
      };
    case ProjectsTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case ProjectsTypes.LOAD_REQUEST_FETCH_ID_IMAGES:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case ProjectsTypes.LOAD_SUCCESS_FETCH_ID_IMAGES:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        dataById: {
          ...state.dataById,
          images: action.payload.map((image: any) => imageParser('projects', image)),
        },
        paginator: action.payload.paginate,
      };
    case ProjectsTypes.LOAD_FAILURE_FETCH_ID_IMAGES:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case ProjectsTypes.LOAD_REQUEST_FETCH_ID_ATTACHMENTS:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case ProjectsTypes.LOAD_SUCCESS_FETCH_ID_ATTACHMENTS:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        dataById: {
          ...state.dataById,
          attachments: action.payload,
        },
        paginator: action.payload.paginate,
      };
    case ProjectsTypes.LOAD_FAILURE_FETCH_ID_ATTACHMENTS:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case ProjectsTypes.LOAD_REQUEST_FETCH_ID_COMMENTS:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case ProjectsTypes.LOAD_SUCCESS_FETCH_ID_COMMENTS:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        dataById: {
          ...state.dataById,
          comments: action.payload,
        },
        paginator: action.payload.paginate,
      };
    case ProjectsTypes.LOAD_FAILURE_FETCH_ID_COMMENTS:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case ProjectsTypes.LOAD_REQUEST_FETCH_ID_ACTIONS:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case ProjectsTypes.LOAD_SUCCESS_FETCH_ID_ACTIONS:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        dataById: {
          ...state.dataById,
          actions: action.payload,
        },
        paginator: action.payload.paginate,
      };
    case ProjectsTypes.LOAD_FAILURE_FETCH_ID_ACTIONS:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case ProjectsTypes.LOAD_REQUEST_FETCH_ID_RATING:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case ProjectsTypes.LOAD_SUCCESS_FETCH_ID_RATING:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        dataById: {
          ...state.dataById,
          rating: action.payload?.rating,
        },
        paginator: action.payload.paginate,
      };
    case ProjectsTypes.LOAD_FAILURE_FETCH_ID_RATING:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case ProjectsTypes.LOAD_REQUEST_SUBMIT_NEW_COMMENT:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ProjectsTypes.LOAD_SUCCESS_SUBMIT_NEW_COMMENT:
      return {
        ...state,
        loading: false,
        error: false,
        paginator: action.payload.paginate,
      };
    case ProjectsTypes.LOAD_FAILURE_SUBMIT_NEW_COMMENT:
      return {
        ...state,
        error: true,
        loading: false,
        errors: action.payload,
      };
    case ProjectsTypes.LOAD_REQUEST_DELETE_COMMENT:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ProjectsTypes.LOAD_SUCCESS_DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case ProjectsTypes.LOAD_FAILURE_DELETE_COMMENT:
      return {
        ...state,
        error: true,
        loading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
