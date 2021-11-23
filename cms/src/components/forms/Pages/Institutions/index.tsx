import React, { useEffect, useState } from 'react';

import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Institutions } from '@/store/ducks/institutions/types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import * as actionsDnitLocalUnits from '@/store/ducks/dnitLocalUnits/actions';
import { ApplicationState } from '@/store';
import { phonesParser } from '@/utils/parsers';
import Select from '@/components/shared/Select';
import { City, DnitLocalUnits, Superintendence } from '@/store/ducks/dnitLocalUnits/types';
import InputMask from 'react-input-mask';
import NumberFormat from "react-number-format";
import { AddressForm } from '@/components/forms/Address';
import { StudentsByGradeForm } from '@/components/forms/StudentsByGrade';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps {
  titlePage: string
  onSubmitHandle: Function
  data?: Partial<Institutions>
}

type Props = StateProps & DispatchProps & OwnProps;

export const FormInstitutions: React.FC<Props> = ({
  t,
  onSubmitHandle,
  data,
  titlePage
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const states = useSelector((state: ApplicationState) => state.states);
  const dnitLocalUnits = useSelector((state: ApplicationState) => state.dnitLocalUnits);
  const [listStudents, setListStudents] = useState<{
    idSchoolYear: number,
    amountStudents: number,
    idEducationalInstitution?: number
  }[]>([]);
  const [stMount, setStMount] = useState<boolean>(false);

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
    if (data) {
      setValue('identification', data?.name)
      if (data?.phones?.[0]) {
        setValue('phones.0', `${data?.phones[0]?.DDD}${data?.phones[0]?.number}`)
      }
      console.log(`${data?.dnitUnit?.RegionalSuperintendence?.id}`)
      setValue('regionalSuperintendence', `${data?.dnitUnit?.RegionalSuperintendence?.id}`)
      setValue('idTeachingNetwork', `${data?.idTeachingNetwork}`)
      setValue('isDF', data?.isDF)
      setValue('joinProgram', data?.joinProgram)
      setValue('idDnit', `${data?.dnitUnit?.id}`)
      setValue('idDnitUnitCity', `${data?.dnitUnitCity?.id}`)
      setValue('idInep', data?.idInep)
      setValue('quantidadeAlunos', data?.quantidadeAlunos)
      setValue('quantidadeProfessores', data?.quantidadeProfessores)
      setValue('latitude', data?.latitude)
      setValue('longitude', data?.longitude)
      setListStudents(data?.studentsPerCycle)

      setValue('address.cep', data?.address?.cep)
      setValue('address.street', data?.address?.street)
      setValue('address.number', data?.address?.number)
      setValue('address.district', data?.address?.district)
      setValue('address.complement', data?.address?.complement)
      setValue('address.state', data?.address?.city?.state?.initials)
      setValue('address.city', data?.address?.city?.name)
    }
  }, [data]);

  function onSubmit(dataForm: any) {
    const citySelected = states.cities.find(item => item.name === dataForm.address.city)
    const phones = phonesParser(dataForm.phones)
    const params = {
      ...dataForm,
      regionalSuperintendence: +dataForm.regionalSuperintendence || null,
      phones: phones.some(item => item.DDD) ? phones : null,
      idDnit: +dataForm.idDnit || null,
      idDnitUnitCity: +dataForm.idDnitUnitCity || null,
      latitude: +dataForm.latitude || null,
      longitude: +dataForm.longitude || null,
      quantidadeAlunos: +dataForm.quantidadeAlunos || null,
      quantidadeProfessores: +dataForm.quantidadeProfessores || null,
      idInep: +dataForm.idInep || null,
      name: dataForm.identification,
      address: {
        ...dataForm.address,
        citySelected: citySelected.id,
        idCity: citySelected.id,
        idState: citySelected.idState
      }
    }

    onSubmitHandle(params)
  }

  useEffect(() => {
    if (watch('isFederalDistrict')) {
      setValue('regionalSuperintendence', `1`)
    }
  }, [watch('isFederalDistrict')]);

  useEffect(() => {
    if (watch('regionalSuperintendence')) {
      dispatch(actionsDnitLocalUnits.loadListRequest({
        idRegionalSuperintendence: watch('regionalSuperintendence'),
        limit: 'all'
      }))
    }
  }, [watch('regionalSuperintendence')]);

  useEffect(() => {
    if (watch('idDnit')) {
      dispatch(actionsDnitLocalUnits.loadListCitiesByIdLocalUnitRequest({
        id: watch('idDnit'),
      }))
    }
  }, [watch('idDnit')]);

  function renderSuperintendences() {
    return dnitLocalUnits?.superintendences?.rows.map((item: Superintendence) => (
      <div key={`superintendence_${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            {...register('regionalSuperintendence', { required: true })}
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

  function renderLocalUnits() {
    return dnitLocalUnits?.data?.rows.map((item: DnitLocalUnits) => (
      <div key={`idDnit-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`idDnit-type-${item.id}`}
            {...register('idDnit', { required: true })}
            value={item.id}
            type="radio" />
          <label htmlFor={`idDnit-type-${item.id}`}>
            {item.identification}
          </label>
        </div>
      </div>
    ));
  }

  function renderCities() {
    return dnitLocalUnits?.cities?.map((item: City) => (
      <div key={`idDnitUnitCity-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`idDnitUnitCity-type-${item.id}`}
            {...register('idDnitUnitCity')}
            value={item.id}
            type="radio" />
          <label htmlFor={`idDnitUnitCity-type-${item.id}`}>
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
          <div className='col-12'>
            {/* <p className="label mb-0">Rótulo</p> */}
            {/* <p className="help-text">Informações adicionais</p> */}
            <div className={'d-inline-block mr-sm-4'}>
              <div className="br-radio">
                <input id="op-1" defaultChecked {...register('idTeachingNetwork')} type="radio" value="1" />
                <label htmlFor="op-1">{t('pages:institutions.details.labels.networkTypeOps.city')}</label>
              </div>
            </div>
            <div className={'d-inline-block mr-sm-4'}>
              <div className="br-radio">
                <input id="op-2" {...register('idTeachingNetwork')} type="radio" value="2" />
                <label htmlFor="op-2">{t('pages:institutions.details.labels.networkTypeOps.state')}</label>
              </div>
            </div>
            <div className={'d-inline-block mr-sm-4'}>
              <div className="br-radio">
                <input id="op-3" {...register('idTeachingNetwork')} type="radio" value="3" />
                <label htmlFor="op-3">{t('pages:institutions.details.labels.networkTypeOps.federal')}</label>
              </div>
            </div>
            <div className={'d-inline-block mr-sm-4'}>
              <div className="br-radio">
                <input id="op-4" {...register('idTeachingNetwork')} type="radio" value="4" />
                <label htmlFor="op-4">{t('pages:institutions.details.labels.networkTypeOps.private')}</label>
              </div>
            </div>
            <div className={'d-inline-block'}>
              <div className="br-radio">
                <input id="op-5" {...register('idTeachingNetwork')} type="radio" value="5" />
                <label htmlFor="op-5">{t('pages:institutions.details.labels.networkTypeOps.filantropica')}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={'d-inline-block'}>
              <div className={`br-checkbox mr-4`}>
                <input
                  id={`isDF`}
                  name={`isDF`}
                  {...register('isDF')}
                  type="checkbox" />
                <label htmlFor={`isDF`}>{t('pages:institutions.details.labels.isDF')}</label>
              </div>
            </div>
            <div className={'d-inline-block'}>
              <div className={`br-checkbox`}>
                <input
                  id={`joinProgram`}
                  name={`joinProgram`}
                  {...register('joinProgram')}
                  type="checkbox" />
                <label htmlFor={`joinProgram`}>{t('pages:institutions.details.labels.conectionDnit')}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-input medium ${errors?.identification?.type ? 'danger' : ''}`}>
              <label htmlFor="identification">{t('pages:institutions.details.labels.identification')}*:</label>
              <input
                {...register('identification', { required: true })}
                maxLength={100}
                className={`medium ${errors?.identification?.type ? 'danger' : ''}`}
                id="identification"
                type="text"
                placeholder={t('pages:institutions.details.placeholders.identification')} />
              {errors?.identification?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:institutions.details.required.identification')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-input medium  ${errors?.regionalSuperintendence?.type ? 'danger' : ''}`}>
              <label htmlFor="regionalSuperintendence">{t('pages:institutions.details.labels.regionalSuperintendence')}*:</label>
              <Select
                placeholder={t('pages:institutions.details.placeholders.regionalSuperintendence')}
                id="regionalSuperintendence"
                disabled={watch('isFederalDistrict')}
                CustomclassName={`mw-100  ${errors?.regionalSuperintendence?.type ? 'danger' : ''}`}
                className="mw-100"
              >
                {renderSuperintendences()}
              </Select>
              {errors?.regionalSuperintendence?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:institutions.details.required.regionalSuperintendence')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.idDnit?.type ? 'danger' : ''}`}>
              <label htmlFor="localUnit">{t('pages:institutions.details.labels.localUnit')}*:</label>
              <Select
                placeholder={t('pages:institutions.details.placeholders.localUnit')}
                id="localUnit"
                disabled={!watch('regionalSuperintendence')}
                CustomclassName={`mw-100`}
                className="mw-100"
              >
                {renderLocalUnits()}
              </Select>
              {errors?.idDnit?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:institutions.details.required.identification')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.idDnitUnitCity?.type ? 'danger' : ''}`}>
              <label htmlFor="idDnitUnitCity">{t('pages:institutions.details.labels.cities')}:</label>
              <Select
                placeholder={t('pages:institutions.details.placeholders.cities')}
                id="idDnitUnitCity"
                disabled={!watch('idDnit')}
                CustomclassName={`mw-100 ${errors?.idDnitUnitCity?.type ? 'danger' : ''}`}
                className="mw-100"
              >
                {renderCities()}
              </Select>
              {errors?.cities?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:institutions.details.required.identification')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium`}>
              <label htmlFor="idInep">{t('pages:institutions.details.labels.codeInep')}:</label>
              <input
                {...register('idInep')}
                maxLength={100}
                className={`medium`}
                id="idInep"
                type="text"
                placeholder={t('pages:institutions.details.placeholders.codeInep')} />
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className={`br-input medium`}>
              <label htmlFor="phone">{t('pages:institutions.details.labels.phone')}:</label>
              <InputMask
                mask={watch('phones.0')?.split('')[5] === '9' ? '(99) 99999-9999' : '(99) 9999-9999'}
                {...register('phones.0', {
                  required: false,
                  pattern: /^[+]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?|$/gim
                })}
                className={`medium`}
                id="phone"
                type="text"
                placeholder={t('pages:institutions.details.placeholders.phone')} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium`}>
              <label htmlFor="quantidadeAlunos">{t('pages:institutions.details.labels.quantidadeAlunos')}:</label>
              <Controller
                render={({ field }) =>
                  <NumberFormat
                    control={control}
                    customInput={InputMask}
                    placeholder={t('pages:institutions.details.placeholders.quantidadeAlunos')}
                    allowEmptyFormatting={false}
                    allowNegative={false}
                    decimalScale={0}
                    {...field}
                    onValueChange={(c) => {
                      field.onChange(c.value);
                    }}
                  />
                }
                name="quantidadeAlunos"
                defaultValue={+data?.quantidadeAlunos}
                control={control}
              />
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className={`br-input medium`}>
              <label htmlFor="quantidadeProfessores">{t('pages:institutions.details.labels.quantidadeProfessores')}:</label>
              <Controller
                render={({ field }) =>
                  <NumberFormat
                    control={control}
                    customInput={InputMask}
                    placeholder={t('pages:institutions.details.placeholders.quantidadeProfessores')}
                    allowEmptyFormatting={false}
                    allowNegative={false}
                    decimalScale={0}
                    {...field}
                    onValueChange={(c) => {
                      field.onChange(c.value);
                    }}
                  />
                }
                name="quantidadeProfessores"
                defaultValue={+data?.quantidadeProfessores}
                control={control}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium`}>
              <label htmlFor="latitude">{t('pages:institutions.details.labels.latitude')}:</label>
              <Controller
                render={({ field }) =>
                  <NumberFormat
                    control={control}
                    customInput={InputMask}
                    placeholder={t('pages:institutions.details.placeholders.latitude')}
                    allowEmptyFormatting={false}
                    allowNegative={true}
                    decimalScale={8}
                    {...field}
                    decimalSeparator={','}
                    onValueChange={(c) => {
                      field.onChange(c.value);
                    }}
                  />
                }
                name="latitude"
                defaultValue={+data?.latitude}
                control={control}
              />
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className={`br-input medium`}>
              <label htmlFor="longitude">{t('pages:institutions.details.labels.longitude')}:</label>
              <Controller
                render={({ field }) =>
                  <NumberFormat
                    control={control}
                    customInput={InputMask}
                    placeholder={t('pages:institutions.details.placeholders.longitude')}
                    allowEmptyFormatting={false}
                    allowNegative={true}
                    decimalScale={8}
                    {...field}
                    decimalSeparator={','}
                    onValueChange={(c) => {
                      field.onChange(c.value);
                    }}
                  />
                }
                name="longitude"
                defaultValue={+data?.longitude}
                control={control}
              />
            </div>
          </div>
        </div>
        <StudentsByGradeForm
          defaultList={listStudents}
          useFormProps={
            {
              registerForm: register,
              watchForm: watch,
              setValueForm: setValue,
              controlForm: control,
              errorsForm: errors,
              resetForm: reset
            }
          } t={t} />
        <AddressForm
          useFormProps={
            { registerForm: register, watchForm: watch, setValueForm: setValue, errorsForm: errors }
          } t={t} />
        <div className="mt-3 d-flex">
          <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
            <button className="br-button mr-auto" type="button">
              {t('pages:institutions.details.cancel')}
            </button>
          </Link>
          <button className="br-button primary" value='save' type="submit">
            {t('pages:institutions.details.submit')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInstitutions
