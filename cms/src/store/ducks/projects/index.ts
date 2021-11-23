import { Reducer } from 'redux';
import { ProjectsState, ProjectsTypes } from './types';

const INITAL_STATE: ProjectsState = {
  data: null,
  paginator: [],
  dataId: null,
  error: false,
  loading: false,
  submited: false,
};

const reducer: Reducer<ProjectsState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case ProjectsTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case ProjectsTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        data: action.payload,
        paginator: action.payload.paginate,
      };
    case ProjectsTypes.LOAD_FAILURE_LIST:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case ProjectsTypes.LOAD_REQUEST_PUBLISH:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
        dataId: null,
      };
    case ProjectsTypes.LOAD_SUCCESS_PUBLISH:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataId: action.payload,
      };
    case ProjectsTypes.LOAD_FAILURE_PUBLISH:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case ProjectsTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case ProjectsTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataId: action.payload,
      };
    case ProjectsTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case ProjectsTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case ProjectsTypes.LOAD_SUCCESS_SUBMIT:
      return {
        ...state,
        submited: true,
        loading: false,
        created: true,
        error: false,
        dataId: {
          ...state.dataId,
          ...action.payload
        },
      };
    case ProjectsTypes.LOAD_FAILURE_SUBMIT:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
