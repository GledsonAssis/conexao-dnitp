import { Reducer } from 'redux';
import { HighlightsState, HighlightsTypes } from './types';
import highlightParser from '@/utils/parsers/highlightParser';

const INITAL_STATE: HighlightsState = {
  data: [],
  paginator: [],
  error: false,
  loading: false,
  errors: null
};

const reducer: Reducer<HighlightsState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case HighlightsTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case HighlightsTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        data: action.payload && action.payload.map(highlightParser),
        paginator: action.payload.paginate,
      };
    case HighlightsTypes.LOAD_FAILURE_LIST:
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
