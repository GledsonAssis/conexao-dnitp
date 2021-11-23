import React, { useEffect, useState } from 'react';

import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Role, Users } from '@/store/ducks/users/types';
import { useRouter } from 'next/router';
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from 'react-redux';

import {
  validateCPF,
} from '@/utils/validate';

import * as actionsStates from '@/store/ducks/states/actions';
import * as actionsUsers from '@/store/ducks/users/actions';
import * as actionsDnitLocalUnits from '@/store/ducks/dnitLocalUnits/actions';
import { ApplicationState } from '@/store';
import { phonesParser } from '@/utils/parsers';
import Select from '@/components/shared/Select';
import { Cities, Institutions } from '@/store/ducks/states/types';
import { Datapicker } from '@/components/shared/DataPicker';
import { DnitLocalUnits, Superintendence } from '@/store/ducks/dnitLocalUnits/types';
import moment from 'moment';
import normalizePhone from '@/utils/normalize/normalizePhone';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps {
  titlePage: string
  onSubmitHandle: Function
  data?: Partial<Users>
}

type Props = StateProps & DispatchProps & OwnProps;

export const FormUsersPage: React.FC<Props> = ({
  t,
  onSubmitHandle,
  data,
  titlePage
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const states = useSelector((state: ApplicationState) => state.states);
  const users = useSelector((state: ApplicationState) => state.users);
  const dnitLocalUnits = useSelector((state: ApplicationState) => state.dnitLocalUnits);
  const [cities, setCities] = useState<any[]>([]);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  useEffect(() => {
    if (data) {
      const mobilePhone = data?.phones?.find(item => item.idPhoneType === 1)
      const phone = data?.phones?.find(item => item.idPhoneType === 2)
      setValue('name', data?.name)
      setValue('cpf', data?.cpf)
      setValue('email', data?.email)
      setValue('birthDate', moment.utc(data?.birthDate).format('DD/MM/YYYY'))
      setValue('mobilePhone', `${mobilePhone?.DDD}${mobilePhone?.number}`)
      setValue('phone', `${phone?.DDD}${phone?.number}`)
      setValue('profile', `${data?.role?.id}`)
      setValue('regionalSuperintendence', `${data?.DnitUnit?.RegionalSuperintendence?.id}` || null)
      setValue('idDnit', `${data?.DnitUnit?.id}` || null)
      setValue('state', `${data?.city?.state?.id}` || null)
      setValue('city', `${data?.city?.id}` || null)
      setValue('schools', data?.instituitions || null)
    }
  }, [data]);

  function onSubmit(dataForm: any) {
    const [phone] = phonesParser([watch('phone')])
    const params = {
      acceptedTerms: true,
      idRole: +dataForm.profile,
      idDnitUnit: +dataForm.idDnit,
      idCity: +dataForm.city,
      regionalSuperintendence: +dataForm.regionalSuperintendence,
      idState: +dataForm.state,
      birthDate: new Date(dataForm.birthDate).toISOString(),
      phones: [],
      instituitions: dataForm.schools.filter(item => item?.id).map(item => item.id)
    }
    phone.DDD ? params.phones.push({ ...phone, idPhoneType: 2 }) : '';

    onSubmitHandle(params)
  }

  useEffect(() => {
    if (watch('regionalSuperintendence')) {
      dispatch(actionsDnitLocalUnits.loadListRequest({
        idRegionalSuperintendence: +watch('regionalSuperintendence'),
        limit: 'all'
      }))
    }
  }, [watch('regionalSuperintendence')]);

  useEffect(() => {
    if (watch('state')) {
      setCities(states?.cities?.filter(item => item.idState === +watch('state')))
    }
  }, [watch('state')]);

  useEffect(() => {
    if (watch('city')) {
      dispatch(actionsStates.loadInstitutionsRequest({ id: watch('city') }))
    }
  }, [watch('city')]);

  function renderSuperintendences() {
    return dnitLocalUnits?.superintendences?.rows.map((item: Superintendence) => (
      <div key={`superintendence_${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            {...register('regionalSuperintendence')}
            value={item.id}
            id={`superintendence_${item.id}`}
            type="radio" />
          <label className={`text-capitalize`} htmlFor={`superintendence_${item.id}`}>
            {item.identification.toLowerCase()}
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
            {...register('idDnit')}
            value={item.id}
            type="radio" />
          <label htmlFor={`idDnit-type-${item.id}`}>
            {item.identification}
          </label>
        </div>
      </div>
    ));
  }

  function renderRoles() {
    return users?.roles?.map((item: Role) => (
      <div key={`profile-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`profile-type-${item.id}`}
            {...register('profile', { required: true })}
            value={item.id}
            type="radio" />
          <label htmlFor={`profile-type-${item.id}`}>
            {item.name}
          </label>
        </div>
      </div>
    ));
  }

  function renderStates() {
    return states?.data?.map((item: Role) => (
      <div key={`state-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`state-type-${item.id}`}
            {...register('state')}
            value={item.id}
            type="radio" />
          <label htmlFor={`state-type-${item.id}`}>
            {item.name}
          </label>
        </div>
      </div>
    ));
  }

  function renderCities() {
    return cities?.map((item: Cities) => (
      <div key={`city-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            id={`city-type-${item.id}`}
            {...register('city')}
            value={item.id}
            type="radio" />
          <label htmlFor={`city-type-${item.id}`}>
            {item.name}
          </label>
        </div>
      </div>
    ));
  }

  function renderSchools() {
    return states.institutions?.map((item: Institutions, index: number) => (
      <div key={`school-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-checkbox">
          <input
            id={`school-type-${item.id}`}
            {...register(`schools.[${index}]`)}
            value={item.id}
            type="checkbox" />
          <label htmlFor={`school-type-${item.id}`}>
            {item.name}
          </label>
        </div>
      </div>
    ));
  }

  function releaseaccessHandle(id: number) {
    // TODO: Modal de confirmação
    dispatch(actionsUsers.loadReleaseAccessRequest({ id }))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>
      <div className="main-content mt-3 px-md-3" id="main-content">
        <div className="row">
          <div className='col'>
            <p className="h1">{titlePage}</p>
          </div>
          {data?.id ?
            <div className='col-auto'>
              <button
                className={`br-button ${users.releaseAccess === 1 ? 'secondary' : (
                  users.releaseAccess === 2 ? 'success' : (
                    users.releaseAccess === 3 ? 'danger' : 'secondary'))
                  } mr-sm-auto`}
                type="button"
                onClick={() => releaseaccessHandle(data.id)}>
                {
                  users.releaseAccess === 2 ? <i className="fas fa-check mr-2"></i> :
                    users.releaseAccess === 3 ? <i className="fas fa-times mr-2"></i> : ''
                }
                {t('pages:users.details.labels.releaseaccess')}
              </button>
            </div>
            : ''}
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-input medium`}>
              <label>{t('pages:users.details.labels.name')}*:</label>
              <label className="label-info">{data?.name}</label>
              {/* <input
                {...register('name', { required: true })}
                className={`medium ${errors?.name?.type ? 'danger' : ''}`}
                id="name"
                disabled={true}
                type="text"
                placeholder={t('pages:users.details.placeholders.name')} />
              {errors?.name?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:users.details.required.name')}
                  </span>
                </div>
                : ''} */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-4'>
            <div className={`br-input medium`}>
              <label htmlFor="cpfNumber">{t('pages:users.details.labels.cpf')}*:</label>
              <label className="label-info">{data?.cpf}</label>
              {/* <InputMask
                mask={'999.999.999-99'}
                {...register('cpf', {
                  required: true,
                  pattern: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/gim,
                  validate: validateCPF
                })}
                className={`medium ${errors?.cpf?.type ? 'danger' : ''}`}
                id="cpfNumber"
                disabled={true}
                type="text"
                placeholder={t('pages:users.details.placeholders.cpf')} />
              {errors?.cpf?.type === 'validate' ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:users.details.invalid.cpf')}
                  </span>
                </div>
                : ''}
              {errors?.cpf?.type && errors?.cpf?.type !== 'validate' ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:users.details.required.cpf')}
                  </span>
                </div>
                : ''} */}
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <div className={`br-input medium ${errors?.email?.type ? 'danger' : ''}`}>
              <label htmlFor="email">{t('pages:users.details.labels.email')}*:</label>
              <label className="label-info">{data?.email}</label>
              {/* <input
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                className={`medium ${errors?.email?.type ? 'danger' : ''}`}
                id="email"
                disabled={true}
                type="text"
                placeholder={t('pages:users.details.placeholders.email')} />
              {errors?.email?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:users.details.required.email')}
                  </span>
                </div>
                : ''} */}
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <div className={`br-input medium`}>
              <label htmlFor="birthDate">{t('pages:users.details.labels.birthDate')}:</label>
              <Datapicker
                id="birthDate"
                minDate=""
                title={`${t('pages:users.details.label.birthDate')}:`}
                inputProps={{ ...register('birthDate') }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-4'>
            <div className={`br-input medium ${errors?.mobilePhone?.type ? 'danger' : ''}`}>
              <label htmlFor="mobilePhone">{t('pages:users.details.labels.mobilePhone')}*:</label>
              <label className="label-info">{normalizePhone(`${data?.phones?.[0]?.DDD}${data?.phones?.[0]?.number}`)}</label>
              {/* <InputMask
                mask={
                  [watch('mobilePhone')?.split('')[5], watch('mobilePhone')?.split('')[3]].includes('9') ? '(99) 99999-9999' : '(99) 9999-9999'}
                {...register('mobilePhone', {
                  required: true,
                  pattern: /^[+]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?$/gim
                })}
                className={`medium ${errors?.mobilePhone?.type ? 'danger' : ''}`}
                id="mobilePhone"
                type="text"
                placeholder={t('pages:users.details.placeholders.mobilePhone')} />
              {errors?.mobilePhone?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:users.details.required.mobilePhone')}
                  </span>
                </div>
                : ''} */}
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <div className={`br-input medium`}>
              <label htmlFor="phone">{t('pages:users.details.labels.phone')}:</label>
              <InputMask
                mask={watch('phone')?.split('')[5] === '9' ? '(99) 99999-9999' : '(99) 9999-9999'}
                {...register('phone', {
                  required: false,
                  pattern: /^[+]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?|$/gim
                })}
                className={`medium`}
                id="phone"
                type="text"
                placeholder={t('pages:users.details.placeholders.phone')} />
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <div className={`br-input medium ${errors?.profile?.type ? 'danger' : ''}`}>
              <label htmlFor="profile">{t('pages:users.details.labels.profile')}*:</label>
              <Select
                placeholder={t('pages:users.details.placeholders.profile')}
                id="profile"
                CustomclassName={`mw-100 ${errors?.profile?.type ? 'danger' : ''}`}
                className={`mw-100`}
              >
                {renderRoles()}
              </Select>
              {errors?.profile?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:users.details.required.profile')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium`}>
              <label htmlFor="regionalSuperintendence">{t('pages:users.details.labels.regionalSuperintendence')}:</label>
              <Select
                placeholder={t('pages:users.details.placeholders.regionalSuperintendence')}
                id="regionalSuperintendence"
                CustomclassName={`mw-100`}
                className="mw-100"
              >
                {renderSuperintendences()}
              </Select>
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className={`br-input medium`}>
              <label htmlFor="localUnit">{t('pages:users.details.labels.localUnit')}:</label>
              <Select
                placeholder={t('pages:users.details.placeholders.localUnit')}
                id="localUnit"
                disabled={!watch('regionalSuperintendence')}
                CustomclassName={`mw-100`}
                className="mw-100"
              >
                {renderLocalUnits()}
              </Select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium`}>
              <label htmlFor="state">{t('pages:users.details.labels.state')}:</label>
              <Select
                placeholder={t('pages:users.details.placeholders.state')}
                id="state"
                CustomclassName={`mw-100`}
                className="mw-100"
              >
                {renderStates()}
              </Select>
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className={`br-input medium`}>
              <label htmlFor="city">{t('pages:users.details.labels.city')}:</label>
              <Select
                placeholder={t('pages:users.details.placeholders.city')}
                id="city"
                disabled={!watch('state')}
                CustomclassName={`mw-100`}
                className="mw-100"
              >
                {renderCities()}
              </Select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-8'>
            <div className={`br-input medium`}>
              <label htmlFor="school">{t('pages:users.details.labels.school')}:</label>
              <Select
                placeholder={t('pages:users.details.placeholders.school')}
                id="school"
                disabled={!watch('state') || !watch('city')}
                multiple
                CustomclassName={`mw-100`}
                className="mw-100"
              >
                <div className="br-item highlighted" data-all="data-all">
                  <div className="br-checkbox">
                    <input id="roads-all" type="checkbox" />
                    <label htmlFor="roads-all">{t('components:Select.selectAll')}</label>
                  </div>
                </div>
                {renderSchools()}
              </Select>
            </div>
          </div>
        </div>
        <div className="mt-3 d-flex">
          <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
            <button className="br-button mr-auto" type="button">
              {t('pages:users.details.cancel')}
            </button>
          </Link>
          <button className="br-button primary" value='save' type="submit">
            {t('pages:users.details.submit')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormUsersPage
