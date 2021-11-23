import { Reducer } from 'redux';
import { GeneralSearchState, GeneralSearchTypes } from './types';

const INITAL_STATE: GeneralSearchState = {
  data: [],
  paginator: [],
  error: false,
  loading: false,
};

const reducer: Reducer<GeneralSearchState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case GeneralSearchTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case GeneralSearchTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        data: action.payload,
        paginator: action.payload.paginate,
      };
    case GeneralSearchTypes.LOAD_FAILURE_LIST:
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
