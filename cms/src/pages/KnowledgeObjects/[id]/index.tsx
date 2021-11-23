import React, { useEffect, useState } from 'react';

import * as actionsKnowledgeObjects from '@/store/ducks/knowledgeObjects/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormKnowledgeObjects as Form } from '@/components/forms/Pages/KnowledgeObjects';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { ApplicationState } from '@/store';
import { KnowledgeObject } from '@/store/ducks/knowledgeObjects/types';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const EditKnowledgeObjectPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const knowledgeObjects = useSelector((state: ApplicationState) => state.knowledgeObjects);
  const { id } = router.query;
  const [data, setData] = useState<Partial<KnowledgeObject>>({});

  function onSubmit(data: any) {
    dispatch(actionsKnowledgeObjects.loadSubmitRequest({ ...data, id }));
  }

  useEffect(() => {
    if (knowledgeObjects.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [knowledgeObjects.submited]);

  useEffect(() => {
    if (id) {
      dispatch(actionsKnowledgeObjects.loadFetchRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (knowledgeObjects?.dataId) {
      setData(knowledgeObjects.dataId)
    }
  }, [knowledgeObjects.dataId]);

  return (
    <>
      {`${data?.id}` === id ?
        <Form
          titlePage={t('pages:knowledgeObject.labels.edit')}
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

export default function EditKnowledgeObject() {
  return (
    <Template>
      <EditKnowledgeObjectPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
