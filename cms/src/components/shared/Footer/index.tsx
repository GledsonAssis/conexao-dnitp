import React, { useEffect, useRef, useState } from 'react';
import BRFooter from './footer';

interface StateProps {
  copyright: string;
  terms: string;
  version: string;
  userRole: any;
  privatePaths: any;
  isLogged: boolean;
  sociais: {
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;
  };
}
interface DispatchProps { }
interface OwnProps {
  translation: any;
}

type Props = StateProps & DispatchProps & OwnProps;

export const Footer: React.FC<Props> = ({ ...props }) => {
  const child1 = useRef<HTMLElement>();

  useEffect(() => {
    if (child1.current && !child1.current.hasAttribute('br-footer-att')) {
      new BRFooter('br-footer', child1.current);
    }
  }, []);

  return (
    <footer className="br-footer" ref={child1}>
      <div className="text-copyright">
        <div className="info container-lg">
          <div className="text-medium pb-1 pt-1 text-center">
            {props.translation('components:Footer.copyright') || 'Labtrans - Todos os direitos reservados'}
          </div>
        </div>
      </div>
    </footer>
  );
};
