import { Reducer } from 'redux';
import { StatesState, StatesTypes } from './types';

const INITAL_STATE: StatesState = {
  data: [],
  cities: [],
  paginator: [],
  institutions: [],
  fieldKnowledges: [],
  error: false,
  loading: false,
};

const reducer: Reducer<StatesState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case StatesTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case StatesTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        data: action.payload,
        paginator: action.payload.paginate,
      };
    case StatesTypes.LOAD_FAILURE_LIST:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };

    case StatesTypes.LOAD_REQUEST_CITIES:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case StatesTypes.LOAD_SUCCESS_CITIES:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        cities: action.payload,
        paginator: action.payload.paginate,
      };
    case StatesTypes.LOAD_FAILURE_CITIES:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };

    case StatesTypes.LOAD_REQUEST_INSTITUITIONS:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case StatesTypes.LOAD_SUCCESS_INSTITUITIONS:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        institutions: action.payload,
        paginator: action.payload.paginate,
      };
    case StatesTypes.LOAD_FAILURE_INSTITUITIONS:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };

    case StatesTypes.LOAD_REQUEST_FIELDKNOWLEDGES:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case StatesTypes.LOAD_SUCCESS_FIELDKNOWLEDGES:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        fieldKnowledges: action.payload
      };
    case StatesTypes.LOAD_FAILURE_FIELDKNOWLEDGES:
      return {
        ...state,
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
