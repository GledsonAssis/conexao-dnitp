import React, { useEffect, useState } from 'react';

import * as actionsProjectsActions from '@/store/ducks/projectsActions/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import Link from 'next/link';
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

export const ProjectActionsPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const projectActionsList = useSelector((state: ApplicationState) => state.projectsActions);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);
  const [keywordSearch, setKeywordSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    dispatch(actionsProjectsActions.loadListRequest({
      page: currentPage,
      limit: numberItensPer,
      keyword: keywordSearch
    }));
    // eslint-disable-next-line
  }, [currentPage, numberItensPer, projectActionsList.dataId, keywordSearch]);

  function RenderItemStatus(params) {
    const { item } = params;
    let className = '';
    let statusLabel = '';
    if (item.isPublished) {
      className = 'published-status-table success';
      statusLabel = t('pages:projectActions.labels.table.published');
    } else if (item.excludedDate) {
      className = 'inactivated-status-table danger';
      statusLabel = t('pages:projectActions.labels.table.inactivated');
    } else {
      className = 'registered-status-table warning';
      statusLabel = t('pages:projectActions.labels.table.registered');
    }

    return (
      <div className="d-inline-block mr-3">
        <span className={`br-tag status contrast-ignore-bg ${className}`} style={{ zIndex: 0 }}></span><span>{statusLabel}</span>
      </div>
    );
  }

  function renderList() {
    if (projectActionsList && projectActionsList.data?.count) {
      return projectActionsList.data.rows.map((item) => (
        <tr key={`project_${item.id}`}>
          <td className={'px-0'} />
          <td className="w-100 pl-4" data-th={t('pages:projectActions.labels.table.projectName')}>
            {item.title}
          </td>
          <td data-th={t('pages:projectActions.labels.table.project')}>
            {item.project?.title || '-'}
          </td>
          <td data-th={t('pages:projectActions.labels.table.actions')}>
            <Link
              href={{
                pathname: `${router.asPath}/editar/${item.id}`
              }}
            >
              <button className="br-button small primary circle mt-3 mt-sm-0 mr-sm-1" type="button" aria-label="??cone ilustrativo">
                <i className="fas fa-pen"></i>
              </button>
            </Link>
            <button
              className="br-button small secondary circle mt-3 mt-sm-0"
              type="button"
              aria-label="??cone ilustrativo"
              onClick={() => dispatch(actionsProjectsActions.loadPublishRequest({ id: item.id, isPublished: !item.isPublished }))}>
              {item.isPublished ?
                <i className="fas fa-unlink"></i>
                :
                <i className="fas fa-link"></i>
              }
            </button>
          </td>
          <td data-th={t('pages:projectActions.labels.table.situation')}>
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
          {t('pages:projectActions.emptyList')}
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
          <p className="h1">{t('pages:projectActions.pageTitle')}</p>
          <Link href={`${router.asPath}/novo`}>
            <button className="br-button secondary" type="button">
              <i className="fas fa-plus mr-1" aria-hidden="true"></i>
              {t('pages:projectActions.labels.btnCreate')}
            </button>
          </Link>
        </div>
        <div className='col-12'>
          <div className="header-search w-100 my-4" />
          <Table
            Title={t('pages:projectActions.listTitle')}
            Options={{
              id: 'projectActions',
              paginate: true,
              count: projectActionsList.data?.count,
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
                onClick={() => dispatch(actionsProjectsActions.loadGetListCSVsRequest({ keyword: keywordSearch }))}>
                <i className="fas fa-download mr-1" aria-hidden="true"></i>
                {t('general:commom.DownloadList')}
              </button>
            </ActionTrigger>
            <SearchTrigger nameKey='trigger-search' />
            <THead nameKey='t-head'>
              <tr>
                <th scope="col" className={'px-0'} />
                <th scope="col"><span>{t('pages:projectActions.labels.table.title')}</span></th>
                <th scope="col"><span>{t('pages:projectActions.labels.table.project')}</span></th>
                <th scope="col"><span>{t('pages:projectActions.labels.table.actions')}</span></th>
                <th scope="col"><span>{t('pages:projectActions.labels.table.situation')}</span></th>
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

export default function ProjectActions() {
  return (
    <Template>
      <ProjectActionsPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
