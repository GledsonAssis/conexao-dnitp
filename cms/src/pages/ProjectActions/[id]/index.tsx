import React, { useEffect, useState } from 'react';

import * as actionsProjectActions from '@/store/ducks/projectsActions/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormProjectPage as Form } from '@/components/forms/Pages/ProjectActions';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { ApplicationState } from '@/store';
import { Project, ProjectAction } from '@/store/ducks/projectsActions/types';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const EditProjectPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const projectsActionsList = useSelector((state: ApplicationState) => state.projectsActions);
  const { id } = router.query;
  const [data, setData] = useState<Partial<ProjectAction & { ProjectList: Project[] }>>({});

  function onSubmit(data: any) {
    dispatch(actionsProjectActions.loadSubmitRequest({ ...data, id }));
  }

  useEffect(() => {
    if (projectsActionsList.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [projectsActionsList.submited]);

  useEffect(() => {
    if (id) {
      dispatch(actionsProjectActions.loadFetchRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (projectsActionsList?.dataId) {
      const params = {
        id: projectsActionsList.dataId.id,
        title: projectsActionsList.dataId.title,
        summary: projectsActionsList.dataId.summary,
        description: projectsActionsList.dataId.description,
        attachments: projectsActionsList.dataId.attachments,
        images: projectsActionsList.dataId.images,
        idProject: projectsActionsList.dataId.idProject,
      }

      setData(params)
    }
  }, [projectsActionsList.dataId]);

  return (
    <>
      {`${data?.id}` === id ?
        <Form
          titlePage={t('pages:projectActions.labels.edit')}
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

export default function EditProject() {
  return (
    <Template>
      <EditProjectPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
