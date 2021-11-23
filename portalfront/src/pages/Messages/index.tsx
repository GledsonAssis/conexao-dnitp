import React, { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ApplicationState } from '@/store';
import * as actionsMessages from '@/store/ducks/messages/actions';
import { TFunction, useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Messages } from '@/store/ducks/messages/types';
import { Table, THead, TBody } from '@/components/shared/Table';
import { NavItem, PanelItem, Tab } from '@/components/shared/Tab';
import moment from 'moment';
import { Handle } from '@/interfaces';
import { ActionTrigger } from '@/components/shared/Table/actionTrigger';
import { Dropdown } from '@/components/shared/Dropdown';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const MessagesPage: React.FC<Props> = ({ ...props }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state: ApplicationState) => state.messages);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);
  const [currentPageSent, setCurrentPageSent] = useState(1);
  const [numberItensPerSent, setNumberItensPerSent] = useState(10);

  let BrTable: Handle<typeof Table>;
  let BrTableSent: Handle<typeof Table>;
  const { register, watch, setValue } = useForm<any>();

  const router = useRouter();

  useEffect(() => {
    dispatch(actionsMessages.loadInboxFetchRequest());
    dispatch(actionsMessages.loadSendFetchRequest());
    // eslint-disable-next-line
  }, []);

  function checkSelect(item: string, elem: string) {
    const element: HTMLInputElement = document.querySelector(`[name^="${elem}"]`);
    BrTable.setRowkAction(element);
    BrTable.checkSelectAll(item);
  }

  function checkSelectSent(item: string, elem: string) {
    const element: HTMLInputElement = document.querySelector(`[name^="${elem}"]`);
    BrTableSent.setRowkAction(element);
    BrTableSent.checkSelectAll(item);
  }

  function renderListInbox() {
    if (messages?.dataInbox && messages?.dataInbox.length) {
      const data = changePage(currentPage, numberItensPer, messages.dataInbox);
      return data.map((item: Messages, index: number) => (
        <tr key={`messages_${item.id}`} className="table-item-clickable">
          <td>
            <div className="br-checkbox hidden-label">
              <input
                {...register(`inbox[${index}]`)}
                onChange={() => checkSelect('inbox', `inbox[${index}]`)}
                value={item.id}
                id={`check-line-${index}-inbox`}
                type="checkbox"
              />
              <label htmlFor={`check-line-${index}-inbox`}>{index}</label>
            </div>
          </td>
          <Link href={{ pathname: `${router.asPath}/[slug]`, query: { slug: item.id } }} as={`${`${router.asPath}/${item.id}`}`}>
            <td className={`${item.unread ? 'text-bold' : ''}`} data-th={props.t('pages:Messages.inbox.type')}>
              {item.type.name}
            </td>
          </Link>
          <Link href={{ pathname: `${router.asPath}/[slug]`, query: { slug: item.id } }} as={`${`${router.asPath}/${item.id}`}`}>
            <td className={`${item.unread ? 'text-bold' : ''}`} data-th={props.t('pages:Messages.inbox.from')}>
              {item.from.name}
            </td>
          </Link>
          <Link href={{ pathname: `${router.asPath}/[slug]`, query: { slug: item.id } }} as={`${`${router.asPath}/${item.id}`}`}>
            <td className={`w-100 ${item.unread ? 'text-bold' : ''}`} data-th={props.t('pages:Messages.inbox.subject')}>
              {item.subject}
            </td>
          </Link>
          <Link href={{ pathname: `${router.asPath}/[slug]`, query: { slug: item.id } }} as={`${`${router.asPath}/${item.id}`}`}>
            <td className={`${item.unread ? 'text-bold' : ''}`} data-th={props.t('pages:Messages.inbox.date')}>
              {moment(item.dateTimeLastResponse).utcOffset(3).format('DD/MM/yyyy')}
            </td>
          </Link>
          <Link href={{ pathname: `${router.asPath}/[slug]`, query: { slug: item.id } }} as={`${`${router.asPath}/${item.id}`}`}>
            <td className={`${item.unread ? 'text-bold' : ''}`} data-th={props.t('pages:Messages.inbox.status')}>
              {item.status.id === 1 ? 'Recebida' : item.status.name}
            </td>
          </Link>
        </tr>
      ));
    }
    return (
      <tr className="empty-data">
        <td colSpan={6} className="py-5">
          <div>
            <i className="fas fa-inbox fa-5x" />
          </div>
          {props.t('pages:Messages.inbox.error.emptyList')}
        </td>
      </tr>
    );
  }

  function renderListSent() {
    if (messages && messages.dataSend && messages.dataSend.length) {
      const data = changePage(currentPageSent, numberItensPerSent, messages.dataSend);
      return data.map((item: Messages, index: number) => (
        <tr className="table-item-clickable" key={`messages_${item.id}`}>
          <td>
            <div className="br-checkbox hidden-label">
              <input
                {...register(`sent[${index}]`)}
                onChange={() => checkSelectSent('sent', `sent[${index}]`)}
                value={item.id}
                id={`check-line-${index}-sent`}
                type="checkbox"
              />
              <label htmlFor={`check-line-${index}-sent`}>{index}</label>
            </div>
          </td>
          <Link href={{ pathname: `${router.asPath}/[slug]`, query: { slug: item.id } }} as={`${`${router.asPath}/${item.id}`}`}>
            <td className={`${item.unread ? 'text-bold' : ''}`} data-th={props.t('pages:Messages.sent.type')}>
              {item.type.name}
            </td>
          </Link>
          <Link href={{ pathname: `${router.asPath}/[slug]`, query: { slug: item.id } }} as={`${`${router.asPath}/${item.id}`}`}>
            <td className={`${item.unread ? 'text-bold' : ''}`} data-th={props.t('pages:Messages.sent.from')}>
              {item.from.name}
            </td>
          </Link>
          <Link href={{ pathname: `${router.asPath}/[slug]`, query: { slug: item.id } }} as={`${`${router.asPath}/${item.id}`}`}>
            <td className={`w-100 ${item.unread ? 'text-bold' : ''}`} data-th={props.t('pages:Messages.sent.subject')}>
              {item.subject}
            </td>
          </Link>
          <Link href={{ pathname: `${router.asPath}/[slug]`, query: { slug: item.id } }} as={`${`${router.asPath}/${item.id}`}`}>
            <td className={`${item.unread ? 'text-bold' : ''}`} data-th={props.t('pages:Messages.sent.date')}>
              {moment(item.dateTimeLastResponse).utcOffset(3).format('DD/MM/yyyy')}
            </td>
          </Link>
          <Link href={{ pathname: `${router.asPath}/[slug]`, query: { slug: item.id } }} as={`${`${router.asPath}/${item.id}`}`}>
            <td className={`${item.unread ? 'text-bold' : ''}`} data-th={props.t('pages:Messages.sent.status')}>
              {item.status.id === 1 ? 'Recebida' : item.status.name}
            </td>
          </Link>
        </tr>
      ));
    }
    return (
      <tr className="empty-data">
        <td colSpan={6} className="py-5">
          <div>
            <i className="fas fa-inbox fa-5x" />
          </div>
          {props.t('pages:Messages.sent.error.emptyList')}
        </td>
      </tr>
    );
  }

  function paramsNavigation(item: any) {
    setCurrentPage(item.currentPage);
    setNumberItensPer(item.numberItensPer);
  }

  function paramsNavigationSent(item: any) {
    setCurrentPageSent(item.currentPage);
    setNumberItensPerSent(item.numberItensPer);
  }

  function changePage(pageChange: number, itensPerChange: number, data: Messages[]): Messages[] {
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

  function deleteInbox() {
    const idArr = BrTable.getSelectedValues('inbox');
    dispatch(actionsMessages.loadDeleteRequest({ idArr }));
  }

  function deleteSent() {
    const idArr = BrTableSent.getSelectedValues('sent');
    dispatch(actionsMessages.loadDeleteRequest({ idArr }));
  }

  return (
    <div className="container-lg contrast-ignore-bg">
      <div className="row contrast-ignore-bg mx-0">
        <div className="img__page col-auto py-3 pl-0">
          <div className="img__page-messages contrast-ignore-bg" style={{ width: 60, height: 60 }} />
        </div>
        <h2 className="text-primary-default">{props.t('pages:Messages.title')}</h2>
      </div>
      <div className="row mx-0 mb-3">
        <div dangerouslySetInnerHTML={{ __html: props.t('pages:Messages.pageDescription') }} />
      </div>
      <div className="row mx-0 mb-3">
        <Link href="/mensagens/enviar">
          <a>
            <button className="br-button primary mt-0" type="button">
              {props.t('pages:Messages.buttonNewMessage')}
            </button>
          </a>
        </Link>
      </div>
      <div className="row mx-0 mb-5">
        <Tab id="tab-inbox-send">
          <NavItem id="tabInbox" defaultActive>
            {props.t('pages:Messages.inbox.title')}
          </NavItem>
          <NavItem id="tabSent">{props.t('pages:Messages.sent.title')}</NavItem>
          <PanelItem id="tabInbox" defaultActive>
            <Table
              Options={{
                id: 'inbox',
                paginate: true,
                count: messages.dataInbox?.length,
                // searchItens: onSubmit
              }}
              translations={props.t}
              elemListName="inbox"
              ref={(c) => (BrTable = c)}
              paramsNavigation={paramsNavigation}
            >
              <ActionTrigger nameKey="selected-bar" className="inverted">
                <Dropdown icon="fas fa-ellipsis-v" btnClassName="br-button circle small inverted">
                  <div className="br-list text-nowrap">
                    <button
                      className="br-item"
                      onClick={deleteInbox}
                      type="button"
                      aria-label="Excluir"
                    >
                      {props.t('components:Table.delete')}
                    </button>
                  </div>
                </Dropdown>
              </ActionTrigger>
              <THead nameKey='t-head'>
                <tr>
                  <th scope="col">
                    <div className="br-checkbox hidden-label">
                      <input
                        disabled={!messages.dataInbox.length}
                        onChange={() => BrTable.setSelectAll('inbox-')}
                        id="check-all-inbox"
                        type="checkbox"
                        data-toggle="check-all"
                      />
                      <label htmlFor="check-all-inbox">{props.t('components:Table.selectAll')}</label>
                    </div>
                  </th>
                  <th scope="col"><span>{props.t('pages:Messages.inbox.type')}</span></th>
                  <th scope="col"><span>{props.t('pages:Messages.inbox.from')}</span></th>
                  <th scope="col"><span>{props.t('pages:Messages.inbox.subject')}</span></th>
                  <th scope="col"><span>{props.t('pages:Messages.inbox.date')}</span></th>
                  <th scope="col"><span>{props.t('pages:Messages.inbox.status')}</span></th>
                </tr>
              </THead>
              <TBody nameKey='t-body' style={{ whiteSpace: 'nowrap' }}>{renderListInbox()}</TBody>
            </Table>
          </PanelItem>

          <PanelItem id="tabSent">
            <Table
              Options={{
                paginate: true,
                count: messages.dataSend.length,
                id: 'sent',
              }}
              translations={props.t}
              elemListName="sent"
              ref={(c) => (BrTableSent = c)}
              paramsNavigation={paramsNavigationSent}
            >
              <ActionTrigger nameKey="selected-bar" className="inverted">
                <Dropdown icon="fas fa-ellipsis-v" btnClassName="br-button circle small inverted">
                  <div className="br-list text-nowrap">
                    <button
                      className="br-item"
                      onClick={deleteSent}
                      type="button"
                      aria-label="Excluir"
                    >
                      {props.t('components:Table.delete')}
                    </button>
                  </div>
                </Dropdown>
              </ActionTrigger>
              <THead nameKey='t-head'>
                <tr>
                  <th scope="col">
                    <div className="br-checkbox hidden-label">
                      <input
                        disabled={!messages.dataSend.length}
                        onChange={() => BrTableSent.setSelectAll('inbox-')}
                        id="check-all-sent"
                        type="checkbox"
                        data-toggle="check-all"
                      />
                      <label htmlFor="check-all-sent">{props.t('components:Table.selectAll')}</label>
                    </div>
                  </th>
                  <th scope="col"><span>{props.t('pages:Messages.sent.type')}</span></th>
                  <th scope="col"><span>{props.t('pages:Messages.sent.recipient')}</span></th>
                  <th scope="col"><span>{props.t('pages:Messages.sent.subject')}</span></th>
                  <th scope="col"><span>{props.t('pages:Messages.sent.date')}</span></th>
                  <th scope="col"><span>{props.t('pages:Messages.sent.status')}</span></th>
                </tr>
              </THead>
              <TBody nameKey='t-body' style={{ whiteSpace: 'nowrap' }}>{renderListSent()}</TBody>
            </Table>
          </PanelItem>
        </Tab>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function MessagesFunction() {
  return (
    <Template>
      <MessagesPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
