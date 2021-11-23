import React, { useEffect, useRef, useState } from 'react';
import LogoGovBrNegative from '@/assets/images/logo-govbr-negative.svg';
import LogoPatriaAmada from '@/assets/images/logo-patria-amada.svg';
import LogoAcessoInformacao from '@/assets/images/logo-acesso-infor.svg';

import mapNavigationFooterItems from '@/utils/parsers/mapFooterNavigationItems';
import { List } from '../List';
import navigationFooterItems from './navigationItems';
import BRFooter from './footer';

interface StateProps {
  copyright: string;
  terms: string;
  version: string;
  userRole: any;
  privatePaths: any;
  isLogged: boolean;
  sociais: {
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;
  };
}
interface DispatchProps { }
interface OwnProps {
  translation: any;
}

type Props = StateProps & DispatchProps & OwnProps;

export const Footer: React.FC<Props> = ({ ...props }) => {
  const [propsModel, setPropsModel] = useState<any>();
  const child1 = useRef<HTMLElement>();

  useEffect(() => {
    setPropsModel({
      mapNavigationFooter: navigationFooterItems.map(mapNavigationFooterItems(props.translation)),
    });
  }, []);

  useEffect(() => {
    if (child1.current && !child1.current.hasAttribute('br-footer-att')) {
      new BRFooter('br-footer', child1.current);
    }
  }, []);

  function mapListItem(item: any) {
    const pathPermissions = props.privatePaths[item.link];
    const isPathPrivate = pathPermissions !== undefined;
    const rolePermission =
      pathPermissions && pathPermissions.find((permission: { role: any }) => permission.role === props.userRole.id);
    const hasPermission = rolePermission !== undefined || !isPathPrivate;

    return hasPermission && item;
  }

  function mapList(item: any) {
    const mappedItemList = item.items.map(mapListItem);
    const filteredItemList = mappedItemList.filter(Boolean);
    const retorno = {
      title: item.title,
      items: filteredItemList,
    };
    return filteredItemList.length > 0 && retorno;
  }

  function render() {
    if (propsModel && propsModel.mapNavigationFooter && propsModel.mapNavigationFooter.length > 0) {
      const pathPermissions = propsModel.mapNavigationFooter.map(mapList).filter(Boolean);

      return <List itensList={pathPermissions} customClassName="horizontal text-nowrap" />;
    }
  }

  return (
    <footer className="br-footer" ref={child1}>
      <div className="container-lg">
        <div className="logo">
          <img src={LogoGovBrNegative} alt="Imagem" />
        </div>
        {render()}
      </div>
      <div className="container-lg">
        <div className="d-none d-sm-block">
          <div className="row align-items-end justify-content-between py-5">
            {props && props.sociais ? (
              <div className="col social-network social-networks-icons">
                <p className="text-up-01 text-extra-bold text-uppercase">
                  {props.translation('components:Menu.sociais') || 'Redes Sociais'}
                </p>
                <a className="mr-3" target="_blank" href={props.sociais.twitter} rel="noreferrer">
                  <i className="fab fa-twitter" />
                </a>
                <a className="mr-3" target="_blank" href={props.sociais.youtube} rel="noreferrer">
                  <i className="fab fa-youtube" />
                </a>
                <a className="mr-3" target="_blank" href={props.sociais.facebook} rel="noreferrer">
                  <i className="fab fa-facebook" />
                </a>
                <a className="mr-3" target="_blank" href={props.sociais.instagram} rel="noreferrer">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            ) : (
              ''
            )}
            <div className="col assigns text-right">
              <img
                className="ml-4 contrast-ignore-bg"
                src={LogoAcessoInformacao}
                style={{ filter: 'invert(1)' }}
                alt="Acesso Informação"
              />
              <img
                className="ml-4 contrast-ignore-bg"
                src={LogoPatriaAmada}
                style={{ filter: 'invert(1)' }}
                alt="Patria Amada" />
            </div>
          </div>
        </div>
      </div>
      <div className="text-copyright">
        <div className="info container-lg">
          <div className="text-medium pb-1 pt-1 text-center">
            {props.translation('components:Footer.copyright') || 'Labtrans - Todos os direitos reservados'}
          </div>
        </div>
      </div>
    </footer>
  );
};
