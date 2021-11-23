import { Reducer } from 'redux';
import { InstitutionsState, InstitutionsTypes } from './types';

const INITAL_STATE: InstitutionsState = {
  data: null,
  paginator: [],
  dataId: null,
  error: false,
  loading: false,
  submited: false
};

const reducer: Reducer<InstitutionsState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case InstitutionsTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
        submited: false
      };
    case InstitutionsTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
        paginator: action.payload.paginate,
        submited: false
      };
    case InstitutionsTypes.LOAD_FAILURE_LIST:
      return {
        ...state,
        error: true,
        loading: false,
        errors: action.payload,
        submited: false
      };
    case InstitutionsTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        loading: true,
        error: false,
        submited: false
      };
    case InstitutionsTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        loading: false,
        error: false,
        dataId: action.payload,
        submited: false
      };
    case InstitutionsTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        error: true,
        loading: false,
        errors: action.payload,
        submited: false
      };
    case InstitutionsTypes.LOAD_REQUEST_DELETE_ID:
      return {
        ...state,
        loading: true,
        error: false,
        submited: false
      };
    case InstitutionsTypes.LOAD_SUCCESS_DELETE_ID:
      return {
        ...state,
        loading: false,
        error: false,
        dataId: action.payload,
        submited: false
      };
    case InstitutionsTypes.LOAD_FAILURE_DELETE_ID:
      return {
        ...state,
        error: true,
        loading: false,
        errors: action.payload,
        submited: false
      };
    case InstitutionsTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        loading: true,
        error: false,
        submited: false
      };
    case InstitutionsTypes.LOAD_SUCCESS_SUBMIT:
      return {
        ...state,
        loading: false,
        error: false,
        dataId: action.payload,
        submited: true
      };
    case InstitutionsTypes.LOAD_FAILURE_SUBMIT:
      return {
        ...state,
        error: true,
        loading: false,
        errors: action.payload,
        submited: false
      };
    default:
      return state;
  }
};

export default reducer;
