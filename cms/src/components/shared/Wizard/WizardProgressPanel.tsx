import React, { FC, useRef } from 'react';

interface StateProps { }
interface DispatchProps { }
interface OwnProps extends React.AllHTMLAttributes<HTMLTableSectionElement> {
  nameKey: 'progress-panel';
  defaultActive?: boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

export const WizardPanel: FC<Props> = ({ children, defaultActive, ...props }) => {
  const child1 = useRef<HTMLDivElement>();

  return (
    <div ref={child1} className="wizard-panel" {...defaultActive ? { active: "active" } : ''}>
      {children}
    </div>
  );
};
