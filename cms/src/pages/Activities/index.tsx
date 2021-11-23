import React, { useEffect, useState } from 'react';

import * as actionsActivities from '@/store/ducks/activities/actions';
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

export const ActivitiesPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const activitiesList = useSelector((state: ApplicationState) => state.activities);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);
  const [keywordSearch, setKeywordSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    dispatch(actionsActivities.loadListRequest({
      page: currentPage,
      limit: numberItensPer,
      keyword: keywordSearch
    }));
    // eslint-disable-next-line
  }, [currentPage, numberItensPer, activitiesList.dataId, keywordSearch]);

  function RenderItemStatus(params) {
    const { item } = params;
    let className = '';
    let statusLabel = '';
    if (item.isPublished) {
      className = 'published-status-table success';
      statusLabel = t('pages:activities.labels.table.published');
    } else if (item.excludedDate) {
      className = 'inactivated-status-table danger';
      statusLabel = t('pages:activities.labels.table.inactivated');
    } else {
      className = 'registered-status-table warning';
      statusLabel = t('pages:activities.labels.table.registered');
    }

    return (
      <div className="d-inline-block mr-3">
        <span className={`br-tag status contrast-ignore-bg ${className}`} style={{ zIndex: 0 }}></span><span>{statusLabel}</span>
      </div>
    );
  }

  function nth(n: number) { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th" }

  function renderList() {
    if (activitiesList && activitiesList.data?.count) {
      return activitiesList.data.rows.map((item) => (
        <tr key={`activity_${item.id}`}>
          <td className={'px-0'} />
          <td className="pl-sm-4" data-th={t('pages:activities.labels.table.year')}>
            {t('pages:activities.labels.selectYear',
              {
                year: item.trafficConcept.schoolYear.ordinal,
                ordinal: nth(item.trafficConcept.schoolYear.ordinal)
              })}
          </td>
          <td className="w-100" data-th={t('pages:activities.labels.table.name')}>
            {item.title}
          </td>
          <td data-th={t('pages:activities.labels.table.trafficConcept')}>
            {item.trafficConcept.description}
          </td>
          <td data-th={t('pages:activities.labels.table.knowledgeField')}>
            {item.discipline.knowledgeArea.description}
          </td>
          <td data-th={t('pages:activities.labels.table.discipline')}>
            {item.discipline.name}
          </td>
          <td data-th={t('pages:activities.labels.table.actions')}>
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
              aria-label="Ícone ilustrativo"
              onClick={() => dispatch(actionsActivities.loadPublishRequest({ id: item.id, isPublished: !item.isPublished }))}>
              {item.isPublished ?
                <i className="fas fa-unlink"></i>
                :
                <i className="fas fa-link"></i>
              }
            </button>
          </td>
          <td data-th={t('pages:activities.labels.table.situation')}>
            <RenderItemStatus item={item} />
          </td>
        </tr>
      ));
    } else {
      return <tr className="empty-data">
        <td colSpan={6} className="py-5">
          <div>
            <i className="fas fa-inbox fa-5x" />
          </div>
          {t('pages:activities.labels.emptyList')}
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
          <p className="h1">{t('pages:activities.labels.title')}</p>
          <Link href={`${router.asPath}/novo`}>
            <button className="br-button secondary" type="button">
              <i className="fas fa-plus mr-1" aria-hidden="true"></i>
              {t('pages:activities.labels.btnCreate')}
            </button>
          </Link>
        </div>
        <div className='col-12'>
          <div className="header-search w-100 my-4" />
          <Table
            Title={t('pages:activities.labels.listTitle')}
            Options={{
              id: 'activities',
              paginate: true,
              count: activitiesList.data?.count,
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
                onClick={() => dispatch(actionsActivities.loadGetListCSVsRequest({}))}>
                <i className="fas fa-download mr-1" aria-hidden="true"></i>
                {t('general:commom.DownloadList')}
              </button>
            </ActionTrigger>
            <SearchTrigger nameKey='trigger-search' />
            <THead nameKey='t-head'>
              <tr>
                <th scope="col" className={'px-0'} />
                <th scope="col" className={'text-nowrap pl-sm-4'}><span>{t('pages:activities.labels.table.year')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:activities.labels.table.name')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:activities.labels.table.trafficConcept')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:activities.labels.table.knowledgeField')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:activities.labels.table.discipline')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:activities.labels.table.actions')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:activities.labels.table.situation')}</span></th>
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

export default function Activities() {
  return (
    <Template>
      <ActivitiesPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
