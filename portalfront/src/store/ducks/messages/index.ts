import { Reducer } from 'redux';
import { MessagesState, MessagesTypes, BaseMessages } from './types';

const INITAL_STATE: MessagesState = {
  data: [],
  cronCheck: false,
  dataInbox: [],
  dataSend: [],
  dataById: null,
  paginator: [],
  error: false,
  loading: false,
  messagesTypes: [],
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
};

const reducer: Reducer<MessagesState> = (state = INITAL_STATE, messages: any) => {
  switch (messages.type) {
    case MessagesTypes.LOAD_REQUEST_FETCH_INBOX:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case MessagesTypes.LOAD_SUCCESS_FETCH_INBOX:
      if (messages.payload.cron) {
        return {
          ...state,
          loading: false,
          created: true,
          cronCheck: true,
          error: false,
          dataInbox: messages.payload.data,
          paginator: messages.payload.paginate,
        };
      } else {
        return {
          ...state,
          loading: false,
          created: true,
          error: false,
          dataInbox: messages.payload.data,
          paginator: messages.payload.paginate,
        };
      }
    case MessagesTypes.LOAD_FAILURE_FETCH_INBOX:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_FETCH_SEND:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case MessagesTypes.LOAD_SUCCESS_FETCH_SEND:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        dataSend: messages.payload,
        paginator: messages.payload.paginate,
      };
    case MessagesTypes.LOAD_FAILURE_FETCH_SEND:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_SUBMIT:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case MessagesTypes.LOAD_SUCCESS_SUBMIT:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        data: messages.payload,
        paginator: messages.payload.paginate,
      };
    case MessagesTypes.LOAD_FAILURE_SUBMIT:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_SUCCESS_SUBMITATTACHMENT:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        data: messages.payload,
        paginator: messages.payload.paginate,
      };
    case MessagesTypes.LOAD_FAILURE_SUBMITATTACHMENT:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_FETCH_ID:
      return {
        ...state,
        loading: true,
        error: false,
        created: false,
      };
    case MessagesTypes.LOAD_SUCCESS_FETCH_ID:
      return {
        ...state,
        loading: false,
        created: true,
        error: false,
        dataById: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_FETCH_ID:
      return {
        ...state,
        error: true,
        created: false,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_DELETE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_DELETE:
      return {
        ...state,
        loading: false,
        error: false,
        data: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_DELETE:
      return {
        ...state,
        error: true,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_MESSAGES_TYPES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_MESSAGES_TYPES:
      return {
        ...state,
        loading: false,
        error: false,
        messagesTypes: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_MESSAGES_TYPES:
      return {
        ...state,
        error: true,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_LIST_USERS_TO_SEND:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_LIST_USERS_TO_SEND:
      return {
        ...state,
        loading: false,
        error: false,
        userList: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_LIST_USERS_TO_SEND:
      return {
        ...state,
        error: true,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_LIST_USERS_FILTERED:
      return {
        ...state,
        loading: true,
        userListFiltered: [],
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_LIST_USERS_FILTERED:
      return {
        ...state,
        loading: false,
        error: false,
        userListFiltered: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_LIST_USERS_FILTERED:
      return {
        ...state,
        error: true,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_LIST_PROFILES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_LIST_PROFILES:
      return {
        ...state,
        loading: false,
        error: false,
        profilesList: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_LIST_PROFILES:
      return {
        ...state,
        error: true,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_LIST_SUPERINTENDENCES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_LIST_SUPERINTENDENCES:
      return {
        ...state,
        loading: false,
        error: false,
        superintendencesList: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_LIST_SUPERINTENDENCES:
      return {
        ...state,
        error: true,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_LIST_LOCAL_UNITS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_LIST_LOCAL_UNITS:
      return {
        ...state,
        loading: false,
        error: false,
        localUnitsList: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_LIST_LOCAL_UNITS:
      return {
        ...state,
        error: true,
        loading: false,
        errors: messages.payload,
      };

    case MessagesTypes.LOAD_REQUEST_LIST_INSTITUTIONS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case MessagesTypes.LOAD_SUCCESS_LIST_INSTITUTIONS:
      return {
        ...state,
        loading: false,
        error: false,
        institutionsList: messages.payload,
      };
    case MessagesTypes.LOAD_FAILURE_LIST_INSTITUTIONS:
      return {
        ...state,
        error: true,
        loading: false,
        errors: messages.payload,
      };
    default:
      return state;
  }
};

export default reducer;
