import React, { FC, useRef } from 'react';

interface StateProps {}
interface DispatchProps {}
interface OwnProps extends React.AllHTMLAttributes<HTMLTableSectionElement> {
  nameKey: 't-head';
};

type Props = StateProps & DispatchProps & OwnProps;

export const THead: FC<Props> = ({ children, nameKey = 't-head', ...props }) => {
  const child1 = useRef<HTMLTableSectionElement>();

  return (
    <thead {...props} ref={child1} className={`THead ${props.className}`}>
      {children}
    </thead>
  );
};
