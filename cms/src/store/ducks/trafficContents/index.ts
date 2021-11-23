import { Reducer } from 'redux';
import { imageParser } from '@/utils/parsers';
import { TrafficContentsState, TrafficContentsTypes } from './types';

const INITAL_STATE: TrafficContentsState = {
  data: null,
  dataId: null,
  paginator: [],
  error: false,
  loading: false,
  submited: false,
};

const reducer: Reducer<TrafficContentsState> = (state = INITAL_STATE, trafficContents: any) => {
  switch (trafficContents.type) {
    case TrafficContentsTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case TrafficContentsTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataId: trafficContents.payload,
        paginator: trafficContents.payload.paginate,
      };
    case TrafficContentsTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: trafficContents.payload,
      };
    case TrafficContentsTypes.LOAD_REQUEST_LIST:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case TrafficContentsTypes.LOAD_SUCCESS_LIST:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        data: trafficContents.payload,
        paginator: trafficContents.payload.paginate,
      };
    case TrafficContentsTypes.LOAD_FAILURE_LIST:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: trafficContents.payload,
      };
    case TrafficContentsTypes.LOAD_REQUEST_DELETE_ID:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case TrafficContentsTypes.LOAD_SUCCESS_DELETE_ID:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataId: trafficContents.payload,
        paginator: trafficContents.payload.paginate,
      };
    case TrafficContentsTypes.LOAD_FAILURE_DELETE_ID:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: trafficContents.payload,
      };
    case TrafficContentsTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case TrafficContentsTypes.LOAD_SUCCESS_SUBMIT:
      return {
        ...state,
        submited: true,
        loading: false,
        created: true,
        error: false,
        dataId: trafficContents.payload,
      };
    case TrafficContentsTypes.LOAD_FAILURE_SUBMIT:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: trafficContents.payload,
      };
    default:
      return state;
  }
};

export default reducer;
