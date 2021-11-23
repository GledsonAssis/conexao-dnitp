import { Reducer } from 'redux';
import { UsersState, UsersTypes } from './types';

const INITAL_STATE: UsersState = {
  data: null,
  roles: [],
  paginator: [],
  dataId: null,
  releaseAccess: 1,
  error: false,
  loading: false,
  submited: false,
};

const reducer: Reducer<UsersState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case UsersTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case UsersTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        data: action.payload,
        paginator: action.payload.paginate,
      };
    case UsersTypes.LOAD_FAILURE_LIST:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: action.payload,
      };
    case UsersTypes.LOAD_REQUEST_FETCH:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case UsersTypes.LOAD_SUCCESS_FETCH:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        dataId: action.payload,
      };
    case UsersTypes.LOAD_FAILURE_FETCH:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: action.payload,
      };
    case UsersTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case UsersTypes.LOAD_SUCCESS_SUBMIT:
      return {
        ...state,
        submited: true,
        loading: false,
        error: false,
        dataId: action.payload,
      };
    case UsersTypes.LOAD_FAILURE_SUBMIT:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: action.payload,
      };
    case UsersTypes.LOAD_REQUEST_ACTIVE:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case UsersTypes.LOAD_SUCCESS_ACTIVE:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataId: action.payload,
      };
    case UsersTypes.LOAD_FAILURE_ACTIVE:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case UsersTypes.LOAD_REQUEST_ROLES:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case UsersTypes.LOAD_SUCCESS_ROLES:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        roles: action.payload,
      };
    case UsersTypes.LOAD_FAILURE_ROLES:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case UsersTypes.LOAD_REQUEST_RELEASEACCESS:
      return {
        ...state,
        submited: false,
      };
    case UsersTypes.LOAD_RESPONSE_RELEASEACCESS:
      return {
        ...state,
        submited: false,
        releaseAccess: action.payload.response,
      };
    default:
      return state;
  }
};

export default reducer;
