import React, { FC, useCallback, useEffect, useState } from 'react';
import { TFunction } from 'next-i18next';
import {
  Control, DeepMap, FieldError, useForm, UseFormRegister, UseFormReset, UseFormSetValue, UseFormWatch
} from 'react-hook-form';
import { Skill, TrafficScope } from '@/store/ducks/trafficContents/types';
import { Table, TBody, THead } from '@/components/shared/Table';
import Select from '@/components/shared/Select';
import { useDispatch, useSelector } from 'react-redux';
import * as actionsTrafficScopes from '@/store/ducks/trafficScopes/actions';
import { ApplicationState } from '@/store';
import { debounceLeading } from '@/utils/debounce';
// import { debounce } from "debounce";

interface UseFormProps {
  registerForm: UseFormRegister<any>,
  watchForm: UseFormWatch<any>,
  setValueForm?: UseFormSetValue<any>,
  resetForm?: UseFormReset<any>,
  errorsForm?: DeepMap<any, FieldError>,
  controlForm?: Control<any>
}

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  useFormProps?: UseFormProps,
  idTrafficContent?: number[],
  t: TFunction,
  defaultList?: TrafficScope[]
}

type Props = StateProps & DispatchProps & OwnProps;

export const SkillsForm: FC<Props> = ({ useFormProps, t, defaultList = [], idTrafficContent = null }) => {
  const trafficScopes = useSelector((state: ApplicationState) => state.trafficScopes);
  const [listCompetences, setListCompetences] = useState<TrafficScope[]>([]);
  const [listSkillsToAdd, setListSkillsToAdd] = useState<string[]>([]);
  const [stLoading, setStLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const {
    register,
    watch,
    formState: { errors },
    setValue,
    trigger,
    getValues,
    reset
  } = useForm<any>();

  useEffect(() => {
    if (defaultList.length && !stLoading) {
      useFormProps.registerForm('trafficScope', { value: defaultList })
      setListCompetences(defaultList)
      setStLoading(true)
    }
  }, [defaultList]);

  function searchTrafficScopes(lista) {
    dispatch(actionsTrafficScopes.loadListRequest({
      idTrafficContent: lista,
      limit: 1000
    }))
  }

  const handler = useCallback(debounceLeading((lista) => searchTrafficScopes(lista), 100), []);

  useEffect(() => {
    if (idTrafficContent?.length) {
      handler(idTrafficContent);
    }
  }, [idTrafficContent]);

  function renderList() {
    return listCompetences.map((item, index) =>
      <tr key={`competences_list_${item.description}_${index}`}>
        <td className={'px-0 py-0'} />
        <td className="pl-sm-4 py-sm-0" data-th={t('components:listCompetences.skills.competences')}>
          {item.description}
        </td>
        <td className={`w-100 py-sm-0`} data-th={t('components:listCompetences.skills.skills')}>
          {item.skills.map(item => <p key={`${item.description}_${item.id}`} className={'mb-0'}>{item.description}</p>)}
        </td>
        <td className={`text-right py-sm-0`} data-th={t('components:listCompetences.skills.actions')}>
          <button
            className="br-button small circle mb-auto"
            type="button"
            onClick={() => deleteCompetenceHandle(index)}
            aria-label="Ícone ilustrativo">
            <i className="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    )
  }

  function deleteCompetenceHandle(id: number | string) {
    setListCompetences(listCompetences.filter((_item, index) => index !== id))
  }

  async function addCompetences() {
    if (await trigger(['newCompetence', 'listSkill'])) {
      const skills = idTrafficContent ? getValues("listSkill").map(item => ({
        id: item,
        description: trafficScopes?.data?.rows
          ?.find(competence => competence.id === +getValues('newCompetence'))
          .skills.find(skill => skill.id === +item)?.description
      })) : getValues("listSkill").map(item => ({
        description: item
      }))

      const competence = idTrafficContent ? {
        id: getValues('newCompetence'),
        description: trafficScopes?.data?.rows
          ?.find(competence => competence.id === +getValues('newCompetence')).description,
      } : {
        description: getValues('newCompetence'),
      }

      const updatedList = [...listCompetences, {
        ...competence,
        skills
      }]
      setListCompetences(updatedList)
      setValue('newCompetence', null)
      setListSkillsToAdd([])
      setValue('newSkill', null)
      useFormProps.setValueForm('trafficScope', updatedList)
    }
  }

  async function addSkillsToAdd() {
    if (await trigger("newSkill")) {
      setListSkillsToAdd([...listSkillsToAdd, getValues('newSkill')])
      setValue("newSkill", null)
    }
  }

  function renderCompetences() {
    if (trafficScopes?.data?.rows?.length && idTrafficContent?.length) {
      return trafficScopes?.data?.rows?.map((item: TrafficScope) => (
        <div key={`skill_trafficScope_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              {...register('newCompetence', { required: true })}
              value={item.id}
              id={`skill_trafficScope_${item.id}`}
              type="radio" />
            <label htmlFor={`skill_trafficScope_${item.id}`}>
              {item.description}
            </label>
          </div>
        </div>
      ));
    }
  }

  function renderSkills() {
    if (trafficScopes?.data?.rows?.length && idTrafficContent?.length && watch('newCompetence')) {
      const competences = trafficScopes?.data?.rows.find(item => item.id === +watch('newCompetence'));
      return competences.skills.filter(item => !listSkillsToAdd.includes(`${item.id}`)).map((item: Skill) => (
        <div key={`newSkill_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              {...register('newSkill', { required: true })}
              value={item.id}
              id={`newSkill_${item.id}`}
              type="radio" />
            <label htmlFor={`newSkill_${item.id}`}>
              {item.description}
            </label>
          </div>
        </div>
      ));
    }
  }

  useEffect(() => {
    setListSkillsToAdd([])
  }, [watch('newCompetence')]);

  return (
    <>
      <div className="h3 mb-1">{t('components:listCompetences.title')}</div>
      <div className={`border-solid-sm p-1 px-sm-3 mb-4`}>
        <div className="row mb-2">
          <div className='col-12'>
            <div className={`br-input medium ${errors?.newCompetence?.type ? 'danger' : ''}`}>
              <label htmlFor="newCompetence">{t('components:listCompetences.skills.competence')}:</label>
              {idTrafficContent ?
                <Select
                  placeholder={t('components:listCompetences.name')}
                  id="year"
                  disabled={!trafficScopes?.data?.rows?.length}
                  style={{ maxHeight: 210 }}
                  currentValue={watch('newCompetence')}
                  CustomclassName={`mw-100 ${errors?.idSchoolYear?.type ? 'danger' : ''}`}
                  className="mw-100"
                >
                  {renderCompetences()}
                </Select>
                : <input
                  {...register('newCompetence', { required: true })}
                  className={`medium ${errors?.newCompetence?.type ? 'danger' : ''}`}
                  id="newCompetence"
                  type="text"
                  placeholder={t('components:listCompetences.name')} />
              }
              {errors?.newCompetence?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('components:listCompetences.required.name')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row mb-2">
          <div className='col-12 col-md'>
            <div className={`br-input medium ${(errors?.newSkill?.type || errors?.listSkill?.type) ? 'danger' : ''}`}>
              <label htmlFor="newSkill">{t('components:listCompetences.skills.skillsTitle')}:</label>
              {idTrafficContent ?
                <Select
                  placeholder={t('components:listCompetences.skills.name')}
                  id="newSkill"
                  disabled={
                    !(trafficScopes?.data?.rows?.find(item => item.id === +watch('newCompetence'))
                      ?.skills?.filter(item => !listSkillsToAdd.includes(`${item.id}`))?.length)}
                  style={{ maxHeight: 123 }}
                  CustomclassName={`mw-100 ${errors?.idSchoolYear?.type ? 'danger' : ''}`}
                  className="mw-100"
                >
                  {renderSkills()}
                </Select>
                : <input
                  {...register('newSkill', { required: true })}
                  className={`medium ${(errors?.newSkill?.type || errors?.listSkill?.type) ? 'danger' : ''}`}
                  id="newSkill"
                  type="text"
                  placeholder={t('components:listCompetences.skills.name')} />
              }
              {(errors?.newSkill?.type || errors?.listSkill?.type) ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('components:listCompetences.required.name')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
          <div className='col-12 col-sm-auto mt-sm-4'>
            <button
              className="br-button circle primary"
              type="button"
              onClick={addSkillsToAdd}>
              <i className="fas fa-plus" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <div className='row mb-1'>
            <div className='col-12 d-flex'>
              <p {...register('listSkill', { required: true, value: listSkillsToAdd, minLength: 1 })} className={`mb-0`}>
                {t('components:listCompetences.skills.skillsTitle')}: <br />{
                  idTrafficContent ?
                    listSkillsToAdd.map(idSkill =>
                      trafficScopes?.data?.rows.map(item => item.skills).flat().find(scope => scope.id === +idSkill)?.description
                    ).map((item, index) =>
                      <span key={`skills_to_add_trafficContent_${idTrafficContent}_${index}`} className="mb-0">{`- ${item}`}<br /></span>) :
                    listSkillsToAdd.map((item, index) =>
                      <span key={`skills_to_add_${index}`} className="mb-0">{`- ${item}`}<br /></span>)
                }
              </p>
            </div>
          </div>

          {listSkillsToAdd.length ?
            <div className='row'>
              <div className='col-12 col-sm-auto'>
                <button
                  className="br-button secondary small"
                  type="button"
                  onClick={() => setListSkillsToAdd([])}>
                  {t('components:listCompetences.skills.clear')}
                </button>
              </div>
            </div>
            : ''}
        </div>
        <div className='row mb-2'>
          <div className='col-12 col-sm-auto'>
            <button
              className="br-button primary"
              type="button"
              onClick={addCompetences}>
              {t('components:listCompetences.addBtn')}
            </button>
          </div>
        </div>
        {listCompetences.length ?
          <>
            <div className="row mb-2">
              <div className='col-12'>
                <Table
                  Title={t('components:listCompetences.list')}
                  Options={{
                    id: 'listCompetencesTable'
                  }}
                  translations={t}
                  elemListName="ParticipatingSchools"
                >
                  <THead nameKey='t-head'>
                    <tr>
                      <th scope="col" className={'py-sm-1 px-sm-0'} />
                      <th scope="col" className={'py-sm-1 text-nowrap pl-4'}><span>{t('components:listCompetences.skills.competences')}</span></th>
                      <th scope="col" className={'py-sm-1 text-nowrap'}><span>{t('components:listCompetences.skills.skills')}</span></th>
                      <th scope="col" className={'py-sm-1 text-nowrap text-right'}><span>{t('components:listCompetences.skills.actions')}</span></th>
                    </tr>
                  </THead>
                  <TBody nameKey='t-body' className='text-nowrap'>
                    {renderList()}
                  </TBody>
                </Table>
                <span className="br-divider"></span>
              </div>
            </div>
          </>
          : ''}
      </div>
    </>
  );
};
