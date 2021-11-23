import React, { useEffect, useState } from 'react';

import * as actionsProjectsActions from '@/store/ducks/projectsActions/actions';
import * as actionsProjects from '@/store/ducks/projects/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormProjectPage as Form } from '@/components/forms/Pages/ProjectActions';
import { useRouter } from 'next/router';
import { Project, ProjectAction } from '@/store/ducks/projectsActions/types';
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
  const projectsList = useSelector((state: ApplicationState) => state.projects);
  const projectsActionsList = useSelector((state: ApplicationState) => state.projectsActions);
  const [data, setData] = useState<Partial<ProjectAction & { ProjectList: Project[] }>>({});
  const router = useRouter();

  function onSubmit(data: any) {
    dispatch(actionsProjectsActions.loadSubmitRequest(data));
  }

  useEffect(() => {
    if (projectsActionsList.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [projectsActionsList.submited]);

  useEffect(() => {
    dispatch(actionsProjects.loadListRequest({ stage: '' }));
  }, []);

  useEffect(() => {
    if (projectsList.data?.list?.length) {
      const params = {
        ProjectList: projectsList.data.list
      }

      setData(params)
    }
  }, [projectsList.data]);

  return (
    <>
      {data?.ProjectList?.length ?
        <Form
          titlePage={t('pages:projectActions.labels.create')}
          propsModel={propsModel}
          t={t}
          data={data}
          onSubmitHandle={onSubmit} />
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

export default function NewProject() {
  return (
    <Template>
      <NewProjectPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
