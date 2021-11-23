class BRList {
  name: any;

  component: Element;

  collapsible: boolean;

  checkable: boolean;

  unique: boolean;

  cols: NodeListOf<Element> | never[];

  horizontal: any;

  itens: NodeListOf<Element>;

  constructor(name: any, component: any) {
    this.name = name;
    this.component = component;
    this.collapsible = this.name === 'br-list-collapsible';
    this.checkable = this.name === 'br-list-checkable';
    this.unique = component.hasAttribute('data-unique');
    this.cols = this.horizontal ? component.querySelectorAll('.col') : [];
    this.itens = component.querySelectorAll(':scope > .br-item');
    // suporte a colunas do bootstrap dentro da lista
    if (this.itens.length === 0) this.itens = component.querySelectorAll('div > .br-item');
    this._setBehavior();
  }

  _setBehavior() {
    if (this.collapsible) {
      this._closeAllItens();
      this.itens.forEach((item) => {
        item.addEventListener('click', (event) => {
          this._toggle(event, item);
        });
      });
    }
    if (this.checkable) {
      this.itens.forEach((item) => {
        this._setSelected(item);
        if (item && !item.classList.contains('disabled')) {
          const itemInput = item.querySelector('.br-checkbox > input');
          if (itemInput) {
            itemInput.addEventListener('click', (event: any) => {
              if (event.target.getAttribute('type') === 'checkbox') {
                this._check(event, item);
              }
            });
          }
        }
      });
    }
    if (this.cols.length > 0) {
      const n = this.cols.length;
      const pos = n > 6 && n % 2 === 1 ? n + 1 : n;
      const resto = pos / Math.ceil(pos / 6);
      const equal = 100 / resto;
      this.cols.forEach((col: any) => {
        col.style.flexBasis = `${equal}%`;
      });
    }
  }

  _toggle(event: any, item: any) {
    if (!item.classList.contains('open')) {
      if (this.unique) this._closeAllItens();
    }
    if (item.classList.contains('open')) {
      item.classList.remove('open');
    } else {
      item.classList.add('open');
    }
    const icon = item.querySelector('.fa-angle-down')
      ? item.querySelector('.fa-angle-down')
      : item.querySelector('.fa-angle-up');
    if (icon) {
      icon.classList.toggle('fa-angle-down');
      icon.classList.toggle('fa-angle-up');
    }
  }

  _closeAllItens() {
    this.itens.forEach((item) => {
      item.classList.remove('open');
      const icon = item.querySelector('.fa-angle-down')
        ? item.querySelector('.fa-angle-down')
        : item.querySelector('.fa-angle-up');
      if (icon) {
        icon.classList.add('fa-angle-down');
        icon.classList.remove('fa-angle-up');
      }
    });
  }

  _check(event: any, item: any) {
    item.classList.toggle('selected');
    this._setSelected(item);
  }

  _setSelected(item: any) {
    const brCheckbox = item.querySelector('.br-checkbox');
    const brCheckboxInput = brCheckbox.querySelector('input');
    const selected = item.classList.contains('selected');
    if (brCheckbox) {
      if (selected) {
        brCheckbox.classList.add('is-inverted');
        brCheckboxInput.setAttribute('checked', '');
        brCheckboxInput.checked = true;
      } else {
        brCheckbox.classList.remove('is-inverted');
        brCheckboxInput.removeAttribute('checked');
        brCheckboxInput.checked = false;
      }
    }
  }
}

// const listList = []
// if (typeof window !== "undefined") {
//   for (const brList of window.document.querySelectorAll(
//     '.br-list[data-toggle]'
//   )) {
//     listList.push(new BRList('br-list-collapsible', brList))
//   }
//   for (const brList of window.document.querySelectorAll(
//     '.br-list[data-checkable]'
//   )) {
//     listList.push(new BRList('br-list-checkable', brList))
//   }
// }
export default BRList;
