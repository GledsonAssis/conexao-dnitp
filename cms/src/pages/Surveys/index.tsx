import React, { useEffect, useState } from 'react';

import * as actionsSurveies from '@/store/ducks/surveies/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { Table, TBody, THead, SearchTrigger, ActionTrigger } from '@/components/shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import moment from 'moment';
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

export const SurveiesPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const surveiesList = useSelector((state: ApplicationState) => state.surveies);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);
  const [keywordSearch, setKeywordSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    dispatch(actionsSurveies.loadListRequest({
      page: currentPage,
      limit: numberItensPer,
      keyword: keywordSearch
    }));
    // eslint-disable-next-line
  }, [currentPage, numberItensPer, keywordSearch]);

  function renderList() {
    if (surveiesList && surveiesList.data?.count) {
      return surveiesList.data.rows.map((item) => (
        <tr key={`survey_${item.id}`}>
          <td className={'px-0'} />
          <td className="w-100 pl-4" data-th={t('pages:surveys.labels.table.registerList')}>
            {item.title}
          </td>
          <td data-th={t('pages:surveys.labels.table.createDate')}>{moment.utc(item.date).format('DD/MM/YYYY')}</td>
          <td data-th={t('pages:surveys.labels.table.actions')}>
            {item.active ?
              <Link
                href={{
                  pathname: `${router.asPath}/editar/${item.id}`,
                }}
              >
                <button className="br-button small primary circle mt-3 mt-sm-0 mr-sm-1" type="button" aria-label="Ícone ilustrativo">
                  <i className="fas fa-pen"></i>
                </button>
              </Link>
              :
              <Link
                href={{
                  pathname: `${router.asPath}/visualizar/${item.id}`,
                }}
              >
                <button className="br-button small primary circle mt-3 mt-sm-0 mr-sm-1" type="button" aria-label="Ícone ilustrativo">
                  <i className="fas fa-eye"></i>
                </button>
              </Link>}
          </td>
        </tr>
      ));
    } else {
      return <tr className="empty-data">
        <td colSpan={3} className="py-5">
          <div>
            <i className="fas fa-inbox fa-5x" />
          </div>
          {t('pages:surveys.labels.emptyList')}
        </td>
      </tr>
    }
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
          <p className="h1">{t('pages:surveys.labels.pageTitle')}</p>
          <Link href={`${router.asPath}/novo`}>
            <button className="br-button secondary" type="button">
              <i className="fas fa-plus mr-1" aria-hidden="true"></i>
              {t('pages:surveys.labels.btnCreate')}
            </button>
          </Link>
        </div>
        <div className='col-12'>
          <div className="header-search w-100 my-4">
          </div>
          <Table
            Title={t('pages:surveys.labels.listTitle')}
            Options={{
              id: 'surveies',
              paginate: true,
              count: surveiesList.data?.count,
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
                onClick={() => dispatch(actionsSurveies.loadGetListCSVsRequest({ keyword: keywordSearch }))}
              >
                <i className="fas fa-download mr-1" aria-hidden="true"></i>
                {t('general:commom.DownloadList')}
              </button>
            </ActionTrigger>
            <SearchTrigger nameKey='trigger-search' />
            <THead nameKey='t-head'>
              <tr>
                <th scope="col" className={'px-0'} />
                <th scope="col" className={'text-nowrap pl-4'}><span>{t('pages:surveys.labels.table.registerList')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:surveys.labels.table.createDate')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:surveys.labels.table.actions')}</span></th>
              </tr>
            </THead>
            <TBody nameKey='t-body' style={{ whiteSpace: 'nowrap' }}>
              {renderList()}
            </TBody>
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

export default function Surveies() {
  return (
    <Template>
      <SurveiesPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
