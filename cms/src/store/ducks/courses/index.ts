import { Reducer } from 'redux';
import { CoursesState, CoursesTypes } from './types';

const INITAL_STATE: CoursesState = {
  data: null,
  paginator: [],
  dataId: null,
  error: false,
  loading: false,
  submited: false,
};

const reducer: Reducer<CoursesState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case CoursesTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case CoursesTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        data: action.payload,
        paginator: action.payload.paginate,
      };
    case CoursesTypes.LOAD_FAILURE_LIST:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case CoursesTypes.LOAD_REQUEST_PUBLISH:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case CoursesTypes.LOAD_SUCCESS_PUBLISH:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataId: action.payload,
      };
    case CoursesTypes.LOAD_FAILURE_PUBLISH:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case CoursesTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
        dataId: null,
      };
    case CoursesTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataId: action.payload,
      };
    case CoursesTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: action.payload,
      };
    case CoursesTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case CoursesTypes.LOAD_SUCCESS_SUBMIT:
      return {
        ...state,
        submited: true,
        loading: false,
        created: true,
        error: false,
        dataId: {
          ...state.dataId,
          ...action.payload
        },
      };
    case CoursesTypes.LOAD_FAILURE_SUBMIT:
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
