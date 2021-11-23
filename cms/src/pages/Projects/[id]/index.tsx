import React, { useEffect, useState } from 'react';

import * as actionsProjects from '@/store/ducks/projects/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormProjectPage as Form } from '@/components/forms/Pages/Projects';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { ApplicationState } from '@/store';
import { Project } from '@/store/ducks/projects/types';

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
  const projectsList = useSelector((state: ApplicationState) => state.projects);
  const { id } = router.query;
  const [data, setData] = useState<Partial<Project>>({});

  function onSubmit(data: any) {
    dispatch(actionsProjects.loadSubmitRequest({ ...data, id }));
  }

  useEffect(() => {
    if (projectsList.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [projectsList.submited]);

  useEffect(() => {
    if (id) {
      dispatch(actionsProjects.loadFetchRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (projectsList?.dataId) {
      const params = {
        id: projectsList.dataId.id,
        title: projectsList.dataId.title,
        summary: projectsList.dataId.summary,
        description: projectsList.dataId.description,
        attachments: projectsList.dataId.attachments,
        images: projectsList.dataId.images
      }

      setData(params)
    }
  }, [projectsList.dataId]);

  return (
    <>
      {`${data?.id}` === id ?
        <Form
          titlePage={t('pages:projects.labels.edit')}
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
