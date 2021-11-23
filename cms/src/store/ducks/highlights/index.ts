import { Reducer } from 'redux';
import { HighlightsState, HighlightsTypes } from './types';
import highlightParser from '@/utils/parsers/highlightParser';

const INITAL_STATE: HighlightsState = {
  data: null,
  paginator: [],
  error: false,
  loading: false,
  submited: false,
};

const reducer: Reducer<HighlightsState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case HighlightsTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case HighlightsTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        data: action.payload,
        paginator: action.payload.paginate,
      };
    case HighlightsTypes.LOAD_FAILURE_LIST:
      return {
        ...state,
        error: true,
        submited: false,
        created: false,
        loading: false,
        errors: action.payload,
      };

    case HighlightsTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case HighlightsTypes.LOAD_SUCCESS_SUBMIT:
      return {
        ...state,
        submited: true,
        loading: false,
        created: true,
        error: false,
        data: action.payload,
        paginator: action.payload.paginate,
      };
    case HighlightsTypes.LOAD_FAILURE_SUBMIT:
      return {
        ...state,
        submited: false,
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
