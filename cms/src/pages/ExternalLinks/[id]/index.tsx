import React, { useEffect, useState } from 'react';

import * as actionsExternalLinks from '@/store/ducks/externalLinks/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormExternalLinksPage as Form } from '@/components/forms/Pages/ExternalLinks';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { ApplicationState } from '@/store';
import { ExternalLinks } from '@/store/ducks/externalLinks/types';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const EditExternalLinksPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const externalLinksList = useSelector((state: ApplicationState) => state.externalLinks);
  const { id } = router.query;
  const [data, setData] = useState<Partial<ExternalLinks>>({});

  function onSubmit(data: any) {
    dispatch(actionsExternalLinks.loadSubmitRequest({ ...data, id }));
  }

  useEffect(() => {
    if (externalLinksList.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [externalLinksList.submited]);

  useEffect(() => {
    if (id) {
      dispatch(actionsExternalLinks.loadFetchRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (externalLinksList?.dataId) {
      const params = {
        id: externalLinksList.dataId.id,
        title: externalLinksList.dataId.title,
        link: externalLinksList.dataId.link,
        summary: externalLinksList.dataId.summary,
        description: externalLinksList.dataId.description,
      }

      setData(params)
    }
  }, [externalLinksList.dataId]);

  return (
    <>
      {`${data?.id}` === id ?
        <Form
          titlePage={t('pages:externalLinks.labels.edit')}
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

export default function EditExternalLinks() {
  return (
    <Template>
      <EditExternalLinksPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
