import { Reducer } from 'redux';
import { DnitLocalUnitsState, DnitLocalUnitsTypes } from './types';

const INITAL_STATE: DnitLocalUnitsState = {
  data: null,
  superintendences: null,
  roads: null,
  cities: null,
  paginator: [],
  dataId: null,
  error: false,
  loading: false,
  submited: false,
};

const reducer: Reducer<DnitLocalUnitsState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case DnitLocalUnitsTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case DnitLocalUnitsTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        data: action.payload,
        paginator: action.payload.paginate,
      };
    case DnitLocalUnitsTypes.LOAD_FAILURE_LIST:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: action.payload,
      };
    case DnitLocalUnitsTypes.LOAD_REQUEST_LIST_SUPERINTENDENCES:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case DnitLocalUnitsTypes.LOAD_SUCCESS_LIST_SUPERINTENDENCES:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        superintendences: action.payload,
      };
    case DnitLocalUnitsTypes.LOAD_FAILURE_LIST_SUPERINTENDENCES:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: action.payload,
      };
    case DnitLocalUnitsTypes.LOAD_REQUEST_LIST_ROADS:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case DnitLocalUnitsTypes.LOAD_SUCCESS_LIST_ROADS:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        roads: action.payload,
      };
    case DnitLocalUnitsTypes.LOAD_FAILURE_LIST_ROADS:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: action.payload,
      };
    case DnitLocalUnitsTypes.LOAD_REQUEST_LIST_CITIES_BY_LOCAL_UNIT:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case DnitLocalUnitsTypes.LOAD_SUCCESS_LIST_CITIES_BY_LOCAL_UNIT:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        cities: action.payload,
      };
    case DnitLocalUnitsTypes.LOAD_FAILURE_LIST_CITIES_BY_LOCAL_UNIT:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: action.payload,
      };
    case DnitLocalUnitsTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case DnitLocalUnitsTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        dataId: action.payload,
      };
    case DnitLocalUnitsTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: action.payload,
      };
    case DnitLocalUnitsTypes.LOAD_REQUEST_DELETE_ID:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case DnitLocalUnitsTypes.LOAD_SUCCESS_DELETE_ID:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        dataId: action.payload,
      };
    case DnitLocalUnitsTypes.LOAD_FAILURE_DELETE_ID:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: action.payload,
      };
    case DnitLocalUnitsTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case DnitLocalUnitsTypes.LOAD_SUCCESS_SUBMIT:
      return {
        ...state,
        submited: true,
        loading: false,
        error: false,
        dataId: action.payload,
      };
    case DnitLocalUnitsTypes.LOAD_FAILURE_SUBMIT:
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
