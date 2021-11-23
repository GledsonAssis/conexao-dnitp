import React, { useEffect, useState } from 'react';

import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { DnitLocalUnits, Road, Superintendence } from '@/store/ducks/dnitLocalUnits/types';
import { useRouter } from 'next/router';
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from 'react-redux';

import * as actionsDnitLocalUnits from '@/store/ducks/dnitLocalUnits/actions';
import { ApplicationState } from '@/store';
import { phonesParser } from '@/utils/parsers';
import Select from '@/components/shared/Select';
import { Cities } from '@/store/ducks/states/types';
import { AddressForm } from '@/components/forms/Address';

interface StateProps {
  header?: string;
  propsModel: any
  t: TFunction
}
interface DispatchProps { }
interface OwnProps {
  titlePage: string
  onSubmitHandle: Function
  data?: Partial<DnitLocalUnits>
}

type Props = StateProps & DispatchProps & OwnProps;

export const FormDnitLocalUnitsPage: React.FC<Props> = ({
  t,
  onSubmitHandle,
  data,
  titlePage
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const externalApis = useSelector((state: ApplicationState) => state.externalApis);
  const states = useSelector((state: ApplicationState) => state.states);
  const dnitLocalUnits = useSelector((state: ApplicationState) => state.dnitLocalUnits);
  const [cities, setCities] = useState<any[]>([]);

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
      setValue('cities', data?.cities.map(item => `${item.id}`))
      setValue('roads', data?.roads.map(item => `${item.id}`))
      setValue('idRegionalSuperintendence', `${data?.idRegionalSuperintendence}`)

      setValue('email', data?.email)
      setValue('address.cep', data?.address?.cep)
      setValue('address.street', data?.address?.street)
      setValue('address.number', data?.address?.number)
      setValue('address.district', data?.address?.district)
      setValue('address.complement', data?.address?.complement)
      setValue('address.state', data?.address?.city?.state?.initials)
      setValue('address.city', data?.address?.city?.name)

      setValue('address.init', true)
    }
  }, [data]);

  function onSubmit(dataForm: any) {
    const citySelected = states.cities.find(item => item.name === dataForm.address.city)
    const phones = phonesParser(dataForm.phones)
    const params = {
      ...dataForm,
      cities: dataForm?.cities?.length ? dataForm?.cities.map((item: string | number) => +item) : null,
      roads: dataForm?.roads.length ? dataForm?.roads.map((item: string | number) => +item) : null,
      idRegionalSuperintendence: +dataForm.idRegionalSuperintendence,
      phones: phones?.filter(item => item.DDD),
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
    if (watch('idRegionalSuperintendence')) {
      const superintendence = dnitLocalUnits?.superintendences?.rows.find(item => item.id === +watch('idRegionalSuperintendence'))
      dispatch(actionsDnitLocalUnits.loadListRoadsRequest({ idUf: superintendence?.idUFSuperintendence }))
      setCities(states?.cities?.filter(item => item.idState === superintendence?.idUFSuperintendence))
    }
  }, [watch('idRegionalSuperintendence')]);

  function renderSuperintendences() {
    return dnitLocalUnits?.superintendences?.rows.map((item: Superintendence) => (
      <div key={`superintendence_${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-radio">
          <input
            {...register('idRegionalSuperintendence', { required: true })}
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

  function renderRoads() {
    return dnitLocalUnits?.roads?.rows.map((item: Road) => (
      <div key={`roads-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-checkbox">
          <input
            id={`roads-type-${item.id}`}
            {...register('roads[]')}
            value={item.id}
            type="checkbox" />
          <label htmlFor={`roads-type-${item.id}`}>
            {item.name}
          </label>
        </div>
      </div>
    ));
  }

  function renderCities() {
    return cities?.map((item: Cities) => (
      <div key={`cities-select-${item.id}`} className="br-item w-100" tabIndex={-1}>
        <div className="br-checkbox">
          <input
            id={`cities-type-${item.id}`}
            {...register('cities[]', { required: true })}
            value={item.id}
            type="checkbox" />
          <label htmlFor={`cities-type-${item.id}`}>
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
            <div className={`br-checkbox`}>
              <input
                id={`isFederalDistrict`}
                name={`isFederalDistrict`}
                {...register('isFederalDistrict')}
                type="checkbox" />
              <label htmlFor={`isFederalDistrict`}>{t('pages:dnitLocalUnits.details.labels.isFederalDistrict')}</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-input medium  ${errors?.idUFSuperintendence?.type ? 'danger' : ''}`}>
              <label htmlFor="regionalSuperintendence">{t('pages:dnitLocalUnits.details.labels.regionalSuperintendence')}*:</label>
              <Select
                placeholder={t('pages:dnitLocalUnits.details.placeholders.regionalSuperintendence')}
                id="regionalSuperintendence"
                CustomclassName={`mw-100  ${errors?.idUFSuperintendence?.type ? 'danger' : ''}`}
                className="mw-100"
              >
                {renderSuperintendences()}
              </Select>
              {errors?.idUFSuperintendence?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:dnitLocalUnits.details.required.identification')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12'>
            <div className={`br-input medium ${errors?.identification?.type ? 'danger' : ''}`}>
              <label htmlFor="identification">{t('pages:dnitLocalUnits.details.labels.identification')}*:</label>
              <input
                {...register('identification', { required: true })}
                maxLength={100}
                className={`medium ${errors?.identification?.type ? 'danger' : ''}`}
                id="identification"
                type="text"
                placeholder={t('pages:dnitLocalUnits.details.placeholders.identification')} />
              {errors?.identification?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:dnitLocalUnits.details.required.identification')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium`}>
              <label htmlFor="federalHighways">{t('pages:dnitLocalUnits.details.labels.federalHighways')}:</label>
              <Select
                placeholder={t('pages:dnitLocalUnits.details.placeholders.federalHighways')}
                id="roads"
                multiple
                disabled={!watch('idRegionalSuperintendence')}
                CustomclassName={`mw-100`}
                className="mw-100"
              >
                <div className="br-item highlighted" data-all="data-all">
                  <div className="br-checkbox">
                    <input id="roads-all" type="checkbox" />
                    <label htmlFor="roads-all">{t('components:Select.selectAll')}</label>
                  </div>
                </div>
                {renderRoads()}
              </Select>
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.cities?.length ? 'danger' : ''}`}>
              <label htmlFor="cities">{t('pages:dnitLocalUnits.details.labels.cities')}*:</label>
              <Select
                placeholder={t('pages:dnitLocalUnits.details.placeholders.cities')}
                id="cities"
                multiple
                disabled={!watch('idRegionalSuperintendence')}
                CustomclassName={`mw-100 ${errors?.cities?.type ? 'danger' : ''}`}
                className="mw-100"
              >
                <div className="br-item highlighted" data-all="data-all">
                  <div className="br-checkbox">
                    <input id="cities-all" type="checkbox" />
                    <label htmlFor="cities-all">{t('components:Select.selectAll')}</label>
                  </div>
                </div>
                {renderCities()}
              </Select>
              {errors?.cities?.length ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:dnitLocalUnits.details.required.identification')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.phones?.length && errors?.phones[0].type ? 'danger' : ''}`}>
              <label htmlFor="phone1">{t('pages:dnitLocalUnits.details.labels.phone1')}*:</label>
              <InputMask
                mask={watch('phones.0')?.split('')[5] === '9' ? '(99) 99999-9999' : '(99) 9999-9999'}
                {...register('phones.0', {
                  required: true,
                  pattern: /^[+]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?$/gim
                })}
                className={`medium ${errors?.phones?.length && errors?.phones[0]?.type ? 'danger' : ''}`}
                id="phone1"
                type="text"
                placeholder={t('pages:dnitLocalUnits.details.placeholders.phone1')} />
              {errors?.phones?.length && errors?.phones[0]?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:dnitLocalUnits.details.required.phone1')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.phones?.type ? 'danger' : ''}`}>
              <label htmlFor="phone2">{t('pages:dnitLocalUnits.details.labels.phone2')}:</label>
              <InputMask
                mask={watch('phones.1')?.split('')[5] === '9' ? '(99) 99999-9999' : '(99) 9999-9999'}
                {...register('phones.1', {
                  required: false,
                  pattern: /^[+]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?|$/gim
                })}
                className={`medium ${errors?.phones?.type ? 'danger' : ''}`}
                id="phone2"
                type="text"
                placeholder={t('pages:dnitLocalUnits.details.placeholders.phone2')} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${errors?.email?.type ? 'danger' : ''}`}>
              <label htmlFor="email">{t('pages:dnitLocalUnits.details.labels.email')}:</label>
              <input
                {...register('email', { pattern: /^\S+@\S+$/i })}
                maxLength={100}
                className={`medium ${errors?.email?.type ? 'danger' : ''}`}
                id="email"
                type="text"
                placeholder={t('pages:dnitLocalUnits.details.placeholders.email')} />
              {errors?.email?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:dnitLocalUnits.details.required.email')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <AddressForm
          useFormProps={
            { registerForm: register, watchForm: watch, setValueForm: setValue, errorsForm: errors }
          } t={t} />
        <div className="mt-3 d-flex">
          <Link href={router.asPath.substring(0, router.asPath.indexOf('/', 1))}>
            <button className="br-button mr-auto" type="button">
              {t('pages:dnitLocalUnits.details.cancel')}
            </button>
          </Link>
          <button className="br-button primary" value='save' type="submit">
            {t('pages:dnitLocalUnits.details.submit')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormDnitLocalUnitsPage
