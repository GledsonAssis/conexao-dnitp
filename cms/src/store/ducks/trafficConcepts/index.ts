import { Reducer } from 'redux';
import { imageParser } from '@/utils/parsers';
import { TrafficConceptsState, TrafficConceptsTypes } from './types';

const INITAL_STATE: TrafficConceptsState = {
  data: null,
  dataId: null,
  paginator: [],
  error: false,
  loading: false,
  submited: false,
};

const reducer: Reducer<TrafficConceptsState> = (state = INITAL_STATE, trafficConcepts: any) => {
  switch (trafficConcepts.type) {
    case TrafficConceptsTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case TrafficConceptsTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataId: trafficConcepts.payload,
        paginator: trafficConcepts.payload.paginate,
      };
    case TrafficConceptsTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: trafficConcepts.payload,
      };
    case TrafficConceptsTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case TrafficConceptsTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        data: trafficConcepts.payload,
        paginator: trafficConcepts.payload.paginate,
      };
    case TrafficConceptsTypes.LOAD_FAILURE_LIST:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: trafficConcepts.payload,
      };
    case TrafficConceptsTypes.LOAD_REQUEST_DELETE_ID:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case TrafficConceptsTypes.LOAD_SUCCESS_DELETE_ID:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataId: trafficConcepts.payload,
        paginator: trafficConcepts.payload.paginate,
      };
    case TrafficConceptsTypes.LOAD_FAILURE_DELETE_ID:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: trafficConcepts.payload,
      };
    case TrafficConceptsTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case TrafficConceptsTypes.LOAD_SUCCESS_SUBMIT:
      return {
        ...state,
        submited: true,
        loading: false,
        created: true,
        error: false,
        dataId: trafficConcepts.payload,
      };
    case TrafficConceptsTypes.LOAD_FAILURE_SUBMIT:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: trafficConcepts.payload,
      };
    default:
      return state;
  }
};

export default reducer;
