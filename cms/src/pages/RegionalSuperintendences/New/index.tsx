import React, { useEffect } from 'react';

import * as actionsRegionalSuperintendences from '@/store/ducks/regionalSuperintendences/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormRegionalSuperintendencesPage as Form } from '@/components/forms/Pages/RegionalSuperintendences';
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

export const NewRegionalSuperintendencePage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const regionalSuperintendence = useSelector((state: ApplicationState) => state.regionalSuperintendences);

  function onSubmit(data: any) {
    dispatch(actionsRegionalSuperintendences.loadSubmitRequest(data));
  }

  useEffect(() => {
    if (regionalSuperintendence.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [regionalSuperintendence.submited]);

  return (
    <Form
      titlePage={t('pages:regionalSuperintendence.labels.create')}
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

export default function NewRegionalSuperintendence() {
  return (
    <Template>
      <NewRegionalSuperintendencePage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
