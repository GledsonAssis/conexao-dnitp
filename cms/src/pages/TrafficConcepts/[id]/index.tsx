import React, { useEffect, useState } from 'react';

import * as actionsTrafficConcepts from '@/store/ducks/trafficConcepts/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormTrafficConceptsPage as Form } from '@/components/forms/Pages/TrafficConcepts';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { ApplicationState } from '@/store';
import { TrafficConcept } from '@/store/ducks/trafficConcepts/types';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const EditTrafficConceptPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const trafficConcept = useSelector((state: ApplicationState) => state.trafficConcepts);
  const { id } = router.query;
  const [data, setData] = useState<Partial<TrafficConcept>>({});

  function onSubmit(data: any) {
    dispatch(actionsTrafficConcepts.loadSubmitRequest({ ...data, id }));
  }

  useEffect(() => {
    if (trafficConcept.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [trafficConcept.submited]);

  useEffect(() => {
    if (id) {
      dispatch(actionsTrafficConcepts.loadFetchRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (trafficConcept?.dataId) {
      setData(trafficConcept.dataId)
    }
  }, [trafficConcept.dataId]);

  return (
    <>
      {`${data?.id}` === id ?
        <Form
          titlePage={t('pages:trafficConcepts.labels.edit')}
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

export default function EditTrafficConcept() {
  return (
    <Template>
      <EditTrafficConceptPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
