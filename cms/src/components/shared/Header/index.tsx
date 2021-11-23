import React, { useRef, useEffect, useState } from 'react';
import Logo from '@/assets/images/govbr-logo-large.svg';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import * as OAuthActions from '@/store/ducks/oauth/actions';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import BRHeader from './header';
import { Dropdown } from '../Dropdown';
import { TFunction } from 'next-i18next';
import { ApplicationState } from '@/store';
import { EnvsConfig } from '@/infra/config/envs.config';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  translation?: TFunction;
  Session?: any;
  openMenu?: Function
  handleLogin: Function;
  isOpen?: Boolean;
  stLogin?: Boolean;
  stUser?: Boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

export const Header: React.FC<Props> = ({ translation, Session, handleLogin, openMenu, isOpen, stLogin, stUser }) => {
  const child1 = useRef<HTMLElement>();
  const dispatch = useDispatch();
  const oauth = useSelector((state: ApplicationState) => state.oauth);
  const [stContrast, setStContrast] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (child1.current && child1.current.querySelector('.br-header:not(.dsgov)')) {
      new BRHeader('br-header', child1.current.querySelector('.br-header:not(.dsgov)'));
    }
    dispatch(OAuthActions.loadLoginRequest({}));
    handleLogin();
  }, []);

  // useEffect(() => {
  //   if (oauth.errors) {
  //     ToastMessage({ message: translation(oauth.errors.message), type: typesToast.TOAST_ERROR })
  //   }
  // }, [oauth.errors])

  useEffect(() => {
    var body = document.body;

    if (!body) return;

    if (stContrast)
      body.classList.add('contrast');
    else
      body.classList.remove('contrast');
  }, [stContrast]);

  function handleLogout() {
    dispatch(OAuthActions.loadLogoutRequest());
    router.replace(`${EnvsConfig.getGovBrAddress()}/logout`, {
      query: {
        post_logout_redirect_uri: EnvsConfig.getGovBrRedirectUri()
      }
    })
  }

  function renderLoginButton() {
    if (Session && oauth?.data) {
      return (
        <button onClick={handleLogout} className="br-button secondary br-button-login" type="button">
          <span className="br-avatar mr-1" title={Session.userParser.name}>
            {Session.userParser.imageUri?.replace('data:image/*;base64,', '') ? (
              <span className="image">
                <img src={Session.userParser.imageUri} alt="Avatar" />
              </span>
            ) : (
              <span className="image small letter bg-primary-darken-01 text-secondary-01">{oauth?.data?.name?.charAt(0)}</span>
            )}
          </span>
          {translation('components:Header.logout')}
        </button>
      );
    }
    return (
      <Link href="/Login">
        <a>
          <button className="br-button secondary" type="button">
            <span className="br-avatar mr-1">
              {/* <span className="image"> */}
              <i className="fas fa-user" aria-hidden="true" />
              {/* </span> */}
            </span>
            {translation('components:Header.login')}
          </button>
        </a>
      </Link>
    );
  }

  return (
    <header className="br-header custom-header" ref={child1}>
      <div className="container-fluid">
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
          {/* <Menu {...Session} socialText={translation('components:Menu.sociais')} /> */}
          <div className="header-menu">
            {isOpen ?
              <button
                className="br-button circle"
                type="button"
                aria-label="Menu principal modo 2"
                data-toggle="menu"
                onClick={() => openMenu()}
                data-target="#navigation"
              >
                <i className="fas fa-times" aria-hidden="true" />
              </button>
              :
              <button
                className="br-button circle"
                type="button"
                aria-label="Menu principal modo 2"
                data-toggle="menu"
                onClick={() => openMenu()}
                data-target="#navigation"
              >
                <i className="fas fa-bars" aria-hidden="true" />
              </button>
            }
            <div className="header-info">
              <div className="header-title">Conexão DNIT</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
