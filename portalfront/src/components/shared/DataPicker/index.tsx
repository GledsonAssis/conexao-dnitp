import React, {
  ButtonHTMLAttributes,
  Children,
  DOMAttributes,
  FC,
  ForwardRefRenderFunction,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import BRDatapicker from './dataPicker';

interface StateProps { }
interface DispatchProps { }
interface OwnProps extends React.AllHTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  CustomclassName?: string;
  id: string;
  defaultValue?: string | number;
  dataMode?: 'single' | 'range';
  dataType?: 'text' | 'time' | 'datetime-local';
  dataInput?: boolean;
  Label?: string;
  helpText?: string;
  inputProps?: any;
  minDate?: string;
  defaultDate?: string
}

interface Handle {
  getSelected: Function;
  setDate: Function;
  ref?: Ref<Handle>;
}

type Props = StateProps & DispatchProps & React.PropsWithChildren<OwnProps>;

export const DatapickerElement: ForwardRefRenderFunction<Handle, Props> = (
  {
    children,
    placeholder = 'Selecione...',
    CustomclassName,
    id,
    inputProps,
    defaultValue = '',
    dataMode = 'single',
    dataType = 'text',
    dataInput = true,
    Label,
    helpText,
    minDate = 'today',
    defaultDate,
    ...props
  },
  ref,
) => {
  const child1 = useRef<HTMLDivElement>();
  const [element, setElement] = useState<BRDatapicker>();

  useEffect(() => {
    if (child1.current && !child1.current.hasAttribute('br-datetimepicker-att')) {
      setElement(new BRDatapicker('br-datetimepicker', child1.current));
    }
    // eslint-disable-next-line
  }, [children]);

  useImperativeHandle(ref, () => ({
    getSelected() {
      if (element) {
        return element.component;
      }
    },
    setDate(date: Date) {
      if (element) {
        element._setDate(date)
      }
    }
  }));

  return (
    <div ref={child1} className="br-datetimepicker" data-mode={`${dataMode}`} data-type={`${dataType}`} data-min-date={`${minDate}`}>
      <div className="br-input has-icon">
        {props?.title ?
          <label htmlFor="simples-input">{props?.title}</label>
          : ''}
        <input
          className="has-icon"
          id={id}
          {...inputProps}
          defaultValue={defaultValue}
          autoComplete="off"
          disabled={props.disabled}
          type="text"
          placeholder={placeholder}
          data-input={`${dataInput}`}
        />
        <button
          className="br-button circle small"
          type="button"
          style={props?.title ? {} : { top: 4 }}
          aria-label="Abrir Timepicker"
          data-toggle="data-toggle"
          id={`range-input-btn-${id}`}
        >
          <i className="fas fa-calendar-alt" aria-hidden="true" />
        </button>
      </div>
      {helpText ? <p className="help-text">{helpText}</p> : ''}
    </div>
  );
};

export const Datapicker = React.forwardRef(DatapickerElement);
