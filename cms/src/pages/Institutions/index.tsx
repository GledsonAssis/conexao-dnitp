import React, { useEffect, useState } from 'react';

import * as actionsInstitutions from '@/store/ducks/institutions/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { Table, TBody, THead, SearchTrigger, ActionTrigger } from '@/components/shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import moment from 'moment';
import { useRouter } from 'next/router';
import normalizePhone from '@/utils/normalize/normalizePhone';
import { useForm } from 'react-hook-form';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const InstitutionsPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const institutionsList = useSelector((state: ApplicationState) => state.institutions);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);
  const [keywordSearch, setKeywordSearch] = useState('');
  const router = useRouter();

  const {
    register,
    watch,
  } = useForm<any>();

  useEffect(() => {
    dispatch(actionsInstitutions.loadListRequest({
      page: currentPage,
      limit: numberItensPer,
      keyword: keywordSearch,
      searchDnit: watch('filterCnx')
    }));
    // eslint-disable-next-line
  }, [currentPage, numberItensPer, institutionsList.dataId, keywordSearch, watch('filterCnx')]);

  function renderList() {
    if (institutionsList && institutionsList.data?.count) {
      return institutionsList.data.rows.map((item) => (
        <tr key={`course_${item.id}`}>
          <td className={'px-0'} />
          <td className="w-100 pl-4 text-truncate" data-th={t('pages:institutions.labels.table.institution')}>
            {item.name.toUpperCase()}
          </td>
          <td className="text-truncate"
            style={{ maxWidth: 350, minWidth: 350 }} data-th={t('pages:institutions.labels.table.regionalSuperintendence')}>
            {item.dnitUnit?.RegionalSuperintendence?.identificacao || '-'}
          </td>
          <td data-th={t('pages:institutions.labels.table.localUnit')}>
            {item.dnitUnit.identificacao}
          </td>
          <td data-th={t('pages:institutions.labels.table.phones')}>
            {item.phones[0]?.DDD &&
              <><br />{normalizePhone(`${item.phones[0].DDD}${item.phones[0].number}`)}</>
            }
            {item.phones[1]?.DDD &&
              <><br />{normalizePhone(`${item.phones[1].DDD}${item.phones[1].number}`)}</>
            }
          </td>
          <td data-th={t('pages:institutions.labels.table.states')}>
            {item.address.city.state.initials}
          </td>
          <td data-th={t('pages:institutions.labels.table.city')}>
            {item.address.city.name}
          </td>
          <td data-th={t('pages:institutions.labels.table.isDnitConexao')}>{
            item.participaConexaoDnit ?
              t('pages:institutions.labels.table.labelYesDnitConexao') :
              t('pages:institutions.labels.table.labelNoDnitConexao')
          }</td>
          <td data-th={t('pages:institutions.labels.table.actions')}>
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
        <td colSpan={9} className="py-5">
          <div>
            <i className="fas fa-inbox fa-5x" />
          </div>
          {t('pages:institutions.labels.emptyList')}
        </td>
      </tr>
    }
  }

  function deleteHandle(id: string | number) {
    // TODO: Modal de confirmação
    dispatch(actionsInstitutions.loadDeleteRequest({
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
          <p className="h1">{t('pages:institutions.labels.pageTitle')}</p>
          <Link href={`${router.asPath}/novo`}>
            <button className="br-button secondary" type="button">
              <i className="fas fa-plus mr-1" aria-hidden="true"></i>
              {t('pages:institutions.labels.btnCreate')}
            </button>
          </Link>
        </div>
        <div className='col-12'>
          <div className="d-inline-block mr-5">
            <div className="br-radio">
              <input {...register('filterCnx')} defaultChecked id="filter-cnx-1" type="radio" value="2" />
              <label htmlFor="filter-cnx-1">{t('pages:institutions.labels.todos')}</label>
            </div>
          </div>
          <div className="d-inline-block mr-5">
            <div className="br-radio">
              <input {...register('filterCnx')} id="filter-cnx-2" type="radio" value="1" />
              <label htmlFor="filter-cnx-2">{t('pages:institutions.labels.participaDNIT')}</label>
            </div>
          </div>
          <div className="d-inline-block mr-5">
            <div className="br-radio">
              <input {...register('filterCnx')} id="filter-cnx-3" type="radio" value="0" />
              <label htmlFor="filter-cnx-3">{t('pages:institutions.labels.naoParticipaDNIT')}</label>
            </div>
          </div>
        </div>
        <div className='col-12'>
          <div className="header-search w-100 my-4"></div>
          <Table
            Title={t('pages:institutions.labels.listTitle')}
            Options={{
              id: 'institutions',
              paginate: true,
              count: institutionsList.data?.count,
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
                onClick={() => dispatch(actionsInstitutions.loadGetListCSVsRequest({
                  keyword: keywordSearch,
                  searchDnit: watch('filterCnx')
                }))}>
                <i className="fas fa-download mr-1" aria-hidden="true"></i>
                {t('general:commom.DownloadList')}
              </button>
            </ActionTrigger>
            <SearchTrigger nameKey='trigger-search' />
            <THead nameKey='t-head'>
              <tr>
                <th scope="col" className={'px-0'} />
                <th scope="col" className={'text-nowrap pl-4'}><span>{t('pages:institutions.labels.table.institution')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:institutions.labels.table.regionalSuperintendence')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:institutions.labels.table.localUnit')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:institutions.labels.table.phones')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:institutions.labels.table.states')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:institutions.labels.table.city')}</span></th>
                <th scope="col" className={'text-nowrap text-center'}><span>{t('pages:institutions.labels.table.isDnitConexao')}</span></th>
                <th scope="col" className={'text-nowrap text-center'}><span>{t('pages:institutions.labels.table.actions')}</span></th>
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

export default function Institutions() {
  return (
    <Template>
      <InstitutionsPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
