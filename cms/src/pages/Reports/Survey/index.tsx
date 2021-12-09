import React, { useEffect, useState } from 'react';

import * as actionsReports from '@/store/ducks/reports/actions';
import * as actionsDnitLocalUnits from '@/store/ducks/dnitLocalUnits/actions';
import * as actionsInstitutions from '@/store/ducks/institutions/actions';
import * as actionsTrafficContents from '@/store/ducks/trafficContents/actions';
import * as actionsKnowledgeObjects from '@/store/ducks/knowledgeObjects/actions';
import * as actionsSchoolYears from '@/store/ducks/schoolYear/actions';
import * as actionsActivities from '@/store/ducks/activities/actions';
import * as actionsDisciplines from '@/store/ducks/disciplines/actions';
import * as actionsRegionalSuperintendences from '@/store/ducks/regionalSuperintendences/actions';
import * as actionsUsers from '@/store/ducks/users/actions';
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
import { bodySurvey } from '@/infra/domains/entities/Survey';
import { getPeriod, getSituationActivity, getTypeActivity, TypeActivity } from '@/infra/constants/reportsTypes';
import { SchoolYears } from '@/store/ducks/schoolYear/types';
import { Disciplines } from '@/store/ducks/disciplines/types';
import { Activity, TrafficContent } from '@/store/ducks/activities/types';

