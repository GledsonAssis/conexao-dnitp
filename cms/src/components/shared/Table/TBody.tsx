import React, { FC, useRef } from 'react';

interface StateProps {}
interface DispatchProps {}
interface OwnProps extends React.AllHTMLAttributes<HTMLTableSectionElement> {
  nameKey: 't-body';
};

type Props = StateProps & DispatchProps & OwnProps;

export const TBody: FC<Props> = ({ children, nameKey = 't-body',...props }) => {
  const child1 = useRef<HTMLTableSectionElement>();

  return (
    <tbody {...props} ref={child1} className={`TBody ${props.className}`}>
      {children}
    </tbody>
  );
};
