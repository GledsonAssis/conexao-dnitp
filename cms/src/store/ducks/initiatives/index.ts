import { Reducer } from 'redux';
import { InitiativesState, InitiativesTypes, BaseInitiatives } from './types';

const INITAL_STATE: InitiativesState = {
  data: null,
  dataId: null,
  initiativesByStatus: null,
  error: false,
  loading: false,
  submited: false,
};

const reducer: Reducer<InitiativesState> = (state = INITAL_STATE, initiatives: any) => {
  switch (initiatives.type) {
    case InitiativesTypes.LOAD_REQUEST_LIST_BY_STATUS:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case InitiativesTypes.LOAD_SUCCESS_LIST_BY_STATUS:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        initiativesByStatus: initiatives.payload,
      };
    case InitiativesTypes.LOAD_FAILURE_LIST_BY_STATUS:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
      };

    case InitiativesTypes.LOAD_REQUEST_LIST_STATUS:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case InitiativesTypes.LOAD_SUCCESS_LIST_STATUS:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        initiativesByStatus: initiatives.payload,
      };
    case InitiativesTypes.LOAD_FAILURE_LIST_STATUS:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
      };

    case InitiativesTypes.LOAD_REQUEST_FETCH:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case InitiativesTypes.LOAD_SUCCESS_FETCH:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        data: initiatives.payload,
        paginator: initiatives.payload.paginate,
      };
    case InitiativesTypes.LOAD_FAILURE_FETCH:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: initiatives.payload,
      };

    case InitiativesTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case InitiativesTypes.LOAD_SUCCESS_SUBMIT:
      return {
        ...state,
        submited: true,
        loading: false,
        created: true,
        error: false,
        data: initiatives.payload,
        paginator: initiatives.payload.paginate,
      };
    case InitiativesTypes.LOAD_FAILURE_SUBMIT:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: initiatives.payload,
      };

    case InitiativesTypes.LOAD_SUCCESS_SUBMITATTACHMENT:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        data: initiatives.payload,
        paginator: initiatives.payload.paginate,
      };
    case InitiativesTypes.LOAD_FAILURE_SUBMITATTACHMENT:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: initiatives.payload,
      };

    case InitiativesTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case InitiativesTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataId: initiatives.payload,
      };
    case InitiativesTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        submited: false,
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
