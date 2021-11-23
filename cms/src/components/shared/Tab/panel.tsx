import React, { FC, useRef } from 'react';
import BRTab from './tab';

interface StateProps {}
interface DispatchProps {}
interface OwnProps {
  id: string;
  defaultActive?: boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

export const PanelItem: FC<Props> = ({ children, id, defaultActive }) => {
  const child1 = useRef<HTMLDivElement>();

  return (
    <div ref={child1} elem-name={'PanelItem'} className={`tab-panel ${defaultActive ? 'is-active' : ''}`} id={id}>
      {children}
    </div>
  );
};
