import React, { FC, useEffect, useRef } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import Select from '../Select';
import BRPagination from './pagination';
import { TFunction } from 'next-i18next';
import { Dropdown } from '../Dropdown';

interface UseFormProps {
  register: UseFormRegister<any>,
  watch: UseFormWatch<any>,
  setValue: UseFormSetValue<any>,
}

interface StateProps { }
interface DispatchProps {
  id: string | number,
  countItensPerPage: number,
  countCurrentPage: number,
  setNumberItensPer?: Function,
  setCurrentPage?: Function,
  useFormProps: UseFormProps
}
interface OwnProps {
  count: number,
  type?: 'default' | 'context',
  itensShow?: number,
  data?: any[],
  translations: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const Pagination: FC<Props> = ({
  itensShow = 7,
  count,
  type = 'default',
  data,
  translations,
  ...props
}) => {
  const child1 = useRef<HTMLElement>();

  useEffect(() => {
    if (child1.current && !child1.current.querySelector('.br-pagination-att')) {
      new BRPagination('br-pagination', child1.current);
    }
  }, []);

  function defaultPaginateSpread() {
    if (Math.ceil(count / props.countItensPerPage) > 1) {
      const pagination = paginateSpread(+props.countCurrentPage, Math.ceil(count / props.countItensPerPage), 2);
      const uniques = pagination.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.value === thing.value && t.name === thing.name
        ))
      )
      return uniques?.map((item, index) => {
        if (item.type === 'number') {
          return (
            <li key={`pagin-default-${item.value}`} value={item.value}>
              <a
                onClick={() => props.setCurrentPage(item.value)}
                className={`page cursor-pointer ${props.countCurrentPage === item.value ? 'active' : ''}`}>
                {item.value}
              </a>
            </li>
          )
        } else {
          return (
            <li key={`pagin-default-${item.type}-${index}`} className="pagination-ellipsis">
              <Dropdown icon="fas fa-ellipsis-h" btnClassName="br-button circle small">
                <div className="br-list text-nowrap" hidden>
                  {item?.value?.map((pageItens, index) =>
                    <a
                      key={`pagin-default-${item.type}-${item.value}-${index}-${pageItens}`}
                      className="br-item cursor-pointer"
                      onClick={() => props.setCurrentPage(pageItens)}>
                      {pageItens}
                    </a>
                  )}
                </div>
              </Dropdown>
            </li>
          )
        }
      });
    }
  }

  function renderPaginate() {
    switch (type) {
      case 'default':
        return (
          (Math.ceil(count / props.countItensPerPage) > 1) ?
            <nav
              className="br-pagination d-none d-sm-flex"
              aria-label="Paginação de resultados"
              data-total="20"
              data-current="13">
              <ul>
                <li>
                  <button
                    className="br-button circle"
                    type="button"
                    onClick={() => props.countCurrentPage > 1 ? props.setCurrentPage(props.countCurrentPage - 1) : props.setCurrentPage(1)}
                    data-previous-page="data-previous-page"
                    aria-label="Página anterior">
                    <i className="fas fa-angle-left" aria-hidden="true"></i>
                  </button>
                </li>
                {defaultPaginateSpread()}
                <li>
                  <button
                    className="br-button circle"
                    onClick={() =>
                      props.countCurrentPage < Math.ceil(count / props.countItensPerPage) ?
                        props.setCurrentPage(props.countCurrentPage + 1) :
                        props.setCurrentPage(Math.ceil(count / props.countItensPerPage))}
                    type="button"
                    data-next-page="data-next-page"
                    aria-label="Página seguinte">
                    <i className="fas fa-angle-right" aria-hidden="true"></i>
                  </button>
                </li>
              </ul>
            </nav>
            : <></>
        )
      case 'context':
        return (<nav
          className="br-pagination"
          aria-label="Paginação de resultados"
          data-total="50"
          data-current="1"
          data-per-page="20">
          <div className="pagination-per-page">
            <div className="br-input">
              <label htmlFor="per-page-selection">{translations('components:Pagination.show')}</label>
              <Select
                id={`pagination-per-page-${props.id}`}
                CustomclassName="mw-100"
                placeholder="-"
                defaultValue="10"
                disabled={!count}
                currentValue={props.useFormProps.watch(`per-pag-${props.id}`)}
              >
                <div className="br-item w-100" tabIndex={-1}>
                  <div className="br-radio">
                    <input
                      id="pag-10"
                      {...props.useFormProps.register(`per-pag-${props.id}`)}
                      type="radio"
                      defaultChecked
                      value="10" />
                    <label htmlFor="pag-10">10</label>
                  </div>
                </div>
                <div className="br-item w-100" tabIndex={-1}>
                  <div className="br-radio">
                    <input
                      id="pag-20"
                      {...props.useFormProps.register(`per-pag-${props.id}`)}
                      type="radio"
                      value="20" />
                    <label htmlFor="pag-20">20</label>
                  </div>
                </div>
                <div className="br-item w-100" tabIndex={-1}>
                  <div className="br-radio">
                    <input
                      id="pag-30"
                      {...props.useFormProps.register(`per-pag-${props.id}`)}
                      type="radio"
                      value="30" />
                    <label htmlFor="pag-30">30</label>
                  </div>
                </div>
              </Select>
            </div>
          </div>
          <span className="br-divider d-none d-sm-block mx-3"></span>
          <div className="pagination-information d-none d-sm-flex">
            <span className="current">{
              1 + (+props.useFormProps.watch(`per-pag-${props.id}`) || 10) * ((+props.useFormProps.watch(`current-pag-${props.id}`) || 1) - 1)
            }</span>&ndash;
            <span className="per-page">{
              Math.min((+props.useFormProps.watch(`per-pag-${props.id}`) || 10) * (+props.useFormProps.watch(`current-pag-${props.id}`) || 1), count || null)
            }</span>&nbsp;{translations('components:Pagination.of')}&nbsp;
            <span className="total">{count}</span>&nbsp;{translations('components:Pagination.itens')}
          </div>
          <div className="pagination-go-to-page d-none d-sm-flex ml-auto">
            <div className="br-input">
              <label htmlFor="go-to-selection-random-4378">{translations('components:Pagination.page')}</label>
              <Select
                placeholder="-"
                id={`pagination-current-page-${props.id}`}
                className="mw-100"
                defaultValue={1}
                disabled={!count}
                currentValue={props.useFormProps.watch(`current-pag-${props.id}`)}
              >
                <div className="br-item w-100 selected" tabIndex={-1}>
                  <div className="br-radio">
                    <input
                      id={`current-pag-${1}`}
                      type="radio"
                      {...props.useFormProps.register(`current-pag-${props.id}`)}
                      defaultChecked
                      value="1"
                    />
                    <label htmlFor={`current-pag-${1}`}>{1}</label>
                  </div>
                </div>
                {paginas()}
              </Select>
            </div>
          </div><span className="br-divider d-none d-sm-block mx-3"></span>
          <div className="pagination-arrows ml-auto ml-sm-0">
            <button
              onClick={() => prevPage(props.useFormProps.watch(`current-pag-${props.id}`))}
              disabled={props.useFormProps.watch(`current-pag-${props.id}`) <= 1}
              className="br-button circle"
              type="button"
              aria-label="Voltar página"
            >
              <i className="fas fa-angle-left" aria-hidden="true" />
            </button>
            <button
              onClick={() => nextPage(props.useFormProps.watch(`current-pag-${props.id}`), props.useFormProps.watch(`per-pag-${props.id}`), count)}
              disabled={props.useFormProps.watch(`current-pag-${props.id}`) >= numPages(count, props.useFormProps.watch(`per-pag-${props.id}`))}
              className="br-button circle"
              type="button"
              aria-label="Avançar página"
            >
              <i className="fas fa-angle-right" aria-hidden="true" />
            </button>
          </div>
        </nav>)
    }
  }

  function range(start, end) {
    return Array(end - start + 1).fill(null).map((_, idx) => start + idx)
  }

  function paginateSpread(page: number, totalPages: number, numItens: number = 2) {
    const newItems: (any)[] = [{ type: 'number', value: 1 }];
    let i = page - numItens > 1 ? page - numItens : 2;
    const iterablePages = page + numItens < totalPages ? page + numItens : totalPages - 1;

    i > 2 ? newItems.push({ type: 'dots', value: range(2, i - 1) }) : '';
    for (i; i <= iterablePages; i += 1) {
      newItems.push({ type: 'number', value: i })
    }
    (iterablePages < totalPages - 1) ? newItems.push({ type: 'dots', value: range(iterablePages + 1, totalPages - 1) }) : ''
    newItems.push({ type: 'number', value: totalPages })

    return newItems
  }

  function paginas() {
    if (Math.ceil(count / props.useFormProps.watch(`per-pag-${props.id}`)) > 1) {
      const newItems = paginateSpread(+props.useFormProps.watch(`current-pag-${props.id}`), Math.ceil(count / props.useFormProps.watch(`per-pag-${props.id}`)));
      // const pagination = paginateSpread(props.useFormProps.watch(`current-pag-${props.id}`), Math.ceil(count / props.useFormProps.watch(`per-pag-${props.id}`)));
      return newItems.slice(1).map((item) => {
        if (item.type === 'number') {
          return (<div key={`pagin-${item.value}`} className="br-item w-100" tabIndex={-1}>
            <div className="br-radio">
              <input
                id={`current-pag-${item.value}`}
                type="radio"
                {...props.useFormProps.register(`current-pag-${props.id}`)}
                value={`${item.value}`}
              />
              <label htmlFor={`current-pag-${item.value}`}>{item.value}</label>
            </div>
          </div>)
        } else {
          return (
            <div key={`pagin-${item}`} className="br-item w-100" tabIndex={-1}>
              ...
            </div>
          )
        }
      });
    }
  }

  function prevPage(pageChange: number) {
    if (pageChange > 1) {
      props.useFormProps.setValue(`current-pag-${props.id}`, `${+pageChange - 1}`)
    }
  }

  function nextPage(pageChange: number, itensPerChange: number, count: number) {
    if (pageChange < numPages(count, itensPerChange)) {
      props.useFormProps.setValue(`current-pag-${props.id}`, `${+pageChange + 1}`)
    }
  }

  function numPages(numItens: number, itensPerChange: number) {
    return Math.ceil(numItens / itensPerChange);
  }

  return (
    renderPaginate()
  );
};

export default Pagination;
