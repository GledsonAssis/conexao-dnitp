import React, { useEffect, useState } from 'react';

import * as actionsActions from '@/store/ducks/actions/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormActionPage as Form } from '@/components/forms/Pages/Actions';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { ApplicationState } from '@/store';
import { Action } from '@/store/ducks/actions/types';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const EditActionPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const actionsList = useSelector((state: ApplicationState) => state.actions);
  const { id } = router.query;
  const [data, setData] = useState<Partial<Action>>({});

  function onSubmit(data: any) {
    dispatch(actionsActions.loadSubmitRequest({ ...data, id }));
  }

  useEffect(() => {
    if (actionsList.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [actionsList.submited]);

  useEffect(() => {
    if (id) {
      dispatch(actionsActions.loadFetchRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (actionsList?.dataId) {
      const params = {
        id: actionsList.dataId.id,
        title: actionsList.dataId.title,
        summary: actionsList.dataId.summary,
        description: actionsList.dataId.description,
        attachments: actionsList.dataId.attachments,
        images: actionsList.dataId.images
      }

      setData(params)
    }
  }, [actionsList.dataId]);

  return (
    <>
      {`${data?.id}` === id ?
        <Form
          titlePage={t('pages:actions.labels.edit')}
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

export default function EditAction() {
  return (
    <Template>
      <EditActionPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
