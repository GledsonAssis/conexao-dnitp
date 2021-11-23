import React, { useEffect, useState } from 'react';

import * as actionsKnowledgObjects from '@/store/ducks/knowledgeObjects/actions';
import * as actionsSchoolYear from '@/store/ducks/schoolYear/actions';
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

export const KnowledgObjectsPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const knowledgeObjectsList = useSelector((state: ApplicationState) => state.knowledgeObjects);
  const schoolYears = useSelector((state: ApplicationState) => state.schoolYears);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);
  const [keywordSearch, setKeywordSearch] = useState('');
  const router = useRouter();

  const {
    register,
    watch,
  } = useForm<any>();

  useEffect(() => {
    dispatch(actionsSchoolYear.loadListRequest());
  }, []);

  useEffect(() => {
    dispatch(actionsKnowledgObjects.loadListRequest({
      page: currentPage,
      limit: numberItensPer,
      keyword: keywordSearch
    }));
    // eslint-disable-next-line
  }, [currentPage, numberItensPer, knowledgeObjectsList.dataId, keywordSearch]);

  function renderList() {
    if (knowledgeObjectsList?.data?.count && schoolYears?.data.length) {
      return knowledgeObjectsList.data.rows.map((item) => (
        <tr key={`course_${item.id}`}>
          <td className={'px-0'} />
          <td className="pl-4 text-truncate" data-th={t('pages:knowledgeObject.labels.table.year')}>
            <div className="br-tag icon secondary">
              <span>{schoolYears?.data.find(row => row.id === item.idSchoolYear).ordinal}</span>
            </div>
          </td>
          <td className="w-100 text-truncate"
            style={{ maxWidth: 350, minWidth: 350 }} data-th={t('pages:knowledgeObject.labels.table.name')}>
            {item.description || '-'}
          </td>
          <td data-th={t('pages:knowledgeObject.labels.table.knowledgeField')}>
            {item.discipline.knowledgeArea.description}
          </td>
          <td data-th={t('pages:knowledgeObject.labels.table.discipline')}>
            {item.discipline.name}
          </td>
          <td data-th={t('pages:knowledgeObject.labels.table.actions')}>
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
          {t('pages:knowledgeObject.labels.emptyList')}
        </td>
      </tr>
    }
  }

  function deleteHandle(id: string | number) {
    // TODO: Modal de confirmação
    dispatch(actionsKnowledgObjects.loadDeleteRequest({
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
          <p className="h1">{t('pages:knowledgeObject.labels.pageTitle')}</p>
          <Link href={`${router.asPath}/novo`}>
            <button className="br-button secondary" type="button">
              <i className="fas fa-plus mr-1" aria-hidden="true"></i>
              {t('pages:knowledgeObject.labels.btnCreate')}
            </button>
          </Link>
        </div>
        <div className='col-12'>
          <div className="header-search w-100 my-4"></div>
          <Table
            Title={t('pages:knowledgeObject.labels.listTitle')}
            Options={{
              id: 'knowledgeObjects',
              paginate: true,
              count: knowledgeObjectsList.data?.count,
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
                onClick={() => dispatch(actionsKnowledgObjects.loadGetListCSVsRequest({}))}>
                <i className="fas fa-download mr-1" aria-hidden="true"></i>
                {t('general:commom.DownloadList')}
              </button>
            </ActionTrigger>
            <SearchTrigger nameKey='trigger-search' />
            <THead nameKey='t-head'>
              <tr>
                <th scope="col" className={'px-0'} />
                <th scope="col" className={'text-nowrap pl-4'}><span>{t('pages:knowledgeObject.labels.table.year')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:knowledgeObject.labels.table.name')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:knowledgeObject.labels.table.knowledgeField')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:knowledgeObject.labels.table.discipline')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:knowledgeObject.labels.table.actions')}</span></th>
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

export default function KnowledgObjects() {
  return (
    <Template>
      <KnowledgObjectsPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
