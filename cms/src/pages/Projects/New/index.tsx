import React, { useEffect } from 'react';

import * as actionsProjects from '@/store/ducks/projects/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormProjectPage as Form } from '@/components/forms/Pages/Projects';
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

export const NewProjectPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const projectsList = useSelector((state: ApplicationState) => state.projects);

  function onSubmit(data: any) {
    dispatch(actionsProjects.loadSubmitRequest(data));
  }

  useEffect(() => {
    if (projectsList.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [projectsList.submited]);

  return (
    <Form
      titlePage={t('pages:projects.labels.create')}
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

export default function NewProject() {
  return (
    <Template>
      <NewProjectPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
