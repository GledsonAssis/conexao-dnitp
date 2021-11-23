import { Reducer } from 'redux';
import { imageParser } from '@/utils/parsers';
import { TrafficContentsState, TrafficContentsTypes } from './types';

const INITAL_STATE: TrafficContentsState = {
  data: [],
  dataById: {
    images: [],
    rating: null,
    comments: [],
    attachments: [],
  },
  highlights: <any>null,
  paginator: [],
  error: false,
  loading: false,
};

const reducer: Reducer<TrafficContentsState> = (state = INITAL_STATE, trafficContents: any) => {
  switch (trafficContents.type) {
    case TrafficContentsTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case TrafficContentsTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        data: trafficContents.payload,
        paginator: trafficContents.payload.paginate,
      };
    case TrafficContentsTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
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
