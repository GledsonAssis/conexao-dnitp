import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { useForm } from 'react-hook-form';
import LoginBanner from '@/assets/images/login.svg';
import GovbrLogo from '@/assets/images/govbr-logo-large.svg';
import Link from 'next/link';

import * as OAuthActions from '@/store/ducks/oauth/actions';
import { EnvsConfig } from '@/infra/config/envs.config';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const LoginPage: React.FC<Props> = ({ children, ...props }) => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();

  function onSubmit(data: any) {
    dispatch(OAuthActions.loadLoginRequest(data));
  }

  return (
    <div className="container-lg">
      <div className="row justify-content-sm-center mx-0 my-5">
        <div className="col-12 col-sm-4 text-center">
          <img src={`${EnvsConfig.getBaseUrl()}${LoginBanner}`} alt="LoginBanner" />
        </div>
        <div className="col-12 col-sm-4 align-self-center offset-sm-1">
          <div className="text-right">
            <Link href="https://sso.acesso.gov.br/login">
              <a>
                <button className="br-button secondary mt-5 w-100" type="button">
                  {props.t('pages:Login.enterGovBr')} <img className="ml-1" src={GovbrLogo} alt="LogoGovbr" />
                </button>
              </a>
            </Link>
          </div>
          <div className="presentation-page row py-2 mx-0">
            <div className="details-titles">
              <span className="px-2 h6">{props.t('pages:Login.or')}</span>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="br-input mb-3">
              <label htmlFor="email">{props.t('pages:Login.label.email')}:</label>
              <input
                id="email"
                {...register('username')}
                type="email"
                placeholder={props.t('pages:Login.placeholder.email')}
              />
            </div>
            <div className="br-input my-3">
              <label htmlFor="password">{props.t('pages:Login.label.password')}:</label>
              <input
                id="password"
                {...register('password')}
                type="password"
                placeholder={props.t('pages:Login.placeholder.password')}
              />
            </div>
            <div className="text-right">
              <button className="br-button primary mt-3" type="submit">
                {props.t('pages:Login.label.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
  },
});

export default function Login() {
  return (
    <Template>
      <LoginPage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
