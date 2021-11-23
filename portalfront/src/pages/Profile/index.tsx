import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction, useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Spotlight } from '@/components/shared/Spotlight';
import { Datapicker } from '@/components/shared/DataPicker';
import { Select } from '@/components/shared/Select';
import Link from 'next/link';
import Session, { User } from '@/utils/Session';
import moment from 'moment';
import InputMask from 'react-input-mask';

import { idName } from '@/store/ducks/schoolYear/types';
import { Cities, Institutions, States } from '@/store/ducks/states/types';
import * as actionsSchool from '@/store/ducks/schoolYear/actions';
import * as actionsStates from '@/store/ducks/states/actions';
import * as actionsUsers from '@/store/ducks/oauth/actions';
import { ApplicationState } from '@/store';
import dynamic from 'next/dynamic';
import Modal from '@/components/shared/Modal';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const ProfilePage: React.FC<Props> = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const school = useSelector((state: ApplicationState) => state.schoolYears);
  const states = useSelector((state: ApplicationState) => state.states);
  const users = useSelector((state: ApplicationState) => state.oauth);
  const [user, setUser] = useState({} as User);
  const [stModalTermOfUse, setStModalTermOfUse] = useState(false);
  const [stModalPrivacyPolicy, setStModalPrivacyPolicy] = useState(false);

  const router = useRouter();

  const { i18n, t } = useTranslation(['toast_errors', 'components', 'general', 'pages']);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  useEffect(() => {
    if (user) {
      setValue('idSchoolBonds', `${user?.schoolBonds?.id}`)
      setValue('birthDate', user.birthDate ? moment(user.birthDate).format('DD/MM/yyyy') : null)
      setValue('idState', `${user?.city?.state?.id}`)
      setValue('idCity', `${user?.city?.id}`)
      setValue('idEducationalInstitution', `${user?.instituitions?.[0]?.id}`)
      if (user.primeiroAcessoGovbr) {
        setValue('termOfuse', true)
        setValue('termOfuseCheck', true)
        setValue('privacyPolicy', true)
        setValue('privacyPolicyCheck', true)
      }
    }
    // eslint-disable-next-line
  }, [user]);

  const TermsOfUse = dynamic(() => import(`@/components/shared/TermsOfUse/locales/${i18n.language}`), { ssr: false });
  const PrivacyPolicy = dynamic(() => import(`@/components/shared/PrivacyPolicy/locales/${i18n.language}`), { ssr: false });

  useEffect(() => {
    dispatch(actionsSchool.loadSchoolBondsRequest());
    dispatch(actionsStates.loadListRequest());
    dispatch(actionsStates.loadCitiesListRequest());
    dispatch(actionsUsers.loadProfileRequest());
    setUser(Session.getUser())
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (+watch('idCity')) {
      dispatch(actionsStates.loadInstitutionsRequest({ idCity: watch('idCity') }));
    }
    // eslint-disable-next-line
  }, [watch('idCity')]);

  function render_schoolbonds() {
    if (school.schoolbonds.length) {
      return school.schoolbonds.map((item: idName) => (
        <div key={`schoolbonds_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              {...register('idSchoolBonds', { required: true })}
              id={`schoolbonds_${item.id}`}
              value={item.id}
              type="radio"
            />
            <label htmlFor={`schoolbonds_${item.id}`}>{item.name}</label>
          </div>
        </div>
      ));
    }
  }

  function render_states() {
    if (states && states.data && states.data.length > 0) {
      return states.data.map((item: States) => (
        <div key={`states_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              {...register('idState', { required: true })}
              id={`states_${item.id}`}
              value={item.id}
              type="radio"
            />
            <label htmlFor={`states_${item.id}`}>{`${item.initials}`}</label>
          </div>
        </div>
      ));
    }
  }

  function render_cities() {
    if (states && states.cities && states.cities.length > 0 && watch('idState')) {
      return states.cities.filter(item => item.idState === +watch('idState')).map((item: Cities) => (
        <div key={`cities_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              {...register('idCity', { required: true })}
              id={`cities_${item.id}`}
              value={item.id}
              type="radio"
            />
            <label htmlFor={`cities_${item.id}`}>{`${item.name}`}</label>
          </div>
        </div>
      ));
    }
  }

  function render_institutions() {
    if (states && states.institutions && states.institutions.length > 0) {
      return states.institutions.map((item: Institutions) => (
        <div key={`institutions_select_${item.id}`} className="br-item w-100" tabIndex={-1}>
          <div className="br-radio">
            <input
              {...register('idEducationalInstitution')}
              id={`institutions_${item.id}`}
              value={item.id}
              type="radio"
            />
            <label htmlFor={`institutions_${item.id}`}>{`${item.name}`}</label>
          </div>
        </div>
      ));
    }
  }

  function acceptTermOfUse() {
    setStModalTermOfUse(false)
    setValue('termOfuse', true)
    setValue('termOfuseCheck', true)
  }

  function acceptPrivacyPolicy() {
    setStModalPrivacyPolicy(false)
    setValue('privacyPolicy', true)
    setValue('privacyPolicyCheck', true)
  }

  function onSubmit(data: any) {
    const params = {
      idCity: +data.idCity,
      birthDate: moment(data.birthDate).toISOString(),
      idSchoolBonds: +data.idSchoolBonds,
      idState: +data.idState,
      idEducationalInstitution: +data.idEducationalInstitution || null,
      instituitions: [+data.idEducationalInstitution],
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      phones: user.phones,
      idRole: user.idRole
    }
    dispatch(actionsUsers.loadSubmitRequest({ ...params }));
    router.replace('/')
  }

  return (
    <div className="container-lg contrast-ignore-bg">
      <div className="row contrast-ignore-bg mx-0">
        <div className="img__page col-auto py-3 pl-0">
          <div className="img__page-profile contrast-ignore-bg" style={{ width: 60, height: 60 }} />
        </div>
        <h2 className="text-primary-default">{t('pages:Register.title')}</h2>
      </div>

      <Spotlight customClassName="info text-center">
        <strong className="text-​uppercase">{t('pages:Register.govbrSpotlight')}</strong>
      </Spotlight>

      <div className="row text-center text-md-left mb-4">
        <div className="col-auto">
          <span className="br-avatar large" title="Fulano da Silva">
            {props?.propsModel?.userParser?.imageUri?.replace('data:image/*;base64,', '') ? (
              <span className="image text-right">
                <img src={props.propsModel.userParser.imageUri} alt={user?.name?.charAt(0)} />
              </span>
            ) : (
              <span className="image small letter bg-primary-darken-01 text-secondary-01">{user?.name?.charAt(0)}</span>
              // <span className="image" style={{ display: 'block' }}>
              //   <i className="fas fa-user" style={{ marginLeft: -2 }} aria-hidden="true" />
              // </span>
            )}
          </span>
        </div>
        <div className="col align-self-center">
          <p className="h6 mb-1">{t('pages:Register.label.name')}: {user?.name}</p>
          <p className="h6 mb-1">{t('pages:Register.label.cpf')}: {user?.cpf}</p>
          <p className="h6 mb-1">{t('pages:Register.label.email')}: {user?.email}</p>
          {user?.phones?.length ?
            <p className="h6 mb-1">{t('pages:Register.label.phone')}: ({user.phones[0].DDD}) {user.phones[0].number}</p>
            : ''}
        </div>
      </div>

      <div className="h6 text-center text-md-left" dangerouslySetInnerHTML={{ __html: t('pages:Register.completArea') }} />

      <Spotlight customClassName="info text-center">
        <strong className="text-​uppercase">{t('pages:Register.complementsSpotlight')}</strong>
      </Spotlight>

      {users?.user ?
        <div className="row justify-content-md-center mx-0">
          <div className="col-md-10">
            <form onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>
              <div className="row">
                <div className={`br-input mb-4 col-12 col-md-6 ${errors?.idSchoolBonds?.type ? 'danger' : ''}`}>
                  <label htmlFor="schoolBonds">{t('pages:Register.label.schoolBonds')}:</label>
                  <Select
                    CustomclassName={`mw-100 ${errors?.idSchoolBonds?.type ? 'danger' : ''}`}
                    id="schoolBonds"
                    type="text"
                    placeholder={t('pages:Register.label.schoolBonds')}
                  >
                    {render_schoolbonds()}
                  </Select>
                  {errors?.idSchoolBonds?.type ?
                    <div className="mt-1">
                      <span className="feedback danger" role="alert">
                        <i className="fas fa-times-circle" aria-hidden="true"></i>
                        {t('pages:Register.error.required.schoolBonds')}
                      </span>
                    </div>
                    : ''}
                </div>
              </div>
              <div className="row mb-3">
                <div className={`br-input mb-4 col-12 col-md-6 ${errors?.birthDate?.type ? 'danger' : ''}`}>
                  <Datapicker
                    id="birthDate"
                    minDate=""
                    defaultDate={user?.birthDate ? moment(user.birthDate).format('DD/MM/yyyy') : null}
                    title={`${t('pages:Register.label.birthDate')}:`}
                    inputProps={{ ...register('birthDate', { required: true }) }}
                    className={`br-input mb-4 col-12 col-md-6 ${errors?.birthDate?.type ? 'danger' : ''}`}
                  />
                  {errors?.birthDate?.type ?
                    <div className="mt-1">
                      <span className="feedback danger" role="alert">
                        <i className="fas fa-times-circle" aria-hidden="true"></i>
                        {t('pages:Register.error.required.birthDate')}
                      </span>
                    </div>
                    : ''}
                </div>
                {!user?.phones?.length ?
                  <div className="br-input mb-4 col-12 col-md-6">
                    <label htmlFor="cellphone">{t('pages:Register.label.cellphone')}:</label>
                    <InputMask
                      mask={watch('cellphone')?.split('')[5] === '9' ? '(99) 99999-9999' : '(99) 9999-9999'}
                      {...register('cellphone', {
                        pattern: /^[+]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?$/gim
                      })}
                      className={`medium ${errors?.cellphone?.type ? 'danger' : ''}`}
                      id="phone"
                      type="text"
                      placeholder={t('pages:Register.label.cellphone')} />
                  </div>
                  : ''}
              </div>

              <h4 className="mb-1">{t('pages:Register.locale')}</h4>
              <span className="mb-3 br-divider" />

              <div className="mb-3 row">
                <div className={`br-input mb-4 col-12 col-md-6 ${errors?.idState?.type ? 'danger' : ''}`}>
                  <label htmlFor="state">{t('pages:Register.label.state')}*:</label>
                  <Select
                    CustomclassName={`mw-100 ${errors?.idState?.type ? 'danger' : ''}`}
                    id="state"
                    type="text"
                    placeholder={t('pages:Register.label.state')}
                  >
                    {render_states()}
                  </Select>
                  {errors?.idState?.type ?
                    <div className="mt-1">
                      <span className="feedback danger" role="alert">
                        <i className="fas fa-times-circle" aria-hidden="true"></i>
                        {t('pages:Register.error.required.state')}
                      </span>
                    </div>
                    : ''}
                </div>
                <div className={`br-input mb-4 col-12 col-md-6 ${errors?.idCity?.type ? 'danger' : ''}`}>
                  <label htmlFor="city">{t('pages:Register.label.city')}*:</label>
                  <Select
                    CustomclassName={`mw-100 ${errors?.idCity?.type ? 'danger' : ''}`}
                    id="city"
                    type="text"
                    placeholder={t('pages:Register.label.city')}
                  >
                    {render_cities()}
                  </Select>
                  {errors?.idCity?.type ?
                    <div className="mt-1">
                      <span className="feedback danger" role="alert">
                        <i className="fas fa-times-circle" aria-hidden="true"></i>
                        {t('pages:Register.error.required.city')}
                      </span>
                    </div>
                    : ''}
                </div>
                <div className="br-input mb-4 col-12">
                  <label htmlFor="institution">{t('pages:Register.label.institution')}:</label>
                  <Select
                    CustomclassName="has-icon mw-100"
                    id="institution"
                    type="text"
                    placeholder={t('pages:Register.label.institution')}
                  >
                    {render_institutions()}
                  </Select>
                </div>
              </div>

              <div style={{ listStyle: 'none' }}>
                <li
                  className={`mb-1`}
                  {...register('termOfuseCheck', { validate: value => Boolean(value) })}>
                  <div className="br-checkbox">
                    <input
                      id="termOfuse"
                      {...register('termOfuse')}
                      disabled
                      type="checkbox"
                    />
                    <label htmlFor="termOfuse">{t('pages:Register.termsOfUse')}</label>
                    <span
                      onClick={() => setStModalTermOfUse(!stModalTermOfUse)}
                      className="p-1 clickable-item text-base col-auto cursor-pointer text-primary-default"
                    >
                      {t('pages:Register.termsOfUseLink')}
                    </span>.
                  </div>
                </li>
                <li
                  className={`mb-1`}
                  {...register('privacyPolicyCheck', { validate: value => Boolean(value) })}>
                  <div className="br-checkbox">
                    <input
                      id="privacyPolicy"
                      {...register('privacyPolicy')}
                      disabled
                      type="checkbox"
                    />
                    <label htmlFor="privacyPolicy">{t('pages:Register.privacyPolicy')}</label>
                    <span
                      onClick={() => setStModalPrivacyPolicy(!stModalPrivacyPolicy)}
                      className="p-1 clickable-item text-base col-auto cursor-pointer text-primary-default"
                    >
                      {t('pages:Register.privacyPolicyLink')}
                    </span>.
                  </div>
                </li>
              </div>
              {errors?.termOfuseCheck?.type || errors?.privacyPolicyCheck?.type ?
                <div className="mt-1">
                  <span className="feedback danger" role="alert">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {t('pages:Register.error.required.termsOrPolicy')}
                  </span>
                </div>
                : ''}

              <div className="row mx-0 mb-5 justify-content-center justify-content-md-end">
                {user.primeiroAcessoGovbr ?
                  <Link href="/">
                    <a>
                      <button style={{ minWidth: 182 }} className="br-button secondary mr-1 mb-1">
                        {t('pages:Register.goBack')}
                      </button>
                    </a>
                  </Link>
                  : ''}

                <button style={{ minWidth: 182 }} className="br-button primary mr-1 mb-1" type="submit">
                  {t('pages:Register.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
        : <div className="mt-5 loading medium mb-5" />
      }

      <Modal handleClose={() => setStModalTermOfUse(!stModalTermOfUse)} statusModal={stModalTermOfUse} customClass="p-0">
        <div className="br-modal-header">
          <div className="br-modal-title text-bold" title={t('pages:Register.termsOfUseLink')}>
            {t('pages:Register.termsOfUseLink')}
          </div>
        </div>
        <div className="br-modal-body">
          <TermsOfUse />
        </div>
        <div className="br-modal-footer justify-content-end">
          <button className="br-button secondary small m-2" onClick={() => setStModalTermOfUse(!stModalTermOfUse)} type="button">
            {t('pages:Register.cancel')}
          </button>
          <button className="br-button primary small m-2" onClick={acceptTermOfUse} type="button">
            {t('pages:Register.accept')}
          </button>
        </div>
      </Modal>

      <Modal handleClose={() => setStModalPrivacyPolicy(!stModalPrivacyPolicy)} statusModal={stModalPrivacyPolicy} customClass="p-0">
        <div className="br-modal-header">
          <div className="br-modal-title text-bold" title={t('pages:Register.privacyPolicyLink')}>
            {t('pages:Register.privacyPolicyLink')}
          </div>
        </div>
        <div className="br-modal-body">
          <PrivacyPolicy />
        </div>
        <div className="br-modal-footer justify-content-end">
          <button className="br-button secondary small m-2" onClick={() => setStModalPrivacyPolicy(!stModalPrivacyPolicy)} type="button">
            {t('pages:Register.cancel')}
          </button>
          <button className="br-button primary small m-2" onClick={acceptPrivacyPolicy} type="button">
            {t('pages:Register.accept')}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function Profile() {
  return (
    <Template>
      <ProfilePage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
