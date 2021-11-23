import { Reducer } from 'redux';
import { SurveiesState, SurveiesTypes } from './types';

const INITAL_STATE: SurveiesState = {
  data: null,
  paginator: [],
  error: false,
  loading: false,
  submited: false,
  dataId: null
};

const reducer: Reducer<SurveiesState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case SurveiesTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case SurveiesTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        data: action.payload,
        paginator: action.payload.paginate,
      };
    case SurveiesTypes.LOAD_FAILURE_LIST:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case SurveiesTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
        dataId: null,
      };
    case SurveiesTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataId: action.payload,
      };
    case SurveiesTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        dataId: null,
        errors: action.payload,
      };
    case SurveiesTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        errors: null,
      };
    case SurveiesTypes.LOAD_SUCCESS_SUBMIT:
      return {
        ...state,
        submited: true,
        loading: false,
        error: false,
        errors: null,
      };
    case SurveiesTypes.LOAD_FAILURE_SUBMIT:
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
