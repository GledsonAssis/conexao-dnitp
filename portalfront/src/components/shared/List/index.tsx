import React, { FC, useRef, useState } from 'react';
import { Item } from '../Item';
import BRList from './list';

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  textHeader?: string;
  customClassName?: string;
  customClassItem?: string;
  itensList: any[];
}

type Props = StateProps & DispatchProps & OwnProps;

export const List: FC<Props> = ({ textHeader, itensList, children, customClassName }) => {
  const child1 = useRef<HTMLDivElement>();
  const [openList, setOpenList] = useState<any>();
  let elemento: BRList;

  React.useEffect(() => {
    if (child1.current) {
      if (child1.current.querySelector('.br-list[data-toggle]')) {
        elemento = new BRList('br-list-collapsible', child1.current.querySelector('.br-list[data-toggle]'));
      }
      if (child1.current.querySelector('.br-list[data-checkable]')) {
        elemento = new BRList('br-list-checkable', child1.current.querySelector('.br-list[data-checkable]'));
      }
    }
  }, []);

  function renderAccordionList(itens: any[]) {
    return renderItem(itens);
  }

  function openClose(item: any) {
    if (item === openList) {
      setOpenList('')
    } else {
      setOpenList(item)
    }
  }

  function renderItem(itens: any[]): any[] {
    return itens.map((item, index) => {
      if (!('items' in item)) {
        return (
          <Item key={`${item.label}_${index}_${item.link}`} link={item.link} target={item.target || '_self'}>
            <div className="content p-0">{item.label}</div>
          </Item>
        );
      }
      return (
        <div className={`col`} key={`${item.title}_${index}_${item.link}`}>
          <div>
            <Item customClassName={`header px-0 ${openList === item.title ? 'open' : ''}`}>
              <div className={'d-flex w-100'} onClick={() => openClose(item.title)}>
                <div className="content text-down-01 text-bold text-uppercase">{item.title}</div>
                <div className="support">
                  <i className="fas fa-angle-up" aria-hidden="true" />
                </div>
              </div>
            </Item>
            <div className="br-list">
              <span className="br-divider d-md-none" />
              {renderAccordionList(item.items)}
              <span className="br-divider d-md-none" />
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      {/* <div className="container-lg"> */}
      <div className={`br-list ${customClassName}`} ref={child1} data-toggle="data-toggle" data-unique="data-unique">
        {renderItem(itensList)}
      </div>
      {/* </div> */}
    </>
  );
};
