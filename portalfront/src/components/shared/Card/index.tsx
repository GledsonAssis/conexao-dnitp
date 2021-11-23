import React from 'react';
import Link from 'next/link';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  link?: string;
  customClass?: string;
  styleCustom?: React.CSSProperties
}

type Props = StateProps & DispatchProps & OwnProps;

export const Card: React.FC<Props> = ({ children, link = '', customClass = '', styleCustom }) => (
  <div className={`br-card ${customClass}`} style={styleCustom}>
    {link ? (
      <Link href={link} as={`${link}`}>
        <a>{children}</a>
      </Link>
    ) : (
      children
    )}
  </div>
);
