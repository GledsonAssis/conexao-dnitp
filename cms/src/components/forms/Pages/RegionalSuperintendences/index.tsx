import React, { useEffect, useState } from 'react';

import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { RegionalSuperintendences } from '@/store/ducks/regionalSuperintendences/types';
import { useRouter } from 'next/router';
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from 'react-redux';

import * as actionsStates from '@/store/ducks/states/actions';
import { ApplicationState } from '@/store';
import { phonesParser } from '@/utils/parsers';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps {
  titlePage: string
  onSubmitHandle: Function
  data?: Partial<RegionalSuperintendences>
}

type Props = StateProps & DispatchProps & OwnProps;

export const FormRegionalSuperintendencesPage: React.FC<Props> = ({
  t,
  onSubmitHandle,
  data,
  titlePage
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const externalApis = useSelector((state: ApplicationState) => state.externalApis);
  const states = useSelector((state: ApplicationState) => state.states);
  const [paramsToSubmit, setParamsToSubmit] = useState<any>();

  const {
    register,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  useEffect(() => {
    if (data) {
      setValue('identification', data?.identification)
      if (data?.phones[0]) {
        setValue('phones.0', `${data?.phones[0]?.DDD}${data?.phones[0]?.number}`)
      }
      if (data?.phones[1]) {
        setValue('phones.1', `${data?.phones[1]?.DDD}${data?.phones[1]?.number}`)
      }

      setValue('email', data?.email)
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
    dispatch(actionsStates.loadCitiesListRequest());

    const phones = phonesParser(dataForm.phones)
    const params = {
      ...dataForm,
      phones: phones.filter(item => item.DDD)
    }

    setParamsToSubmit(params)
  }

  useEffect(() => {
    if (states.cities.length && paramsToSubmit) {
      const citySelected = states.cities.find(item => item.name === paramsToSubmit.address.city)

      paramsToSubmit.address = {
        ...paramsToSubmit.address,
        citySelected: citySelected.id,
        idCity: citySelected.id,
        idState: citySelected.idState
      }

      paramsToSubmit.idUFSuperintendence = citySelected.idState

      onSubmitHandle(paramsToSubmit)
    }
  }, [states.cities]);

  return (
    <form onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>

      <div className="main-content mt-3 px-md-3" id="main-content">
        <div className="row">
          <div className='col-12'>
            <p className="h1">{titlePage}</p>
          </div>
        </div>
        <div className="h3 mb-2">{t('pages:regionalSuperintendence.details.labels.identification')}</div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-input medium ${errors?.identification?.type ? 'danger' : ''}`}>
              <label htmlFor="identification">{t('pages:regionalSuperintendence.details.labels.identification')}*:</label>
              <input
                {...register('identification', { required: true })}
                maxLength={100}
                className={`medium ${errors?.identification?.type ? 'danger' : ''}`}
                id="identification"
                type="text"
                placeholder={t('pages:regionalSuperintendence.details.placeholders.identification')} />
              {errors?.identification?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:regionalSuperintendence.details.required.identification')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.phones?.type ? 'danger' : ''}`}>
              <label htmlFor="phone1">{t('pages:regionalSuperintendence.details.labels.phone1')}*:</label>
              <InputMask
                mask={watch('phones.0')?.split('')[5] === '9' ? '(99) 99999-9999' : '(99) 9999-9999'}
                {...register('phones.0', {
                  required: true,
                  pattern: /^[+]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?$/gim
                })}
                className={`medium ${errors?.phones?.type ? 'danger' : ''}`}
                id="phone1"
                type="text"
                placeholder={t('pages:regionalSuperintendence.details.placeholders.phone1')} />
              {errors?.phones?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:regionalSuperintendence.details.required.phone1')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.phones?.type ? 'danger' : ''}`}>
              <label htmlFor="phone2">{t('pages:regionalSuperintendence.details.labels.phone2')}:</label>
              <InputMask
                mask={watch('phones.1')?.split('')[5] === '9' ? '(99) 99999-9999' : '(99) 9999-9999'}
                {...register('phones.1', {
                  required: false,
                  pattern: /^[+]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?|$/gim
                })}
                className={`medium ${errors?.phones?.type ? 'danger' : ''}`}
                id="phone2"
                type="text"
                placeholder={t('pages:regionalSuperintendence.details.placeholders.phone2')} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.email?.type ? 'danger' : ''}`}>
              <label htmlFor="email">{t('pages:regionalSuperintendence.details.labels.email')}:</label>
              <input
                {...register('email', { pattern: /^\S+@\S+$/i })}
                maxLength={100}
                className={`medium ${errors?.email?.type ? 'danger' : ''}`}
                id="email"
                type="text"
                placeholder={t('pages:regionalSuperintendence.details.placeholders.email')} />
              {errors?.email?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:regionalSuperintendence.details.required.email')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="h3 mb-2">{t('pages:regionalSuperintendence.details.labels.address.title')}</div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.address?.cep?.type ? 'danger' : ''}`}>
              <label htmlFor="zipCode">{t('pages:regionalSuperintendence.details.labels.address.zipCode')}*:</label>
              <InputMask
                mask='99999-999'
                {...register('address.cep', { required: true, pattern: /^(\d{5}(\-\d{3})?)?$/gm })}
                className={`medium ${errors?.zipCode?.type ? 'danger' : ''}`}
                id="zipCode"
                type="text"
                placeholder={t('pages:regionalSuperintendence.details.placeholders.address.zipCode')} />
              {errors?.address?.cep?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:regionalSuperintendence.details.required.address.zipCode')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.address?.street?.type ? 'danger' : ''}`}>
              <label htmlFor="street">{t('pages:regionalSuperintendence.details.labels.address.street')}*:</label>
              <input
                readOnly
                {...register('address.street', { required: true })}
                maxLength={100}
                className={`medium ${errors?.street?.type ? 'danger' : ''}`}
                id="street"
                type="text"
                placeholder={t('pages:regionalSuperintendence.details.placeholders.address.street')} />
              {errors?.address?.street?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:regionalSuperintendence.details.required.address.street')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.address?.number?.type ? 'danger' : ''}`}>
              <label htmlFor="number">{t('pages:regionalSuperintendence.details.labels.address.number')}:</label>
              <input
                {...register('address.number')}
                maxLength={100}
                className={`medium ${errors?.number?.type ? 'danger' : ''}`}
                id="number"
                type="text"
                placeholder={t('pages:regionalSuperintendence.details.placeholders.address.number')} />
              {errors?.address?.number?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:regionalSuperintendence.details.required.address.number')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.address?.district?.type ? 'danger' : ''}`}>
              <label htmlFor="district">{t('pages:regionalSuperintendence.details.labels.address.district')}*:</label>
              <input
                {...register('address.district', { required: true })}
                maxLength={100}
                readOnly
                className={`medium ${errors?.district?.type ? 'danger' : ''}`}
                id="district"
                type="text"
                placeholder={t('pages:regionalSuperintendence.details.placeholders.address.district')} />
              {errors?.address?.district?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:regionalSuperintendence.details.required.address.district')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className={`br-input medium`}>
              <label htmlFor="complement">{t('pages:regionalSuperintendence.details.labels.address.complement')}:</label>
              <input
                {...register('address.complement')}
                maxLength={100}
                className={`medium`}
                id="complement"
                type="text"
                placeholder={t('pages:regionalSuperintendence.details.placeholders.address.complement')} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.address?.state?.type ? 'danger' : ''}`}>
              <label htmlFor="state">{t('pages:regionalSuperintendence.details.labels.address.state')}*:</label>
              <input
                {...register('address.state', { required: true })}
                maxLength={100}
                readOnly
                className={`medium ${errors?.state?.type ? 'danger' : ''}`}
                id="state"
                type="text"
                placeholder={t('pages:regionalSuperintendence.details.placeholders.address.state')} />
              {errors?.address?.state?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:regionalSuperintendence.details.required.address.state')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.address?.city?.type ? 'danger' : ''}`}>
              <label htmlFor="city">{t('pages:regionalSuperintendence.details.labels.address.city')}*:</label>
              <input
                {...register('address.city', { required: true })}
                maxLength={100}
                readOnly
                className={`medium ${errors?.city?.type ? 'danger' : ''}`}
                id="city"
                type="text"
                placeholder={t('pages:regionalSuperintendence.details.placeholders.address.city')} />
              {errors?.address?.city?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:regionalSuperintendence.details.required.address.city')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="mt-3 d-flex">
          <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
            <button className="br-button mr-auto" type="button">
              {t('pages:regionalSuperintendence.details.cancel')}
            </button>
          </Link>
          <button className="br-button primary" value='save' type="submit">
            {t('pages:regionalSuperintendence.details.submit')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormRegionalSuperintendencesPage
