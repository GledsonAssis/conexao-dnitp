import { Reducer } from 'redux';
import { imageParser } from '@/utils/parsers';
import { Subjects, SubjectsState, SubjectsTypes } from './types';

const INITAL_STATE: SubjectsState = {
  data: <Subjects>null,
  paginator: [],
  error: false,
  loading: false,
};

const reducer: Reducer<SubjectsState> = (state = INITAL_STATE, subects: any) => {
  switch (subects.type) {
    case SubjectsTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case SubjectsTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        data: subects.payload,
        paginator: subects.payload.paginate,
      };
    case SubjectsTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: subects.payload,
      };
    default:
      return state;
  }
};

export default reducer;
