import React, { useEffect, useState } from 'react';

import * as actionsDnitLocalUnits from '@/store/ducks/dnitLocalUnits/actions';
import * as actionsInstitutions from '@/store/ducks/institutions/actions';
import * as actionsStates from '@/store/ducks/states/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormInstitutions as Form } from '@/components/forms/Pages/Institutions';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { ApplicationState } from '@/store';
import { Institution } from '@/store/ducks/institutions/types';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const EditInstitutionPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const institution = useSelector((state: ApplicationState) => state.institutions);
  const states = useSelector((state: ApplicationState) => state.states);
  const { id } = router.query;
  const [data, setData] = useState<Partial<Institution>>({});

  function onSubmit(data: any) {
    dispatch(actionsInstitutions.loadSubmitRequest({ ...data, id }));
  }

  useEffect(() => {
    if (institution.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [institution.submited]);

  useEffect(() => {
    if (id) {
      dispatch(actionsStates.loadCitiesListRequest());
      dispatch(actionsDnitLocalUnits.loadListSuperintendencesRequest());
      dispatch(actionsInstitutions.loadFetchRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (institution?.dataId) {
      setData(institution.dataId)
    }
  }, [institution.dataId]);

  return (
    <>
      {`${data?.id}` === id && states?.cities?.length ?
        <Form
          titlePage={t('pages:institutions.labels.edit')}
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

export default function EditInstitution() {
  return (
    <Template>
      <EditInstitutionPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
