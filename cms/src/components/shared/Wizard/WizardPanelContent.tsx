import React, { FC, useRef } from 'react';

interface StateProps { }
interface DispatchProps { }
interface OwnProps extends React.AllHTMLAttributes<HTMLTableSectionElement> {
  nameKey: 'progress-panel-content';
}

type Props = StateProps & DispatchProps & OwnProps;

export const WizardPanelContent: FC<Props> = ({ children, ...props }) => {
  const child1 = useRef<HTMLDivElement>();

  return (
    <div ref={child1} className="wizard-panel-content">
      {children}
    </div>
  );
};
