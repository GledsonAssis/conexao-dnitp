import React, {
  Children,
  ForwardRefRenderFunction,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import BRSelect from './select';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'br-multiple'?: string;
  }
}

interface StateProps { }
interface DispatchProps { }
interface OwnProps extends React.AllHTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  CustomclassName?: string;
  id: string;
  inputProps?: any;
  defaultValue?: string | number;
  multiple?: boolean;
  FuncOnClosed?: Function;
  onChangeInput?: Function
  currentValue?: any;
}

interface Handle {
  setSelectedArray: Function;
  setSelected: Function;
  getSelected: Function;
  updateDefaultValue: Function;
  ref?: Ref<Handle>;
}

type Props = StateProps & DispatchProps & React.PropsWithChildren<OwnProps>;

export const SelectElement: ForwardRefRenderFunction<Handle, Props> = (
  {
    children,
    placeholder = 'Selecione os itens',
    CustomclassName,
    id,
    defaultValue = '',
    inputProps,
    multiple = false,
    FuncOnClosed = null,
    onChangeInput = null,
    currentValue,
    ...props
  },
  ref,
) => {
  const child1 = useRef<HTMLDivElement>();
  const [element, setElement] = useState<BRSelect>();

  useEffect(() => {
    if (Children.toArray(children).length && child1.current) {
      setElement(new BRSelect('br-select', child1.current, { multiple, FuncOnClosed }));
    }
  }, [children]);

  useEffect(() => {
    if (currentValue && element) {
      element?._setSelectSelectedbyValue(currentValue);
    } else if (element && !currentValue) {
      element?._setDefaultSelected();
    }
  }, [currentValue]);

  function alternarstatus() {
    element?._altereState(true)
  }

  function selectItem(event, index) {
    if (event.target.type) {
      element?._selectItem(event, index)
    }
  }

  useImperativeHandle(ref, () => ({
    setSelectedArray(value: string[]) {
      if (element && element.optionsList) {
        element._setSelectSelectedbyValueArray(value);
      }
    },
    setSelected(value: number | string) {
      if (element && element.optionsList) {
        element._setSelectSelectedbyValue(value);
      }
    },
    updateDefaultValue(item: any) {
      if (element) {
        element._setDefaultSelected();
      }
    },
    getSelected(elemName: string) {
      if (element) {
        return element._getSelectedsValues(elemName);
      }
    }
  }));

  return (
    <div ref={child1} className={`br-select ${CustomclassName || ''}`} id={id} br-multiple={`${multiple}`}>
      <div className="br-input">
        <input
          disabled={props.disabled}
          type="text"
          {...inputProps}
          placeholder={placeholder || 'Selecione o item'}
          id={`input_${id}`}
          onChange={onChangeInput}
          // defaultValue={defaultValue}
          autoComplete="off"
        />
        <button
          className="br-button circle small"
          type="button"
          disabled={props.disabled}
          aria-label="Exibir lista"
          tabIndex={-1}
          onClick={() => alternarstatus()}
          data-trigger="data-trigger" >
          <span className="sr-only">Exibir lista</span>
          <i className="fas fa-angle-down" />
        </button>
      </div>
      <div className="br-list" style={{ overflowX: 'clip', ...props.style }} tabIndex={0}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child,
              {
                onClick: (e) => selectItem(e, index),
              });
          }
        })}
      </div>
    </div>
  );
};

export const Select = React.forwardRef(SelectElement);

export default Select;
