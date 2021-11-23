import React, { useEffect, useState } from 'react';

import * as actionsTrafficContents from '@/store/ducks/trafficContents/actions';
import * as actionsSchoolYears from '@/store/ducks/schoolYear/actions';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Template from '@/components/layout';
import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Table, TBody, THead, SearchTrigger, ActionTrigger } from '@/components/shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import { useRouter } from 'next/router';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const HomePage: React.FC<Props> = ({ propsModel, t }) => {
  const trafficContents = useSelector((state: ApplicationState) => state.trafficContents);
  const schoolYears = useSelector((state: ApplicationState) => state.schoolYears);
  const trafficContentssList = useSelector((state: ApplicationState) => state.trafficContents);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);
  const [keywordSearch, setKeywordSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    dispatch(actionsSchoolYears.loadListRequest());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(actionsTrafficContents.loadListRequest({
      page: currentPage,
      limit: numberItensPer,
      keyword: keywordSearch
    }));
    // eslint-disable-next-line
  }, [currentPage, numberItensPer, trafficContentssList.dataId, keywordSearch]);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  function renderList() {
    if (trafficContents?.data?.count && schoolYears?.data.length) {
      return trafficContents.data.rows.map((item) => (
        <tr key={`schools_${item.id}`}>
          <td className={'px-0'} />
          <td data-th="Ano" className={'text-bold text-center'}>
            <div className="br-tag icon secondary">
              <span>{schoolYears?.data?.find(row => row?.id === item?.trafficConcept?.idSchoolYear)?.ordinal}</span>
            </div>
          </td>
          <td className="w-100" data-th="Conceito de Trânsito">{item.description}</td>
          <td data-th="Tema">{item.trafficConcept.description}</td>
          <td data-th={t('pages:trafficContents.labels.table.actions')}>
            <Link
              href={{
                pathname: `${router.asPath}/editar/${item.id}`,
              }}
            >
              <button className="br-button small primary circle mt-3 mt-sm-0 mr-sm-1" type="button" aria-label="Ícone ilustrativo">
                <i className="fas fa-pen"></i>
              </button>
            </Link>
            <button
              className="br-button small secondary circle mt-3 mt-sm-0"
              type="button"
              onClick={() => deleteHandle(item.id)}
              aria-label="Ícone ilustrativo">
              <i className="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      ));
    } else {
      return <tr className="empty-data">
        <td colSpan={6} className="py-5">
          <div>
            <i className="fas fa-inbox fa-5x" />
          </div>
          {t('pages:trafficContents.labels.emptyList')}
        </td>
      </tr>
    }
  }

  function deleteHandle(id: string | number) {
    // TODO: Modal de confirmação
    dispatch(actionsTrafficContents.loadDeleteRequest({
      id,
      page: currentPage,
      limit: numberItensPer,
      keyword: keywordSearch
    }))
  }


  function paramsNavigation(item: any) {
    setCurrentPage(item.currentPage);
    setNumberItensPer(item.numberItensPer);
  }

  function onSubmit(data: any) {
    setKeywordSearch(data.searchbox)
  }

  return (
    <div className="main-content mt-3 px-md-3" id="main-content">
      <div className="row">
        <div className='col-12 d-flex justify-content-between align-items-center'>
          <p className="h1">{t('pages:trafficContents.labels.pageTitle')}</p>
          <Link href={`${router.asPath}/novo`}>
            <button className="br-button secondary" type="button">
              <i className="fas fa-plus mr-1" aria-hidden="true"></i>
              {t('pages:trafficContents.labels.btnCreate')}
            </button>
          </Link>
        </div>
        <div className='col-12'>
          <Table
            Title={t('pages:trafficContents.labels.listTitle')}
            Options={{
              id: 'trafficContents',
              paginate: true,
              count: trafficContents?.data?.count,
              searchItens: onSubmit
            }}
            translations={t}
            elemListName="ParticipatingSchools"
            paramsNavigation={paramsNavigation}
          >
            <ActionTrigger nameKey='top-bar' className={'mr-1'}>
              <button
                className="br-button secondary"
                type="button"
                onClick={() => dispatch(actionsTrafficContents.loadGetListCSVsRequest({
                  keyword: keywordSearch
                }))}
              >
                <i className="fas fa-download mr-1" aria-hidden="true"></i>
                {t('general:commom.DownloadList')}
              </button>
            </ActionTrigger>
            <SearchTrigger nameKey='trigger-search' />
            <THead nameKey='t-head'>
              <tr>
                <th scope="col" className={'px-0'} />
                <th className={'text-center'} scope="col"><span>{t('pages:trafficContents.labels.table.year')}</span></th>
                <th scope="col"><span>{t('pages:trafficContents.labels.table.name')}</span></th>
                <th scope="col"><span>{t('pages:trafficContents.labels.table.concept')}</span></th>
                <th className={'text-center'} scope="col"><span>{t('pages:trafficContents.labels.table.actions')}</span></th>
              </tr>
            </THead>
            <TBody nameKey='t-body' style={{ whiteSpace: 'nowrap' }}>{renderList()}</TBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function Home() {
  return (
    <Template>
      <HomePage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
