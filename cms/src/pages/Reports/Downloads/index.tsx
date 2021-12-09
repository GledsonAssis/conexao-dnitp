import React, { useCallback, useEffect, useState } from 'react';

import * as actionsReports from '@/store/ducks/reports/actions';
import * as actionsDnitLocalUnits from '@/store/ducks/dnitLocalUnits/actions';
import * as actionsInstitutions from '@/store/ducks/institutions/actions';
import * as actionsSchoolYears from '@/store/ducks/schoolYear/actions';
import * as actionsActivities from '@/store/ducks/activities/actions';
import * as actionsDisciplines from '@/store/ducks/disciplines/actions';
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
import { Datapicker } from '@/components/shared/DataPicker';
import moment from 'moment';
import { Download } from '@/store/ducks/reports/types';
import { SchoolYears } from '@/store/ducks/schoolYear/types';
import { Disciplines } from '@/store/ducks/disciplines/types';
import { Activity } from '@/store/ducks/activities/types';
import { debounceLeading } from '@/utils/debounce';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const ReportDownloadsPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const reportsList = useSelector((state: ApplicationState) => state.reports);
  const dnitLocalUnit = useSelector((state: ApplicationState) => state.dnitLocalUnits);
  const institutions = useSelector((state: ApplicationState) => state.institutions);
  const schoolYears = useSelector((state: ApplicationState) => state.schoolYears);
  const activities = useSelector((state: ApplicationState) => state.activities);
  const disciplines = useSelector((state: ApplicationState) => state.disciplines);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);
  const [sortData, setSortData] = useState('');

  const {
    register,
    watch,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit,
    reset
  } = useForm<any>();

  useEffect(() => {
    dispatch(actionsReports.loadReportsDownloadsListRequest({
      idRegionalSuperintendence: watch('idRegionalSuperintendence'),
      localUnit: watch('localUnit'),
      year: watch('year'),
      educationalInstitution: watch('educationalInstitution'),
      discipline: watch('discipline'),
      activity: watch('activity'),
      dateEnd: watch('dateEnd') ? moment(watch('dateEnd'), 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
      dateInit: watch('dateInit') ? moment(watch('dateInit'), 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
      page: currentPage,
      limit: numberItensPer,
    }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(actionsDnitLocalUnits.loadListSuperintendencesRequest());
    dispatch(actionsSchoolYears.loadListRequest());
    dispatch(actionsDisciplines.loadListRequest({}));
    dispatch(actionsActivities.loadListRequest({ limit: 10000 }));
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
        dnitUnitId: watch('localUnit'),
        limit: 'all'
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

  function nth(n: number) { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th" }

  function renderList() {
    if (reportsList?.downloads?.length) {
      const data = sortItens(reportsList.downloads);
      const listFiltered = changePage(currentPage, numberItensPer, data)
      return listFiltered.map((item: Download, index) => (
        <tr key={`reports_downloads_${item.Disciplina}_${index}`}>
          <td className={'px-0'} />
          <td className="pl-4 text-truncate" data-th={t('pages:Reports.Downloads.Table.Year')}>
            {t('components:listStudentsPerCycle.selectYear', { year: item.Ano, ordinal: nth(item.Ano) }) || '-'}
          </td>
          <td className="w-100 text-truncate" data-th={t('pages:Reports.Downloads.Table.Discipline')}>
            {item?.Disciplina || '-'}
          </td>
          <td data-th={t('pages:Reports.Downloads.Table.Activity')}>
            {item?.Atividade || '-'}
          </td>
          <td data-th={t('pages:Reports.Downloads.Table.DownloadDate')}>
            {item?.['Data Download'] || '-'}
          </td>
          <td data-th={t('pages:Reports.Downloads.Table.TeacherName')}>
            {item?.['Nome do Professor'] || '-'}
          </td>
          <td data-th={t('pages:Reports.Downloads.Table.Type')}>
            {item?.Tipo || '-'}
          </td>
          <td data-th={t('pages:Reports.Downloads.Table.Superintendence')}>
            {item?.Superintendência || '-'}
          </td>
          <td data-th={t('pages:Reports.Downloads.Table.LocalUnit')}>
            {item?.['Unidade Local'] || '-'}
          </td>
          <td data-th={t('pages:Reports.Downloads.Table.Institution')}>
            {item?.['Instituição de Ensino'] || '-'}
          </td>
        </tr>
      ));
    } else {
      return <tr className="empty-data">
        <td colSpan={10} className="py-5">
          <div>
            <i className="fas fa-inbox fa-5x" />
          </div>
          {t('pages:Reports.Downloads.Table.EmptyList')}
        </td>
      </tr>
    }
  }

  function paramsNavigation(item: any) {
    setCurrentPage(item.currentPage);
    setNumberItensPer(item.numberItensPer);
  }

  function onSubmit(data: any) {
    dispatch(actionsReports.loadReportsDownloadsListRequest({
      ...data,
      dateEnd: data.dateEnd ? moment(data.dateEnd, 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
      dateInit: data.dateInit ? moment(data.dateInit, 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : null,
      limit: numberItensPer
    }));
  }

  function onClear() {
    reset()
    dispatch(actionsReports.loadReportsDownloadsListRequest({}));
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

  function renderSchoolYars() {
    if (schoolYears?.data?.length > 0) {
      return schoolYears.data.map((item: SchoolYears) => (
        <div key={`ano_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              {...register('year')}
              value={item.id}
              id={`anos-${item.ordinal}-${item.id}`}
              type="radio" />
            <label htmlFor={`anos-${item.ordinal}-${item.id}`}>
              {t('components:listStudentsPerCycle.selectYear', { year: item.ordinal, ordinal: nth(item.ordinal) })}
            </label>
          </div>
        </div>
      ));
    }
  }

  function renderDisciplines() {
    return disciplines?.data?.map((item: Disciplines) => (
      <div key={`idDiscipline-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`idDiscipline-type-${item.id}`}
            {...register('discipline')}
            value={item.id}
            type="radio" />
          <label htmlFor={`idDiscipline-type-${item.id}`}>
            {item.name}
          </label>
        </div>
      </div>
    ));
  }

  function renderActivity() {
    let data = activities?.data?.rows
    if (watch('discipline')) {
      data = activities?.data?.rows?.filter(item =>
        (+watch('discipline') ? item.discipline.id === +watch('discipline') : true)
        &&
        (+watch('year') ? item.trafficConcept.schoolYear.ordinal === +watch('year') : true)
      )
    }
    return data?.map((item: Activity) => (
      <div key={`activity-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`activity-type-${item.id}`}
            {...register('activity')}
            value={item.id}
            type="radio" />
          <label htmlFor={`activity-type-${item.id}`}>
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
          <p className="h1">{t('pages:Reports.Downloads.Table.Title')}</p>
        </div>
        <div className='col-12'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-100 my-4">
              <div className={`border-solid-sm p-1 px-sm-3 mb-2`}>
                <div className='row'>
                  <div className='col-6'>
                    <div className={`br-input medium`}>
                      <label htmlFor="Superintendence">{t('pages:Reports.Downloads.Labels.Superintendence')}:</label>
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
                      <label htmlFor="LocalUnit">{t('pages:Reports.Downloads.Labels.LocalUnit')}:</label>
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
                      <label htmlFor="educationalInstitution">{t('pages:Reports.Downloads.Labels.Institution')}:</label>
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
                      <label htmlFor="cycle">{t('pages:Reports.Downloads.Labels.YearSchool')}:</label>
                      <Select
                        placeholder={t('pages:Reports.Downloads.Labels.YearSchool')}
                        id="regionalSuperintendence"
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`year_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('year')}
                              defaultChecked
                              value={''}
                              id={`year_all`}
                              type="radio" />
                            <label htmlFor={`year_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderSchoolYars()}
                      </Select>
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className={`br-input medium`}>
                      <label htmlFor="discipline">{t('pages:Reports.Downloads.Labels.Discipline')}:</label>
                      <Select
                        id="discipline"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`discipline_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('discipline')}
                              defaultChecked
                              value={''}
                              id={`discipline_all`}
                              type="radio" />
                            <label htmlFor={`discipline_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderDisciplines()}
                      </Select>
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className={`br-input medium`}>
                      <label htmlFor="activity">{t('pages:Reports.Downloads.Labels.Activity')}:</label>
                      <Select
                        id="activity"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        // onChangeInput={(e: any) => filterSearch('activity', e.target.value)}
                        className="mw-100"
                      >
                        <div key={`activity_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('activity')}
                              defaultChecked
                              value={''}
                              id={`activity_all`}
                              type="radio" />
                            <label htmlFor={`activity_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderActivity()}
                      </Select>
                    </div>
                  </div>
                  <div className='col-4'>
                    <div className={`br-input medium`}>
                      <label htmlFor="period">{t('pages:Reports.Downloads.Labels.TimeCourse')}:</label>
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
                    <label htmlFor="period">{t('pages:Reports.Downloads.Labels.From')}:</label>
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
                    <label htmlFor="period">{t('pages:Reports.Downloads.Labels.To')}:</label>
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
                  {t('pages:Reports.Downloads.Labels.Clear')}
                </button>
                <button className="br-button primary ml-sm-2" type="submit">
                  {t('pages:Reports.Downloads.Labels.Search')}
                </button>
              </div>
            </div>
          </form>
          <Table
            Title={t('pages:Reports.Downloads.Table.Title')}
            Options={{
              id: 'downloads',
              paginate: true,
              count: reportsList?.downloads?.length,
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
                    typeList: 'downloads',
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
                <th scope="col" className={'text-nowrap pl-4'}><span>{t('pages:Reports.Downloads.Table.Year')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Downloads.Table.Discipline')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Downloads.Table.Activity')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Downloads.Table.DownloadDate')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Downloads.Table.TeacherName')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Downloads.Table.Type')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Downloads.Table.Superintendence')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Downloads.Table.LocalUnit')}</span></th>
                <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Downloads.Table.Institution')}</span></th>
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

export default function ReportDownloads() {
  return (
    <Template>
      <ReportDownloadsPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
