import React, { Children, FC, useRef } from 'react';
import BRTab from './tab';
import { NavItem } from './naviItem';
import { PanelItem } from './panel';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  id: string;
}

type Props = StateProps & DispatchProps & OwnProps;

export { NavItem, PanelItem };

export const Tab: FC<Props> = ({ children, id }) => {
  const child1 = useRef<HTMLDivElement>();

  React.useEffect(() => {
    if (children && children[1] && child1.current && !child1.current.hasAttribute('br-tab-att')) {
      new BRTab('br-tab', child1.current);
    }
  });

  function renderNav(item: any) {
    if (item.type.name === NavItem.name) {
      return item;
    }
  }

  function renderPanel(item: any) {
    if (item.type.name === PanelItem.name) {
      return item;
    }
  }

  return (
    <div ref={child1} className="br-tab large w-100">
      <nav className="tab-nav" aria-label="Abas de Navegação Simples">
        <ul>{Children.map(children, (item: any) => renderNav(item))}</ul>
      </nav>
      <div className="tab-content">{Children.map(children, (item: any) => renderPanel(item))}</div>
    </div>
  );
};
