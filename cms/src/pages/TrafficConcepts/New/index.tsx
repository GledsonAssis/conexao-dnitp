import React, { useEffect } from 'react';

import * as actionsTrafficConcepts from '@/store/ducks/trafficConcepts/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormTrafficConceptsPage as Form } from '@/components/forms/Pages/TrafficConcepts';
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

export const NewTrafficConceptPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const trafficConcept = useSelector((state: ApplicationState) => state.trafficConcepts);

  function onSubmit(data: any) {
    dispatch(actionsTrafficConcepts.loadSubmitRequest(data));
  }

  useEffect(() => {
    if (trafficConcept.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [trafficConcept.submited]);

  return (
    <Form
      titlePage={t('pages:trafficConcepts.labels.create')}
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

export default function NewTrafficConcept() {
  return (
    <Template>
      <NewTrafficConceptPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
