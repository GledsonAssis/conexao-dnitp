import React from 'react';
import Link from 'next/link';

interface StateProps {}
interface DispatchProps {}
interface OwnProps {
  link?: string;
  customClass?: string;
}

type Props = StateProps & DispatchProps & OwnProps;

export const Card: React.FC<Props> = ({ children, link = '', customClass = '' }) => (
  <div className={`br-card ${customClass}`}>
    {link ? (
      <Link href={link}>
        <a>{children}</a>
      </Link>
    ) : (
      children
    )}
  </div>
);
