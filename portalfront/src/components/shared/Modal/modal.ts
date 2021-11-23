import BRScrim from '../Scrim/scrim';

class BRModal {
  name: string;

  component: Element;

  constructor(name: string, component: Element) {
    this.name = name;
    this.component = component;
    this._setBehavior();
  }

  _setBehavior() {
    const scrim = new BRScrim('br-scrim', this.component);
    for (const button of window.document.querySelectorAll('.br-scrim + button')) {
      button.addEventListener('click', () => {
        scrim.showScrim();
      });
    }
  }
}
export default BRModal;
// const modalList = []
// for (const brModal of window.document.querySelectorAll('.br-modal')) {
//   modalList.push(new BRModal('br-modal', brModal))
// }
