import {
  ExternalApisTypes,
  ViaCepRequest
} from './types';

export const loadViaCepZipCodeRequest = (data?: ViaCepRequest) => ({
  type: ExternalApisTypes.ViaCepTypes.LOAD_REQUEST_GET_ZIPOCODE,
  payload: data,
});
export const loadViaCepZipCodeSuccess = (data: any[]) => ({
  type: ExternalApisTypes.ViaCepTypes.LOAD_SUCCESS_GET_ZIPOCODE,
  payload: data,
});
export const loadViaCepZipCodeFailure = (err: any) => ({
  type: ExternalApisTypes.ViaCepTypes.LOAD_FAILURE_GET_ZIPOCODE,
  payload: err,
});

