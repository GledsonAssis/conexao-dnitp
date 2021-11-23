import React, { useEffect, useState } from 'react';

import * as actionsRegionalSuperintendences from '@/store/ducks/regionalSuperintendences/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormRegionalSuperintendencesPage as Form } from '@/components/forms/Pages/RegionalSuperintendences';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { ApplicationState } from '@/store';
import { RegionalSuperintendence } from '@/store/ducks/regionalSuperintendences/types';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const EditRegionalSuperintendencePage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const regionalSuperintendence = useSelector((state: ApplicationState) => state.regionalSuperintendences);
  const { id } = router.query;
  const [data, setData] = useState<Partial<RegionalSuperintendence>>({});

  function onSubmit(data: any) {
    dispatch(actionsRegionalSuperintendences.loadSubmitRequest({ ...data, id }));
  }

  useEffect(() => {
    if (regionalSuperintendence.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [regionalSuperintendence.submited]);

  useEffect(() => {
    if (id) {
      dispatch(actionsRegionalSuperintendences.loadFetchRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (regionalSuperintendence?.dataId) {
      setData(regionalSuperintendence.dataId)
    }
  }, [regionalSuperintendence.dataId]);

  return (
    <>
      {`${data?.id}` === id ?
        <Form
          titlePage={t('pages:regionalSuperintendence.labels.edit')}
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

export default function EditRegionalSuperintendence() {
  return (
    <Template>
      <EditRegionalSuperintendencePage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
