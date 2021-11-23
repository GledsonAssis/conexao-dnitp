import { Reducer } from 'redux';
import { ExternalApisState, ExternalApisTypes } from './types';

const INITAL_STATE: ExternalApisState = {
  data: null,
  error: false,
  loading: false,
};

const reducer: Reducer<ExternalApisState> = (state = INITAL_STATE, action: any) => {
  switch (action.type) {
    case ExternalApisTypes.ViaCepTypes.LOAD_REQUEST_GET_ZIPOCODE:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case ExternalApisTypes.ViaCepTypes.LOAD_SUCCESS_GET_ZIPOCODE:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        data: {
          ...state.data,
          viaCep: action.payload
        },
      };
    case ExternalApisTypes.ViaCepTypes.LOAD_FAILURE_GET_ZIPOCODE:
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
