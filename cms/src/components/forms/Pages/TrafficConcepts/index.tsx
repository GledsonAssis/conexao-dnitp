import React, { useEffect, useState } from 'react';

import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { TrafficConcept } from '@/store/ducks/trafficConcepts/types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import * as actionsSchoolYears from '@/store/ducks/schoolYear/actions';
import { SchoolYears } from '@/store/ducks/schoolYear/types';
import { ApplicationState } from '@/store';
import Select from '@/components/shared/Select';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps {
  titlePage: string
  onSubmitHandle: Function
  data?: Partial<TrafficConcept>
}

type Props = StateProps & DispatchProps & OwnProps;

export const FormTrafficConceptsPage: React.FC<Props> = ({
  t,
  onSubmitHandle,
  data,
  titlePage
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const schoolYears = useSelector((state: ApplicationState) => state.schoolYears);

  const {
    register,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  useEffect(() => {
    dispatch(actionsSchoolYears.loadListRequest());
  }, []);

  useEffect(() => {
    if (data && schoolYears.data?.length) {
      setValue('idSchoolYear', data?.idSchoolYear)
      setValue('description', data?.description)
    }
  }, [data, schoolYears.data]);

  function onSubmit(dataForm: any) {
    onSubmitHandle(dataForm)
  }

  useEffect(() => {
    if (watch('idSchoolYear') && schoolYears.data) {
      const filteredItem = schoolYears.data.find(item => item.id === +watch('idSchoolYear'))
      if (filteredItem) {
        setValue('theme', filteredItem.subTheme.theme.name)
        setValue('subtheme', filteredItem.subTheme.name)
      }
    }
  }, [watch('idSchoolYear')]);

  function nth(n: number) { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th" }

  function renderSchoolYars() {
    if (schoolYears?.data?.length > 0) {
      return schoolYears.data.map((item: SchoolYears) => (
        <div key={`ano_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              {...register('idSchoolYear')}
              value={item.id}
              defaultChecked={item.id === data?.idSchoolYear}
              id={`anos${item.ordinal}${item.id}`}
              type="radio" />
            <label htmlFor={`anos${item.ordinal}${item.id}`}>
              {t('pages:trafficConcepts.labels.selectYear', { year: item.ordinal, ordinal: nth(item.ordinal) })}
            </label>
          </div>
        </div>
      ));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>
      <div className="main-content mt-3 px-md-3" id="main-content">
        <div className="row">
          <div className='col-12'>
            <p className="h1">{titlePage}</p>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.year?.type ? 'danger' : ''}`}>
              <label htmlFor="year">{t('pages:trafficConcepts.details.labels.year')}*:</label>
              <Select
                placeholder={t('pages:trafficConcepts.details.placeholders.year')}
                id="year"
                CustomclassName={`mw-100 ${errors?.year?.type ? 'danger' : ''}`}
                inputProps={{ ...register('year') }}
                className="mw-100"
              >
                {renderSchoolYars()}
              </Select>
              {errors?.year?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:trafficConcepts.details.required.year')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium`}>
              <label htmlFor="theme">{t('pages:trafficConcepts.details.labels.theme')}:</label>
              <input
                {...register('theme', { required: true })}
                className={`medium`}
                id="theme"
                readOnly
                type="text"
                placeholder={t('pages:trafficConcepts.details.placeholders.theme')} />
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className={`br-input medium `}>
              <label htmlFor="subTheme">{t('pages:trafficConcepts.details.labels.subtheme')}:</label>
              <input
                {...register('subtheme', { required: true })}
                className={`medium`}
                id="subtheme"
                readOnly
                type="text"
                placeholder={t('pages:trafficConcepts.details.placeholders.subtheme')} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-input medium ${errors?.description?.type ? 'danger' : ''}`}>
              <label htmlFor="name">{t('pages:trafficConcepts.details.labels.name')}*:</label>
              <input
                {...register('description', { required: true })}
                maxLength={100}
                className={`medium ${errors?.description?.type ? 'danger' : ''}`}
                id="name"
                type="text"
                placeholder={t('pages:trafficConcepts.details.placeholders.name')} />
              {errors?.description?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:trafficConcepts.details.required.name')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>

        <div className="mt-3 d-flex">
          <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
            <button className="br-button mr-auto" type="button">
              {t('pages:trafficConcepts.details.cancel')}
            </button>
          </Link>
          <button className="br-button primary" value='save' type="submit">
            {t('pages:trafficConcepts.details.submit')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormTrafficConceptsPage
