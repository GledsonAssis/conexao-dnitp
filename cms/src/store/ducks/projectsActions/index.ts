import { Reducer } from 'redux';
import { ProjectActionsState, ProjectActionsTypes } from './types';

const INITAL_STATE: ProjectActionsState = {
  data: null,
  paginator: [],
  dataId: null,
  error: false,
  loading: false,
  submited: false,
};

const reducer: Reducer<ProjectActionsState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case ProjectActionsTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case ProjectActionsTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        data: action.payload,
        paginator: action.payload.paginate,
      };
    case ProjectActionsTypes.LOAD_FAILURE_LIST:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case ProjectActionsTypes.LOAD_REQUEST_PUBLISH:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case ProjectActionsTypes.LOAD_SUCCESS_PUBLISH:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataId: action.payload,
      };
    case ProjectActionsTypes.LOAD_FAILURE_PUBLISH:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case ProjectActionsTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
        dataId: null,
      };
    case ProjectActionsTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataId: action.payload,
      };
    case ProjectActionsTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case ProjectActionsTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case ProjectActionsTypes.LOAD_SUCCESS_SUBMIT:
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
    case ProjectActionsTypes.LOAD_FAILURE_SUBMIT:
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
