import { render } from 'enzyme';
import Link from 'next/link';
import React, { FC, useRef } from 'react';
import BRItem from './item';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  customClassName?: string;
  link?: string;
  target?: string
}

type Props = StateProps & DispatchProps & OwnProps;

export const Item: FC<Props> = ({ children, customClassName, link, target = '_self' }) => {
  const child1 = useRef<HTMLAnchorElement>();
  let elemento: BRItem;

  React.useEffect(() => {
    if (child1.current) {
      elemento = new BRItem('br-item', child1.current);
    }
  }, []);

  function render() {
    if (link) {
      return (
        <Link href={`${link}`} as={`${link}`}>
          <a ref={child1} target={target || '_self'} className={`br-item ${customClassName || ''} w-100`}>
            {children}
          </a>
        </Link>
      );
    }
    return (
      <a ref={child1} className={`br-item ${customClassName || ''} w-100`}>
        {children}
      </a>
    );
  }

  return <>{render()}</>;
};
