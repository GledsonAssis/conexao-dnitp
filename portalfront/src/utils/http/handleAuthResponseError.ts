import history from '../history';

import { handleLogout } from '../appActions';
import i18n from '../../../next-i18next.config';

// import {
//   TOAST_WARNING,
//   toastMessage,
// } from '../Toast';

import AuthError from './AuthError';

const handleAuth =
  (cb = () => { }, dispatch) =>
    (error) => {
      if (error instanceof AuthError) {
        // handleLogout(history)(dispatch);
        console.log(i18n.t('general:Auth.error'));
        // toastMessage(i18n.t('general:Auth.error'), TOAST_WARNING);
      } else {
        console.log(error);
        // cb(error);
      }
    };

export default handleAuth;
