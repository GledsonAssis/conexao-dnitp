import React, { useEffect, useState } from 'react';

import * as actionsUsers from '@/store/ducks/users/actions';
import * as actionsDnitLocalUnits from '@/store/ducks/dnitLocalUnits/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormUsersPage as Form } from '@/components/forms/Pages/Users';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { ApplicationState } from '@/store';
import { User } from '@/store/ducks/users/types';
import * as actionsStates from '@/store/ducks/states/actions';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const EditUserPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const users = useSelector((state: ApplicationState) => state.users);
  const states = useSelector((state: ApplicationState) => state.states);
  const { id } = router.query;
  const [data, setData] = useState<Partial<User>>({});

  function onSubmit(data: any) {
    dispatch(actionsUsers.loadSubmitRequest({ ...data, id: +id }));
  }

  useEffect(() => {
    if (users.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [users.submited]);

  useEffect(() => {
    if (id) {
      dispatch(actionsStates.loadCitiesListRequest());
      dispatch(actionsStates.loadListRequest());
      dispatch(actionsDnitLocalUnits.loadListSuperintendencesRequest());
      dispatch(actionsUsers.loadRolesRequest());
      dispatch(actionsUsers.loadFetchRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (users?.dataId) {
      setData(users.dataId)
    }
  }, [users.dataId]);

  return (
    <>
      {`${data?.id}` === id && states.cities.length ?
        <Form
          titlePage={t('pages:users.details.labels.editTitle')}
          propsModel={propsModel}
          t={t}
          onSubmitHandle={onSubmit}
          data={data} />
        :
        <div className="mt-5 loading medium" />
      }
    </>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => ({
  paths: [],
  fallback: true,
});

export default function EditUser() {
  return (
    <Template>
      <EditUserPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
