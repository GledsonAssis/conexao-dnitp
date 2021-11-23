import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import BRMenu from './menu';
import { List } from '../List';

import navigationFooterItems from './navigationItems';
import { TFunction } from 'next-i18next';

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
interface OwnProps {
  stateMenuOpen: Boolean;
  translation?: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const Menu: React.FC<Props> = ({ socialText = 'Sociais', stateMenuOpen, ...props }) => {
  const child1 = useRef<HTMLDivElement>();
  let elemento: BRMenu;

  React.useEffect(() => {
    if (child1.current && !child1.current.hasAttribute('br-menu-att')) {
      elemento = new BRMenu('br-menu', child1.current);
    }
  });

  function renderAccordionList(itens: any[]) {
    return renderItems(itens);
  }

  function renderItem(item: any) {
    return <li>
      <Link href={item.link}>
        <a className="menu-item">
          <span className="content">{props.translation(item.label)}</span>
        </a>
      </Link>
    </li>;
  }

  function renderItems(itens: any[]): any[] {
    return itens.map((item) => {
      if (!('items' in item)) {
        return (
          <div className="menu-folder" key={`${item.label}_${item.key}`}>
            <ul>
              {renderItem(item)}
            </ul>
          </div>
        );
      }
      return (
        <div className="menu-folder" key={`${item.label}_${item.key}`}>
          <a className="menu-item" href="#">
            <span className="content">{props.translation(item.title)}</span>
          </a>
          <ul>
            {renderAccordionList(item.items)}
          </ul>
        </div>
      );
    });
  }

  function GovBRMenu() {
    return (
      <div className="br-menu push active" ref={child1}>
        <div className="menu-container position-static">
          <div className="menu-panel h-auto position-static">
            <nav className="menu-body">
              {renderItems(navigationFooterItems)}
            </nav>
          </div>
        </div>
      </div>
    )
  }


  return (
    <>
      <div className={`br-menu push shadow-lg-right ${stateMenuOpen ? 'br-menu push active col-sm-4 col-lg-3 px-0' : ''}`} id="main-navigation">
        <div className="menu-container">
          <div className="menu-panel">
            <nav className="menu-body">
              {GovBRMenu()}
            </nav>
          </div>
          <div className="menu-scrim" data-dismiss="menu" tabIndex={0}></div>
        </div>
      </div>
    </>
  );
};

export default Menu;
