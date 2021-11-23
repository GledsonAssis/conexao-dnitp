import React, { FC, useEffect, useRef, useState } from 'react';
import { TFunction } from 'next-i18next';
import { DeepMap, FieldError, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import InputMask from 'react-input-mask';
import externalApis from '@/store/ducks/externalApis';
import { useDispatch, useSelector } from 'react-redux';
import * as actionsGerenal from '@/store/ducks/externalApis/actions';
import { ApplicationState } from '@/store';

interface UseFormProps {
  registerForm: UseFormRegister<any>,
  watchForm: UseFormWatch<any>,
  setValueForm: UseFormSetValue<any>,
  errorsForm: DeepMap<any, FieldError>,
}

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  useFormProps: UseFormProps,
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

// TODO: Chamada das apis externas pelo próprio componente

export const AddressForm: FC<Props> = ({ useFormProps, t }) => {
  const dispatch = useDispatch();
  const [stSearch, SetStSearch] = useState<boolean>(false);
  const externalApis = useSelector((state: ApplicationState) => state.externalApis);

  useEffect(() => {
    const zipCodeOnlyNumbers = useFormProps.watchForm('address.cep')?.replace(/[^0-9]/g, '')
    if (zipCodeOnlyNumbers?.length === 8 && !useFormProps.watchForm('address.init')) {
      dispatch(actionsGerenal.loadViaCepZipCodeRequest({ cep: zipCodeOnlyNumbers }));
      SetStSearch(true)
    }
  }, [useFormProps.watchForm('address.cep')]);

  useEffect(() => {
    if (useFormProps.watchForm('address.init')) {
      useFormProps.setValueForm('address.street', useFormProps.watchForm('address.street'))
      useFormProps.setValueForm('address.district', useFormProps.watchForm('address.district'))
      useFormProps.setValueForm('address.state', useFormProps.watchForm('address.state'))
      useFormProps.setValueForm('address.city', useFormProps.watchForm('address.city'))
      useFormProps.setValueForm('address.init', false)
    }
  }, [useFormProps.watchForm('address.init')]);

  useEffect(() => {
    if (externalApis.data?.viaCep) {
      useFormProps.setValueForm('address.street', externalApis.data?.viaCep.logradouro)
      useFormProps.setValueForm('address.district', externalApis.data?.viaCep.bairro)
      useFormProps.setValueForm('address.state', externalApis.data?.viaCep.uf)
      useFormProps.setValueForm('address.city', externalApis.data?.viaCep.localidade)
    }
  }, [externalApis.data]);

  return (
    <>
      <div className="h3 mb-1">{t('components:Address.title')}</div>
      <div className={`border-solid-sm p-1 px-sm-3 mb-4`}>
        <div className="row mb-2">
          <div className='col-12 col-md-6'>
            <div className={`br-input medium ${useFormProps.errorsForm?.address?.cep?.type ? 'danger' : ''}`}>
              <label htmlFor="zipCode">{t('components:Address.zipCode')}*:</label>
              <InputMask
                mask='99999-999'
                {...useFormProps.registerForm('address.cep', { required: true, pattern: /((\d{5}(\-\d{3})?)|(\d{8}))?$/gmi })}
                className={`medium ${useFormProps.errorsForm?.zipCode?.type ? 'danger' : ''}`}
                id="zipCode"
                type="text"
                placeholder={t('components:Address.placeholder.zipCode')} />
              {useFormProps.errorsForm?.address?.cep?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('components:Address.required.zipCode')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
        </div>
        <div className="mb-4">
          {!useFormProps.watchForm('address.street') && stSearch ?
            <div className={`br-input medium ${useFormProps.errorsForm?.address?.street?.type ? 'danger' : ''}`}>
              <label htmlFor="street">{t('components:Address.street')}:</label>
              <input
                {...useFormProps.registerForm('address.street')}
                maxLength={100}
                className={`medium ${useFormProps.errorsForm?.street?.type ? 'danger' : ''}`}
                id="street"
                type="text"
                placeholder={t('components:Address.placeholder.street')} />
              {useFormProps.errorsForm?.address?.street?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('components:Address.required.street')}
                  </span>
                </div>
                : ''}
            </div>
            : <p className="mb-1">{t('components:Address.street')}*: {useFormProps.watchForm('address.street')}</p>
          }
          {!useFormProps.watchForm('address.district') && stSearch ?
            <div className={`br-input medium ${useFormProps.errorsForm?.address?.district?.type ? 'danger' : ''}`}>
              <label htmlFor="district">{t('components:Address.district')}:</label>
              <input
                {...useFormProps.registerForm('address.district')}
                maxLength={100}
                className={`medium ${useFormProps.errorsForm?.district?.type ? 'danger' : ''}`}
                id="district"
                type="text"
                placeholder={t('components:Address.placeholder.district')} />
              {useFormProps.errorsForm?.address?.district?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('components:Address.required.district')}
                  </span>
                </div>
                : ''}
            </div>
            : <p className="mb-1">{t('components:Address.district')}*: {useFormProps.watchForm('address.district')}</p>}
          <p className="mb-1">{t('components:Address.state')}*: {useFormProps.watchForm('address.state')}</p>
          <p className="mb-1">{t('components:Address.city')}*: {useFormProps.watchForm('address.city')}</p>
        </div>
        <div className="row mb-2">
          <div className='col-12 col-md-4'>
            <div className={`br-input medium ${useFormProps.errorsForm?.address?.number?.type ? 'danger' : ''}`}>
              <label htmlFor="number">{t('components:Address.number')}:</label>
              <input
                {...useFormProps.registerForm('address.number')}
                maxLength={100}
                className={`medium ${useFormProps.errorsForm?.number?.type ? 'danger' : ''}`}
                id="number"
                type="text"
                placeholder={t('components:Address.placeholder.number')} />
              {useFormProps.errorsForm?.address?.number?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('components:Address.required.number')}
                  </span>
                </div>
                : ''}
            </div>
          </div>
          <div className='col-12 col-md-8'>
            <div className={`br-input medium`}>
              <label htmlFor="complement">{t('components:Address.complement')}:</label>
              <input
                {...useFormProps.registerForm('address.complement')}
                className={`medium`}
                id="complement"
                type="text"
                placeholder={t('components:Address.placeholder.complement')} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
