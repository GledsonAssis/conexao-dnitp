import { Reducer } from 'redux';
import { SchoolYearsState, SchoolYearsTypes } from './types';

const INITAL_STATE: SchoolYearsState = {
  data: [],
  paginator: [],
  schoolbonds: [],
  error: false,
  loading: false,
};

const reducer: Reducer<SchoolYearsState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case SchoolYearsTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case SchoolYearsTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        data: action.payload,
        paginator: action.payload.paginate,
      };
    case SchoolYearsTypes.LOAD_FAILURE_LIST:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };

    case SchoolYearsTypes.LOAD_REQUEST_SCHOOLBONDS:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case SchoolYearsTypes.LOAD_SUCCESS_SCHOOLBONDS:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        schoolbonds: action.payload,
        paginator: action.payload.paginate,
      };
    case SchoolYearsTypes.LOAD_FAILURE_SCHOOLBONDS:
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
