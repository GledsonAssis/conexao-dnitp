import i18n from '../../../next-i18next.config';

export default (error, validationFallbackMessage = 'Form.validation.validationFailed') => {
  if (error && error.details && error.details.status === 409) {
    return i18n.t('pages:Profile.error.DuplicateUserName');
  }
  if (error && error.code === 409 && error.messageToken && error.messageToken === 'ConflictedEmail') {
    return i18n.t('pages:Profile.error.DuplicateUserName');
  }
  if (error && error.code === 409) {
    return i18n.t('pages:Profile.error.ConflictedCPF');
  }
  if (error && error.code === 406) {
    return i18n.t('pages:Profile.error.noRoleAssignedForMessageType');
  }
  return error.status === 'validationFailed' ? i18n.t(validationFallbackMessage) : i18n.t('Error.genericError');
};
