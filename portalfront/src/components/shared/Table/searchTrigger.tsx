import React, { FC, useRef } from 'react';

interface StateProps { }
interface DispatchProps { }
interface OwnProps extends React.AllHTMLAttributes<HTMLTableSectionElement> {
  icon?: HTMLElement
  nameKey: 'trigger-search';
  setStTriggerSearchShow?: Function
}

type Props = StateProps & DispatchProps & OwnProps;

export const SearchTrigger: FC<Props> = ({
  icon,
  nameKey = 'trigger-search',
  setStTriggerSearchShow,
  ...props
}) => {
  const child1 = useRef<HTMLDivElement>();

  return (
    <div className="search-trigger" ref={child1}>
      <button
        className={`br-button circle ${props.className}`}
        type="button"
        onClick={() => setStTriggerSearchShow()}
        data-toggle="search"
        aria-label="Abrir busca"
      >
        {icon || <i className="fas fa-search" aria-hidden="true" />}
      </button>
    </div>
  );
};
