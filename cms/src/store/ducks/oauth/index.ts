import { Reducer } from 'redux';
import { OAuthState, OAuthTypes } from './types';

const INITAL_STATE: OAuthState = {
  data: undefined,
  error: false,
  isModerator: false,
  loading: false,
  errors: undefined,
};

const reducer: Reducer<OAuthState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case OAuthTypes.LOAD_REQUEST_LOGIN:
      return { ...state, loading: true, error: false };
    case OAuthTypes.LOAD_SUCCESS_LOGIN:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    case OAuthTypes.LOAD_FAILURE_LOGIN:
      return {
        ...state,
        error: true,
        loading: false,
        errors: action.payload,
        data: undefined,
      };

    case OAuthTypes.LOAD_REQUEST_LOGOUT:
      return {
        ...state,
        loading: true,
      };
    case OAuthTypes.LOAD_SUCCESS_LOGOUT:
      return {
        ...state,
        loading: false,
        data: undefined,
      };
    case OAuthTypes.LOAD_FAILURE_LOGOUT:
      return {
        ...state,
        loading: false,
      };

    case OAuthTypes.LOAD_REQUEST_AUTHENTICATION:
      return { ...state, loading: true, error: false };
    case OAuthTypes.LOAD_SUCCESS_AUTHENTICATION:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    case OAuthTypes.LOAD_FAILURE_AUTHENTICATION:
      return {
        ...state,
        error: true,
        loading: false,
        errors: action.payload,
        data: undefined,
      };

    case OAuthTypes.LOAD_REQUEST_IS_MODERATOR:
      return {
        ...state,
        isModerator: false,
      };
    case OAuthTypes.LOAD_SUCCESS_IS_MODERATOR:
      return {
        ...state,
        isModerator: action.payload.data.isModerator,
      };
    case OAuthTypes.LOAD_FAILURE_IS_MODERATOR:
      return {
        ...state,
        isModerator: false,
      };
    default:
      return state;
  }
};

export default reducer;
