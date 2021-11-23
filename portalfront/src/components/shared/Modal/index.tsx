import React, { FC, useCallback, useRef, useState } from 'react';
import { Card } from '../Card';
import BRScrim from '../Scrim/scrim';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  handleClose: Function;
  handleOpen?: Function;
  customClass?: string;
  statusModal?: boolean;
  colWidth?: string
}

type Props = StateProps & DispatchProps & OwnProps;

export const Modal: FC<Props> = ({ children, handleClose, handleOpen, customClass, statusModal, colWidth = 'col-lg-8' }) => {
  const child1 = useRef<HTMLDivElement>();

  const handler = useCallback(({ target }) => {
    if (child1?.current) {
      if (!child1?.current?.contains(target)) {
        document.removeEventListener('mousedown', handler);
        handleClose();
      }
    }
  }, []);

  React.useEffect(() => {
    if (statusModal && document) {
      document.querySelector('body').classList.add('scrim-on');
    } else {
      document.querySelector('body').classList.remove('scrim-on');
    }
  }, [statusModal]);

  return (
    <div className={`br-scrim foco py-5 ${statusModal ? 'active' : ''}`} onClick={handler} data-trigger="scrim">
      <div className="container-lg">
        <div className={`mx-auto ${colWidth}`}>
          <div className={`br-modal ${customClass}`} ref={child1}>
            <div className="container-fluid p-1 p-sm-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
