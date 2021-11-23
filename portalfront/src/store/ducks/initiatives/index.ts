import { Reducer } from 'redux';
import { InitiativesState, InitiativesTypes, BaseInitiatives } from './types';

const INITAL_STATE: InitiativesState = {
  data: [],
  dataById: null,
  paginator: [],
  error: false,
  loading: false,
};

const reducer: Reducer<InitiativesState> = (state = INITAL_STATE, initiatives: any) => {
  switch (initiatives.type) {
    case InitiativesTypes.LOAD_REQUEST_FETCH:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case InitiativesTypes.LOAD_SUCCESS_FETCH:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        data: initiatives.payload,
        paginator: initiatives.payload.paginate,
      };
    case InitiativesTypes.LOAD_FAILURE_FETCH:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: initiatives.payload,
      };

    case InitiativesTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case InitiativesTypes.LOAD_SUCCESS_SUBMIT:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        data: initiatives.payload,
        paginator: initiatives.payload.paginate,
      };
    case InitiativesTypes.LOAD_FAILURE_SUBMIT:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: initiatives.payload,
      };

    case InitiativesTypes.LOAD_SUCCESS_SUBMITATTACHMENT:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        data: initiatives.payload,
        paginator: initiatives.payload.paginate,
      };
    case InitiativesTypes.LOAD_FAILURE_SUBMITATTACHMENT:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: initiatives.payload,
      };

    case InitiativesTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case InitiativesTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        dataById: initiatives.payload,
      };
    case InitiativesTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: initiatives.payload,
      };
    default:
      return state;
  }
};

export default reducer;
