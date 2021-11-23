import React, { FC, useRef } from 'react';
import { Dropdown } from '../Dropdown';

interface StateProps { }
interface DispatchProps { }
interface OwnProps extends React.AllHTMLAttributes<HTMLTableSectionElement> {
  nameKey: 'top-bar' | 'selected-bar';
  icon?: HTMLElement;
}

type Props = StateProps & DispatchProps & OwnProps;

export const ActionTrigger: FC<Props> = ({ children, icon, ...props }) => {
  const child1 = useRef<HTMLDivElement>();

  return (
    <div className={`actions-trigger ${props.className}`} ref={child1}>
      {children}
    </div>
  );
};
