import React, { FC, useEffect, useRef } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import Select from '../Select';
import BRPagination from './pagination';
import { TFunction } from 'next-i18next';

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

  function renderPaginate() {
    switch (type) {
      case 'default':
        return (
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
                  data-previous-page="data-previous-page"
                  aria-label="Página anterior">
                  <i className="fas fa-angle-left" aria-hidden="true"></i>
                </button>
              </li>
              <li><a className="page">1</a></li>
              {/* <li className="pagination-ellipsis">
            <button className="br-button circle" type="button" data-toggle="dropdown" aria-label="Abrir listagem">
              <i className="fas fa-ellipsis-h" aria-hidden="true"></i>
            </button>
            <div className="br-list">
              <a className="br-item">2</a>
              <a className="br-item">3</a>
              <a className="br-item">4</a>
              <a className="br-item">5</a>
              <a className="br-item">6</a>
              <a className="br-item">7</a>
              <a className="br-item">8</a>
              <a className="br-item">9</a>
              <a className="br-item">10</a>
            </div>
          </li> */}
              <li><a className="page">11</a></li>
              <li><a className="page">12</a></li>
              <li><a className="page active">13</a></li>
              <li><a className="page">14</a></li>
              <li><a className="page">15</a></li>
              {/* <li className="pagination-ellipsis">
            <button className="br-button circle" type="button" data-toggle="dropdown" aria-label="Abrir listagem">
              <i className="fas fa-ellipsis-h" aria-hidden="true"></i>
            </button>
            <div className="br-list">
              <a className="br-item">16</a>
              <a className="br-item">17</a>
              <a className="br-item">18</a>
              <a className="br-item">19</a>
            </div>
          </li> */}
              <li><a className="page">20</a></li>
              <li>
                <button className="br-button circle" type="button" data-next-page="data-next-page" aria-label="Página seguinte">
                  <i className="fas fa-angle-right" aria-hidden="true"></i>
                </button>
              </li>
            </ul>
          </nav>)
      case 'context':
        return (<nav
          className="br-pagination"
          aria-label="Paginação de resultados"
          data-total="50"
          data-current="1"
          data-per-page="20">
          <div className="pagination-per-page">
            <div className="br-input">
              <label htmlFor="per-page-selection">{translations('components:pagination.show')}</label>
              <Select
                id={`pagination-per-page-${props.id}`}
                CustomclassName="mw-100"
                placeholder="-"
                defaultValue="10"
                disabled={!count}
                currentValue={props.useFormProps.watch('per-pag')}
              >
                <div className="br-item w-100" tabIndex={-1}>
                  <div className="br-radio">
                    <input
                      id="pag-10"
                      {...props.useFormProps.register('per-pag')}
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
                      {...props.useFormProps.register('per-pag')}
                      type="radio"
                      value="20" />
                    <label htmlFor="pag-20">20</label>
                  </div>
                </div>
                <div className="br-item w-100" tabIndex={-1}>
                  <div className="br-radio">
                    <input
                      id="pag-30"
                      {...props.useFormProps.register('per-pag')}
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
              1 + (+props.useFormProps.watch('per-pag') || 10) * ((+props.useFormProps.watch('current-pag') || 1) - 1)
            }</span>&ndash;
            <span className="per-page">{
              Math.min((+props.useFormProps.watch('per-pag') || 10) * (+props.useFormProps.watch('current-pag') || 1), count || null)
            }</span>&nbsp;{translations('components:pagination.of')}&nbsp;
            <span className="total">{count}</span>&nbsp;{translations('components:pagination.itens')}
          </div>
          <div className="pagination-go-to-page d-none d-sm-flex ml-auto">
            <div className="br-input">
              <label htmlFor="go-to-selection-random-4378">{translations('components:pagination.page')}</label>
              <Select
                placeholder="-"
                id={`pagination-current-page-${props.id}`}
                className="mw-100"
                defaultValue={1}
                disabled={!count}
                currentValue={props.useFormProps.watch('current-pag')}
              >
                <div className="br-item w-100 selected" tabIndex={-1}>
                  <div className="br-radio">
                    <input
                      id={`current-pag-${1}`}
                      type="radio"
                      {...props.useFormProps.register('current-pag')}
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
              onClick={() => prevPage(props.useFormProps.watch('current-pag'))}
              disabled={props.useFormProps.watch('current-pag') <= 1}
              className="br-button circle"
              type="button"
              aria-label="Voltar página"
            >
              <i className="fas fa-angle-left" aria-hidden="true" />
            </button>
            <button
              onClick={() => nextPage(props.useFormProps.watch('current-pag'), props.useFormProps.watch('per-pag'), count)}
              disabled={props.useFormProps.watch('current-pag') >= numPages(count, props.useFormProps.watch('per-pag'))}
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

  function paginateSpread(page: number, totalPages: number, numItens: number = 2) {
    const newItems: (number | string)[] = [1];
    let i = page - numItens > 1 ? page - numItens : 2;
    const iterablePages = page + numItens < totalPages ? page + numItens : totalPages - 1;

    i > 2 ? newItems.push('dots') : '';
    for (i; i <= iterablePages; i += 1) {
      newItems.push(i)
    }
    (iterablePages < totalPages - 1) ? newItems.push('dots') : ''
    newItems.push(totalPages)

    return newItems
  }

  function paginas() {
    if (Math.ceil(count / props.useFormProps.watch('per-pag')) > 1) {
      const pagination = paginateSpread(+props.useFormProps.watch('current-pag'), Math.ceil(count / props.useFormProps.watch('per-pag')));
      // const pagination = paginateSpread(props.useFormProps.watch('current-pag'), Math.ceil(count / props.useFormProps.watch('per-pag')));
      return pagination.slice(1).map((item) => {
        if (typeof item === 'number') {
          return (<div key={`pagin-${item}`} className="br-item w-100" tabIndex={-1}>
            <div className="br-radio">
              <input
                id={`current-pag-${item}`}
                type="radio"
                {...props.useFormProps.register('current-pag')}
                value={`${item}`}
              />
              <label htmlFor={`current-pag-${item}`}>{item}</label>
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
      props.useFormProps.setValue('current-pag', `${+pageChange - 1}`)
    }
  }

  function nextPage(pageChange: number, itensPerChange: number, count: number) {
    if (pageChange < numPages(count, itensPerChange)) {
      props.useFormProps.setValue('current-pag', `${+pageChange + 1}`)
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
