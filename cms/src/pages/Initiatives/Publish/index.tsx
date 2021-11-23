import React, { useEffect, useState } from 'react';

import * as actionsInitiatives from '@/store/ducks/initiatives/actions';
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

export const InitiativesPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const initiativesList = useSelector((state: ApplicationState) => state.initiatives);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);
  const [keywordSearch, setKeywordSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    dispatch(actionsInitiatives.loadListRequest({
      page: currentPage,
      limit: numberItensPer,
      keyword: keywordSearch,
      typeList: 'publish'
    }));
    // eslint-disable-next-line
  }, [currentPage, numberItensPer, keywordSearch]);

  function renderList() {
    if (initiativesList?.data?.count) {
      return initiativesList.data.rows.map((item) => (
        <tr key={`course_${item.id}`}>
          <td className={'px-0'} />
          <td className="pl-4 text-truncate" data-th={t('pages:initiatives.labels.table.author')}>
            {item?.author?.name || '-'}
          </td>
          <td className="w-100 text-truncate" data-th={t('pages:initiatives.labels.table.Institution')}>
            {item?.author?.instituitions.length ?
              item?.author?.instituitions?.map((row, index) => index > 0 ? `${row.name}` : `, ${row.name}`) : '-'}
          </td>
          <td data-th={t('pages:initiatives.labels.table.city')}>
            {item?.author?.city?.name || '-'}
          </td>
          <td data-th={t('pages:initiatives.labels.table.uf')}>
            {item?.author?.city?.state?.name || '-'}
          </td>
          <td data-th={t('pages:initiatives.labels.table.title')}>
            {item?.title || '-'}
          </td>
          <td data-th={t('pages:initiatives.labels.table.status')}>
            {item?.status?.name || '-'}
          </td>
          <td data-th={t('pages:initiatives.labels.table.actions')}>
            <Link
              href={{
                pathname: `${router.asPath}/${item.id}`,
              }}
            >
              <button className="br-button small primary circle mt-3 mt-sm-0 mr-sm-1" type="button" aria-label="Ícone ilustrativo">
                <i className="far fa-eye"></i>

              </button>
            </Link>
          </td>
        </tr>
      ));
    } else {
      return <tr className="empty-data">
        <td colSpan={8} className="py-5">
          <div>
            <i className="fas fa-inbox fa-5x" />
          </div>
          {t('pages:initiatives.labels.emptyList')}
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
          <p className="h1">{t('pages:initiatives.labels.pageTitle.publish')}</p>
        </div>
        <div className='col-12'>
          <div className="header-search w-100 my-4"></div>
          <Table
            Title={t('pages:initiatives.labels.listTitlePublisher')}
            Options={{
              id: 'initiatives',
              paginate: true,
              count: initiativesList.data?.count,
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
                onClick={() => dispatch(actionsInitiatives.loadGetListCSVsRequest({ typeList: 'publish', keyword: keywordSearch }))}
              >
                <i className="fas fa-download mr-1" aria-hidden="true"></i>
                {t('general:commom.DownloadList')}
              </button>
            </ActionTrigger>
            <SearchTrigger nameKey='trigger-search' />
            <THead nameKey='t-head'>
              <tr>
                <th scope="col" className={'px-0'} />
                <th scope="col" className={'text-nowrap pl-4'}><span>{t('pages:initiatives.labels.table.author')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:initiatives.labels.table.Institution')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:initiatives.labels.table.city')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:initiatives.labels.table.uf')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:initiatives.labels.table.title')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:initiatives.labels.table.status')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:initiatives.labels.table.actions')}</span></th>
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

export default function Initiatives() {
  return (
    <Template>
      <InitiativesPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
