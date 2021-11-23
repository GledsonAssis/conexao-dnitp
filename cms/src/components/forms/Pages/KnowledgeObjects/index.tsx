import React, { useEffect, useState } from 'react';

import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { KnowledgeObjects } from '@/store/ducks/knowledgeObjects/types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import * as actionsDisciplines from '@/store/ducks/disciplines/actions';
import * as actionsSchoolYears from '@/store/ducks/schoolYear/actions';
import * as actionsStates from '@/store/ducks/states/actions';
import { SchoolYears } from '@/store/ducks/schoolYear/types';
import { FieldKnowledge } from '@/store/ducks/states/types';
import { ApplicationState } from '@/store';
import Select from '@/components/shared/Select';
import { Disciplines } from '@/store/ducks/disciplines/types';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps {
  titlePage: string
  onSubmitHandle: Function
  data?: Partial<KnowledgeObjects>
}

type Props = StateProps & DispatchProps & OwnProps;

export const FormKnowledgeObjects: React.FC<Props> = ({
  t,
  onSubmitHandle,
  data,
  titlePage
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const disciplines = useSelector((state: ApplicationState) => state.disciplines);
  const schoolYears = useSelector((state: ApplicationState) => state.schoolYears);
  const states = useSelector((state: ApplicationState) => state.states);

  const {
    register,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm<any>();

  useEffect(() => {
    dispatch(actionsSchoolYears.loadListRequest());
    dispatch(actionsStates.loadFieldKnowledgesRequest());
  }, []);

  useEffect(() => {
    if (data) {
      setValue('description', data?.description)
      setValue('idSchoolYear', `${data?.idSchoolYear}`)
      setValue('idFieldKnowledges', `${data?.discipline.knowledgeArea.id}`)
      setValue('idDiscipline', `${data?.discipline.id}`)
    }
  }, [data]);

  function onSubmit(dataForm: any) {
    const params = {
      ...dataForm,
      idDiscipline: +dataForm.idDiscipline,
      idFieldKnowledges: +dataForm.idFieldKnowledges,
      idSchoolYear: +dataForm.idSchoolYear
    }

    onSubmitHandle(params)
  }

  useEffect(() => {
    if (watch('idSchoolYear') && watch('idFieldKnowledges')) {
      dispatch(actionsDisciplines.loadListRequest({
        year: watch('idSchoolYear'), idKnoledgeArea: watch('idFieldKnowledges')
      }))
    }
  }, [watch('idSchoolYear'), watch('idFieldKnowledges')]);

  function nth(n: number) { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th" }

  function renderSchoolYars() {
    if (schoolYears?.data?.length > 0) {
      return schoolYears.data.map((item: SchoolYears) => (
        <div key={`ano_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              {...register('idSchoolYear', { required: true })}
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

  function renderKnowledgeArea() {
    return states?.fieldKnowledges?.map((item: FieldKnowledge) => (
      <div key={`idFieldKnowledges-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`idFieldKnowledges-type-${item.id}`}
            {...register('idFieldKnowledges', { required: true })}
            value={item.id}
            type="radio" />
          <label htmlFor={`idFieldKnowledges-type-${item.id}`}>
            {item.description}
          </label>
        </div>
      </div>
    ));
  }

  function renderDisciplines() {
    return disciplines?.data?.map((item: Disciplines) => (
      <div key={`idDiscipline-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`idDiscipline-type-${item.id}`}
            {...register('idDiscipline')}
            value={item.id}
            type="radio" />
          <label htmlFor={`idDiscipline-type-${item.id}`}>
            {item.name}
          </label>
        </div>
      </div>
    ));
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
              <label htmlFor="year">{t('pages:knowledgeObject.details.labels.year')}*:</label>
              <Select
                placeholder={t('pages:knowledgeObject.details.placeholders.year')}
                id="year"
                CustomclassName={`mw-100  ${errors?.idSchoolYear?.type ? 'danger' : ''}`}
                className="mw-100"
              >
                {renderSchoolYars()}
              </Select>
              {errors?.idSchoolYear?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:knowledgeObject.details.required.schoolYear')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <div className={`br-input medium ${errors?.fieldKnowledge?.type ? 'danger' : ''}`}>
              <label htmlFor="fieldKnowledge">{t('pages:knowledgeObject.details.labels.fieldKnowledge')}*:</label>
              <Select
                placeholder={t('pages:knowledgeObject.details.placeholders.fieldKnowledge')}
                id="fieldKnowledge"
                CustomclassName={`mw-100  ${errors?.fieldKnowledge?.type ? 'danger' : ''}`}
                className="mw-100"
              >
                {renderKnowledgeArea()}
              </Select>
              {errors?.fieldKnowledge?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:knowledgeObject.details.required.fieldKnowledge')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <div className={`br-input medium ${errors?.discipline?.type ? 'danger' : ''}`}>
              <label htmlFor="discipline">{t('pages:knowledgeObject.details.labels.discipline')}*:</label>
              <Select
                placeholder={t('pages:knowledgeObject.details.placeholders.discipline')}
                id="discipline"
                disabled={watch('isFederalDistrict')}
                CustomclassName={`mw-100  ${errors?.discipline?.type ? 'danger' : ''}`}
                className="mw-100"
              >
                {renderDisciplines()}
              </Select>
              {errors?.discipline?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:knowledgeObject.details.required.discipline')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-textarea medium  ${errors?.description?.type ? 'danger' : ''}`}>
              <label htmlFor="name">{t('pages:knowledgeObject.details.labels.name')}*:</label>
              <textarea
                {...register('description', { required: true })}
                maxLength={300}
                className={`w-100 ${errors?.title?.type ? 'danger' : ''}`}
                id="name"
                placeholder={t('pages:knowledgeObject.details.labels.name')} />
              {errors?.description?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:knowledgeObject.details.required.name')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>

        <div className="mt-3 d-flex">
          <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
            <button className="br-button mr-auto" type="button">
              {t('pages:knowledgeObject.details.cancel')}
            </button>
          </Link>
          <button className="br-button primary" value='save' type="submit">
            {t('pages:knowledgeObject.details.submit')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormKnowledgeObjects
