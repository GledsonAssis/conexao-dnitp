import React, { useEffect } from 'react';

import * as actionsActions from '@/store/ducks/actions/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormActionPage as Form } from '@/components/forms/Pages/Actions';
import { useRouter } from 'next/router';
import { ApplicationState } from '@/store';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const NewActionPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const actionsList = useSelector((state: ApplicationState) => state.actions);

  function onSubmit(data: any) {
    dispatch(actionsActions.loadSubmitRequest(data));
  }

  useEffect(() => {
    if (actionsList.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [actionsList.submited]);

  return (
    <Form
      titlePage={t('pages:actions.labels.create')}
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

export default function NewAction() {
  return (
    <Template>
      <NewActionPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
