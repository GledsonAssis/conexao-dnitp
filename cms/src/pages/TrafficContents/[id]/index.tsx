import React, { useEffect, useState } from 'react';

import * as actionsTrafficContents from '@/store/ducks/trafficContents/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormTrafficContentsPage as Form } from '@/components/forms/Pages/TrafficContents';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { ApplicationState } from '@/store';
import { TrafficContent } from '@/store/ducks/trafficContents/types';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const EditTrafficContentPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const trafficContent = useSelector((state: ApplicationState) => state.trafficContents);
  const { id } = router.query;
  const [data, setData] = useState<Partial<TrafficContent>>({});

  function onSubmit(data: any) {
    dispatch(actionsTrafficContents.loadSubmitRequest({ ...data, id: +id }));
  }

  useEffect(() => {
    if (trafficContent.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [trafficContent.submited]);


  useEffect(() => {
    if (id) {
      dispatch(actionsTrafficContents.loadFetchRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (trafficContent?.dataId) {
      setData(trafficContent.dataId)
    }
  }, [trafficContent.dataId]);

  return (
    <>
      {`${data?.id}` === id ?
        <Form
          titlePage={t('pages:trafficContents.labels.edit')}
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

export default function EditTrafficContent() {
  return (
    <Template>
      <EditTrafficContentPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
