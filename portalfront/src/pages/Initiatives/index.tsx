import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ApplicationState } from '@/store';
import * as actionsInitiatives from '@/store/ducks/initiatives/actions';
import { TFunction, useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Table, TBody, THead } from '@/components/shared/Table';
import moment from 'moment';
import { BaseInitiatives } from '@/store/ducks/initiatives/types';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const ActionsPage: React.FC<Props> = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const initiatives = useSelector((state: ApplicationState) => state.initiatives);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);

  const router = useRouter();

  useEffect(() => {
    dispatch(actionsInitiatives.loadFetchRequest());
    // eslint-disable-next-line
  }, []);

  function renderList() {
    if (initiatives?.data?.length) {
      const data = changePage(currentPage, numberItensPer, initiatives.data);
      return data.map((item) => (
        <Link
          key={`initiatives_${item.id}`}
          replace={false}
          href={{
            pathname: `${router.asPath}/[slug]`,
            query: { slug: item.id },
          }}
        >
          <tr className="table-item-clickable">
            <td className={'px-0'} />
            <td className="w-100" data-th="Título">
              {item.title}
            </td>
            <td data-th="Situação">{item.status.name}</td>
            <td data-th="Data">{moment(item.date).utcOffset(3).format('DD/MM/yyyy')}</td>
          </tr>
        </Link>
      ));
    }
    return (
      <tr className="empty-data">
        <td colSpan={6} className="py-5">
          <div>
            <i className="fas fa-inbox fa-5x" />
          </div>
          {props.t('pages:Initiatives.emptyListMessage')}
        </td>
      </tr>
    );
  }

  function paramsNavigation(item: any) {
    setCurrentPage(item.currentPage);
    setNumberItensPer(item.numberItensPer);
  }

  function changePage(pageChange: number, itensPerChange: number, data: BaseInitiatives[]): BaseInitiatives[] {
    pageChange = Math.min(Math.max(pageChange, 1), numPages(data.length, itensPerChange));
    const arrayItens = [];
    for (let i = (pageChange - 1) * itensPerChange; i < pageChange * itensPerChange; i++) {
      if (data[i]) {
        arrayItens.push(data[i]);
      }
    }
    return arrayItens;
  }

  function numPages(numItens: number, itensPerChange: number) {
    return Math.ceil(numItens / itensPerChange);
  }

  return (
    <div className="container-lg contrast-ignore-bg">
      <div className="row contrast-ignore-bg mx-0">
        <div className="img__page col-auto py-3 pl-0">
          <div className="img__page-initiatives contrast-ignore-bg" style={{ width: 60, height: 60 }} />
        </div>
        <h2 className="text-primary-default">{props.t('pages:Initiatives.title')}</h2>
      </div>
      <div className="row mx-0 mb-3">
        <div style={{ lineHeight: '2.5em' }} dangerouslySetInnerHTML={{ __html: props.t('pages:Initiatives.aboutArea') }} />
      </div>
      <div className="row mx-0 mb-3">
        <Link href="/minhas-iniciativas/enviar">
          <a>
            <button className="br-button primary mt-0" type="button">
              {props.t('pages:Initiatives.shareInitiative')}
            </button>
          </a>
        </Link>
      </div>
      <div className="row mx-0 mb-5">
        <Table
          elemListName="initiatives"
          Title={props.t('pages:Initiatives.tableList.titleTable')}
          Options={{
            id: 'initiatives',
            paginate: true,
            count: initiatives.data.length,
          }}
          translations={props.t}
          paramsNavigation={paramsNavigation}
        >
          <THead nameKey='t-head'>
            <tr>
              <th scope="col" className={'px-0'} />
              <th scope="col"><span>{props.t('pages:Initiatives.tableList.headers.title')}</span></th>
              <th scope="col"><span>{props.t('pages:Initiatives.tableList.headers.status')}</span></th>
              <th scope="col"><span>{props.t('pages:Initiatives.tableList.headers.date')}</span></th>
            </tr>
          </THead>
          <TBody nameKey='t-body' style={{ whiteSpace: 'nowrap' }}>{renderList()}</TBody>
        </Table>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function Actions() {
  return (
    <Template>
      <ActionsPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
