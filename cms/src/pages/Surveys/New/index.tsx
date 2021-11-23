import React, { useEffect } from 'react';

import * as actionsSurvey from '@/store/ducks/surveies/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormSurveyPage as Form } from '@/components/forms/Pages/Surveies';
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

export const EditSurveyPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const surveiesList = useSelector((state: ApplicationState) => state.surveies);

  function onSubmit(data: any) {
    dispatch(actionsSurvey.loadSubmitRequest({ ...data, active: true }));
  }

  useEffect(() => {
    if (surveiesList.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [surveiesList.submited]);

  return (
    <>
      <Form
        titlePage={t('pages:surveys.new')}
        propsModel={propsModel}
        t={t}
        onlyView={false}
        onSubmitHandle={onSubmit} />
    </>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function EditSurvey() {
  return (
    <Template>
      <EditSurveyPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
