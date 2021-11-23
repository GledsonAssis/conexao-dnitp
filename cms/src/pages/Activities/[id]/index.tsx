import React, { useEffect, useState } from 'react';

import * as actionsActivities from '@/store/ducks/activities/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormActivitiesPage as Form } from '@/components/forms/Pages/Activities';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { ApplicationState } from '@/store';
import { Activity } from '@/store/ducks/activities/types';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const EditActivityPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const activities = useSelector((state: ApplicationState) => state.activities);
  const { id } = router.query;
  const [data, setData] = useState<Partial<Activity>>({});

  function onSubmit(data: any) {
    dispatch(actionsActivities.loadSubmitRequest({ ...data, id: +id }));
  }

  useEffect(() => {
    if (activities.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [activities.submited]);

  useEffect(() => {
    if (id) {
      dispatch(actionsActivities.loadFetchIdRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (activities?.dataId) {
      setData(activities.dataId)
    }
  }, [activities.dataId]);

  return (
    <>
      {`${data?.id}` === id ?
        <Form
          titlePage={t('pages:activities.labels.edit')}
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

export default function EditActivity() {
  return (
    <Template>
      <EditActivityPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
