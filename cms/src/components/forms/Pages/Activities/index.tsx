import React, { useEffect, useState } from 'react';

import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { Activity, File } from '@/store/ducks/activities/types';
import { TrafficContent, TrafficScope } from '@/store/ducks/trafficContents/types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import * as actionsActivities from '@/store/ducks/activities/actions';
import * as actionsTrafficConcepts from '@/store/ducks/trafficConcepts/actions';
import * as actionsTrafficContents from '@/store/ducks/trafficContents/actions';
import * as actionsKnowledgeObjects from '@/store/ducks/knowledgeObjects/actions';
import * as actionsSchoolYears from '@/store/ducks/schoolYear/actions';
import * as actionsDisciplines from '@/store/ducks/disciplines/actions';
import * as actionsStates from '@/store/ducks/states/actions';
import * as actionsInitiatives from '@/store/ducks/initiatives/actions';
import { SchoolYears } from '@/store/ducks/schoolYear/types';
import { ApplicationState } from '@/store';
import Select from '@/components/shared/Select';
import { SkillsForm } from '@/components/forms/Skills';
import Wizard, { WizardBtnTrigger, WizardPanel, WizardPanelBtn, WizardPanelContent } from '@/components/shared/Wizard';
import { FieldKnowledge } from '@/store/ducks/states/types';
import { Disciplines } from '@/store/ducks/disciplines/types';
import { KnowledgeObject } from '@/store/ducks/knowledgeObjects/types';
import { Initiative } from '@/store/ducks/initiatives/types';
import InputMask from 'react-input-mask';
import { Upload } from '@/components/shared/Upload';
import NumberFormat from 'react-number-format';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps {
  titlePage: string
  onSubmitHandle: Function
  data?: Partial<Activity>
}

type Props = StateProps & DispatchProps & OwnProps;

