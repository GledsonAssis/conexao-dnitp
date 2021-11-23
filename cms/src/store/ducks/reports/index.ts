import { Reducer } from 'redux';
import { ReportsState, ReportsTypes } from './types';

const INITAL_STATE: ReportsState = {
  initiatives: [],
  interactivities: [],
  projects: [],
  messages: [],
  downloads: [],
  surveies: [],
  participants: [],
  loading: false,
  error: false
};

const reducer: Reducer<ReportsState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case ReportsTypes.LOAD_REPORTS_INITIATIVES_REQUEST_LIST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ReportsTypes.LOAD_REPORTS_INITIATIVES_SUCCESS_LIST:
      return {
        ...state,
        initiatives: action.payload,
        loading: false,
        error: false,
      };
    case ReportsTypes.LOAD_REPORTS_INITIATIVES_FAILURE_LIST:
      return {
        ...state,
        initiatives: [],
        loading: false,
        error: true,
      };

    case ReportsTypes.LOAD_REPORTS_INTERACTIVITIES_REQUEST_LIST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ReportsTypes.LOAD_REPORTS_INTERACTIVITIES_SUCCESS_LIST:
      return {
        ...state,
        interactivities: action.payload,
        loading: false,
        error: false,
      };
    case ReportsTypes.LOAD_REPORTS_INTERACTIVITIES_FAILURE_LIST:
      return {
        ...state,
        interactivities: [],
        loading: false,
        error: true,
      };

    case ReportsTypes.LOAD_REPORTS_PROJECTS_REQUEST_LIST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ReportsTypes.LOAD_REPORTS_PROJECTS_SUCCESS_LIST:
      return {
        ...state,
        projects: action.payload,
        loading: false,
        error: false,
      };
    case ReportsTypes.LOAD_REPORTS_PROJECTS_FAILURE_LIST:
      return {
        ...state,
        projects: [],
        loading: false,
        error: true,
      };

    case ReportsTypes.LOAD_REPORTS_MESSAGES_REQUEST_LIST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ReportsTypes.LOAD_REPORTS_MESSAGES_SUCCESS_LIST:
      return {
        ...state,
        messages: action.payload,
        loading: false,
        error: false,
      };
    case ReportsTypes.LOAD_REPORTS_MESSAGES_FAILURE_LIST:
      return {
        ...state,
        messages: [],
        loading: false,
        error: true,
      };

    case ReportsTypes.LOAD_REPORTS_DOWNLOADS_REQUEST_LIST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ReportsTypes.LOAD_REPORTS_DOWNLOADS_SUCCESS_LIST:
      return {
        ...state,
        downloads: action.payload,
        loading: false,
        error: false,
      };
    case ReportsTypes.LOAD_REPORTS_DOWNLOADS_FAILURE_LIST:
      return {
        ...state,
        downloads: [],
        loading: false,
        error: true,
      };

    case ReportsTypes.LOAD_REPORTS_SURVEIES_REQUEST_LIST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ReportsTypes.LOAD_REPORTS_SURVEIES_SUCCESS_LIST:
      return {
        ...state,
        surveies: action.payload,
        loading: false,
        error: false,
      };
    case ReportsTypes.LOAD_REPORTS_SURVEIES_FAILURE_LIST:
      return {
        ...state,
        surveies: [],
        loading: false,
        error: true,
      };

    case ReportsTypes.LOAD_REPORTS_PARTICIPANTS_REQUEST_LIST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ReportsTypes.LOAD_REPORTS_PARTICIPANTS_SUCCESS_LIST:
      return {
        ...state,
        participants: action.payload,
        loading: false,
        error: false,
      };
    case ReportsTypes.LOAD_REPORTS_PARTICIPANTS_FAILURE_LIST:
      return {
        ...state,
        participants: [],
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default reducer;
