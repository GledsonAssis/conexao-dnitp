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
  fields?: any;
  onChange?: Function
}

type Props = StateProps & DispatchProps & OwnProps;

export const SortFilter: FC<Props> = ({
  className = '',
  btnClassName,
  icon = 'fas fa-sort-amount-down-alt',
  fields,
  onChange
}) => {
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
    // Update coordinates
    if (!(child1?.current?.contains(target))) {
      document.removeEventListener('mousedown', handler);
      setShow('');
      setActive('');
    }
  }, []);

  function onChangeFilter(item: any) {
    onChange(item)
    setShow('');
    setActive('');
  }

  return (
    <div style={{ width: 'max-content' }} className={`dropdown ${className} ${show}`} ref={child1}>
      <button type="button" data-toggle="dropdown" onClick={clickDrop} className={`${btnClassName} ${active}`}>
        <i className={icon} />
        {/* <span className="markspan" style={{ display: Notification ? 'block' : 'none' }}></span> */}
      </button>
      <div className="br-list bg-white">
        <div className="header" style={{ whiteSpace: 'nowrap' }}>
          <div className="title">Ordenar por:</div>
        </div>
        {fields.map((field: { value: any; label?: any }) => (
          <a
            key={field.value}
            className="br-item w-100 cursor-pointer"
            onClick={() => onChangeFilter(field)}
          >
            {field.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SortFilter;
