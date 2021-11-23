import BRItem from '../Item/item';

interface options {
  multiple?: boolean;
  FuncOnClosed?: Function;
  defaultValue?: number | string
}
class BRSelect {
  name: any;
  component: any;
  multiple: any;
  optionsList: any[];
  funcOnClosed: Function;
  defaultValue: string | number;

  constructor(name: string, component: Element, options?: options) {
    this.name = name;
    this.component = component;
    this.multiple = options.multiple;
    this.defaultValue = options.defaultValue;
    this.optionsList = this._setOptionsList();
    this.funcOnClosed = options.FuncOnClosed;
    this._setBehavior();
  }

  get selected() {
    let selected = [];
    for (const [index, option] of this.optionsList.entries()) {
      if (!this.multiple) {
        if (option.selected) {
          selected = option.value;
          break;
        }
      } else if (index > 0 && option.selected) {
        selected.push(option.value);
      }
    }
    return selected;
  }

  _removeNotFoundElement() {
    const list = this.component.querySelector('.br-list');
    // debugger
    if (list.querySelector('.br-item.disabled')) {
      list.removeChild(list.querySelector('.br-item.disabled'));
    }
  }

  _addNotFoundElement() {
    const tag = document.createElement('div');
    tag.classList.add('br-item');
    tag.classList.add('disabled');
    tag.appendChild(document.createTextNode('Item não encontrado'));
    const list = this.component.querySelector('.br-list');
    list.appendChild(tag);
  }

  _setOptionsList() {
    const optionsList = [];
    for (const item of this.component.querySelectorAll('.br-list .br-item')) {
      for (const label of item.querySelectorAll('.br-radio label, .br-checkbox label')) {
        const option = {
          focus: false,
          selected: item.querySelector('input:checked') ? true : false,
          value: label.innerText,
          visible: true,
        };
        optionsList.push(option);
      }
    }
    return optionsList;
  }

  _setBehavior() {
    this._setDropdownBehavior();
    this._setKeyboardBehavior();
    this._setSelectionBehavior();
    // this._setDefaultSelected();
    this._setFilterBehavior();
    // this._setAttSelect();
    if (this.optionsList.some(item => item.selected)) {
      this._setInput()
    }
  }

  _setAttSelect() {
    this.component.setAttribute('br-select-att', '');
  }

  _setSelectSelectedbyValue(value: string | number) {
    if (this.optionsList.length == 0) {
      this.optionsList = this._setOptionsList();
    }
    for (const [index, item] of this.component.querySelectorAll('.br-list .br-item').entries()) {
      const elem = item.querySelector('input[type="radio"]');
      if (elem && String(elem.value) == String(value)) {
        this._setSelected(index, item);
      } else {
        this._removeSelected(index, item);
      }
    }
  }

  _setSelectSelectedbyValueArray(value: string[]) {
    if (this.optionsList.length == 0) {
      this.optionsList = this._setOptionsList();
    }
    for (const [index, item] of this.component.querySelectorAll('.br-list .br-item').entries()) {
      const elem = item.querySelector('input[type="checkbox"]');
      if (elem.value && value.includes(String(elem.value))) {
        this._setSelected(index, item);
      }
    }
  }

  _setDropdownBehavior() {
    for (const input of this.component.querySelectorAll('.br-input input[type="text"]')) {
      input.addEventListener('focus', () => {
        this._openSelect();
        this._resetFocus();
      });
    }
    window.document.addEventListener('click', (event) => {
      if (!this.component.contains(event.target)) {
        this._closeSelect(true);
      }
    });
  }

  _setKeyboardBehavior() {
    for (const input of this.component.querySelectorAll('.br-input input[type="text"]')) {
      input.addEventListener('keydown', (event) => {
        // Close Select
        if (event.shiftKey && event.key === 'Tab') {
          this._closeSelect(true);
          this._resetFocus();
        }
        if (event.key === 'Tab' && !event.shiftKey) {
          this.component.querySelector('.br-button.circle.small').focus();
        }
        if (event.keyCode === 40) {
          event.preventDefault();
          for (const list of this.component.querySelectorAll('.br-list')) {
            list.focus();
            if (list === document.activeElement) {
              this._getNextItem().focus();
            }
          }
        }
      });
    }
    for (const list of this.component.querySelectorAll('.br-list')) {
      // eslint-disable-next-line complexity
      list.addEventListener('keydown', (event) => {
        event.preventDefault();
        switch (event.keyCode) {
          case 9:
            this._closeSelect(true);
            this._resetFocus();
            break;
          case 27:
            this._closeSelect(true);
            break;
          case 32:
            this._setKeyClickOnOption(list);
            break;
          case 38:
            this._getPreviousItem().focus();
            break;
          case 40:
            this._getNextItem().focus();
            break;
          default:
            break;
        }
      });
    }
  }

