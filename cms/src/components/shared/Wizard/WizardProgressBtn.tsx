import React, { FC, useRef } from 'react';

interface StateProps { }
interface DispatchProps { }
interface OwnProps extends React.AllHTMLAttributes<HTMLTableSectionElement> {
  nameKey: 'progress-btn';
  title: string;
}

type Props = StateProps & DispatchProps & OwnProps;

export const WizardBtnTrigger: FC<Props> = ({ children, title, ...props }) => {
  const child1 = useRef<HTMLButtonElement>();

  return (
    <button ref={child1} className="wizard-progress-btn" type="button" title={title}>
      <span className="info">{title}</span>
    </button>
  );
};
