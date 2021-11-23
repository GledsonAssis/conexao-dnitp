import React, { useEffect, useState } from 'react';

import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { TrafficConcept, TrafficContent, TrafficContentRequest, TrafficScope } from '@/store/ducks/trafficContents/types';
import * as actionsTrafficConcepts from '@/store/ducks/trafficConcepts/actions';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import * as actionsSchoolYears from '@/store/ducks/schoolYear/actions';
import { SchoolYears } from '@/store/ducks/schoolYear/types';
import { ApplicationState } from '@/store';
import Select from '@/components/shared/Select';
import { SkillsForm } from '@/components/forms/Skills';
import { StudentsByGradeForm } from '../../StudentsByGrade';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps {
  titlePage: string
  onSubmitHandle: Function
  data?: Partial<TrafficContent>
}

type Props = StateProps & DispatchProps & OwnProps;

export const FormTrafficContentsPage: React.FC<Props> = ({
  t,
  onSubmitHandle,
  data,
  titlePage
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const schoolYears = useSelector((state: ApplicationState) => state.schoolYears);
  const trafficConcepts = useSelector((state: ApplicationState) => state.trafficConcepts);
  const [listSkills, setListSkills] = useState<TrafficScope[]>([]);

  const {
    register,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<any>();

  useEffect(() => {
    dispatch(actionsSchoolYears.loadListRequest());
  }, []);

  useEffect(() => {
    if (data && schoolYears.data?.length) {
      setValue('idSchoolYear', `${data?.trafficConcept?.idSchoolYear}`)
      setValue('idTransitConcept', `${data?.trafficConcept?.id}`)
      setValue('description', data?.description)
      setListSkills(data?.trafficScope || [])
    }
  }, [data, schoolYears.data]);

  function onSubmit(dataForm: Partial<TrafficContentRequest>) {
    const params = {
      ...dataForm,
      idSchoolYear: +dataForm.idSchoolYear,
      idTransitConcept: +dataForm.idTransitConcept,
    }
    onSubmitHandle(params)
  }

  useEffect(() => {
    if (watch('idSchoolYear')) {
      dispatch(actionsTrafficConcepts.loadListRequest({ idSchoolYear: +watch('idSchoolYear'), limit: 1000 }))
    }
  }, [watch('idSchoolYear')]);

  function nth(n: number) { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th" }

  function renderSchoolYars() {
    if (schoolYears?.data?.length > 0) {
      return schoolYears.data.map((item: SchoolYears) => (
        <div key={`ano_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              {...register('idSchoolYear', { required: true })}
              value={item.id}
              id={`anos${item.ordinal}${item.id}`}
              type="radio" />
            <label htmlFor={`anos${item.ordinal}${item.id}`}>
              {t('pages:trafficContents.details.labels.selectYear', { year: item.ordinal, ordinal: nth(item.ordinal) })}
            </label>
          </div>
        </div>
      ));
    }
  }

  function renderTrafficContents() {
    if (trafficConcepts?.data?.rows?.length > 0) {
      return trafficConcepts?.data?.rows?.map((item: TrafficConcept) => (
        <div key={`trafficContent_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              {...register('idTransitConcept', { required: true })}
              value={item.id}
              id={`trafficContent_${item.idSchoolYear}_${item.id}`}
              type="radio" />
            <label htmlFor={`trafficContent_${item.idSchoolYear}_${item.id}`}>
              {item.description}
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
          <div className='col-12 col-md-4'>
            <div className={`br-input medium ${errors?.idSchoolYear?.type ? 'danger' : ''}`}>
              <label htmlFor="year">{t('pages:trafficContents.details.labels.year')}*:</label>
              <Select
                placeholder={t('pages:trafficContents.details.placeholders.year')}
                id="year"
                CustomclassName={`mw-100 ${errors?.idSchoolYear?.type ? 'danger' : ''}`}
                className="mw-100"
              >
                {renderSchoolYars()}
              </Select>
              {errors?.idSchoolYear?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:trafficContents.details.required.schoolYear')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <div className={`br-input medium ${errors?.idTransitConcept?.type ? 'danger' : ''}`}>
              <label htmlFor="idTransitConcept">{t('pages:trafficContents.details.labels.trafficConcepts')}*:</label>
              <Select
                placeholder={t('pages:trafficContents.details.placeholders.trafficConcepts')}
                id="idTransitConcept"
                CustomclassName={`mw-100 ${errors?.idTransitConcept?.type ? 'danger' : ''}`}
                className="mw-100"
              >
                {renderTrafficContents()}
              </Select>
              {errors?.idTransitConcept?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:trafficContents.details.required.trafficConcepts')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <div className={`br-input medium ${errors?.year?.type ? 'danger' : ''}`}>
              <label htmlFor="description">{t('pages:trafficContents.details.labels.description')}:</label>
              <input
                {...register('description', { required: true })}
                className={`medium ${errors?.year?.type ? 'danger' : ''}`}
                id="description"
                type="text"
                placeholder={t('pages:trafficContents.details.placeholders.name')} />
              {errors?.description?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:trafficContents.details.required.name')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className='col-12'>
            <SkillsForm
              defaultList={listSkills}
              useFormProps={
                {
                  registerForm: register,
                  watchForm: watch,
                  resetForm: reset,
                  setValueForm: setValue,
                  controlForm: control,
                  errorsForm: errors,
                }
              } t={t} />
          </div>
        </div>

        <div className="mt-3 d-flex">
          <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
            <button className="br-button mr-auto" type="button">
              {t('pages:trafficContents.details.cancel')}
            </button>
          </Link>
          <button className="br-button primary" value='save' type="submit">
            {t('pages:trafficContents.details.submit')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormTrafficContentsPage
