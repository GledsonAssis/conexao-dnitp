export enum OAuthTypes {
  LOAD_REQUEST_LOGIN = '@oauth/login/LOAD_REQUEST',
  LOAD_SUCCESS_LOGIN = '@oauth/login/LOAD_SUCCESS',
  LOAD_FAILURE_LOGIN = '@oauth/login/LOAD_FAILURE',
  LOAD_REQUEST_LOGOUT = '@oauth/logout/LOAD_REQUEST',
  LOAD_SUCCESS_LOGOUT = '@oauth/logout/LOAD_SUCCESS',
  LOAD_FAILURE_LOGOUT = '@oauth/logout/LOAD_FAILURE',
  LOAD_REQUEST_AUTHENTICATION = '@oauth/authentication/LOAD_REQUEST',
  LOAD_SUCCESS_AUTHENTICATION = '@oauth/authentication/LOAD_SUCCESS',
  LOAD_FAILURE_AUTHENTICATION = '@oauth/authentication/LOAD_FAILURE',
  LOAD_REQUEST_IS_MODERATOR = '@oauth/isModerator/LOAD_REQUEST',
  LOAD_SUCCESS_IS_MODERATOR = '@oauth/isModerator/LOAD_SUCCESS',
  LOAD_FAILURE_IS_MODERATOR = '@oauth/isModerator/LOAD_FAILURE',
  LOAD_REQUEST_GET_PROFILE = '@oauth/getProfile/LOAD_REQUEST',
  LOAD_SUCCESS_GET_PROFILE = '@oauth/getProfile/LOAD_SUCCESS',
  LOAD_FAILURE_GET_PROFILE = '@oauth/getProfile/LOAD_FAILURE',
  LOAD_REQUEST_SUBMIT = '@oauth/submit/LOAD_REQUEST',
  LOAD_SUCCESS_SUBMIT = '@oauth/submit/LOAD_SUCCESS',
  LOAD_FAILURE_SUBMIT = '@oauth/submit/LOAD_FAILURE',
}

export interface OAuthState {
  readonly data: any;
  readonly user: any;
  readonly isModerator: boolean;
  readonly loading: boolean;
  readonly error: boolean;
  readonly errors: any;
}
