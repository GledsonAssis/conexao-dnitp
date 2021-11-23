import React, { useEffect } from 'react';

import * as actionsCourses from '@/store/ducks/courses/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormCoursePage as Form } from '@/components/forms/Pages/Courses';
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

export const NewCoursePage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const coursesList = useSelector((state: ApplicationState) => state.courses);

  function onSubmit(data: any) {
    dispatch(actionsCourses.loadSubmitRequest(data));
  }

  useEffect(() => {
    if (coursesList.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [coursesList.submited]);

  return (
    <Form
      titlePage={t('pages:courses.labels.create')}
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

export default function NewCourse() {
  return (
    <Template>
      <NewCoursePage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
