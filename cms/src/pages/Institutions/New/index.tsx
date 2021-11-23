import React, { useEffect } from 'react';

import * as actionsDnitLocalUnits from '@/store/ducks/dnitLocalUnits/actions';
import * as actionsInstitutions from '@/store/ducks/institutions/actions';
import * as actionsStates from '@/store/ducks/states/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormInstitutions as Form } from '@/components/forms/Pages/Institutions';
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

export const NewInstitutionPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const institution = useSelector((state: ApplicationState) => state.institutions);

  function onSubmit(data: any) {
    dispatch(actionsInstitutions.loadSubmitRequest(data));
  }

  useEffect(() => {
    if (institution.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [institution.submited]);

  useEffect(() => {
    dispatch(actionsStates.loadCitiesListRequest());
    dispatch(actionsDnitLocalUnits.loadListSuperintendencesRequest());
  }, []);

  return (
    <Form
      titlePage={t('pages:institutions.labels.new')}
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

export default function NewInstitution() {
  return (
    <Template>
      <NewInstitutionPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