export const FormActivitiesPage: React.FC<Props> = ({
  t,
  onSubmitHandle,
  data,
  titlePage
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const schoolYears = useSelector((state: ApplicationState) => state.schoolYears);
  const trafficConcepts = useSelector((state: ApplicationState) => state.trafficConcepts);
  const trafficContents = useSelector((state: ApplicationState) => state.trafficContents);
  const disciplines = useSelector((state: ApplicationState) => state.disciplines);
  const states = useSelector((state: ApplicationState) => state.states);
  const initiatives = useSelector((state: ApplicationState) => state.initiatives);
  const knowledgeObjects = useSelector((state: ApplicationState) => state.knowledgeObjects);
  const [listSkills, setListSkills] = useState<TrafficScope[]>([]);
  const [listIdContent, setListIdContent] = useState<number[]>([]);
  const [listFilesTeacher, setListFilesTeacher] = useState<any[]>([]);
  const [listFilesTeacherToDelete, setListFilesTeacherToDelete] = useState<(number | string)[]>([]);
  const [listFilesStudent, setListFilesStudent] = useState<any[]>([]);
  const [listFilesStudentToDelete, setListFilesStudentToDelete] = useState<(number | string)[]>([]);

  const {
    register,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm<any>();

  useEffect(() => {
    dispatch(actionsSchoolYears.loadListRequest());
    dispatch(actionsStates.loadFieldKnowledgesRequest());
    dispatch(actionsInitiatives.loadListByStatusRequest({ status: [4] }));
  }, []);

  const fileTypes = {
    title: t('pages:courses.details.labels.fileTypes'),
    list: ['.JPG', '.PNG', '.SVG', '.GIF', '.TXT', '.RTF', '.DOC', '.DOCX', '.PDF', '.PPT', '.PPTX', '.XLS', '.ODT'],
  };

  useEffect(() => {
    if (data && schoolYears.data?.length) {
      const trafficScope = data?.trafficScope?.map(item => {
        return {
          ...item,
          skills: data?.skills?.filter(row => +row.idTransitCompetence === +item.id)
        }
      })

      setValue('idSchoolYear', `${data?.trafficConcept?.schoolYear?.id}`)
      setValue('idKnoledgeArea', `${data?.discipline?.knowledgeArea?.id}`)
      setValue('idTransitConcept', `${data?.trafficConcept?.id}`)
      setValue('idDiscipline', `${data?.discipline?.id}`)
      setValue('otherConnections', data?.otherConnections)
      setValue('titleActivity', data?.title)
      setValue('codeActivity', data?.code)
      setValue('duration', data?.duration)
      setValue('resource', data?.resource)
      setValue('didacticArticulation', data?.teachingArticulation)
      setValue('didacticStrategies', data?.teachingGuide)
      setValue('evaluation', data?.evaluation)
      setValue('references', data?.reference)
      setValue('idInitiative', `${data?.idInitiative}`)
      setValue('trafficContent', data?.trafficContent?.map(item => `${item.id}`))
      setValue('idKnoledgeObject', data?.knowledgeObject?.map(item => `${item.id}`))
      setValue('trafficScope', trafficScope)

      setListSkills(trafficScope)
    }
  }, [data, schoolYears.data]);

  async function onSubmit(dataForm: any) {
    const skills = dataForm.trafficScope.map(item => item.skills.map(skill => +skill.id)).flat(1);
    const params = {
      atachments: {
        listFilesTeacher,
        listFilesTeacherToDelete,
        listFilesStudent,
        listFilesStudentToDelete,
      },
      body: {
        schoolYear: +dataForm.idSchoolYear,
        knowledgeArea: +dataForm.idKnoledgeArea,
        theme: trafficConcepts?.data?.rows[0]?.schoolYear?.subTheme?.theme?.name,
        subTheme: trafficConcepts?.data?.rows[0]?.schoolYear?.subTheme?.name,
        idConcept: +trafficConcepts?.data?.rows[0]?.id,
        trafficContent: dataForm.trafficContent.filter(item => item).map(item => + item),
        idDiscipline: +dataForm.idDiscipline,
        knowledgeObject: dataForm.idKnoledgeObject.filter(item => item).map(item => + item),
        otherConnections: dataForm.otherConnections,
        code: dataForm.codeActivity,
        title: dataForm.titleActivity,
        duration: dataForm.duration,
        idInitiative: +dataForm.idInitiative || null,
        resource: dataForm.resource,
        teachingArticulation: dataForm.didacticArticulation,
        teachingGuide: dataForm.didacticStrategies,
        evaluation: dataForm.evaluation,
        reference: dataForm.references,
        isPublished: dataForm.isPublished,
        trafficScope: dataForm.trafficScope.map(item => item.id),
        skills
      }
    }
    onSubmitHandle(params)
  }

  useEffect(() => {
    if (watch('idKnoledgeArea')) {
      dispatch(actionsDisciplines.loadListRequest({
        idKnoledgeArea: +watch('idKnoledgeArea')
      }))
    }
  }, [watch('idKnoledgeArea')]);

  useEffect(() => {
    if (trafficConcepts?.data?.rows.length) {
      dispatch(actionsTrafficContents.loadListRequest({ limit: 1000, idTransitConcept: trafficConcepts?.data?.rows[0].id }))
    }
  }, [trafficConcepts?.data?.rows]);

  useEffect(() => {
    if (watch('idSchoolYear')) {
      dispatch(actionsTrafficConcepts.loadListRequest({ idSchoolYear: +watch('idSchoolYear'), limit: 1, order: { id: 'DESC' } }))
    }
  }, [watch('idSchoolYear')]);

  useEffect(() => {
    if (watch('idDiscipline') && watch('idSchoolYear')) {
      dispatch(actionsKnowledgeObjects.loadListRequest({ idDiscipline: +watch('idDiscipline'), idSchoolYear: +watch('idSchoolYear'), limit: 1000 }))
    }
  }, [watch('idDiscipline'), watch('idSchoolYear')]);

  function convertListFile(ctx: string, list: File[] = [], type: string = 'file') {
    return list.map((file: File) => {
      return {
        type: 'file',
        ...file,
        functionDownload: (e: any) => dispatch(actionsActivities.loadGetAttachmentsRequest(e))
      }
    }
    )
  }

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
              {t('pages:activities.details.labels.selectYear', { year: item.ordinal, ordinal: nth(item.ordinal) })}
            </label>
          </div>
        </div>
      ));
    }
  }

  function renderKnowledgeArea() {
    if (states?.fieldKnowledges?.length > 0) {
      return states?.fieldKnowledges?.map((item: FieldKnowledge) => (
        <div key={`KnowledgeArea_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              {...register('idKnoledgeArea', { required: true })}
              value={item.id}
              id={`KnowledgeArea_${item.id}`}
              type="radio" />
            <label htmlFor={`KnowledgeArea_${item.id}`}>
              {item.description}
            </label>
          </div>
        </div>
      ));
    }
  }

  function renderTrafficContent() {
    if (trafficContents?.data?.rows?.length > 0) {
      return trafficContents.data.rows?.map((item: TrafficContent, index: number) => (
        <div key={`traffic_content_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-checkbox">
            <input
              {...register(`trafficContent[${index}]`)}
              value={item.id}
              id={`traffic_content_${item.id}`}
              type="checkbox" />
            <label htmlFor={`traffic_content_${item.id}`}>
              {item.description}
            </label>
          </div>
        </div>
      ));
    }
  }

  function renderKnowledgeObject() {
    if (knowledgeObjects?.data?.rows?.length) {
      return knowledgeObjects.data.rows?.map((item: KnowledgeObject, index: number) => (
        <div key={`Knowledge_object_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-checkbox">
            <input
              {...register(`idKnoledgeObject[${index}]`, { required: !(watch('idKnoledgeObject')?.some(item => item)) })}
              value={item.id}
              id={`Knowledge_object_${item.id}`}
              type="checkbox" />
            <label htmlFor={`Knowledge_object_${item.id}`}>
              {item.description}
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
            {...register('idDiscipline', { required: true })}
            value={item.id}
            type="radio" />
          <label htmlFor={`idDiscipline-type-${item.id}`}>
            {item.name}
          </label>
        </div>
      </div>
    ));
  }

  function renderInitiatives() {
    return initiatives?.initiativesByStatus?.map((item: Initiative) => (
      <div key={`idInitiative-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`idInitiative-type-${item.id}`}
            {...register('idInitiative')}
            value={item.id}
            type="radio" />
          <label htmlFor={`idInitiative-type-${item.id}`}>
            {item.title}
          </label>
        </div>
      </div>
    ));
  }

  function testFunction() {
    const list: number[] = watch('trafficContent')?.filter(item => item).map(item => +item)
    setListIdContent(list || [])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>
      <div className="main-content mt-3 px-md-3" id="main-content">
        <div className="row">
          <div className='col-12'>
            <p className="h1">{t('pages:activities.pageTitle')}</p>
          </div>
          <div className='col-12 text-center'>
            <p className="h6 bg-secondary-03 text-primary-default text-regular my-0 py-1">
              {titlePage.toUpperCase()}
            </p>
          </div>
        </div>
        <Wizard>
          <WizardBtnTrigger title={t('pages:activities.details.labels.wizard.trafficContent')} nameKey={'progress-btn'} />
          <WizardBtnTrigger title={t('pages:activities.details.labels.wizard.identification')} nameKey={'progress-btn'} />
          <WizardBtnTrigger title={t('pages:activities.details.labels.wizard.details')} nameKey={'progress-btn'} />
          <WizardBtnTrigger title={t('pages:activities.details.labels.wizard.files')} nameKey={'progress-btn'} />

          <WizardPanel nameKey={'progress-panel'}>
            <WizardPanelContent nameKey={'progress-panel-content'}>
              <div className="row mb-1 mt-3">
                <div className='col-12 col-md-6'>
                  <div className={`br-input medium ${errors?.idSchoolYear?.type ? 'danger' : ''}`}>
                    <label htmlFor="year">{t('pages:activities.details.labels.year')}*:</label>
                    <Select
                      placeholder={t('pages:activities.details.placeholders.year')}
                      id="year"
                      style={{ maxHeight: 320 }}
                      CustomclassName={`mw-100 ${errors?.idSchoolYear?.type ? 'danger' : ''}`}
                      className="mw-100"
                    >
                      {renderSchoolYars()}
                    </Select>
                    {errors?.idSchoolYear?.type ?
                      <div className="mt-1">
                        <span className="feedback danger" role="alert">
                          <i className="fas fa-times-circle" aria-hidden="true"></i>
                          {t('pages:activities.details.required.schoolYear')}
                        </span>
                      </div>
                      : ''}
                  </div>
                </div>
              </div>
              <div className="mb-4" style={{ listStyle: 'none' }}>
                <li className="mb-1">
                  {t('pages:activities.details.labels.theme')}: {trafficConcepts?.data?.rows[0]?.schoolYear?.subTheme?.theme?.name}
                </li>
                <li className="mb-1">
                  {t('pages:activities.details.labels.subTheme')}: {trafficConcepts?.data?.rows[0]?.schoolYear?.subTheme?.name}
                </li>
                <li className="mb-1">
                  {t('pages:activities.details.labels.trafficConcept')}: {trafficConcepts?.data?.rows[0]?.description}
                </li>
              </div>
              <div className="row mb-1">
                <div className='col-12 col-md-6'>
                  <div className={`br-input medium`}>
                    <label htmlFor="trafficContent">{t('pages:activities.details.labels.trafficContent')}:</label>
                    <Select
                      placeholder={t('pages:activities.details.placeholders.trafficContent')}
                      id="trafficContent"
                      multiple
                      FuncOnClosed={testFunction}
                      style={{ maxHeight: 320 }}
                      CustomclassName={`mw-100`}
                      className="mw-100"
                    >
                      <div className="br-item highlighted" data-all="data-all">
                        <div className="br-checkbox">
                          <input id="trafficContent-all" type="checkbox" />
                          <label htmlFor="trafficContent-all">{t('components:Select.selectAll')}</label>
                        </div>
                      </div>
                      {renderTrafficContent()}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className='col-12'>
                  <SkillsForm
                    defaultList={listSkills}
                    idTrafficContent={listIdContent}
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
            </WizardPanelContent>
            <WizardPanelBtn nameKey={'progress-panel-btn'}>
              <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
                <button className="br-button mr-auto" type="button">
                  {t('pages:activities.details.cancel')}
                </button>
              </Link>
              <button className="br-button primary wizard-btn-next ml-sm-auto" type="button">
                {t('components:Wizard.next')}
              </button>
            </WizardPanelBtn>
          </WizardPanel>

          <WizardPanel nameKey={'progress-panel'}>
            <WizardPanelContent nameKey={'progress-panel-content'}>
              <div className="row mt-3">
                <div className='col-12 col-md-6'>
                  <div className={`br-input medium ${errors?.idKnoledgeArea?.type ? 'danger' : ''}`}>
                    <label htmlFor="idKnowledgeArea">{t('pages:activities.details.labels.knowledgeArea')}*:</label>
                    <Select
                      placeholder={t('pages:activities.details.placeholders.knowledgeArea')}
                      id="idKnowledgeArea"
                      style={{ maxHeight: 320 }}
                      CustomclassName={`mw-100 ${errors?.idKnoledgeArea?.type ? 'danger' : ''}`}
                      className="mw-100"
                    >
                      {renderKnowledgeArea()}
                    </Select>
                    {errors?.idKnoledgeArea?.type ?
                      <div className="mt-1">
                        <span className="feedback danger" role="alert">
                          <i className="fas fa-times-circle" aria-hidden="true"></i>
                          {t('pages:activities.details.required.knowledgeArea')}
                        </span>
                      </div>
                      : ''}
                  </div>
                </div>
                <div className='col-12 col-md-6'>
                  <div className={`br-input medium ${errors?.idDiscipline?.type ? 'danger' : ''}`}>
                    <label htmlFor="idDiscipline">{t('pages:activities.details.labels.discipline')}*:</label>
                    <Select
                      placeholder={t('pages:activities.details.placeholders.discipline')}
                      id="idDiscipline"
                      style={{ maxHeight: 320 }}
                      CustomclassName={`mw-100 ${errors?.idDiscipline?.type ? 'danger' : ''}`}
                      className="mw-100"
                    >
                      {renderDisciplines()}
                    </Select>
                    {errors?.idDiscipline?.type ?
                      <div className="mt-1">
                        <span className="feedback danger" role="alert">
                          <i className="fas fa-times-circle" aria-hidden="true"></i>
                          {t('pages:activities.details.required.idDiscipline')}
                        </span>
                      </div>
                      : ''}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className='col-12'>
                  <div className={`br-input medium ${errors?.idKnoledgeObject?.length ? 'danger' : ''}`}>
                    <label htmlFor="idKnowledgeObject">{t('pages:activities.details.labels.knowledgeObject')}*:</label>
                    <Select
                      placeholder={t('pages:activities.details.placeholders.knowledgeObject')}
                      id="idKnowledgeObject"
                      multiple
                      style={{ maxHeight: 320 }}
                      CustomclassName={`mw-100 ${errors?.idKnoledgeObject?.length ? 'danger' : ''}`}
                      className={`mw-100 ${errors?.idKnoledgeObject?.length ? 'danger' : ''}`}
                    >
                      <div className="br-item highlighted" data-all="data-all">
                        <div className="br-checkbox">
                          <input id="knowledgeObjects-all" type="checkbox" />
                          <label htmlFor="knowledgeObjects-all">{t('components:Select.selectAll')}</label>
                        </div>
                      </div>
                      {renderKnowledgeObject()}
                    </Select>
                    {errors?.idKnoledgeObject?.length ?
                      <div className="mt-1">
                        <span className="feedback danger" role="alert">
                          <i className="fas fa-times-circle" aria-hidden="true"></i>
                          {t('pages:activities.details.required.knowledgeObject')}
                        </span>
                      </div>
                      : ''}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className='col-12 col-md-6'>
                  <div className={`br-input medium ${errors?.titleActivity?.type ? 'danger' : ''}`}>
                    <label htmlFor="titleActivity">{t('pages:activities.details.labels.titleActivity')}*:</label>
                    <input
                      {...register('titleActivity', { required: true })}
                      maxLength={100}
                      className={`medium ${errors?.titleActivity?.type ? 'danger' : ''}`}
                      id="title"
                      type="text"
                      placeholder={t('pages:activities.details.placeholders.titleActivity')} />
                    {errors?.titleActivity?.type ?
                      <div className="mt-1">
                        <span className="feedback danger" role="alert">
                          <i className="fas fa-times-circle" aria-hidden="true"></i>
                          {t('pages:activities.details.required.title')}
                        </span>
                      </div>
                      : ''}
                  </div>
                </div>
                <div className='col-12 col-md-6'>
                  <div className={`br-input medium`}>
                    <label htmlFor="idInitiative">{t('pages:activities.details.labels.initiative')}:</label>
                    <Select
                      placeholder={t('pages:activities.details.placeholders.initiative')}
                      id="idInitiative"
                      style={{ maxHeight: 320 }}
                      CustomclassName={`mw-100`}
                      className="mw-100"
                    >
                      {renderInitiatives()}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className='col-12 col-sm-6 col-md-3'>
                  <div className={`br-input medium ${errors?.codeActivity?.type ? 'danger' : ''}`}>
                    <label htmlFor="codeActivity">{t('pages:activities.details.labels.codeActivity')}*:</label>
                    <input
                      {...register('codeActivity', { required: true })}
                      maxLength={15}
                      className={`medium ${errors?.codeActivity?.type ? 'danger' : ''}`}
                      id="title"
                      type="text"
                      placeholder={t('pages:activities.details.placeholders.codeActivity')} />
                    {errors?.codeActivity?.type ?
                      <div className="mt-1">
                        <span className="feedback danger" role="alert">
                          <i className="fas fa-times-circle" aria-hidden="true"></i>
                          {t('pages:activities.details.required.codeActivity')}
                        </span>
                      </div>
                      : ''}
                  </div>
                </div>
                <div className='col-12 col-sm-6 col-md-3'>
                  <div className={`br-input medium ${errors?.duration?.type ? 'danger' : ''}`}>
                    <label htmlFor="duration">{t('pages:activities.details.labels.estimatedTime')}*:</label>
                    <Controller
                      render={({ field }) =>
                        <NumberFormat
                          control={control}
                          customInput={InputMask}
                          placeholder={t('pages:activities.details.placeholders.estimatedTime')}
                          allowEmptyFormatting={false}
                          allowNegative={false}
                          decimalScale={0}
                          className={`medium ${errors?.duration?.type ? 'danger' : ''}`}
                          {...field}
                          onValueChange={(c) => {
                            field.onChange(c.value);
                          }}
                        />
                      }
                      name="duration"
                      defaultValue={+data?.duration}
                      control={control}
                      rules={{ required: true, validate: v => Boolean(v) }}
                    />
                    {errors?.duration?.type ?
                      <div className="mt-1">
                        <span className="feedback danger" role="alert">
                          <i className="fas fa-times-circle" aria-hidden="true"></i>
                          {t('pages:activities.details.required.duration')}
                        </span>
                      </div>
                      : ''}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className='col-12'>
                  <div className={`br-textarea ${errors?.resource?.type ? 'danger' : ''}`}>
                    <label htmlFor="resource">{t('pages:activities.details.labels.resources')}*:</label>
                    <textarea
                      {...register('resource', { required: true })}
                      className={`w-100 ${errors?.resource?.type ? 'danger' : ''}`}
                      id="resource"
                      placeholder={t('pages:activities.details.placeholders.resources')} />
                    {errors?.resource?.type ?
                      <div className="mt-1">
                        <span className="feedback danger" role="alert">
                          <i className="fas fa-times-circle" aria-hidden="true"></i>
                          {t('pages:activities.details.required.resource')}
                        </span>
                      </div>
                      : ''}
                  </div>
                </div>
              </div>
              <div className="row mb-1">
                <div className='col-12'>
                  <div className={`br-textarea ${errors?.didacticArticulation?.type ? 'danger' : ''}`}>
                    <label htmlFor="didacticArticulation">{t('pages:activities.details.labels.didacticArticulation')}*:</label>
                    <textarea
                      {...register('didacticArticulation', { required: true })}
                      className={`w-100 ${errors?.didacticArticulation?.type ? 'danger' : ''}`}
                      id="didacticArticulation"
                      placeholder={t('pages:activities.details.placeholders.didacticArticulation')} />
                    {errors?.didacticArticulation?.type ?
                      <div className="mt-1">
                        <span className="feedback danger" role="alert">
                          <i className="fas fa-times-circle" aria-hidden="true"></i>
                          {t('pages:activities.details.required.teachingArticulation')}
                        </span>
                      </div>
                      : ''}
                  </div>
                </div>
              </div>
            </WizardPanelContent>
            <WizardPanelBtn nameKey={'progress-panel-btn'}>
              <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
                <button className="br-button mr-auto" type="button">
                  {t('pages:activities.details.cancel')}
                </button>
              </Link>
              <button className="br-button secondary wizard-btn-prev ml-sm-auto" type="button">
                {t('components:Wizard.back')}
              </button>
              <button className="br-button primary wizard-btn-next ml-sm" type="button">
                {t('components:Wizard.next')}
              </button>
            </WizardPanelBtn>
          </WizardPanel>

          <WizardPanel nameKey={'progress-panel'}>
            <WizardPanelContent nameKey={'progress-panel-content'}>
              <div className="row mt-3">
                <div className='col-12'>
                  <div className={`br-textarea ${errors?.didacticStrategies?.type ? 'danger' : ''}`}>
                    <label htmlFor="didacticStrategies">{t('pages:activities.details.labels.didacticStrategies')}:</label>
                    <textarea
                      {...register('didacticStrategies')}
                      className={`w-100 ${errors?.didacticStrategies?.type ? 'danger' : ''}`}
                      id="didacticStrategies"
                      placeholder={t('pages:activities.details.placeholders.didacticStrategies')} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className='col-12'>
                  <div className={`br-textarea ${errors?.evaluation?.type ? 'danger' : ''}`}>
                    <label htmlFor="evaluation">{t('pages:activities.details.labels.evaluation')}:</label>
                    <textarea
                      {...register('evaluation')}
                      className={`w-100 ${errors?.evaluation?.type ? 'danger' : ''}`}
                      id="evaluation"
                      placeholder={t('pages:activities.details.placeholders.evaluation')} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className='col-12'>
                  <div className={`br-textarea ${errors?.otherConnections?.type ? 'danger' : ''}`}>
                    <label htmlFor="otherConnections">{t('pages:activities.details.labels.otherConnections')}:</label>
                    <textarea
                      {...register('otherConnections')}
                      className={`w-100 ${errors?.otherConnections?.type ? 'danger' : ''}`}
                      id="otherConnections"
                      placeholder={t('pages:activities.details.placeholders.otherConnections')} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className='col-12'>
                  <div className={`br-textarea ${errors?.references?.type ? 'danger' : ''}`}>
                    <label htmlFor="references">{t('pages:activities.details.labels.references')}:</label>
                    <textarea
                      {...register('references')}
                      className={`w-100 ${errors?.references?.type ? 'danger' : ''}`}
                      id="references"
                      placeholder={t('pages:activities.details.placeholders.references')} />
                  </div>
                </div>
              </div>
            </WizardPanelContent>
            <WizardPanelBtn nameKey={'progress-panel-btn'}>
              <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
                <button className="br-button mr-auto" type="button">
                  {t('pages:activities.details.cancel')}
                </button>
              </Link>
              <button className="br-button secondary wizard-btn-prev ml-sm-auto" type="button">
                {t('components:Wizard.back')}
              </button>
              <button className="br-button primary wizard-btn-next ml-sm" type="button">
                {t('components:Wizard.next')}
              </button>
            </WizardPanelBtn>
          </WizardPanel>

          <WizardPanel nameKey={'progress-panel'}>
            <WizardPanelContent nameKey={'progress-panel-content'}>
              <div className="row mb-4 mt-3">
                <div className='col-12'>
                  <Upload
                    title={`${t('pages:activities.details.labels.upload.teacherTitle')}:`}
                    multiple
                    translation={t}
                    id="uploadFiles"
                    listFiles={setListFilesTeacher}
                    listDeleteFiles={setListFilesTeacherToDelete}
                    defaultFileList={convertListFile('attachments.[0].files', data?.attachments?.[0]?.files, 'attachments')}
                    suportedExt={fileTypes}
                    placeholder={t('pages:activities.details.placeholders.upload')}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className='col-12'>
                  <Upload
                    title={`${t('pages:activities.details.labels.upload.studentTitle')}:`}
                    multiple
                    translation={t}
                    id="uploadFiles"
                    listFiles={setListFilesStudent}
                    listDeleteFiles={setListFilesStudentToDelete}
                    defaultFileList={convertListFile('attachments.[1].files', data?.attachments?.[1]?.files)}
                    suportedExt={fileTypes}
                    placeholder={t('pages:activities.details.placeholders.upload')}
                  />
                </div>
              </div>
            </WizardPanelContent>
            <WizardPanelBtn nameKey={'progress-panel-btn'}>
              <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
                <button className="br-button mr-auto" type="button">
                  {t('pages:activities.details.cancel')}
                </button>
              </Link>
              <button className="br-button secondary wizard-btn-prev ml-sm-auto" type="button">
                {t('components:Wizard.back')}
              </button>
              <button className="br-button primary wizard-btn ml-sm" type="submit">
                {t('components:Wizard.submit')}
              </button>
            </WizardPanelBtn>
          </WizardPanel>
        </Wizard>
      </div>
    </form>
  );
};

export default FormActivitiesPage
