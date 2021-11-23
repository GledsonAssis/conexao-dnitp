import React, { FC, useCallback, useRef, useState } from 'react';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  title?: string;
  icon?: string;
  size?: string;
  MenuWidth?: number;
  MenuHeight?: number;
  Notification?: boolean;
  className?: string;
  btnClassName?: string;
}

type Props = StateProps & DispatchProps & OwnProps;

export const Dropdown: FC<Props> = ({ children, Notification, className = '', btnClassName, icon }) => {
  const [show, setShow] = useState('');
  const [active, setActive] = useState('');
  const child1 = useRef<HTMLDivElement>();

  function clickDrop() {
    if (show === 'show') {
      document.removeEventListener('mousedown', handler);
      setShow('');
      setActive('');
    } else {
      document.addEventListener('mousedown', handler);
      setShow('show');
      setActive('active');
    }
  }

  const handler = useCallback(({ target }) => {
    if (!child1.current.contains(target)) {
      document.removeEventListener('mousedown', handler);
      setShow('');
      setActive('');
    }
  }, []);

  return (
    <div className={`dropdown ${className} ${show}`} ref={child1}>
      <button type="button" data-toggle="dropdown" onClick={clickDrop} className={`${btnClassName} ${active}`}>
        <i className={icon} />
      </button>
      {children}
    </div>
  );
};
