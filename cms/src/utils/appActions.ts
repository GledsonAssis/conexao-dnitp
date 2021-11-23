// import { createAction } from 'redux-actions';

import Session from './Session';

const CONTEXT = 'APP';

export const LOGOUT = `${CONTEXT}/LOG_OUT`;
// export const logoutAction = createAction(LOGOUT);

export const handleLogout = (history: string[]) => (dispatch: (arg0: any) => void) => {
  Session.logout();
  // dispatch(logoutAction());
  history.push('/login');
};
