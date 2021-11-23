import React, { useEffect, useState } from 'react';

import * as actionsInitiatives from '@/store/ducks/initiatives/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { JustifyForm as Form } from '@/components/forms/Pages/Initiatives';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { ApplicationState } from '@/store';
import { Initiative } from '@/store/ducks/initiatives/types';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const EditInitiativePage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const initiatives = useSelector((state: ApplicationState) => state.initiatives);
  const { id } = router.query;
  const [data, setData] = useState<Partial<Initiative>>({});

  function onSubmit(data: any) {
    dispatch(actionsInitiatives.loadSubmitRequest({ ...data, idInitiative: +id, typeList: 'evaluate' }));
  }

  useEffect(() => {
    if (initiatives.submited) {
      router.replace(router.asPath.substring(0, router.asPath.lastIndexOf('/')));
    }
  }, [initiatives.submited]);

  useEffect(() => {
    if (id) {
      dispatch(actionsInitiatives.loadFetchRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (initiatives?.dataId) {
      setData(initiatives.dataId)
    }
  }, [initiatives.dataId]);

  return (
    <>
      {`${data?.id}` === id ?
        <Form
          titlePage={t('pages:initiatives.details.pageTitle.evaluate')}
          onSubmitHandle={onSubmit}
          t={t}
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

export default function EditInitiative() {
  return (
    <Template>
      <EditInitiativePage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
