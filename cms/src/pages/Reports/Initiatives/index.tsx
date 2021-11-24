import React, { useEffect, useState } from 'react';

import * as actionsReports from '@/store/ducks/reports/actions';
import * as actionsDnitLocalUnits from '@/store/ducks/dnitLocalUnits/actions';
import * as actionsInstitutions from '@/store/ducks/institutions/actions';
import * as actionsInitiatives from '@/store/ducks/initiatives/actions';
import { useForm } from 'react-hook-form';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { Table, TBody, THead, ActionTrigger } from '@/components/shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import Select from '@/components/shared/Select';
import { DnitLocalUnits, Superintendence } from '@/store/ducks/dnitLocalUnits/types';
import { Institutions } from '@/store/ducks/institutions/types';
import { Status } from '@/store/ducks/initiatives/types';
import { Datapicker } from '@/components/shared/DataPicker';
import moment from 'moment';

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
  const reportsList = useSelector((state: ApplicationState) => state.reports);
  const dnitLocalUnit = useSelector((state: ApplicationState) => state.dnitLocalUnits);
  const institutions = useSelector((state: ApplicationState) => state.institutions);
  const initiatives = useSelector((state: ApplicationState) => state.initiatives);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);

  const {
    register,
    watch,
    formState: { errors },
    setValue,
    handleSubmit,
    reset
  } = useForm<any>();

  useEffect(() => {
    dispatch(actionsReports.loadReportsInitiativesListRequest({
      situation: watch('situation'),
      educationalInstitution: watch('educationalInstitution'),
      idRegionalSuperintendence: watch('idRegionalSuperintendence'),
      localUnit: watch('localUnit'),
      dateEnd: watch('dateEnd') ? moment(watch('dateEnd'), 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
      dateInit: watch('dateInit') ? moment(watch('dateInit'), 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
      page: currentPage,
      limit: numberItensPer,
    }));
    // eslint-disable-next-line
  }, [currentPage, numberItensPer]);

  useEffect(() => {
    dispatch(actionsDnitLocalUnits.loadListSuperintendencesRequest());
    dispatch(actionsInitiatives.loadListStatusRequest());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (watch('idRegionalSuperintendence')) {
      dispatch(actionsDnitLocalUnits.loadListRequest({
        idRegionalSuperintendence: watch('idRegionalSuperintendence'),
        limit: 'all'
      }))
    }
  }, [watch('idRegionalSuperintendence')]);

  useEffect(() => {
    if (watch('localUnit')) {
      dispatch(actionsInstitutions.loadListRequest({
        limit: 'all',
        dnitUnitId: watch('localUnit')
      }))
    }
  }, [watch('localUnit')]);

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

  function renderList() {
    if (reportsList?.initiatives?.length) {
      return reportsList.initiatives.map((item, index) => (
        <tr key={`reports_initiatives_${item.Autor}_${index}`}>
          <td className={'px-0'} />
          <td className="pl-4 text-truncate" data-th={t('pages:Reports.Initiatives.Table.Situation')}>
            {item?.Situação || '-'}
          </td>
          <td className="w-100 text-truncate" data-th={t('pages:Reports.Initiatives.Table.SendDate')}>
            {item?.['Data Envio'] || '-'}
          </td>
          <td data-th={t('pages:Reports.Initiatives.Table.Author')}>
            {item?.Autor || '-'}
          </td>
          <td data-th={t('pages:Reports.Initiatives.Table.Superintendence')}>
            {item?.Superintendência || '-'}
          </td>
          <td data-th={t('pages:Reports.Initiatives.Table.LocalUnit')}>
            {item?.['Unidade Local'] || '-'}
          </td>
          <td data-th={t('pages:Reports.Initiatives.Table.Institution')}>
            {item?.['Instituição de Ensino'] || '-'}
          </td>
        </tr>
      ));
    } else {
      return <tr className="empty-data">
        <td colSpan={7} className="py-5">
          <div>
            <i className="fas fa-inbox fa-5x" />
          </div>
          {t('pages:Reports.Initiatives.Table.EmptyList')}
        </td>
      </tr>
    }
  }

  function paramsNavigation(item: any) {
    setCurrentPage(item.currentPage);
    setNumberItensPer(item.numberItensPer);
  }

  function onSubmit(data: any) {
    dispatch(actionsReports.loadReportsInitiativesListRequest({
      ...data,
      dateEnd: data.dateEnd ? moment(data.dateEnd, 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
      dateInit: data.dateInit ? moment(data.dateInit, 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
      limit: numberItensPer
    }));
  }

  function onClear() {
    reset()
    dispatch(actionsReports.loadReportsInitiativesListRequest({}));
  }

  function renderSuperintendence() {
    if (dnitLocalUnit?.superintendences?.rows?.length > 0) {
      return dnitLocalUnit?.superintendences?.rows?.map((item: Superintendence) => (
        <div key={`superintendence_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              {...register('idRegionalSuperintendence')}
              value={item.id}
              id={`superintendence_${item.id}`}
              type="radio" />
            <label htmlFor={`superintendence_${item.id}`}>
              {item.identification}
            </label>
          </div>
        </div>
      ));
    }
  }

  function renderLocalUnits() {
    return dnitLocalUnit?.data?.rows.map((item: DnitLocalUnits) => (
      <div key={`idDnit-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`idDnit-type-${item.id}`}
            {...register('localUnit')}
            value={item.id}
            type="radio" />
          <label htmlFor={`idDnit-type-${item.id}`}>
            {item.identification}
          </label>
        </div>
      </div>
    ));
  }

  function renderInstitutions() {
    return institutions?.data?.rows.map((item: Institutions) => (
      <div key={`institution-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`educationalInstitution-${item.id}`}
            {...register('educationalInstitution')}
            value={item.id}
            type="radio" />
          <label htmlFor={`educationalInstitution-${item.id}`}>
            {item.name}
          </label>
        </div>
      </div>
    ));
  }

  function renderSituation() {
    if (initiatives?.initiativesByStatus) {
      return initiatives?.initiativesByStatus?.map((item: Status) => (
        <div key={`situation-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              id={`situation-${item.id}`}
              value={item.id}
              {...register('situation')}
              type="radio" />
            <label htmlFor={`situation-${item.id}`}>
              {item.name}
            </label>
          </div>
        </div>
      ));
    }
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
          <p className="h1">{t('pages:Reports.Initiatives.Table.Title')}</p>
        </div>
        <div className='col-12'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-100 my-4">
              <div className={`border-solid-sm p-1 px-sm-3 mb-2`}>
                <div className='row'>
                  <div className='col-6'>
                    <div className={`br-input medium`}>
                      <label htmlFor="Superintendence">{t('pages:Reports.Initiatives.Labels.Superintendence')}:</label>
                      <Select
                        id="Superintendence"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`superintendence_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('idRegionalSuperintendence')}
                              defaultChecked
                              value={''}
                              id={`superintendence_all`}
                              type="radio" />
                            <label htmlFor={`superintendence_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderSuperintendence()}
                      </Select>
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className={`br-input medium`}>
                      <label htmlFor="LocalUnit">{t('pages:Reports.Initiatives.Labels.LocalUnit')}:</label>
                      <Select
                        id="LocalUnit"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`localUnit_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('localUnit')}
                              defaultChecked
                              value={''}
                              id={`localUnit_all`}
                              type="radio" />
                            <label htmlFor={`localUnit_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderLocalUnits()}
                      </Select>
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className={`br-input medium`}>
                      <label htmlFor="educationalInstitution">{t('pages:Reports.Initiatives.Labels.Institution')}:</label>
                      <Select
                        id="educationalInstitution"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`educationalInstitution_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('educationalInstitution')}
                              defaultChecked
                              value={''}
                              id={`educationalInstitution_all`}
                              type="radio" />
                            <label htmlFor={`educationalInstitution_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderInstitutions()}
                      </Select>
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className={`br-input medium`}>
                      <label htmlFor="situation">{t('pages:Reports.Initiatives.Labels.Situation')}:</label>
                      <Select
                        id="situation"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`situation_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('situation')}
                              defaultChecked
                              value={''}
                              id={`situation_all`}
                              type="radio" />
                            <label htmlFor={`situation_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderSituation()}
                      </Select>
                    </div>
                  </div>
                  <div className='col-4'>
                    <div className={`br-input medium`}>
                      <label htmlFor="period">{t('pages:Reports.Initiatives.Labels.TimeCourse')}:</label>
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
                    <label htmlFor="period">{t('pages:Reports.Initiatives.Labels.From')}:</label>
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
                    <label htmlFor="period">{t('pages:Reports.Initiatives.Labels.To')}:</label>
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
                <button className="br-button ml-sm-auto" type="button">
                  {t('pages:Reports.Initiatives.Labels.Clear')}
                </button>
                <button className="br-button primary ml-sm-2" type="submit">
                  {t('pages:Reports.Initiatives.Labels.Search')}
                </button>
              </div>
            </div>
          </form>
          <Table
            Title={t('pages:Reports.Initiatives.Table.Title')}
            Options={{
              id: 'initiatives',
              paginate: true,
              count: reportsList?.initiatives?.length,
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
                    typeList: 'initiatives',
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
                <th scope="col" className={'text-nowrap pl-4'}><span>{t('pages:Reports.Initiatives.Table.Situation')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Initiatives.Table.SendDate')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Initiatives.Table.Author')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Initiatives.Table.Superintendence')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Initiatives.Table.LocalUnit')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Initiatives.Table.Institution')}</span></th>
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

export default function Initiatives() {
  return (
    <Template>
      <InitiativesPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
