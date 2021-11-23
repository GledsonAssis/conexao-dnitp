import React, {
  Children,
  ForwardRefRenderFunction,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Handle } from '@/interfaces';
import BRTable from './table';
import { THead } from './THead';
import { TBody } from './TBody';
import { ActionTrigger } from './actionTrigger';
import { SearchTrigger } from './searchTrigger';
import Pagination from '../Pagination';
import { TFunction } from 'next-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';

export { THead, TBody, ActionTrigger, SearchTrigger };

export interface tableConfig {
  searchTrigger?: boolean;
  selectAllOpt?: boolean;
  selectOpt?: boolean;
  paginate?: boolean;
  id: string | number;
  count?: number;
  nextPage?: Function;
  prevPage?: Function;
  searchItens?: Function
}

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  Title?: string;
  Options?: tableConfig;
  paramsNavigation?: any;
  elemListName: string;
  translations: TFunction;
}

interface HandleFunctions {
  checkSelectAll: Function;
  setRowkAction: Function;
  setSelectAll: Function;
  getSelectedValues: Function;
  ref?: Ref<HandleFunctions>;
}

type Props = StateProps & DispatchProps & React.PropsWithChildren<OwnProps>;

export const TableElement: ForwardRefRenderFunction<HandleFunctions, Props> = (
  { children, Title, Options, paramsNavigation, translations },
  ref,
) => {
  const child1 = useRef<HTMLDivElement>();
  const [currentPage, setCurrentPage] = useState(1);
  const [numberItensPer, setNumberItensPer] = useState(10);
  const [element, setElement] = useState<BRTable>();
  const [stTriggerSearchShow, setStTriggerSearchShow] = useState<boolean>(false);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<any>();

  if (child1.current && !child1.current.hasAttribute('br-table-att')) {
    setElement(new BRTable('br-table', child1.current, Options.id));
  }

  useImperativeHandle(ref, () => ({
    checkSelectAll(elemName: string) {
      element._checkSelectAll(elemName);
    },
    setRowkAction(component: HTMLInputElement) {
      element._setRowkAction(component);
    },
    setSelectAll(elemName: string) {
      element._checkAllClick(elemName);
    },
    getSelectedValues(elemName: string) {
      element._dropdownClose();
      return element._getSelectedsValues(elemName);
    },
  }));

  useEffect(() => {
    if (paramsNavigation) {
      paramsNavigation({
        currentPage: +watch('current-pag') || 1,
        numberItensPer: +watch('per-pag') || 10,
      });
    }
    // eslint-disable-next-line
  }, [watch('current-pag'), watch('per-pag')]);

  function renderTrigger(item: any, classTrigger: string, nameKey: string) {
    if (item.type.name === classTrigger && item.props.nameKey === nameKey) {
      return item;
    }
  }

  function renderSearchTrigger(item: any, classTrigger: string, nameKey: string) {
    if (item.type.name === classTrigger && item.props.nameKey === nameKey) {
      return React.cloneElement(item, {
        setStTriggerSearchShow: () => setStTriggerSearchShow(!stTriggerSearchShow)
      });
    }
  }

  function renderElement(item: any, classTrigger: string) {
    if (item.props.nameKey === classTrigger) {
      return item;
    }
  }

  return (
    <div ref={child1} className="br-table w-100" data-search="data-search" data-selection="data-selection">
      <div className="table-header">
        <div className="top-bar pr-0">
          {Title ? (
            <>
              <div className="table-title">{Title}</div>
              {Children.map(children, (item: any) => renderTrigger(item, ActionTrigger.name, 'top-bar'))}
              {Children.map(children, (item: any) => renderSearchTrigger(item, SearchTrigger.name, 'trigger-search'))}
            </>
          ) : (
            ''
          )}
        </div>
        <div className="search-bar p-0">
          <div className={'br-input'}>
            <label htmlFor={`table-searchbox-${Options.id}`}>Buscar</label>
            <input {...register('searchbox')} id={`table-searchbox-${Options.id}`} type="text" placeholder="Buscar na tabela" />
            <button
              className="br-button circle"
              onClick={() => handleSubmit(Options?.searchItens({ searchbox: getValues('searchbox') }))}
              aria-label="Buscar">
              <i className="fas fa-search" aria-hidden="true" />
            </button>
          </div>
          <button
            className="br-button circle"
            // onClick={() => Options.searchItens(() => ({ keyword: '' }))}
            type="button" data-dismiss="search" aria-label="Fechar busca">
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>
        <div className="selected-bar">
          <div className="info">
            <span className="count">0</span>
            <span className="text">item selecionado</span>
          </div>
          {Children.map(children, (item: any) => renderTrigger(item, ActionTrigger.name, 'selected-bar'))}
        </div>
      </div>
      <table className="w-100">
        {Children.map(children, (item: any) => renderElement(item, 't-head'))}
        {Children.map(children, (item: any) => renderElement(item, 't-body'))}
      </table>
      {Options && Options.paginate ? (
        <div className="table-footer">
          <Pagination
            id={Options.id}
            translations={translations}
            countItensPerPage={numberItensPer}
            countCurrentPage={currentPage}
            useFormProps={{
              watch,
              setValue,
              register
            }}
            count={Options?.count}
            type={'context'}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export const Table = React.forwardRef(TableElement);