  _setKeyClickOnOption(list) {
    for (const [index, item] of list.querySelectorAll('.br-item').entries()) {
      if (this.optionsList[index].focus) {
        for (const check of item.querySelectorAll(
          '.br-radio input[type="radio"], .br-checkbox input[type="checkbox"]',
        )) {
          check.click();
        }
      }
    }
  }

  _setDefaultSelected() {
    const selectedItems = this.component.querySelectorAll('.br-list .selected');
    const iterable = typeof selectedItems[Symbol.iterator];
    if (selectedItems !== null && iterable === 'function') {
      for (const item of selectedItems) {
        this._setSelected(this._positionSelected(item), item);
      }
    }
  }

  _removeAllchecked(item?: any) {
    const selectedItems = this.component.querySelectorAll(`.br-list input[type="radio"]${item ? `:not([value="${item}"])` : ''}`);
    const iterable = typeof selectedItems[Symbol.iterator];
    if (selectedItems !== null && iterable === 'function') {
      for (const item of selectedItems) {
        item.removeAttribute('checked');
      }
    }
  }

  _removeAllselected(item?: any) {
    const selectedItems = this.component.querySelectorAll(`.br-list input[type="radio"]${item ? `:not([value="${item}"])` : ''}`);
    const iterable = typeof selectedItems[Symbol.iterator];
    if (selectedItems !== null && iterable === 'function') {
      for (const item of selectedItems) {
        item.removeAttribute('checked');
      }
    }
  }

  _positionSelected(component) {
    for (const [index, componente] of this.component.querySelectorAll('.br-list .br-item').entries()) {
      if (componente === component) {
        return index;
      }
    }
    return 0;
  }

  _setSelectionBehavior() {
    this._setDefaultSelected();
    const itemList = [];
    for (const [index, item] of this.component.querySelectorAll('.br-list .br-item').entries()) {
      for (const check of item.querySelectorAll('.br-radio input[type="radio"], .br-checkbox input[type="checkbox"]')) {
        if (!check.checked) {
          this._removeSelected(index, item);
        }
        itemList.push(new BRItem('br-item', item));
      }
    }
  }

  _selectItem(event, index) {
    if (!this.multiple) {
      for (const [index2, item2] of this.component.querySelectorAll('.br-list .br-item.selected').entries()) {
        this._removeSelected(index2, item2);
      }
      this._setSelected(index, event.currentTarget);
      this._closeSelect();
    } else {
      if (!event.target.checked) {
        this._removeSelected(index, event.currentTarget);
      } else {
        this._setSelected(index, event.currentTarget);
      }
      if (event.currentTarget.hasAttribute('data-all')) {
        for (const check of event.currentTarget.querySelectorAll('.br-checkbox input[type="checkbox"]')) {
          if (!check.hasAttribute('checked')) {
            this._setAttribute();
            event.currentTarget.querySelectorAll('label')[0].innerText = 'Selecionar Todos';
          } else {
            for (const item2 of this.component.querySelectorAll('.br-list .br-item:not([data-all])')) {
              for (const check2 of item2.querySelectorAll('.br-checkbox input[type="checkbox"]')) {
                if (!check2.hasAttribute('checked')) {
                  check2.click();
                }
              }
            }
            event.currentTarget.querySelectorAll('label')[0].innerText = 'Deselecionar Todos';
          }
        }
      }
    }
  }

  _setFilterBehavior() {
    for (const input of this.component.querySelectorAll('.br-input input[type="text"]')) {
      input.addEventListener('input', (event) => {
        let allHidden = true;
        this._filter(event.currentTarget.value);
        for (const option of this.optionsList) {
          if (option.visible) {
            allHidden = false;
          }
        }

        if (allHidden) {
          // event.currentTarget.value = event.currentTarget.value.slice(0, -1)
          this._filter(event.currentTarget.value);
        }
      });
    }
  }

  _getSelectedsValues(item: string) {
    if (document) {
      const trList = document.querySelectorAll(`[type="checkbox"][id^="${item}"]:checked,[type="radio"][id^="${item}"]:checked`);
      return Array.from(trList).map((item: HTMLInputElement) => item.value);
    }
  }

  _filter(value) {
    let hasVisible = false;
    for (const [index, item] of this.component.querySelectorAll('.br-list .br-item').entries()) {
      this._removeNotFoundElement();
      if (!this.optionsList[index]) {
        continue;
      }
      if (this.optionsList[index].value.toUpperCase().indexOf(value.toUpperCase()) === -1) {
        item.classList.add('d-none');
        this.optionsList[index].visible = false;
      } else {
        item.classList.remove('d-none');
        this.optionsList[index].visible = true;
        hasVisible = true;
      }
    }
    if (!hasVisible) {
      // debugger
      this._addNotFoundElement();
    }
  }

  _setAttribute() {
    for (const item2 of this.component.querySelectorAll('.br-list .br-item:not([data-all])')) {
      for (const check2 of item2.querySelectorAll('.br-checkbox input[type="checkbox"]')) {
        if (check2.hasAttribute('checked')) {
          check2.click();
        }
      }
    }
  }

