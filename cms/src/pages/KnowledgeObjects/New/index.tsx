import React, { useEffect } from 'react';

import * as actionsKnowledgeObjects from '@/store/ducks/knowledgeObjects/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormKnowledgeObjects as Form } from '@/components/forms/Pages/KnowledgeObjects';
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

export const NewInstitutionPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const knowledgeObjects = useSelector((state: ApplicationState) => state.knowledgeObjects);

  function onSubmit(data: any) {
    dispatch(actionsKnowledgeObjects.loadSubmitRequest(data));
  }

  useEffect(() => {
    if (knowledgeObjects.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [knowledgeObjects.submited]);


  return (
    <Form
      titlePage={t('pages:knowledgeObject.labels.new')}
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

export default function NewInstitution() {
  return (
    <Template>
      <NewInstitutionPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
