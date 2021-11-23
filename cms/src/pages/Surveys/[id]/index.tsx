import React, { useEffect, useState } from 'react';

import * as actionsSurvey from '@/store/ducks/surveies/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormSurveyPage as Form } from '@/components/forms/Pages/Surveies';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { ApplicationState } from '@/store';
import { Survey } from '@/store/ducks/surveies/types';

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
  const { id } = router.query;
  const [data, setData] = useState<Partial<Survey>>({});

  function onSubmit(data: any) {
    dispatch(actionsSurvey.loadSubmitRequest(data));
  }

  useEffect(() => {
    if (surveiesList.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [surveiesList.submited]);

  useEffect(() => {
    if (id) {
      dispatch(actionsSurvey.loadFetchRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (surveiesList?.dataId) {
      const params = {
        ...surveiesList.dataId,
      }

      setData(params)
    }
  }, [surveiesList.dataId]);

  return (
    <>
      {`${data?.id}` === id ?
        <Form
          titlePage={!data?.active ? t('pages:surveys.view') : t('pages:surveys.edit')}
          propsModel={propsModel}
          t={t}
          onlyView={!data?.active}
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

export default function EditSurvey() {
  return (
    <Template>
      <EditSurveyPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
