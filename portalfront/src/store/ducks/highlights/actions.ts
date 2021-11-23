import { HighlightsTypes } from './types';

const loadListRequest = (data?: any) => ({
  type: HighlightsTypes.LOAD_REQUEST_LIST,
  payload: data,
});
const loadListSuccess = (data: any[]) => ({
  type: HighlightsTypes.LOAD_SUCCESS_LIST,
  payload: data,
});
const loadListFailure = (err: any) => ({
  type: HighlightsTypes.LOAD_FAILURE_LIST,
  payload: err,
});

export {
  loadListRequest,
  loadListSuccess,
  loadListFailure
}
