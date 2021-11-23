class BRInput {
  name: any;

  component: any;

  _currentFocus: number;

  dataList: any[] = [];

  constructor(name: string, component: Element) {
    this.name = name;
    this.component = component;
    this._currentFocus = -1;
    this._setBehavior();
  }

  _setBehavior() {
    this._setPasswordViewBehavior();
    this._setAutocompleteBehavior();
  }

  _setPasswordViewBehavior() {
    for (const inputPassword of this.component.querySelectorAll('input[type="password"]')) {
      if (!inputPassword.disabled) {
        for (const buttonIcon of inputPassword.parentNode.querySelectorAll('button.icon')) {
          buttonIcon.addEventListener(
            'click',
            (event: any) => {
              this._toggleShowPassword(event);
            },
            false,
          );
        }
      }
    }
  }

  _toggleShowPassword(event: any) {
    for (const icon of event.currentTarget.querySelectorAll('.svg-inline--fa')) {
      if (icon.classList.contains('fa-eye')) {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        for (const input of this.component.querySelectorAll('input[type="password"]')) {
          input.setAttribute('type', 'text');
        }
      } else if (icon.classList.contains('fa-eye-slash')) {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        for (const input of this.component.querySelectorAll('input[type="text"]')) {
          input.setAttribute('type', 'password');
        }
      }
    }
  }

  _setAutocompleteBehavior() {
    for (const inputAutocomplete of this.component.querySelectorAll('input.search-autocomplete')) {
      inputAutocomplete.addEventListener(
        'input',
        (event: any) => {
          this._clearSearchItems();
          this._buildSearchItems(event.currentTarget);
        },
        false,
      );
      inputAutocomplete.addEventListener(
        'keydown',
        (event: any) => {
          this._handleArrowKeys(event);
        },
        false,
      );
    }
  }

  _buildSearchItems(element: any) {
    const searchList = window.document.createElement('div');
    searchList.setAttribute('class', 'search-items');
    this.component.appendChild(searchList);
    if (element.value !== '') {
      for (const data of this.dataList) {
        if (data.substr(0, element.value.length).toUpperCase() === element.value.toUpperCase()) {
          const item = window.document.createElement('div');
          item.innerHTML = `<strong>${data.substr(0, element.value.length)}</strong>`;
          item.innerHTML += data.substr(element.value.length);
          item.innerHTML += `<input type="hidden" value="${data}">`;
          item.addEventListener(
            'click',
            (event: any) => {
              for (const input of event.currentTarget.querySelectorAll('input[type="hidden"]')) {
                element.value = input.value;
              }
              this._clearSearchItems();
            },
            false,
          );
          searchList.appendChild(item);
        }
      }
    } else {
      this._clearSearchItems();
    }
  }

  _clearSearchItems() {
    for (const searchItems of this.component.querySelectorAll('.search-items')) {
      for (const item of searchItems.querySelectorAll('div')) {
        searchItems.removeChild(item);
      }
      this.component.removeChild(searchItems);
    }
  }

  _handleArrowKeys(event: any) {
    switch (event.keyCode) {
      case 13:
        if (this._currentFocus > -1) {
          event.preventDefault();
          for (const searchItems of this.component.querySelectorAll('.search-items')) {
            for (const itemActive of searchItems.querySelectorAll('div.is-active')) {
              itemActive.click();
            }
          }
          this._currentFocus = -1;
        }
        break;
      case 38:
        if (this._currentFocus > 0) {
          this._currentFocus -= 1;
        }
        this._switchFocus();
        break;
      case 40:
        for (const searchItems of this.component.querySelectorAll('.search-items')) {
          if (this._currentFocus < searchItems.querySelectorAll('div').length - 1) {
            this._currentFocus += 1;
          }
        }
        this._switchFocus();
        break;
      default:
        break;
    }
  }

  _switchFocus() {
    for (const searchItems of this.component.querySelectorAll('.search-items')) {
      for (const [index, item] of searchItems.querySelectorAll('div').entries()) {
        if (index === this._currentFocus) {
          item.classList.add('is-active');
        }
        if (index !== this._currentFocus) {
          item.classList.remove('is-active');
        }
      }
    }
  }

  setAutocompleteData(dataList: any[]) {
    this.dataList = dataList;
  }
}

// const countries = [
//   'Afeganistão',
//   'África do Sul',
//   'Albânia',
// ]
// const inputList = []
// for (const brInput of window.document.querySelectorAll('.br-input')) {
//   inputList.push(new BRInput('br-input', brInput))
// }
// for (const brInput of inputList) {
//   brInput.component
//     .querySelectorAll('input.search-autocomplete')
//     .forEach(() => {
//       brInput.setAutocompleteData(countries)
//     })
// }

export default BRInput;