import { bodyActivitySearch } from '@/infra/domains/entities/Activity';
import { RegionalSuperintendence } from '@/store/ducks/regionalSuperintendences/types';
import { DnitLocalUnit } from '@/store/ducks/dnitLocalUnits/types';
import { Institutions } from '@/store/ducks/institutions/types';
import { User } from '@/store/ducks/users/types';
import { Survey } from '@/store/ducks/reports/types';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const ReportSurveiesPage: React.FC<Props> = ({ propsModel, t }) => {
  const dispatch = useDispatch();
  const reportsList = useSelector((state: ApplicationState) => state.reports);
  const schoolYears = useSelector((state: ApplicationState) => state.schoolYears);
  const disciplines = useSelector((state: ApplicationState) => state.disciplines);
  const trafficContents = useSelector((state: ApplicationState) => state.trafficContents);
  const knowledgeObjects = useSelector((state: ApplicationState) => state.knowledgeObjects);
  const activities = useSelector((state: ApplicationState) => state.activities);
  const regionalSuperintendences = useSelector((state: ApplicationState) => state.regionalSuperintendences);
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
    dispatch(actionsReports.loadReportsSurveiesListRequest({
      page: currentPage,
      limit: numberItensPer,
      body: new bodySurvey({
        activity: watch('activity'),
        situation: watch('situation'),
        period: watch('period'),
        type: watch('type'),
        teacher: watch('teacher'),
        periodEnd: moment(new Date(), 'DD/MM/YYYY').utc().format('YYYY-MM-DD'),
        periodStart: moment(new Date(), 'DD/MM/YYYY').utc().subtract(1, "year").format('YYYY-MM-DD'),
      })
    }));
    // eslint-disable-next-line
  }, [currentPage, numberItensPer]);

  useEffect(() => {
    dispatch(actionsSchoolYears.loadListRequest());
    dispatch(actionsDisciplines.loadListRequest({}));
    dispatch(actionsActivities.loadSearchRequest(new bodyActivitySearch()));
    dispatch(actionsTrafficContents.loadListRequest({ limit: 'all' }))
    dispatch(actionsKnowledgeObjects.loadListRequest({ limit: 'all' }))
    dispatch(actionsRegionalSuperintendences.loadListRequest({ limit: 'all' }))
    dispatch(actionsDnitLocalUnits.loadListRequest({ limit: 'all' }))
    dispatch(actionsInstitutions.loadListRequest({ limit: 'all', participaConexaoDnit: true }))
    dispatch(actionsUsers.loadListRequest({ limit: 'all' }))
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (watch('activity.year')) {
      dispatch(actionsTrafficContents.loadListRequest({ limit: 'all', idSchoolYear: watch('activity.year') }))
    }
  }, [watch('activity.year')]);

  useEffect(() => {
    if (watch('activity.year') || watch('activity.discipline')) {
      dispatch(actionsKnowledgeObjects.loadListRequest({
        limit: 'all', idSchoolYear: watch('activity.year'), idDiscipline: watch('activity.discipline.0')
      }))
    }
  }, [watch('activity.year'), watch('activity.discipline')]);

  useEffect(() => {
    if (
      watch('activity.year') ||
      watch('activity.discipline') ||
      watch('activity.trafficContent') ||
      watch('activity.knowledgeObject')
    ) {
      dispatch(actionsActivities.loadSearchRequest(
        new bodyActivitySearch({
          disciplineSubject: watch('activity.knowledgeObject'),
          disciplines: [(watch('activity.discipline.0') || '')],
          schoolYears: [(watch('activity.year') || '')],
          trafficContent: watch('activity.trafficContent')
        })
      ))
    }
  }, [
    watch('activity.year'),
    watch('activity.discipline'),
    watch('activity.trafficContent'),
    watch('activity.knowledgeObject')
  ]);

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
    if (reportsList?.surveies?.length) {
      const data = sortItens(reportsList.surveies);
      const listFiltered: Survey[] = changePage(currentPage, numberItensPer, data)
      switch (watch('type')) {
        case TypeActivity.ACTIVITY:
          return listFiltered.map((item, index) => (
            <tr key={`reports_surveies_${item.activity}_${item.year}_${index}`}>
              <td className={'px-0'} />
              <td className="pl-4 text-truncate" data-th={t('pages:Reports.Survey.Table.Activity.SituationActivity')}>
                {item?.situation || '-'}
              </td>
              <td className="w-100 text-truncate" data-th={t('pages:Reports.Survey.Table.Activity.Year')}>
                {t('components:listStudentsPerCycle.selectYear', { year: item?.year, ordinal: nth(item?.year) })}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Activity.Discipline')}>
                {item?.discipline || '-'}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Activity.Teacher')}>
                {item?.teacher || '-'}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Activity.Activity')}>
                {item?.activity || '-'}
              </td>
            </tr>
          ));
        case TypeActivity.LOCALE:
          return listFiltered.map((item, index) => (
            <tr key={`reports_surveies_${item.activity}_${item.year}_${index}`}>
              <td className={'px-0'} />
              <td className="pl-4 text-truncate" data-th={t('pages:Reports.Survey.Table.Locale.SituationActivity')}>
                {item?.situation || '-'}
              </td>
              <td className="w-100 text-truncate" data-th={t('pages:Reports.Survey.Table.Locale.Year')}>
                {t('components:listStudentsPerCycle.selectYear', { year: item?.year, ordinal: nth(item?.year) })}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Locale.Date')}>
                {item?.date || '-'}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Locale.Teacher')}>
                {item?.teacher || '-'}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Locale.RegionalSuperintendence')}>
                {item?.regionalSuperintendence || '-'}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Locale.LocalUnit')}>
                {item?.dnitLocalUnit || '-'}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Locale.Institution')}>
                {item?.institution || '-'}
              </td>
            </tr>
          ));
        case TypeActivity.QUESTION:
          return listFiltered.map((item, index) => (
            <tr key={`reports_surveies_${item.activity}_${item.year}_${index}`}>
              <td className={'px-0'} />
              <td className="w-100 text-truncate" data-th={t('pages:Reports.Survey.Table.Question.Year')}>
                {t('components:listStudentsPerCycle.selectYear', { year: item?.year, ordinal: nth(item?.year) })}
              </td>
              <td className="pl-4 text-truncate" data-th={t('pages:Reports.Survey.Table.Question.Date')}>
                {item?.date || '-'}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Question.Teacher')}>
                {item?.teacher || '-'}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Question.Institution')}>
                {item?.institution || '-'}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Question.RegionalSuperintendence')}>
                {item?.regionalSuperintendence || '-'}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Question.LocalUnit')}>
                {item?.dnitLocalUnit || '-'}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Question.Activity')}>
                {item?.activity || '-'}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Question.Question')}>
                {item?.question || '-'}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Question.Alternative')}>
                {item?.alternative || '-'}
              </td>
              <td data-th={t('pages:Reports.Survey.Table.Question.Answer')}>
                {item?.justify || '-'}
              </td>
            </tr>
          ));
        default:
          return <tr className="empty-data">
            <td colSpan={7} className="py-5">
              <div>
                <i className="fas fa-inbox fa-5x" />
              </div>
              {t('pages:Reports.Survey.Table.EmptyList')}
            </td>
          </tr>
      }
    } else {
      switch (watch('type')) {
        case TypeActivity.ACTIVITY:
          return <tr className="empty-data">
            <td colSpan={6} className="py-5">
              <div>
                <i className="fas fa-inbox fa-5x" />
              </div>
              {t('pages:Reports.Survey.Table.EmptyList')}
            </td>
          </tr>
        case TypeActivity.LOCALE:
          return <tr className="empty-data">
            <td colSpan={8} className="py-5">
              <div>
                <i className="fas fa-inbox fa-5x" />
              </div>
              {t('pages:Reports.Survey.Table.EmptyList')}
            </td>
          </tr>
        case TypeActivity.QUESTION:
          return <tr className="empty-data">
            <td colSpan={11} className="py-5">
              <div>
                <i className="fas fa-inbox fa-5x" />
              </div>
              {t('pages:Reports.Survey.Table.EmptyList')}
            </td>
          </tr>
      }
    }
  }

  function paramsNavigation(item: any) {
    setCurrentPage(item.currentPage);
    setNumberItensPer(item.numberItensPer);
  }

  function onSubmit(data: any) {
    dispatch(actionsReports.loadReportsSurveiesListRequest({
      body: new bodySurvey({
        ...data,
        periodEnd: data.dateEnd ?
          moment(data.dateEnd, 'DD/MM/YYYY').utc().format('YYYY-MM-DD') :
          moment(new Date(), 'DD/MM/YYYY').utc().format('YYYY-MM-DD'),
        periodStart: data.dateInit ?
          moment(data.dateInit, 'DD/MM/YYYY').utc().format('YYYY-MM-DD') :
          moment(new Date(), 'DD/MM/YYYY').subtract(1, "year").utc().format('YYYY-MM-DD')
      })
    }));
  }

  function onClear() {
    reset()
    dispatch(actionsReports.loadReportsSurveiesListRequest({
      body: new bodySurvey({
        periodEnd: moment(new Date(), 'DD/MM/YYYY').utc().format('YYYY-MM-DD'),
        periodStart: moment(new Date(), 'DD/MM/YYYY').utc().subtract(1, "year").format('YYYY-MM-DD'),
      })
    }));
  }

  function renderSituation() {
    return getSituationActivity().map((item: { value: string, title: string }, index: number) => (
      <div key={`situation-select-${item.value}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`situation-${item.value}`}
            value={item.value}
            {...register('situation')}
            defaultChecked={index === 0}
            type="radio" />
          <label htmlFor={`situation-${item.value}`}>
            {item.title}
          </label>
        </div>
      </div>
    ));
  }

  function nth(n: number) { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th" }

  function renderSchoolYars() {
    if (schoolYears?.data?.length > 0) {
      return schoolYears.data.map((item: SchoolYears) => (
        <div key={`ano_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              {...register('activity.year')}
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
            {...register('activity.discipline[]')}
            value={item.id}
            type="radio" />
          <label htmlFor={`idDiscipline-type-${item.id}`}>
            {item.name}
          </label>
        </div>
      </div>
    ));
  }

  function renderTrafficContent() {
    return trafficContents?.data?.rows?.map((item: TrafficContent) => (
      <div key={`idTrafficContent-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`idTrafficContent-type-${item.id}`}
            {...register('activity.trafficContent')}
            value={item.id}
            type="radio" />
          <label htmlFor={`idTrafficContent-type-${item.id}`}>
            {item.description}
          </label>
        </div>
      </div>
    ));
  }

  function renderKnowledgeObject() {
    return knowledgeObjects?.data?.rows?.map((item: TrafficContent) => (
      <div key={`knowledgeObject-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`knowledgeObject-type-${item.id}`}
            {...register('activity.knowledgeObject')}
            value={item.id}
            type="radio" />
          <label htmlFor={`knowledgeObject-type-${item.id}`}>
            {item.description}
          </label>
        </div>
      </div>
    ));
  }

  function renderActivity() {
    if (Array.isArray(activities?.data)) {
      return activities?.data?.sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      }).map((item: Activity) => (
        <div key={`activity-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              id={`activity-type-${item.id}`}
              {...register('activity.activity')}
              value={item.id}
              type="radio" />
            <label htmlFor={`activity-type-${item.id}`}>
              {item.title}
            </label>
          </div>
        </div>
      ));
    }
  }

  function renderRegionalSuperintendence() {
    return regionalSuperintendences?.data?.rows?.map((item: RegionalSuperintendence) => (
      <div key={`regionalSuperintendences-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`regionalSuperintendences-type-${item.id}`}
            {...register('teacher.regionalSuperintendences')}
            value={item.id}
            type="radio" />
          <label htmlFor={`regionalSuperintendences-type-${item.id}`}>
            {item.identification}
          </label>
        </div>
      </div>
    ));
  }

  function renderLocalUnit() {
    const data = watch('teacher.regionalSuperintendences') ? dnitLocalUnit?.data?.rows?.filter(
      item => item.idRegionalSuperintendence === +watch('teacher.regionalSuperintendences')) :
      dnitLocalUnit?.data?.rows;

    return data?.map((item: DnitLocalUnit) => (
      <div key={`dnitLocalUnit-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`dnitLocalUnit-type-${item.id}`}
            {...register('teacher.dnitLocalUnit')}
            value={item.id}
            type="radio" />
          <label htmlFor={`dnitLocalUnit-type-${item.id}`}>
            {item.identification}
          </label>
        </div>
      </div>
    ));
  }

  function renderInstitutions() {
    const data = watch('teacher.dnitLocalUnit') ? institutions?.data?.rows?.filter(
      item => item.dnitUnitId === +watch('teacher.dnitLocalUnit')) : institutions?.data?.rows;

    return data?.map((item: Institutions) => (
      <div key={`institution-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`institution-type-${item.id}`}
            {...register('teacher.institution')}
            value={item.id}
            type="radio" />
          <label htmlFor={`institution-type-${item.id}`}>
            {item.name}
          </label>
        </div>
      </div>
    ));
  }

  function renderUser() {
    const data = watch('teacher.dnitLocalUnit') ? users?.data?.rows?.filter(
      item => item.idDnitUnit === +watch('teacher.dnitLocalUnit')) : users?.data?.rows;

    return users?.data?.rows?.map((item: User) => (
      <div key={`teacher-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`teacher-type-${item.id}`}
            {...register('teacher.teacher')}
            value={item.id}
            type="radio" />
          <label htmlFor={`teacher-type-${item.id}`}>
            {item.name}
          </label>
        </div>
      </div>
    ));
  }

  function renderListByType() {
    switch (watch('type')) {
      case TypeActivity.ACTIVITY:
        return (<THead nameKey='t-head'>
          <tr>
            <th scope="col" className={'px-0'} />
            <th scope="col" className={'text-nowrap pl-4'}><span>{t('pages:Reports.Survey.Table.Activity.SituationActivity')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Activity.Year')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Activity.Discipline')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Activity.Teacher')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Activity.Activity')}</span></th>
          </tr>
        </THead>)
      case TypeActivity.LOCALE:
        return (<THead nameKey='t-head'>
          <tr>
            <th scope="col" className={'px-0'} />
            <th scope="col" className={'text-nowrap pl-4'}><span>{t('pages:Reports.Survey.Table.Locale.SituationActivity')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Locale.Year')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Locale.Date')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Locale.Teacher')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Locale.RegionalSuperintendence')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Locale.LocalUnit')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Locale.Institution')}</span></th>
          </tr>
        </THead>)
      case TypeActivity.QUESTION:
        return (<THead nameKey='t-head'>
          <tr>
            <th scope="col" className={'px-0'} />
            <th scope="col" className={'text-nowrap pl-4'}><span>{t('pages:Reports.Survey.Table.Question.Year')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Question.Date')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Question.Teacher')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Question.Institution')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Question.RegionalSuperintendence')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Question.LocalUnit')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Question.Activity')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Question.Question')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Question.Alternative')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Question.Answer')}</span></th>
          </tr>
        </THead>)
      default:
        return (<THead nameKey='t-head'>
          <tr>
            <th scope="col" className={'px-0'} />
            <th scope="col" className={'text-nowrap pl-4'}><span>{t('pages:Reports.Survey.Table.Activity.SituationActivity')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Activity.Year')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Activity.Discipline')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Activity.Teacher')}</span></th>
            <th scope="col" className={'text-nowrap'}><span>{t('pages:Reports.Survey.Table.Activity.Activity')}</span></th>
          </tr>
        </THead>)
    }
  }

  return (
    <div className="main-content mt-3 px-md-3" id="main-content">
      <div className="row">
        <div className='col-12 d-flex justify-content-between align-items-center'>
          <p className="h1">{t('pages:Reports.Survey.Table.Title')}</p>
        </div>
        <div className='col-12'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-100 my-4">
              <div className={`border-solid-sm p-1 px-sm-3 mb-2`}>
                <div className='row'>
                  <div className='col-12'>
                    <div className={`br-input medium`}>
                      <label htmlFor="situation">{t('pages:Reports.Survey.Labels.Type')}:</label><br />
                      {getTypeActivity().map(item => (
                        <div className="d-inline-block mr-3 mb-1">
                          <div className="br-radio">
                            <input
                              {...register('type')}
                              id={`open_${item.value}`}
                              type="radio"
                              defaultChecked={item.value === TypeActivity.ACTIVITY}
                              value={item.value} />
                            <label htmlFor={`open_${item.value}`}>{t(item.title)}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className={`br-input medium`}>
                      <label htmlFor="situation">{t('pages:Reports.Survey.Labels.Situation')}:</label>
                      <Select
                        id="situation"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        {renderSituation()}
                      </Select>
                    </div>
                  </div>
                  <div className='col-4'>
                    <div className={`br-input medium`}>
                      <label htmlFor="period">{t('pages:Reports.Survey.Labels.TimeCourse')}:</label>
                      <Select
                        id="period"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        {getPeriod().map(item => {
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
                                  {t(item.title)}
                                </label>
                              </div>
                            </div>
                          )
                        })}
                      </Select>
                    </div>
                  </div>
                  <div className={`br-input col-12 col-md-4 ${errors?.From?.type ? 'danger' : ''}`}>
                    <label htmlFor="period">{t('pages:Reports.Survey.Labels.From')}:</label>
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
                    <label htmlFor="period">{t('pages:Reports.Survey.Labels.To')}:</label>
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
                  <div className='col-12'>
                    <h4 className="text-capitalize">{t('pages:Reports.Survey.Labels.Activity.Activity')}</h4>
                  </div>
                  <div className='col-6'>
                    <div className={`br-input medium`}>
                      <label htmlFor="year">{t('pages:Reports.Survey.Labels.Activity.Year')}:</label>
                      <Select
                        placeholder={t('pages:Reports.Survey.Labels.Activity.Year')}
                        id="year"
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`year_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('activity.year')}
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
                      <label htmlFor="discipline">{t('pages:Reports.Survey.Labels.Activity.Discipline')}:</label>
                      <Select
                        id="discipline"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`discipline_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('activity.discipline[]')}
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
                      <label htmlFor="trafficContent">{t('pages:Reports.Survey.Labels.Activity.TrafficContent')}:</label>
                      <Select
                        id="trafficContent"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`trafficContent_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('activity.trafficContent')}
                              defaultChecked
                              value={''}
                              id={`trafficContent_all`}
                              type="radio" />
                            <label htmlFor={`trafficContent_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderTrafficContent()}
                      </Select>
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className={`br-input medium`}>
                      <label htmlFor="knowledgeObject">{t('pages:Reports.Survey.Labels.Activity.KnowledgeObject')}:</label>
                      <Select
                        id="knowledgeObject"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`knowledgeObject_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('activity.knowledgeObject')}
                              defaultChecked
                              value={''}
                              id={`knowledgeObject_all`}
                              type="radio" />
                            <label htmlFor={`knowledgeObject_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderKnowledgeObject()}
                      </Select>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className={`br-input medium`}>
                      <label htmlFor="activity">{t('pages:Reports.Survey.Labels.Activity.Activity')}:</label>
                      <Select
                        id="activity"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`activity_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('activity.activity')}
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
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <h4 className="text-capitalize">{t('pages:Reports.Survey.Labels.Teacher.Teacher')}</h4>
                  </div>
                  <div className='col-6'>
                    <div className={`br-input medium`}>
                      <label htmlFor="regionalSuperintendence">{t('pages:Reports.Survey.Labels.Teacher.Superintendence')}:</label>
                      <Select
                        id="regionalSuperintendence"
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`regionalSuperintendence_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('teacher.regionalSuperintendences')}
                              defaultChecked
                              value={''}
                              id={`regionalSuperintendence_all`}
                              type="radio" />
                            <label htmlFor={`regionalSuperintendence_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderRegionalSuperintendence()}
                      </Select>
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className={`br-input medium`}>
                      <label htmlFor="dnitLocalUnit">{t('pages:Reports.Survey.Labels.Teacher.LocalUnit')}:</label>
                      <Select
                        id="dnitLocalUnit"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`dnitLocalUnit_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('teacher.dnitLocalUnit')}
                              defaultChecked
                              value={''}
                              id={`dnitLocalUnit_all`}
                              type="radio" />
                            <label htmlFor={`dnitLocalUnit_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderLocalUnit()}
                      </Select>
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className={`br-input medium`}>
                      <label htmlFor="institution">{t('pages:Reports.Survey.Labels.Teacher.Institution')}:</label>
                      <Select
                        id="institution"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`institution_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('teacher.institution')}
                              defaultChecked
                              value={''}
                              id={`institution_all`}
                              type="radio" />
                            <label htmlFor={`institution_all`}>
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
                      <label htmlFor="teacher">{t('pages:Reports.Survey.Labels.Teacher.Teacher')}:</label>
                      <Select
                        id="teacher"
                        style={{ maxHeight: 320 }}
                        CustomclassName={`mw-100`}
                        className="mw-100"
                      >
                        <div key={`teacher_all`} className="br-item w-100" tabIndex={-1}>
                          <div className="br-radio">
                            <input
                              {...register('teacher.teacher')}
                              defaultChecked
                              value={''}
                              id={`teacher_all`}
                              type="radio" />
                            <label htmlFor={`teacher_all`}>
                              {t('components:Select.all')}
                            </label>
                          </div>
                        </div>
                        {renderUser()}
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <button className="br-button ml-sm-auto" onClick={() => reset()} type="button">
                  {t('pages:Reports.Survey.Labels.Clear')}
                </button>
                <button className="br-button primary ml-sm-2" type="submit">
                  {t('pages:Reports.Survey.Labels.Search')}
                </button>
              </div>
            </div>
          </form>
          <Table
            Title={t('pages:Reports.Survey.Table.Title')}
            Options={{
              id: 'surveies',
              paginate: true,
              count: reportsList?.surveies?.length,
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
                    typeList: 'survey',
                    params: {
                      ...watch(),
                      teacher: {
                        ...watch()?.teacher,
                        user: watch()?.teacher?.teacher
                      },
                      periodEnd: watch('dateEnd') ? moment(watch('dateEnd'), 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : moment().utc().format('YYYY-MM-DD'),
                      periodStart: watch('dateInit') ? moment(watch('dateInit'), 'DD/MM/YYYY').utc().format('YYYY-MM-DD') : moment('2000-01-01').utc().format('YYYY-MM-DD'),
                    }
                  }))
                }
              >
                <i className="fas fa-download mr-1" aria-hidden="true"></i>
                {t('general:commom.DownloadList')}
              </button>
            </ActionTrigger>
            {renderListByType()}
            {<TBody nameKey='t-body' style={{ whiteSpace: 'nowrap' }}>
              {renderList()}
            </TBody>}
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

export default function ReportSurveies() {
  return (
    <Template>
      <ReportSurveiesPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
