import { Reducer } from 'redux';
import { Activites, Survey, ActivitesState, ActivitesTypes } from './types';

const INITAL_STATE: ActivitesState = {
  data: null,
  paginator: [],
  fetchId: <Activites>null,
  fetchSurvey: <Survey>null,
  error: false,
  loading: false,
  searched: false,
  dataProps: null
};

const reducer: Reducer<ActivitesState> = (state = INITAL_STATE, subects: any) => {
  switch (subects.type) {
    case ActivitesTypes.LOAD_REQUEST_SEARCH_ACTIVITES:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
        searched: false,
      };
    case ActivitesTypes.LOAD_SUCCESS_SEARCH_ACTIVITES:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        searched: true,
        data: subects.payload,
        paginator: subects.payload.paginate,
      };
    case ActivitesTypes.LOAD_FAILURE_SEARCH_ACTIVITES:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        searched: false,
        errors: subects.payload,
      };

    case ActivitesTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case ActivitesTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        fetchId: subects.payload,
      };
    case ActivitesTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: subects.payload,
      };

    case ActivitesTypes.SET_DATA_PROPS:
      return {
        ...state,
        dataProps: subects.payload,
      };
    case ActivitesTypes.CLEAR_DATA_PROPS:
      return {
        ...state,
        dataProps: null,
      };

    case ActivitesTypes.LOAD_REQUEST_FETCH_SURVEY:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case ActivitesTypes.LOAD_SUCCESS_FETCH_SURVEY:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        fetchSurvey: subects.payload,
      };
    case ActivitesTypes.LOAD_FAILURE_FETCH_SURVEY:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: subects.payload,
      };

    case ActivitesTypes.LOAD_REQUEST_SUBMIT_SURVEY:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case ActivitesTypes.LOAD_SUCCESS_SUBMIT_SURVEY:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        fetchSurvey: subects.payload,
      };
    case ActivitesTypes.LOAD_FAILURE_SUBMIT_SURVEY:
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
