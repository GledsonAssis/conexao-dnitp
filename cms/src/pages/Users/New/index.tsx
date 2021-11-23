import React, { useEffect } from 'react';

import * as actionsUsers from '@/store/ducks/users/actions';
import * as actionsDnitLocalUnits from '@/store/ducks/dnitLocalUnits/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormUsersPage as Form } from '@/components/forms/Pages/Users';
import { useRouter } from 'next/router';
import * as actionsStates from '@/store/ducks/states/actions';
import { ApplicationState } from '@/store';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const NewUserPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const users = useSelector((state: ApplicationState) => state.users);

  function onSubmit(data: any) {
    dispatch(actionsUsers.loadSubmitRequest(data));
  }

  useEffect(() => {
    if (users.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [users.submited]);

  useEffect(() => {
    dispatch(actionsStates.loadCitiesListRequest());
    dispatch(actionsStates.loadListRequest());
    dispatch(actionsUsers.loadRolesRequest());
    dispatch(actionsDnitLocalUnits.loadListSuperintendencesRequest());
  }, []);

  return (
    <Form
      titlePage={t('pages:users.details.labels.newTitle')}
      propsModel={propsModel}
      t={t}
      onSubmitHandle={onSubmit} />
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function NewUser() {
  return (
    <Template>
      <NewUserPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
