import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import BRMenu from './menu';

interface StateProps {
  socialText?: string;
  userRole: any;
  currentPath: string;
  isLogged: boolean;
  routes: {
    label: string;
    path: string;
    private: boolean;
    roles: number[];
  }[];
  sociais: {
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;
  };
}
interface DispatchProps { }
interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export const Menu: React.FC<Props> = ({ socialText = 'Sociais', ...props }) => {
  const child1 = useRef<HTMLDivElement>();
  const child2 = useRef<HTMLDivElement>();
  const [active, setActive] = useState('');
  let elemento: BRMenu;

  const authorization = (userRole: any, item: any, isLogged: boolean) => {
    if (!isLogged) {
      return !item.private;
    }
    return item.roles.includes(userRole.id);
  };

  React.useEffect(() => {
    if (child1.current) {
      elemento = new BRMenu('br-menu', child1.current.querySelector('.br-menu:not(.dsgov)'));
    }
  }, []);

  function renderListMenu() {
    if (props && props.routes) {
      return props.routes.map((item) => {
        const authorized = authorization(props.userRole, item, props.isLogged);

        if (!authorized) {
          return null;
        }

        return (
          <div className="menu-folder" key={`${item.label}_`}>
            <Link href={item.path} as={`${item.path}`}>
              <a className="menu-item">{item.label}</a>
            </Link>
          </div>
        );
      });
    }
  }

  function clickDrop() {
    if (active === 'active' && elemento) {
      document.removeEventListener('mousedown', handler);
      setActive('');
      elemento._closeMenu();
    } else {
      document.addEventListener('mousedown', handler);
      setActive('active');
    }
  }

  const handler = useCallback(({ target }) => {
    // Update coordinates
    if (child2 && child2.current && elemento) {
      if (!child2.current.contains(target)) {
        document.removeEventListener('mousedown', handler);
        elemento._closeMenu();
        setActive('');
      }
    }
  }, []);

  return (
    <>
      <div className="header-menu">
        <button
          className="br-button circle"
          type="button"
          aria-label="Menu principal modo 2"
          data-toggle="menu"
          onClick={clickDrop}
          data-target="#navigation"
        >
          <i className="fas fa-bars" aria-hidden="true" />
        </button>
        <div className="header-info">
          <div className="header-title">Conexão DNIT</div>
        </div>
      </div>
      <div className="w-100" ref={child1} style={{ position: 'absolute', left: 0, top: 56 }}>
        <div className="container p-0">
          <div className="col-sm-4 col-lg-3">
            <div className="br-menu push" id="navigation" ref={child2}>
              <div className="menu-trigger">
                <button
                  className="br-button circle small"
                  type="button"
                  data-toggle="menu"
                  aria-label="Abrir Menu Principal"
                >
                  <i className="fas fa-bars" aria-hidden="true" />
                </button>
              </div>
              <div className="menu-container">
                <div className="menu-panel">
                  <div className="menu-header">
                    <div className="menu-close">
                      <button
                        className="br-button circle"
                        type="button"
                        arial-label="Fechar o menu"
                        data-dismiss="menu"
                      >
                        <i className="fas fa-times" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <nav className="menu-body">{renderListMenu()}</nav>
                  {props && props.sociais ? (
                    <div className="menu-footer">
                      <div className="menu-social">
                        <div className="text-semi-bold mb-1">{socialText}</div>
                        <div className="sharegroup">
                          <div className="share">
                            <a
                              className="br-button circle"
                              target="_blank"
                              href={props.sociais.twitter}
                              aria-label="Compartilhar por Twitter"
                              rel="noreferrer"
                            >
                              <i className="fab fa-twitter" aria-hidden="true" />
                            </a>
                          </div>
                          <div className="share">
                            <a
                              className="br-button circle"
                              target="_blank"
                              href={props.sociais.youtube}
                              aria-label="Compartilhar por Youtube"
                              rel="noreferrer"
                            >
                              <i className="fab fa-youtube" aria-hidden="true" />
                            </a>
                          </div>
                          <div className="share">
                            <a
                              className="br-button circle"
                              target="_blank"
                              href={props.sociais.facebook}
                              aria-label="Compartilhar por Facebook"
                              rel="noreferrer"
                            >
                              <i className="fab fa-facebook" aria-hidden="true" />
                            </a>
                          </div>
                          <div className="share">
                            <a
                              className="br-button circle"
                              target="_blank"
                              href={props.sociais.instagram}
                              aria-label="Compartilhar por Instagram"
                              rel="noreferrer"
                            >
                              <i className="fab fa-instagram" aria-hidden="true" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="menu-scrim" data-dismiss="menu" tabIndex={0} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
