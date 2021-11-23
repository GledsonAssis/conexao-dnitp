import React, { useEffect } from 'react';

import * as actionsTrafficContents from '@/store/ducks/trafficContents/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormTrafficContentsPage as Form } from '@/components/forms/Pages/TrafficContents';
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

export const NewTrafficContentPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const trafficContent = useSelector((state: ApplicationState) => state.trafficContents);

  function onSubmit(data: any) {
    dispatch(actionsTrafficContents.loadSubmitRequest(data));
  }

  useEffect(() => {
    if (trafficContent.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [trafficContent.submited]);

  return (
    <Form
      titlePage={t('pages:trafficContents.labels.create')}
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

export default function NewTrafficContent() {
  return (
    <Template>
      <NewTrafficContentPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
