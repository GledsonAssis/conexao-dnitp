import React, { useEffect, useState } from 'react';

import * as actionsHighlights from '@/store/ducks/highlights/actions';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { Table, TBody, THead, SearchTrigger, ActionTrigger } from '@/components/shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Highlight } from '@/store/ducks/highlights/types';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const HighlightsPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const highlightsList = useSelector((state: ApplicationState) => state.highlights);
  const [highlightList, setHighlightList] = useState<Highlight[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);
  const [keywordSearch, setKeywordSearch] = useState('');
  const router = useRouter();

  const MAX_HIGHLIGHTS = 9;

  useEffect(() => {
    dispatch(actionsHighlights.loadListRequest({}));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setHighlightList(highlightsList.data?.rows
      .sort((cur, next) => (cur.position || highlightsList.data?.rows?.length) - (next.position || highlightsList.data?.rows?.length))
      .map((item: Highlight, idx: number) => {
        if (item.highlighted) {
          item.position = idx + 1
          return item
        } else {
          return item
        }
      }))
    // eslint-disable-next-line
  }, [highlightsList.data]);

  function handleChangeHighlight(e, item) {
    const {
      target: { checked },
    } = e;

    const maxOrder =
      highlightList
        .filter((h) => h.highlighted)
        .map((h) => h.position)
        .sort((cur, next) => cur - next)
        .pop() || 0;

    const high = highlightList.find((highlight) => item.id === highlight.id && item.type === highlight.type);
    high.highlighted = checked;
    if (!checked) {
      if (item.position > 0) {
        highlightList.forEach((el) => {
          if (el.position > item.position) el.position -= 1;
        });
      }
      high.position = null;
    } else {
      high.position = maxOrder + 1;
    }
    setHighlightList([...highlightList]);
  }

  function moveItem(toMove: string, item: Highlight) {
    switch (toMove) {
      case 'up':
        if (item.position > 1) {
          const highToUp = highlightList.find((highlight) => highlight.position === item.position);
          const highToDown = highlightList.find((highlight) => highlight.position === item.position - 1);
          highToUp.position -= 1;
          highToDown.position += 1;
        }
        break
      case 'down':
        if (item.position < Math.min(MAX_HIGHLIGHTS, highlightList.filter(item => item.highlighted).length)) {
          const highToDown = highlightList.find((highlight) => highlight.position === item.position);
          const highToUp = highlightList.find((highlight) => highlight.position === item.position + 1);
          highToUp.position -= 1;
          highToDown.position += 1;
        }
        break
    }
    setHighlightList([...highlightList]);
  }

  function renderList() {
    if (highlightList?.length) {
      const data = changePage(
        currentPage,
        numberItensPer,
        highlightList
          .sort((cur, next) => (cur.position || highlightList.length) - (next.position || highlightList.length))
          .map((item: Highlight, idx: number) => {
            if (item.highlighted) {
              item.position = idx + 1
              return item
            } else {
              return item
            }
          })
      );
      return data.map((item) => (
        <tr key={`highlight_${item.type}_${item.id}`}>
          <td className={'px-0'} />
          <td className={'text-center'} data-th={t('pages:highlights.labels.table.highlightOrder')}>
            {item.highlighted &&
              <button className="br-button circle small my-0 ml-0 mr-1 text-success"
                disabled={item.position === 1}
                style={{ alignItems: 'center' }} type="button" aria-label="Ícone ilustrativo"
                onClick={() => moveItem('up', item)}>
                <i className="fas fa-sort-up"></i>
              </button>
            }
            <strong>{item.position}</strong>
            {item.highlighted &&
              <button className="br-button circle small my-0 ml-1 mr-0 text-danger"
                disabled={item.position === Math.min(MAX_HIGHLIGHTS, highlightList.filter(item => item.highlighted).length)}
                style={{ alignItems: 'baseline' }} type="button" aria-label="Ícone ilustrativo"
                onClick={() => moveItem('down', item)}>
                <i className="fas fa-sort-down"></i>
              </button>
            }
          </td>
          <td className="w-100 pl-4" data-th={t('pages:highlights.labels.table.title')}>{item.title}</td>
          <td data-th={t('pages:highlights.labels.table.type')}>{item.type}</td>
          <td className={'text-center'} data-th={t('pages:highlights.labels.table.highlight')}>
            <div className="br-checkbox hidden-label">
              <input
                defaultChecked={item.highlighted}
                id={`highlight_${item.type}_${item.id}`}
                disabled={highlightList.reduce((acc, item) => acc + +item.highlighted, 0) >= MAX_HIGHLIGHTS && !item.highlighted}
                name={`highlight_${item.type}_${item.id}`}
                onChange={(e) => handleChangeHighlight(e, item)}
                type="checkbox" />
              <label htmlFor={`highlight_${item.type}_${item.id}`}></label>
            </div>
          </td>
          <td data-th={t('pages:highlights.labels.table.creationDate')}>{moment.utc(item.creationDate).format('DD/MM/YYYY')}</td>
          <td data-th={t('pages:highlights.labels.table.modifyDate')}>{moment.utc(item.modifyDate).format('DD/MM/YYYY')}</td>
        </tr>
      ));
    } else {
      return <tr className="empty-data">
        <td colSpan={7} className="py-5">
          <div>
            <i className="fas fa-inbox fa-5x" />
          </div>
          {t('pages:highlights.labels.emptyList')}
        </td>
      </tr>
    }
  }

  function changePage(pageChange: number, itensPerChange: number, data: Highlight[]): Highlight[] {
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

  function paramsNavigation(item: any) {
    setCurrentPage(item.currentPage);
    setNumberItensPer(item.numberItensPer);
  }

  function onSubmitKeyword(data: any) {
    setKeywordSearch(data.searchbox)
  }

  function onSubmit() {
    dispatch(actionsHighlights.loadSubmitRequest({
      body: highlightList.filter(item => item.highlighted)
    }));
  }

  return (
    <div className="main-content mt-3 px-md-3" id="main-content">
      <div className="row">
        <div className='col-12 d-flex justify-content-between align-items-center'>
          <p className="h1">{t('pages:highlights.labels.pageTitle')}</p>
          <button className="br-button secondary" type="button" onClick={onSubmit}>
            <i className="fas fa-plus mr-1" aria-hidden="true"></i>
            {t('pages:highlights.labels.save')}
          </button>
        </div>
        <div className='col-12'>
          <div className="header-search w-100 my-4">
          </div>
          <Table
            Title={t('pages:highlights.labels.listTitle')}
            Options={{
              id: 'highlights',
              paginate: true,
              count: highlightsList.data?.count,
              searchItens: onSubmitKeyword
            }}
            translations={t}
            elemListName="ParticipatingSchools"
            paramsNavigation={paramsNavigation}
          >
            <SearchTrigger nameKey='trigger-search' />
            <THead nameKey='t-head'>
              <tr>
                <th scope="col" className={'px-0'} />
                <th scope="col" style={{ width: 80 }} className={'text-nowrap text-center'}><span>{t('pages:highlights.labels.table.highlightOrder')}</span></th>
                <th scope="col" className={'text-nowrap pl-4'}><span>{t('pages:highlights.labels.table.title')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:highlights.labels.table.type')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:highlights.labels.table.highlight')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:highlights.labels.table.creationDate')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:highlights.labels.table.modifyDate')}</span></th>
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

export default function Highlights() {
  return (
    <Template>
      <HighlightsPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
