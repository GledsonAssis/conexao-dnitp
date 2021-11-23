class BRScrim {
  name: string;

  component: Element;

  _type: string;

  constructor(name: string, component: Element) {
    this.name = name;
    this.component = component;
    this._setType();
    this._setBehavior();
  }

  _setType() {
    if (this.component.classList.contains('foco')) {
      this._type = 'foco';
    }
    if (this.component.classList.contains('legibilidade')) {
      this._type = 'legibilidade';
    }
    if (this.component.classList.contains('inibicao')) {
      this._type = 'inibicao';
    }
  }

  _setBehavior() {
    if (this.component.classList.contains('foco')) {
      this.component.addEventListener('click', (event) => {
        this._hideScrim(event);
      });
    }
  }

  _hideScrim(event) {
    event.currentTarget.classList.remove('active');
  }

  showScrim() {
    if (this._type === 'foco') {
      this.component.classList.add('active');
    }
  }
}
// const scrimList = []
// for (const brScrim of window.document.querySelectorAll('.br-scrim')) {
//   scrimList.push(new BRScrim('br-scrim', brScrim))
// }
export default BRScrim;
// for (const buttonBloco1 of window.document.querySelectorAll(
//   '.scrimexemplo button'
// )) {
//   buttonBloco1.addEventListener('click', () => {
//     for (const brScrim of scrimList) {
//       brScrim.showScrim()
//     }
//   })
// }
