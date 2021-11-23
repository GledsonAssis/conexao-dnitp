import React, { useEffect } from 'react';

import * as actionsDnitLocalUnits from '@/store/ducks/dnitLocalUnits/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormDnitLocalUnitsPage as Form } from '@/components/forms/Pages/DnitLocalUnits';
import { useRouter } from 'next/router';
import * as actionsStates from '@/store/ducks/states/actions';
import { ApplicationState } from '@/store';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const NewDnitLocalUnitPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const dnitLocalUnit = useSelector((state: ApplicationState) => state.dnitLocalUnits);

  function onSubmit(data: any) {
    dispatch(actionsDnitLocalUnits.loadSubmitRequest(data));
  }

  useEffect(() => {
    if (dnitLocalUnit.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [dnitLocalUnit.submited]);

  useEffect(() => {
    dispatch(actionsStates.loadCitiesListRequest());
    dispatch(actionsDnitLocalUnits.loadListSuperintendencesRequest());
  }, []);

  return (
    <Form
      titlePage={t('pages:dnitLocalUnits.labels.newTitle')}
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

export default function NewDnitLocalUnit() {
  return (
    <Template>
      <NewDnitLocalUnitPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
