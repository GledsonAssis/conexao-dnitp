import React, { useEffect, useState } from 'react';

import * as actionsReports from '@/store/ducks/reports/actions';
import * as actionsDnitLocalUnits from '@/store/ducks/dnitLocalUnits/actions';
import * as actionsInstitutions from '@/store/ducks/institutions/actions';
import * as actionsUsers from '@/store/ducks/users/actions';
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
  const users = useSelector((state: ApplicationState) => state.users);
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
    dispatch(actionsReports.loadReportsParticipantsListRequest({
      dateEnd: watch('dateEnd') ? moment(watch('dateEnd'), 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
      dateInit: watch('dateInit') ? moment(watch('dateInit'), 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
      educationalInstitution: watch('educationalInstitution'),
      idRegionalSuperintendence: watch('idRegionalSuperintendence'),
      localUnit: watch('localUnit'),
      role: watch('role'),
      active: watch('active') || null,
      page: currentPage,
      limit: numberItensPer,
    }));
    // eslint-disable-next-line
  }, [currentPage, numberItensPer]);

  useEffect(() => {
    dispatch(actionsDnitLocalUnits.loadListSuperintendencesRequest());
    dispatch(actionsUsers.loadRolesRequest({ mode: 'school' }));
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
    if (reportsList?.participants?.length) {
      const data = sortItens(reportsList.participants);
      const listFiltered = changePage(currentPage, numberItensPer, data)
      return listFiltered.map((item, index) => (
        <tr key={`reports_participants_${item['E-mail']}_${index}`}>
          <td className={'px-0'} />
          <td className="pl-4 text-truncate" data-th={t('pages:Reports.Participants.Table.RegisterDate')}>
            {item?.['Data do Cadastro'] || '-'}
          </td>
          <td className="w-100 text-truncate" data-th={t('pages:Reports.Participants.Table.Name')}>
            {item?.Nome || '-'}
          </td>
          <td data-th={t('pages:Reports.Participants.Table.Email')}>
            {item?.['E-mail'] || '-'}
          </td>
          <td data-th={t('pages:Reports.Participants.Table.Profile')}>
            {item?.Perfil || '-'}
          </td>
          <td data-th={t('pages:Reports.Participants.Table.Superintendence')}>
            {item?.Superintendência || '-'}
          </td>
          <td data-th={t('pages:Reports.Participants.Table.LocalUnit')}>
            {item?.['Unidade Local'] || '-'}
          </td>
          <td data-th={t('pages:Reports.Participants.Table.Institution')}>
            {item?.['Instituição de Ensino'] || '-'}
          </td>
          <td data-th={t('pages:Reports.Participants.Table.LastAccess')}>
            {item?.['Último Acesso'] || '-'}
          </td>
        </tr>
      ));
    } else {
      return <tr className="empty-data">
        <td colSpan={9} className="py-5">
          <div>
            <i className="fas fa-inbox fa-5x" />
          </div>
          {t('pages:Reports.Participants.Table.EmptyList')}
        </td>
      </tr>
    }
  }

  function paramsNavigation(item: any) {
    setCurrentPage(item.currentPage);
    setNumberItensPer(item.numberItensPer);
  }

  function onSubmit(data: any) {
    dispatch(actionsReports.loadReportsParticipantsListRequest({
      ...data,
      active: data.active || null,
      dateEnd: data.dateEnd ? moment(data.dateEnd, 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
      dateInit: data.dateInit ? moment(data.dateInit, 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null
    }));
  }

  function onClear() {
    reset()
    dispatch(actionsReports.loadReportsParticipantsListRequest({}));
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

  function renderProfile() {
    return users?.roles?.map((item: Status) => (
      <div key={`role-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`role-${item.id}`}
            value={item.id}
            {...register('role')}
            type="radio" />
          <label htmlFor={`role-${item.id}`}>
            {item.name}
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
          <p className="h1">{t('pages:Reports.Participants.Table.Title')}</p>
        </div>
        <div className='col-12'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-100 my-4">
              <div className={`border-solid-sm p-1 px-sm-3 mb-2`}>
                <div className='row'>
                  <div className='col-6'>
                    <div className={`br-input medium`}>
                      <label htmlFor="Superintendence">{t('pages:Reports.Participants.Labels.Superintendence')}:</label>
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
                      <label htmlFor="LocalUnit">{t('pages:Reports.Participants.Labels.LocalUnit')}:</label>
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
                      <label htmlFor="educationalInstitution">{t('pages:Reports.Participants.Labels.Institution')}:</label>
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
                      <label htmlFor="role">{t('pages:Reports.Participants.Labels.Profile')}:</label>
                      <Select
                        id="role"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`role_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('role')}
                              defaultChecked
                              value={''}
                              id={`role_all`}
                              type="radio" />
                            <label htmlFor={`role_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderProfile()}
                      </Select>
                    </div>
                  </div>
                  <div className='col-4'>
                    <div className={`br-input medium`}>
                      <label htmlFor="period">{t('pages:Reports.Participants.Labels.TimeCourse')}:</label>
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
                    <label htmlFor="period">{t('pages:Reports.Participants.Labels.From')}:</label>
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
                    <label htmlFor="period">{t('pages:Reports.Participants.Labels.To')}:</label>
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
                <div className='row'>
                  <div className='col-6'>
                    <div className={`br-input medium mt-2 mb-1`}>
                      <div className="br-checkbox">
                        <input
                          {...register(`active`)}
                          id={`only_active`}
                          type="checkbox" />
                        <label htmlFor="only_active">{t('pages:Reports.Participants.Labels.onlyActive')}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <button className="br-button ml-sm-auto" type="button">
                  {t('pages:Reports.Participants.Labels.Clear')}
                </button>
                <button className="br-button primary ml-sm-2" type="submit">
                  {t('pages:Reports.Participants.Labels.Search')}
                </button>
              </div>
            </div>
          </form>
          <Table
            Title={t('pages:Reports.Participants.Table.Title')}
            Options={{
              id: 'initiatives',
              paginate: true,
              count: reportsList?.participants?.length,
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
                    typeList: 'participants',
                    params: {
                      ...watch(),
                      dateEnd: watch('dateEnd') ? moment(watch('dateEnd'), 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
                      dateInit: watch('dateInit') ? moment(watch('dateInit'), 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null
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
                <th scope="col" className={'text-nowrap pl-4'}><span>{t('pages:Reports.Participants.Table.RegisterDate')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Participants.Table.Name')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Participants.Table.Email')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Participants.Table.Profile')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Participants.Table.Superintendence')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Participants.Table.LocalUnit')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Participants.Table.Institution')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Participants.Table.LastAccess')}</span></th>
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
