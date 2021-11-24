import React, { useEffect, useState } from 'react';

import * as actionsUsers from '@/store/ducks/users/actions';
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

export const UsersPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const usersList = useSelector((state: ApplicationState) => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);
  const [keywordSearch, setKeywordSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    dispatch(actionsUsers.loadListRequest({
      page: currentPage,
      limit: numberItensPer,
      keyword: keywordSearch
    }));
    // eslint-disable-next-line
  }, [currentPage, numberItensPer, keywordSearch]);

  function RenderItemStatus(params) {
    const { item } = params;
    let className = '';
    let statusLabel = '';
    if (item.ativo) {
      className = 'published-status-table success';
      statusLabel = t('pages:users.labels.table.active');
    } else {
      className = 'inactivated-status-table danger';
      statusLabel = t('pages:users.labels.table.inactive');
    }

    return (
      <div className="d-inline-block mr-3">
        <span className={`br-tag status contrast-ignore-bg ${className}`} style={{ zIndex: 0 }}></span><span>{statusLabel}</span>
      </div>
    );
  }

  function renderList() {
    if (usersList?.data?.count) {
      return usersList.data.rows.map((item) => (
        <tr key={`course_${item.id}`}>
          <td className={'px-0'} />
          <td className="w-100 pl-4" data-th={t('pages:users.labels.table.name')}>{item?.name || '-'}</td>
          <td data-th={t('pages:users.labels.table.cpf')}>{item?.cpf || '-'}</td>
          <td data-th={t('pages:users.labels.table.email')}>{item?.email || '-'}</td>
          <td data-th={t('pages:users.labels.table.profile')}>{item?.role?.name || '-'}</td>
          <td data-th={t('pages:users.labels.table.state')}>{item?.city?.state?.name || '-'}</td>
          <td data-th={t('pages:users.labels.table.city')}>{item?.city?.name || '-'}</td>
          <td data-th={t('pages:users.labels.table.registerDate')}>{moment.utc(item?.registerDate).format('DD/MM/YYYY')}</td>
          <td data-th={t('pages:users.labels.table.situation')}><RenderItemStatus item={item} /></td>
          <td className={'text-center'} data-th={t('pages:users.labels.table.actions')}>
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
              onClick={() => dispatch(actionsUsers.loadActiveRequest(
                {
                  id: item.id,
                  situation: !item.ativo,
                  page: currentPage,
                  limit: numberItensPer,
                  keyword: keywordSearch
                }
              ))}
              aria-label="Ícone ilustrativo">
              {item.ativo ?
                <i className="fas fa-unlink"></i>
                :
                <i className="fas fa-link"></i>
              }
            </button>
          </td>
        </tr>
      ));
    } else {
      return <tr className="empty-data">
        <td colSpan={10} className="py-5">
          <div>
            <i className="fas fa-inbox fa-5x" />
          </div>
          {t('pages:users.labels.emptyList')}
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
        <div className='col-12'>
          <div className="header-search w-100 my-4"></div>
          <Table
            Title={t('pages:users.labels.listTitle')}
            Options={{
              id: 'users',
              paginate: true,
              count: usersList.data?.count,
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
                onClick={() => dispatch(actionsUsers.loadGetListCSVsRequest({ keyword: keywordSearch }))}>
                <i className="fas fa-download mr-1" aria-hidden="true"></i>
                {t('general:commom.DownloadList')}
              </button>
            </ActionTrigger>
            <SearchTrigger nameKey='trigger-search' />
            <THead nameKey='t-head'>
              <tr>
                <th scope="col" className={'px-0'} />
                <th scope="col" className={'text-nowrap pl-4'}><span>{t('pages:users.labels.table.name')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:users.labels.table.cpf')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:users.labels.table.email')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:users.labels.table.profile')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:users.labels.table.state')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:users.labels.table.city')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:users.labels.table.registerDate')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:users.labels.table.situation')}</span></th>
                <th scope="col" className={'text-nowrap text-center'}><span>{t('pages:users.labels.table.actions')}</span></th>
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

export default function Users() {
  return (
    <Template>
      <UsersPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
