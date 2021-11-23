import { OAuthTypes } from './types';

export const loadLoginRequest = (data: any) => ({
  type: OAuthTypes.LOAD_REQUEST_LOGIN,
  payload: data,
});
export const loadLoginSuccess = (data: any) => ({
  type: OAuthTypes.LOAD_SUCCESS_LOGIN,
  payload: data,
});
export const loadLoginFailure = (err: any) => ({
  type: OAuthTypes.LOAD_FAILURE_LOGIN,
  payload: err,
});

export const loadAuthenticationRequest = () => ({
  type: OAuthTypes.LOAD_REQUEST_AUTHENTICATION,
  payload: {},
});
export const loadAuthenticationSuccess = (data: any) => ({
  type: OAuthTypes.LOAD_SUCCESS_AUTHENTICATION,
  payload: data,
});
export const loadAuthenticationFailure = (err: any) => ({
  type: OAuthTypes.LOAD_FAILURE_AUTHENTICATION,
  payload: err,
});

export const loadLogoutRequest = () => ({
  type: OAuthTypes.LOAD_REQUEST_LOGOUT,
  payload: {},
});
export const loadLogoutSuccess = (data: any) => ({
  type: OAuthTypes.LOAD_SUCCESS_LOGOUT,
  payload: data,
});
export const loadLogoutFailure = (err: any) => ({
  type: OAuthTypes.LOAD_FAILURE_LOGOUT,
  payload: err,
});

export const loadModeratorRequest = () => ({
  type: OAuthTypes.LOAD_REQUEST_IS_MODERATOR,
  payload: {},
});
export const loadModeratorSuccess = (data: any) => ({
  type: OAuthTypes.LOAD_SUCCESS_IS_MODERATOR,
  payload: data,
});
export const loadModeratorFailure = (err: any) => ({
  type: OAuthTypes.LOAD_FAILURE_IS_MODERATOR,
  payload: err,
});

export const loadProfileRequest = () => ({
  type: OAuthTypes.LOAD_REQUEST_GET_PROFILE,
  payload: {},
});
export const loadProfileSuccess = (data: any) => ({
  type: OAuthTypes.LOAD_SUCCESS_GET_PROFILE,
  payload: data,
});
export const loadProfileFailure = (err: any) => ({
  type: OAuthTypes.LOAD_FAILURE_GET_PROFILE,
  payload: err,
});

export const loadSubmitRequest = (data: any) => ({
  type: OAuthTypes.LOAD_REQUEST_SUBMIT,
  payload: data,
});
export const loadSubmitSuccess = (data: any) => ({
  type: OAuthTypes.LOAD_SUCCESS_SUBMIT,
  payload: data,
});
export const loadSubmitFailure = (err: any) => ({
  type: OAuthTypes.LOAD_FAILURE_SUBMIT,
  payload: err,
});
