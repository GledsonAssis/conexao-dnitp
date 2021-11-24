import React, { useRef, useEffect, useState } from 'react';
import Logo from '@/assets/images/govbr-logo-large.svg';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import * as actionsMessages from '@/store/ducks/messages/actions';
import * as OAuthActions from '@/store/ducks/oauth/actions';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import BRHeader from './header';
import Menu from '../Menu';
import { Dropdown } from '../Dropdown';
import { EnvsConfig } from '@/infra/config/envs.config'
import randomString from '@/utils/generic/generateAlphaNumeric';
import ToastMessage, { typesToast } from '../Toast';
import { ApplicationState } from '@/store';
import cookieCutter from 'cookie-cutter';
import SessionStorage from '@/utils/Session';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  translation?: Function;
  Session?: any;
  handleLogin: Function;
}

type Props = StateProps & DispatchProps & OwnProps;

export const Header: React.FC<Props> = ({ translation, Session, handleLogin }) => {
  const child1 = useRef<HTMLElement>();
  const dispatch = useDispatch();
  const oauth = useSelector((state: ApplicationState) => state.oauth);
  const messages = useSelector((state: ApplicationState) => state.messages);
  const [stContrast, setStContrast] = useState(false);
  const [stCron, setStCron] = useState(false);
  const [govbrNonce, setGovbrNonce] = useState('');
  const [govbrState, setGovbrState] = useState('');
  const router = useRouter();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  useEffect(() => {
    dispatch(actionsMessages.loadInboxFetchRequest({}));
    if (child1.current && child1.current.querySelector('.br-header:not(.dsgov)')) {
      new BRHeader('br-header', child1.current.querySelector('.br-header:not(.dsgov)'));
    }
  }, []);

  useEffect(() => {
    if (router.query.code) {
      dispatch(OAuthActions.loadLoginRequest({ code: router.query.code }));
      router.replace('/')
      handleLogin();
    }
  }, [router.query.code]);

  useEffect(() => {
    if (!oauth.loading) {
      handleLogin();
    }
  }, [oauth.loading]);

  useEffect(() => {
    if (oauth.errors) {
      ToastMessage({ message: translation(oauth.errors.message), type: typesToast.TOAST_ERROR })
    }
  }, [oauth.errors])

  function handleLogout() {
    dispatch(OAuthActions.loadLogoutRequest());
    router.replace(`${EnvsConfig.getGovBrAddress()}/logout`, {
      query: {
        post_logout_redirect_uri: EnvsConfig.getGovBrRedirectUri()
      }
    })
  }

  // Check email every 30 seconds
  if (!messages.cronCheck && Session?.isLogged && !stCron) {
    setStCron(true)
    setInterval(function () {
      dispatch(actionsMessages.loadInboxFetchRequest({ cron: true }));
    }, 30 * 1000)
  }

  useEffect(() => {
    var body = document.body;
    if (!body) return;
    if (stContrast)
      body.classList.add('contrast');
    else
      body.classList.remove('contrast');
  }, [stContrast]);

  function authorization(userRole: any, item: any, privatePaths: any) {
    const pathPermissions = privatePaths[item.path];
    const isPathPrivate = pathPermissions !== undefined;
    const rolePermission =
      pathPermissions && pathPermissions.find((permission: { role: any }) => permission.role === userRole.id);
    return rolePermission !== undefined || !isPathPrivate;
  }

  useEffect(() => {
    setGovbrNonce(randomString(6))
    setGovbrState(randomString(6))
  }, []);

  function renderLoginButton() {
    if (Session && Session.isLogged) {
      return (
        <button onClick={handleLogout} className="br-button secondary br-button-login" type="button">
          <span className="br-avatar mr-1" title={Session.userParser.name}>
            {Session.userParser.imageUri?.replace('data:image/*;base64,', '') ? (
              <span className="image">
                <img src={Session.userParser.imageUri} alt="Avatar" />
              </span>
            ) : (
              <span className="image small letter bg-primary-darken-01 text-secondary-01">{Session.userParser?.name?.charAt(0)}</span>
            )}
          </span>
          {translation('components:Header.logout')}
        </button>
      );
    }

    return (
      <Link href={`${EnvsConfig.getGovBrAddress()}/authorize\?response_type=${EnvsConfig.getGovBrResponseType()}&client_id=${EnvsConfig.getGovBrClientId()}&scope=${EnvsConfig.getGovBrScope()}&redirect_uri=${EnvsConfig.getGovBrRedirectUri()}&nonce=${govbrNonce}&state=${govbrState}`}>
        <a>
          <button className="br-button secondary" type="button">
            <span className="br-avatar mr-1">
              <i className="fas fa-user" aria-hidden="true" />
            </span>
            {translation('components:Header.login')}
          </button>
        </a>
      </Link>
    );
  }

  async function openCms(data: any) {
    const user = SessionStorage.getUser();
    const session = SessionStorage.getSession();
    cookieCutter.set('session_cnx', JSON.stringify({ access_token: session.access_token, expires_in: session.expires_in }))
    window.open(data.path, '_blank')
  }

  function renderIconsButton() {
    if (Session && Session.headerMenuIcons) {
      return Session.headerMenuIcons.map((item: any) => {
        const isAuthorized = authorization(Session.userRole, item, Session.privatePaths);
        const icon = item.imageSrc ? (
          <item.imageSrc fill={stContrast ? 'yellow' : 'var(--interactive)'} width={'100%'} height={'100%'} />
        ) : (
          <i className={item.iconClass} aria-hidden="true" />
        );
        if (item.name === 'CMS') {
          return (
            isAuthorized && (
              <div key={item.imageAlt} className="align-items-center br-item">
                <button onClick={() => openCms(item)} className="br-button circle small position-relative" type="button">
                  {icon}
                  <span className="text">{item.name}</span>
                </button>
              </div>
            )
          );
        }
        return (
          isAuthorized && (
            <div key={item.imageAlt} className="align-items-center br-item">
              <Link href={item.path}>
                <a target={item.target}>
                  <button className="br-button circle small position-relative" type="button">
                    {icon}
                    <span className="text">{item.name}</span>
                    {messages.dataInbox.length && item.hasTag ?
                      <div className="position-absolute end-0"><span className="br-tag status danger small"></span></div>
                      : ''}
                  </button>
                </a>
              </Link>
            </div>
          )
        );
      });
    }
  }

  function onSubmit(data: any) {
    const query: any = {};
    if (data.searchbox) query.search = data.searchbox;
    router.push({
      pathname: '/busca-geral',
      query,
    });
  }

  return (
    <header className="br-header custom-header" ref={child1}>
      <div className="container-lg">
        <div className="header-top" style={{ minHeight: 48 }}>
          <div className="header-logo">
            <img src={Logo} alt="logo" />
            <div className="header-sign">
              Departamento Nacional de <br />
              Infraestrutura de Transportes
            </div>
          </div>
          <div className="header-actions">
            <div className="header-links">
              <Dropdown icon="fas fa-ellipsis-v" btnClassName="br-button circle small">
                <div className="br-list">
                  <div className="header">
                    <div className="title">Acesso Rápido</div>
                  </div>
                  <a className="br-item" href="https://www.gov.br/pt-br/orgaos-do-governo">
                    Orgão do Governo
                  </a>
                  <a className="br-item" href="http://www.acessoainformacao.gov.br/">
                    Acesso à Informação
                  </a>
                  <a className="br-item" href="http://www4.planalto.gov.br/legislacao">
                    Legislação
                  </a>
                  <a className="br-item" href="https://www.gov.br/governodigital/pt-br/acessibilidade-digital">
                    Acessibilidade
                  </a>
                </div>
              </Dropdown>
            </div>
            <span className="br-divider vertical mx-half mx-sm-1" />
            <div className="header-functions">
              <Dropdown icon="fas fa-th" btnClassName="br-button circle small">
                <div className="br-list">
                  <div className="header">
                    <div className="title">Funcionalidades</div>
                  </div>
                  {renderIconsButton()}
                  <div className="align-items-center br-item">
                    <button onClick={() => setStContrast(!stContrast)} className="br-button circle small" type="button">
                      <i className="fas fa-adjust" aria-hidden="true" />
                      <span className="text">Contraste</span>
                    </button>
                  </div>
                </div>
              </Dropdown>
            </div>
            <span className="br-divider vertical mx-half mx-sm-1" />
            <div className="header-login">
              <div className="header-sign-in">{renderLoginButton()}</div>
            </div>
          </div>
        </div>
        <div className="header-bottom mt-2" style={{ position: 'relative' }}>
          <Menu {...Session} socialText={translation('components:Menu.sociais')} />
          <div className="header-search">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="br-input has-icon">
                <label htmlFor="searchbox">Texto da pesquisa</label>
                <input
                  className="has-icon"
                  id="searchbox"
                  {...register('searchbox')}
                  type="text"
                  placeholder="O que você procura?"
                />
                <button className="icon contrast-ignore-bg" type="submit" aria-label="Pesquisar">
                  <span className="icon">
                    <i className="fas fa-search" aria-hidden="true" />
                  </span>
                </button>
              </div>
            </form>
            <button
              className="br-button circle search-close"
              type="button"
              aria-label="Fechar Busca"
              data-dismiss="search"
            >
              <i className="fas fa-times" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
