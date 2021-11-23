import React, { useEffect, useState } from 'react';

import * as actionsCourses from '@/store/ducks/courses/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormCoursePage as Form } from '@/components/forms/Pages/Courses';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { ApplicationState } from '@/store';
import { Course } from '@/store/ducks/courses/types';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const EditCoursePage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const coursesList = useSelector((state: ApplicationState) => state.courses);
  const { id } = router.query;
  const [data, setData] = useState<Partial<Course>>({});

  function onSubmit(data: any) {
    dispatch(actionsCourses.loadSubmitRequest({ ...data, id }));
  }

  useEffect(() => {
    if (coursesList.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [coursesList.submited]);

  useEffect(() => {
    if (id) {
      dispatch(actionsCourses.loadFetchRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (coursesList?.dataId) {
      const params = {
        id: coursesList.dataId.id,
        type: coursesList.dataId.type,
        title: coursesList.dataId.title,
        summary: coursesList.dataId.summary,
        link: coursesList.dataId.link,
        description: coursesList.dataId.description,
        attachments: coursesList.dataId.attachments,
        images: coursesList.dataId.images
      }

      setData(params)
    }
  }, [coursesList.dataId]);

  return (
    <>
      {`${data?.id}` === id ?
        <Form
          titlePage={t('pages:courses.labels.edit')}
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

export default function EditCourse() {
  return (
    <Template>
      <EditCoursePage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
