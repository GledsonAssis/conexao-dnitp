import React, { useEffect, useState } from 'react';

import * as actionsReports from '@/store/ducks/reports/actions';
import * as actionsStates from '@/store/ducks/states/actions';
import { useForm } from 'react-hook-form';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { Table, TBody, THead, ActionTrigger } from '@/components/shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import Select from '@/components/shared/Select';
import { Datapicker } from '@/components/shared/DataPicker';
import moment from 'moment';
import { getCategoryInteractivity, getTypeInteractivity } from '@/infra/constants/reportsTypes';
import { State } from '@/store/ducks/initiatives/types';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const ReportInteractivityPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const reportsList = useSelector((state: ApplicationState) => state.reports);
  const states = useSelector((state: ApplicationState) => state.states);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);
  const [sortData, setSortData] = useState('');

  const {
    register,
    watch,
    formState: { errors },
    setValue,
    handleSubmit,
    reset
  } = useForm<any>();

  useEffect(() => {
    dispatch(actionsReports.loadReportsInteractivitiesListRequest({
      type: watch('type'),
      dateEnd: watch('dateEnd') ? moment(watch('dateEnd'), 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
      dateInit: watch('dateInit') ? moment(watch('dateInit'), 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
      category: watch('category'),
      uf: watch('uf'),
      page: currentPage,
      limit: numberItensPer,
    }));
    // eslint-disable-next-line
  }, [currentPage, numberItensPer]);

  useEffect(() => {
    dispatch(actionsStates.loadListRequest());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (watch('period')) {
      case '0':
      case 'O':
        setValue('dateEnd', null)
        setValue('dateInit', null)
        break
      default:
        setValue('dateEnd', moment(new Date()).utc().format('DD/MM/YYYY'))
        setValue('dateInit', moment(new Date()).utc().subtract(watch('period'), "days").format('DD/MM/YYYY'))
        break
    }
  }, [watch('period')]);

  function sortItens(data: any[]) {
    return data.sort((a, b) => (new Date(b[sortData]).getTime() - new Date(a[sortData]).getTime()))
  }

  function changePage(pageChange: number, itensPerChange: number, data: any[]): any[] {
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

  function renderList() {
    if (reportsList?.interactivities?.length) {
      const data = sortItens(reportsList.interactivities);
      const listFiltered = changePage(currentPage, numberItensPer, data)
      return listFiltered.map((item, index) => (
        <tr key={`reports_interactivities_${item.Tipo}_${item.UF}_${item.Data}_${index}_${item?.Classificação}`}>
          <td className={'px-0'} />
          <td className="pl-4 text-truncate" data-th={t('pages:Reports.Interactivity.Table.Type')}>
            {item?.Tipo || '-'}
          </td>
          <td data-th={t('pages:Reports.Interactivity.Table.Category')}>
            {item?.Categoria || '-'}
          </td>
          <td data-th={t('pages:Reports.Interactivity.Table.Date')}>
            {item?.Data || '-'}
          </td>
          <td data-th={t('pages:Reports.Interactivity.Table.UF')}>
            {item?.UF || '-'}
          </td>
          <td data-th={t('pages:Reports.Interactivity.Table.Classification')}>
            {+(item?.Classificação) ?
              Array.from(Array(+(item?.Classificação)).keys()).map((idx) =>
                <i key={`checked_${item.UF}_${index}_${item?.Classificação}_${idx}`}
                  className="fas fa-star text-warning"></i>) : ''}
            {5 - +(item?.Classificação) ?
              Array.from(Array(5 - +(item?.Classificação)).keys()).map((idx) =>
                <i key={`unchecked_${item.UF}_${index}_${item?.Classificação}_${idx}`}
                  className="fas fa-star text-primary-pastel-01"></i>) : ''}
          </td>
        </tr>
      ));
    } else {
      return <tr className="empty-data">
        <td colSpan={7} className="py-5">
          <div>
            <i className="fas fa-inbox fa-5x" />
          </div>
          {t('pages:Reports.Interactivity.Table.EmptyList')}
        </td>
      </tr>
    }
  }

  function paramsNavigation(item: any) {
    setCurrentPage(item.currentPage);
    setNumberItensPer(item.numberItensPer);
  }

  function onSubmit(data: any) {
    dispatch(actionsReports.loadReportsInteractivitiesListRequest({
      ...data,
      dateEnd: data.dateEnd ? moment(data.dateEnd, 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
      dateInit: data.dateInit ? moment(data.dateInit, 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null
    }));
  }

  function onClear() {
    reset()
    dispatch(actionsReports.loadReportsInteractivitiesListRequest({}));
  }

  function renderType() {
    const data = getTypeInteractivity()
    return data?.map((item: { title: string, value: string }) => (
      <div key={`type_${item.title}_${item.value}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            {...register('type')}
            value={item.value}
            id={`type_${item.value}`}
            type="radio" />
          <label htmlFor={`type_${item.value}`}>
            {item.title}
          </label>
        </div>
      </div>
    ));
  }

  function renderUF() {
    return states.data?.map((item: State) => (
      <div key={`uf_${item.id}_${item.name}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            {...register('uf')}
            value={item.initials}
            id={`uf_${item.id}`}
            type="radio" />
          <label htmlFor={`uf_${item.id}`}>
            {item.name}
          </label>
        </div>
      </div>
    ));
  }

  function renderCategory() {
    const data = getCategoryInteractivity()
    return data?.map((item: { title: string, value: string }) => (
      <div key={`category_${item.title}_${item.value}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            {...register('category')}
            value={item.value}
            id={`category_${item.value}`}
            type="radio" />
          <label htmlFor={`category_${item.value}`}>
            {item.title}
          </label>
        </div>
      </div>
    ));
  }

  const PeriodArray = [
    {
      value: '0',
      defaultChecked: true,
      id: '0',
      title: t('general:Period.any')
    },
    {
      value: '07',
      defaultChecked: false,
      id: '07',
      title: t('general:Period.last7days'),
    },
    {
      value: '30',
      defaultChecked: false,
      id: '30',
      title: t('general:Period.last30days'),
    },
    {
      value: '365',
      defaultChecked: false,
      id: '365',
      title: t('general:Period.lastYear'),
    },
    {
      value: 'O',
      defaultChecked: false,
      id: 'O',
      title: t('general:Period.other'),
    },
  ];

  return (
    <div className="main-content mt-3 px-md-3" id="main-content">
      <div className="row">
        <div className='col-12 d-flex justify-content-between align-items-center'>
          <p className="h1">{t('pages:Reports.Interactivity.Table.Title')}</p>
        </div>
        <div className='col-12'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-100 my-4">
              <div className={`border-solid-sm p-1 px-sm-3 mb-2`}>
                <div className='row'>
                  <div className='col-4'>
                    <div className={`br-input medium`}>
                      <label htmlFor="Type">{t('pages:Reports.Interactivity.Labels.Type')}:</label>
                      <Select
                        id="Type"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`type_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('type')}
                              defaultChecked
                              value={''}
                              id={`type_all`}
                              type="radio" />
                            <label htmlFor={`type_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderType()}
                      </Select>
                    </div>
                  </div>
                  <div className='col-4'>
                    <div className={`br-input medium`}>
                      <label htmlFor="UF">{t('pages:Reports.Interactivity.Labels.UF')}:</label>
                      <Select
                        id="UF"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`uf_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('uf')}
                              defaultChecked
                              value={''}
                              id={`uf_all`}
                              type="radio" />
                            <label htmlFor={`uf_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderUF()}
                      </Select>
                    </div>
                  </div>
                  <div className='col-4'>
                    <div className={`br-input medium`}>
                      <label htmlFor="Category">{t('pages:Reports.Interactivity.Labels.Category')}:</label>
                      <Select
                        id="Category"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`Category_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('category')}
                              defaultChecked
                              value={''}
                              id={`Category_all`}
                              type="radio" />
                            <label htmlFor={`Category_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderCategory()}
                      </Select>
                    </div>
                  </div>

                  <div className='col-4'>
                    <div className={`br-input medium`}>
                      <label htmlFor="period">{t('pages:Reports.Interactivity.Labels.TimeCourse')}:</label>
                      <Select
                        id="period"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        {PeriodArray.map(item => {
                          return (
                            <div key={`period-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
                              <div className="br-radio">
                                <input
                                  id={`period-${item.id}`}
                                  defaultChecked={item.defaultChecked}
                                  {...register('period')}
                                  value={item.id}
                                  type="radio" />
                                <label htmlFor={`period-${item.id}`}>
                                  {item.title}
                                </label>
                              </div>
                            </div>
                          )
                        })}
                      </Select>
                    </div>
                  </div>
                  <div className={`br-input col-12 col-md-4 ${errors?.From?.type ? 'danger' : ''}`}>
                    <label htmlFor="period">{t('pages:Reports.Interactivity.Labels.From')}:</label>
                    <Datapicker
                      id="From"
                      minDate="all"
                      maxDate="today"
                      disabled={watch('period') !== 'O'}
                      inputProps={{ ...register('dateInit') }}
                      className={`br-input mb-4 col-12 col-md-6 ${errors?.From?.type ? 'danger' : ''}`}
                    />
                    {errors?.From?.type ?
                      <div className="mt-1">
                        <span className="feedback danger" role="alert">
                          <i className="fas fa-times-circle" aria-hidden="true"></i>
                          {t('pages:Register.error.required.From')}
                        </span>
                      </div>
                      : ''}
                  </div>
                  <div className={`br-input col-12 col-md-4 ${errors?.To?.type ? 'danger' : ''}`}>
                    <label htmlFor="period">{t('pages:Reports.Interactivity.Labels.To')}:</label>
                    <Datapicker
                      id="To"
                      minDate="all"
                      maxDate="today"
                      disabled={watch('period') !== 'O'}
                      inputProps={{ ...register('dateEnd') }}
                      className={`br-input mb-4 col-12 col-md-6 ${errors?.To?.type ? 'danger' : ''}`}
                    />
                    {errors?.To?.type ?
                      <div className="mt-1">
                        <span className="feedback danger" role="alert">
                          <i className="fas fa-times-circle" aria-hidden="true"></i>
                          {t('pages:Register.error.required.To')}
                        </span>
                      </div>
                      : ''}
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <button className="br-button ml-sm-auto" onClick={() => reset()} type="button">
                  {t('pages:Reports.Interactivity.Labels.Clear')}
                </button>
                <button className="br-button primary ml-sm-2" type="submit">
                  {t('pages:Reports.Interactivity.Labels.Search')}
                </button>
              </div>
            </div>
          </form>
          <Table
            Title={t('pages:Reports.Interactivity.Table.Title')}
            Options={{
              id: 'interactivities',
              paginate: true,
              count: reportsList?.interactivities?.length,
            }}
            translations={t}
            elemListName="ParticipatingSchools"
            paramsNavigation={paramsNavigation}
          >
            <ActionTrigger nameKey='top-bar' className={'mr-0'}>
              <button
                className="br-button secondary"
                type="button"
                onClick={() =>
                  dispatch(actionsReports.loadGetListCSVsRequest({
                    typeList: 'interactivity',
                    params: {
                      ...watch(),
                      dateEnd: watch('dateEnd') ? moment(watch('dateEnd'), 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
                      dateInit: watch('dateInit') ? moment(watch('dateInit'), 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
                      limit: 'all'
                    }
                  }))
                }
              >
                <i className="fas fa-download mr-1" aria-hidden="true"></i>
                {t('general:commom.DownloadList')}
              </button>
            </ActionTrigger>
            <THead nameKey='t-head'>
              <tr>
                <th scope="col" className={'px-0'} />
                <th scope="col" className={'text-nowrap pl-4'}><span>{t('pages:Reports.Interactivity.Table.Type')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Interactivity.Table.Category')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Interactivity.Table.Date')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Interactivity.Table.UF')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Interactivity.Table.Classification')}</span></th>
              </tr>
            </THead>
            <TBody nameKey='t-body' style={{ whiteSpace: 'nowrap' }}>
              {renderList()}
            </TBody>
          </Table>
        </div>
      </div>
    </div >
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function ReportInteractivity() {
  return (
    <Template>
      <ReportInteractivityPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