  _setSelected(index, item) {
    item.classList.add('selected');
    for (const check of item.querySelectorAll('.br-radio, .br-checkbox')) {
      for (const input of check.querySelectorAll('input[type="radio"], input[type="checkbox"]')) {
        input.setAttribute('checked', '');
      }
    }
    if (this.optionsList[index]) this.optionsList[index].selected = true;
    this._setInput();
  }

  _removeSelected(index, item) {
    item.classList.remove('selected');
    for (const check of item.querySelectorAll('.br-radio, .br-checkbox')) {
      for (const input of check.querySelectorAll('input[type="radio"], input[type="checkbox"')) {
        input.removeAttribute('checked');
      }
      if (this.optionsList[index]) this.optionsList[index].selected = false;
      this._setInput();
    }
  }

  _setInput() {
    for (const input of this.component.querySelectorAll('.br-input input[type="text"]')) {
      if (!this.multiple) {
        const teste = this.component.querySelector('.selected .br-radio label, .selected .br-checkbox label')
        input.value = teste?.innerHTML || null;
      } else if (this.selected.length === 0) {
        input.value = '';
      } else if (this.selected.length === 1) {
        input.value = this.selected;
      } else {
        input.value = `${this.selected[0]} + (${this.selected.length - 1})`;
      }
    }
  }

  // eslint-disable-next-line complexity
  _getNextItem() {
    const list = this.component.querySelectorAll('.br-list .br-item');
    let iFocused;
    let iVisible;
    for (iFocused = 0; iFocused < this.optionsList.length; iFocused++) {
      if (this.optionsList[iFocused].focus) {
        for (iVisible = iFocused + 1; iVisible < this.optionsList.length; iVisible++) {
          if (this.optionsList[iVisible].visible) {
            break;
          }
        }
        break;
      }
    }
    if (iFocused === this.optionsList.length) {
      for (const [index, option] of this.optionsList.entries()) {
        if (option.visible) {
          option.focus = true;
          return list[index];
        }
      }
    } else if (iVisible < this.optionsList.length) {
      this.optionsList[iFocused].focus = false;
      this.optionsList[iVisible].focus = true;
      return list[iVisible];
    } else {
      return list[iFocused];
    }
    return '';
  }

  _getPreviousItem() {
    const list = this.component.querySelectorAll('.br-list .br-item');
    let iFocused;
    let iVisible;
    for (iFocused = 0; iFocused < this.optionsList.length; iFocused++) {
      if (this.optionsList[iFocused].focus) {
        for (iVisible = iFocused - 1; iVisible > 0; iVisible--) {
          if (this.optionsList[iVisible].visible) {
            break;
          }
        }
        break;
      }
    }
    if (iFocused === 0) {
      return list[iFocused];
    } else {
      this.optionsList[iFocused].focus = false;
      this.optionsList[iVisible].focus = true;
      return list[iVisible];
    }
  }

  _resetInput() {
    for (const input of this.component.querySelectorAll('.br-input input[type="text"]')) {
      input.value = '';
    }
  }

  _resetFocus() {
    for (const option of this.optionsList) {
      option.focus = false;
    }
  }

  _resetVisible() {
    const list = this.component.querySelectorAll('.br-list .br-item');
    if (list && list.length) {
      if (list.length !== this.optionsList.length) {
        this.optionsList = this._setOptionsList();
      }
      for (const [index, option] of this.optionsList.entries()) {
        option.visible = true;
        list[index].classList.remove('d-none');
      }
    }
  }

  async _altereState(execFunc = false) {
    const elem = this.component.querySelector('.br-list')
    if (elem && elem?.hasAttribute('expanded')) {
      this._closeSelect(execFunc)
    } else {
      this._openSelect()
    }
  }

  _openSelect() {
    for (const list of this.component.querySelectorAll('.br-list')) {
      list.setAttribute('expanded', '');
      if (this.funcOnClosed) {
        list.setAttribute('has-function-closed', '');
      }
    }
    for (const icon of this.component.querySelectorAll(
      '.br-input .br-button i'
    )) {
      icon.classList.remove('fa-angle-down');
      icon.classList.add('fa-angle-up');
    }
    this._resetInput();
  }

  async _closeSelect(execFunc = false) {
    if (execFunc) {
      for (const list of this.component.querySelectorAll('[has-function-closed][expanded]')) {
        list.removeAttribute('has-function-closed');
        this.funcOnClosed()
      }
    }
    for (const list of this.component.querySelectorAll('.br-list')) {
      list.removeAttribute('expanded');
    }
    for (const icon of this.component.querySelectorAll('.br-input .br-button i')) {
      icon.classList.remove('fa-angle-up');
      icon.classList.add('fa-angle-down');
    }
    this._setInput();
    this._resetFocus();
    this._resetVisible();
  }
}

export default BRSelect;
