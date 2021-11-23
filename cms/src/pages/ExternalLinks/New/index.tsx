import React, { useEffect } from 'react';

import * as actionsExternalLinks from '@/store/ducks/externalLinks/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormExternalLinksPage as Form } from '@/components/forms/Pages/ExternalLinks';
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

export const NewExternalLinksPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const externalLinksList = useSelector((state: ApplicationState) => state.externalLinks);

  function onSubmit(data: any) {
    dispatch(actionsExternalLinks.loadSubmitRequest(data));
  }

  useEffect(() => {
    if (externalLinksList.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [externalLinksList.submited]);

  return (
    <Form
      titlePage={t('pages:externalLinks.labels.create')}
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

export default function NewExternalLinks() {
  return (
    <Template>
      <NewExternalLinksPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
