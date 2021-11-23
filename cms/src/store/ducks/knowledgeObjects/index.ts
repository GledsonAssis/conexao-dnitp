import { Reducer } from 'redux';
import { KnowledgeObjectsState, KnowledgeObjectsTypes } from './types';

const INITAL_STATE: KnowledgeObjectsState = {
  data: null,
  paginator: [],
  dataId: null,
  error: false,
  loading: false,
  submited: false,
};

const reducer: Reducer<KnowledgeObjectsState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case KnowledgeObjectsTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case KnowledgeObjectsTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        data: action.payload,
        paginator: action.payload.paginate,
      };
    case KnowledgeObjectsTypes.LOAD_FAILURE_LIST:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: action.payload,
      };
    case KnowledgeObjectsTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case KnowledgeObjectsTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        dataId: action.payload,
      };
    case KnowledgeObjectsTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: action.payload,
      };
    case KnowledgeObjectsTypes.LOAD_REQUEST_DELETE_ID:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case KnowledgeObjectsTypes.LOAD_SUCCESS_DELETE_ID:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        dataId: action.payload,
      };
    case KnowledgeObjectsTypes.LOAD_FAILURE_DELETE_ID:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: action.payload,
      };
    case KnowledgeObjectsTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case KnowledgeObjectsTypes.LOAD_SUCCESS_SUBMIT:
      return {
        ...state,
        submited: true,
        loading: false,
        error: false,
        dataId: action.payload,
      };
    case KnowledgeObjectsTypes.LOAD_FAILURE_SUBMIT:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
