import React from 'react';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  customClassName?: string;
  icon?: any;
}

type Props = StateProps & DispatchProps & OwnProps;

export const Spotlight: React.FC<Props> = ({ children, customClassName = '', icon = null }) => (
  <div className={`spotlight-section ${customClassName}`} role="alert">
    {icon ? <div className="icon">{icon}</div> : ''}
    <div className="content py-2 overflow-auto">{children}</div>
  </div>
);
