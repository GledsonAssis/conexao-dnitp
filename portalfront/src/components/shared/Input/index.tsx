import React, { useRef } from 'react';
import BRInput from './input';

interface StateProps {}
interface DispatchProps {}
interface OwnProps {
  listAutocomplete?: any[];
  Label?: string | number;
  Placeholder?: string | number;
}

type Props = StateProps & DispatchProps & OwnProps;

export const Input: React.FC<Props> = ({ listAutocomplete, Label = 'Título', Placeholder = 'Digite...' }) => {
  const child1 = useRef<HTMLDivElement>();
  let elemento: BRInput;

  React.useEffect(() => {
    if (child1.current) {
      elemento = new BRInput('br-input', child1.current);
      if (listAutocomplete) {
        elemento.component.querySelectorAll('input.search-autocomplete').forEach(() => {
          elemento.setAutocompleteData(listAutocomplete);
        });
      }
    }
  }, []);

  return (
    <div className="br-input large" ref={child1}>
      <label htmlFor="input-label">{Label}</label>
      <input className="search-autocomplete" id="input-label" type="text" placeholder={Placeholder.toString()} />
    </div>
  );
};
