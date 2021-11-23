import React, { FC, useRef } from 'react';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  id: string;
  defaultActive?: boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

export const NavItem: FC<Props> = ({ children, id, defaultActive }) => {
  const child1 = useRef<HTMLLIElement>();
  return (
    <li ref={child1} elem-name={'NavItem'} className={`tab-item ${defaultActive ? 'is-active' : ''}`}>
      <button type="button" data-panel={id} aria-label={id}>
        <span className="name">
          <span className="row mx-0 align-items-center">{children}</span>
        </span>
      </button>
    </li>
  );
};
