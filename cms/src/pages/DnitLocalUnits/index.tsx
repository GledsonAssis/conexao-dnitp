import React, { useEffect, useState } from 'react';

import * as actionsRegionalSuperintendences from '@/store/ducks/dnitLocalUnits/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { Table, TBody, THead, SearchTrigger, ActionTrigger } from '@/components/shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import { useRouter } from 'next/router';
import normalizePhone from '@/utils/normalize/normalizePhone';
import Modal from '@/components/shared/Modal';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const RegionalSuperintendencesPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const dnitLocalUnitsList = useSelector((state: ApplicationState) => state.dnitLocalUnits);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);
  const [keywordSearch, setKeywordSearch] = useState('');
  const router = useRouter();
  const [stModalDelete, setStModalDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | number>(null);

  useEffect(() => {
    dispatch(actionsRegionalSuperintendences.loadListRequest({
      page: currentPage,
      limit: numberItensPer,
      keyword: keywordSearch
    }));
    // eslint-disable-next-line
  }, [currentPage, numberItensPer, dnitLocalUnitsList.dataId, keywordSearch]);

  function renderList() {
    if (dnitLocalUnitsList && dnitLocalUnitsList.data?.count) {
      return dnitLocalUnitsList.data.rows.map((item) => (
        <tr key={`course_${item.id}`}>
          <td className={'px-0'} />
          <td
            className="pl-4 text-truncate"
            style={{ maxWidth: 350, minWidth: 350 }}
            data-th={t('pages:dnitLocalUnits.labels.table.localUnit')}>
            {item.identification.toUpperCase()}
          </td>
          <td className="w-100" data-th={t('pages:dnitLocalUnits.labels.table.regionalSuperintendence')}>
            {item.RegionalSuperintendence.identification.toUpperCase()}
          </td>
          <td data-th={t('pages:dnitLocalUnits.labels.table.phones')}>
            {item.phones[0]?.DDD &&
              <><br />{normalizePhone(`${item.phones[0].DDD}${item.phones[0].number}`)}</>
            }
            {item.phones[1]?.DDD &&
              <><br />{normalizePhone(`${item.phones[1].DDD}${item.phones[1].number}`)}</>
            }
          </td>
          <td data-th={t('pages:dnitLocalUnits.labels.table.state')}>{item.address.city.state.initials}</td>
          <td data-th={t('pages:dnitLocalUnits.labels.table.city')}>{item.address.city.name}</td>
          <td data-th={t('pages:dnitLocalUnits.labels.table.actions')}>
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
          {t('pages:dnitLocalUnits.labels.emptyList')}
        </td>
      </tr>
    }
  }

  function deleteHandle(id: string | number) {
    setStModalDelete(!stModalDelete)
    setIdToDelete(id)
  }

  function confirmDelete(id: string | number) {
    setIdToDelete(null)
    dispatch(actionsRegionalSuperintendences.loadDeleteRequest({
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
    <>
      <div className="main-content mt-3 px-md-3" id="main-content">
        <div className="row">
          <div className='col-12 d-flex justify-content-between align-items-center'>
            <p className="h1">{t('pages:dnitLocalUnits.labels.pageTitle')}</p>
            <Link href={`${router.asPath}/novo`}>
              <button className="br-button secondary" type="button">
                <i className="fas fa-plus mr-1" aria-hidden="true"></i>
                {t('pages:dnitLocalUnits.labels.btnCreate')}
              </button>
            </Link>
          </div>
          <div className='col-12'>
            <div className="header-search w-100 my-4"></div>
            <Table
              Title={t('pages:dnitLocalUnits.labels.listTitle')}
              Options={{
                id: 'dnitLocalUnits',
                paginate: true,
                count: dnitLocalUnitsList.data?.count,
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
                  onClick={() => dispatch(actionsRegionalSuperintendences.loadGetListCSVsRequest({ keyword: keywordSearch }))}>
                  <i className="fas fa-download mr-1" aria-hidden="true"></i>
                  {t('general:commom.DownloadList')}
                </button>
              </ActionTrigger>
              <SearchTrigger nameKey='trigger-search' />
              <THead nameKey='t-head'>
                <tr>
                  <th scope="col" className={'px-0'} />
                  <th scope="col" className={'text-nowrap pl-4'}><span>{t('pages:dnitLocalUnits.labels.table.localUnit')}</span></th>
                  <th scope="col" className={'text-nowrap'}><span>{t('pages:dnitLocalUnits.labels.table.regionalSuperintendence')}</span></th>
                  <th scope="col" className={'text-nowrap'}><span>{t('pages:dnitLocalUnits.labels.table.phones')}</span></th>
                  <th scope="col" className={'text-nowrap'}><span>{t('pages:dnitLocalUnits.labels.table.states')}</span></th>
                  <th scope="col" className={'text-nowrap'}><span>{t('pages:dnitLocalUnits.labels.table.city')}</span></th>
                  <th scope="col" className={'text-nowrap text-center'}><span>{t('pages:dnitLocalUnits.labels.table.actions')}</span></th>
                </tr>
              </THead>
              <TBody nameKey='t-body' style={{ whiteSpace: 'nowrap' }}>
                {renderList()}
              </TBody>
            </Table>
          </div>
        </div>
      </div>

      <Modal handleClose={() => { setIdToDelete(null); setStModalDelete(!stModalDelete) }} statusModal={stModalDelete} customClass="p-0">
        <div className="br-modal-header">
          <div className="br-modal-title text-bold" title={t('components:Modal.Title.Confirm')}>
            {t('components:Modal.Title.Confirm')}
          </div>
        </div>
        <div className="br-modal-body">
          {t('components:Modal.TextBody.DeleteAsk')}
        </div>
        <div className="br-modal-footer justify-content-end">
          <button className="br-button secondary small m-2" onClick={() => { setIdToDelete(null); setStModalDelete(!stModalDelete) }} type="button">
            {t('components:Modal.Cancel')}
          </button>
          <button className="br-button primary small m-2" onClick={() => confirmDelete(idToDelete)} type="button">
            {t('components:Modal.Yes')}
          </button>
        </div>
      </Modal>
    </>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function RegionalSuperintendences() {
  return (
    <Template>
      <RegionalSuperintendencesPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
