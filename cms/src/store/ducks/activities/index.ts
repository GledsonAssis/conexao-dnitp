import { Reducer } from 'redux';
import { Activity, ActivitiesState, ActivitiesTypes } from './types';

const INITAL_STATE: ActivitiesState = {
  data: null,
  paginator: [],
  dataId: <Activity>null,
  error: false,
  loading: false,
  searched: false,
  submited: false
};

const reducer: Reducer<ActivitiesState> = (state = INITAL_STATE, subects: any) => {
  switch (subects.type) {
    case ActivitiesTypes.LOAD_REQUEST_SEARCH_ACTIVITES:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
        searched: false,
        submited: false
      };
    case ActivitiesTypes.LOAD_SUCCESS_SEARCH_ACTIVITES:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        searched: true,
        data: subects.payload,
        paginator: subects.payload.paginate,
        submited: false
      };
    case ActivitiesTypes.LOAD_FAILURE_SEARCH_ACTIVITES:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        searched: false,
        errors: subects.payload,
        submited: false
      };

    case ActivitiesTypes.LOAD_REQUEST_SEARCH_ACTIVITY_ACTIVITES:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
        searched: false,
        submited: false
      };
    case ActivitiesTypes.LOAD_SUCCESS_SEARCH_ACTIVITY_ACTIVITES:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        searched: true,
        data: subects.payload,
        submited: false
      };
    case ActivitiesTypes.LOAD_FAILURE_SEARCH_ACTIVITY_ACTIVITES:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        searched: false,
        errors: subects.payload,
        submited: false
      };

    case ActivitiesTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
        submited: false
      };
    case ActivitiesTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        dataId: subects.payload,
        submited: false
      };
    case ActivitiesTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: subects.payload,
        submited: false
      };
    case ActivitiesTypes.LOAD_REQUEST_PUBLISH:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
        submited: false
      };
    case ActivitiesTypes.LOAD_SUCCESS_PUBLISH:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        dataId: subects.payload,
        submited: false
      };
    case ActivitiesTypes.LOAD_FAILURE_PUBLISH:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: subects.payload,
        submited: false
      };
    case ActivitiesTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
        submited: false
      };
    case ActivitiesTypes.LOAD_SUCCESS_SUBMIT:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        dataId: subects.payload,
        submited: true
      };
    case ActivitiesTypes.LOAD_FAILURE_SUBMIT:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: subects.payload,
        submited: false
      };
    default:
      return state;
  }
};

export default reducer;
