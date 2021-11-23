import { Reducer } from 'redux';
import { ParticipatingSchoolsState, ParticipatingSchoolsTypes } from './types';

const INITAL_STATE: ParticipatingSchoolsState = {
  data: {
    count: null,
    rows: [],
  },
  paginator: [],
  error: false,
  loading: false,
  submited: false,
};

const reducer: Reducer<ParticipatingSchoolsState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case ParticipatingSchoolsTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case ParticipatingSchoolsTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        data: action.payload,
        paginator: action.payload.paginate,
      };
    case ParticipatingSchoolsTypes.LOAD_FAILURE_LIST:
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
