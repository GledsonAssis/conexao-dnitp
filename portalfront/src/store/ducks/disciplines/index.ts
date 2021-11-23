import { Reducer } from 'redux';
import { DisciplinesState, DisciplinesTypes } from './types';

const INITAL_STATE: DisciplinesState = {
  data: [],
  paginator: [],
  error: false,
  loading: false,
};

const reducer: Reducer<DisciplinesState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case DisciplinesTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case DisciplinesTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        data: action.payload,
        paginator: action.payload.paginate,
      };
    case DisciplinesTypes.LOAD_FAILURE_LIST:
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
