import { Reducer } from 'redux';
import { MessagesState, MessagesTypes, BaseMessages } from './types';

const INITAL_STATE: MessagesState = {
  data: [],
  dataInbox: [],
  dataSend: [],
  dataById: null,
  paginator: [],
  error: false,
  loading: false,
  messagesTypes: [],
  messagesStatus: [],
  userList: [],
  userListFiltered: [],
  institutionsList: [],
  localUnitsList: {
    count: 0,
    rows: [],
  },
  profilesList: [],
  superintendencesList: {
    count: 0,
    rows: [],
  },
  submited: false,
};

const reducer: Reducer<MessagesState> = (state = INITAL_STATE, messages: any) => {
  switch (messages.type) {
    case MessagesTypes.LOAD_REQUEST_FETCH_INBOX:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case MessagesTypes.LOAD_SUCCESS_FETCH_INBOX:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataInbox: messages.payload,
        paginator: messages.payload.paginate,
      };
    case MessagesTypes.LOAD_FAILURE_FETCH_INBOX:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_FETCH_SEND:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case MessagesTypes.LOAD_SUCCESS_FETCH_SEND:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataSend: messages.payload,
        paginator: messages.payload.paginate,
      };
    case MessagesTypes.LOAD_FAILURE_FETCH_SEND:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case MessagesTypes.LOAD_SUCCESS_SUBMIT:
      return {
        ...state,
        submited: true,
        loading: false,
        created: true,
        error: false,
        data: messages.payload,
        paginator: messages.payload.paginate,
      };
    case MessagesTypes.LOAD_FAILURE_SUBMIT:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_SUCCESS_SUBMITATTACHMENT:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        data: messages.payload,
        paginator: messages.payload.paginate,
      };
    case MessagesTypes.LOAD_FAILURE_SUBMITATTACHMENT:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
        created: false,
      };
    case MessagesTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        submited: false,
        loading: false,
        created: true,
        error: false,
        dataById: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        submited: false,
        error: true,
        created: false,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_DELETE:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_DELETE:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        data: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_DELETE:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_MESSAGES_TYPES:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_MESSAGES_TYPES:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        messagesTypes: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_MESSAGES_TYPES:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_MESSAGES_STATUS:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_MESSAGES_STATUS:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        messagesStatus: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_MESSAGES_STATUS:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_LIST_USERS_TO_SEND:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_LIST_USERS_TO_SEND:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        userList: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_LIST_USERS_TO_SEND:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_LIST_USERS_FILTERED:
      return {
        ...state,
        submited: false,
        loading: true,
        userListFiltered: [],
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_LIST_USERS_FILTERED:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        userListFiltered: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_LIST_USERS_FILTERED:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_LIST_PROFILES:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_LIST_PROFILES:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        profilesList: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_LIST_PROFILES:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_LIST_SUPERINTENDENCES:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_LIST_SUPERINTENDENCES:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        superintendencesList: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_LIST_SUPERINTENDENCES:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_LIST_LOCAL_UNITS:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_LIST_LOCAL_UNITS:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        localUnitsList: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_LIST_LOCAL_UNITS:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_LIST_INSTITUTIONS:
      return {
        ...state,
        submited: false,
        loading: true,
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_LIST_INSTITUTIONS:
      return {
        ...state,
        submited: false,
        loading: false,
        error: false,
        institutionsList: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_LIST_INSTITUTIONS:
      return {
        ...state,
        submited: false,
        error: true,
        loading: false,
        errors: messages.payload,
      };
    default:
      return state;
  }
};

export default reducer;
