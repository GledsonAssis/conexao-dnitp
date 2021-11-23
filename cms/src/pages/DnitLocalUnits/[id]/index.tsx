import React, { useEffect, useState } from 'react';

import * as actionsDnitLocalUnits from '@/store/ducks/dnitLocalUnits/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormDnitLocalUnitsPage as Form } from '@/components/forms/Pages/DnitLocalUnits';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { ApplicationState } from '@/store';
import { DnitLocalUnit } from '@/store/ducks/dnitLocalUnits/types';
import * as actionsStates from '@/store/ducks/states/actions';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const EditDnitLocalUnitPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const dnitLocalUnit = useSelector((state: ApplicationState) => state.dnitLocalUnits);
  const states = useSelector((state: ApplicationState) => state.states);
  const { id } = router.query;
  const [data, setData] = useState<Partial<DnitLocalUnit>>({});

  function onSubmit(data: any) {
    dispatch(actionsDnitLocalUnits.loadSubmitRequest({ ...data, id }));
  }

  useEffect(() => {
    if (dnitLocalUnit.submited) {
      router.replace(router.asPath.substring(0, router.asPath.indexOf('/', 1)));
    }
  }, [dnitLocalUnit.submited]);

  useEffect(() => {
    if (id) {
      dispatch(actionsStates.loadCitiesListRequest());
      dispatch(actionsDnitLocalUnits.loadListSuperintendencesRequest());
      dispatch(actionsDnitLocalUnits.loadFetchRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (dnitLocalUnit?.dataId) {
      setData(dnitLocalUnit.dataId)
    }
  }, [dnitLocalUnit.dataId]);

  return (
    <>
      {`${data?.id}` === id && states.cities.length ?
        <Form
          titlePage={t('pages:dnitLocalUnits.labels.editTitle')}
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

export default function EditDnitLocalUnit() {
  return (
    <Template>
      <EditDnitLocalUnitPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
