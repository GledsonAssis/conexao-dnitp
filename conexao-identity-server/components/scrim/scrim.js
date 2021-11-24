class BRScrim {
  constructor(name, component) {
    this.name = name
    this.component = component
    this._setType()
    this._setBehavior()
  }

  _setType() {
    if (this.component.classList.contains('foco')) {
      this._type = 'foco'
    }
    if (this.component.classList.contains('legibilidade')) {
      this._type = 'legibilidade'
    }
    if (this.component.classList.contains('inibicao')) {
      this._type = 'inibicao'
    }
  }

  _setBehavior() {
    if (this.component.classList.contains('foco')) {
      this.component.addEventListener('click', (event) => {
        this.outsideclick = true
        if (event.target.classList.contains('br-scrim')) {
          this.hideScrim(event)
        }
      })

      const allComp = this.component.querySelectorAll(
        `[data-dismiss=${this.component.id}]`
      )

      for (const buttonComponent of allComp) {
        buttonComponent.addEventListener('click', (event) => {
          this.component.classList.remove('active')
        })
      }
    }
  }

  hideScrim(event) {
    event.currentTarget.classList.remove('active')
  }

  showScrim() {
    if (this._type === 'foco') {
      this.component.classList.add('active')
    }
  }
}
const scrimList = []
for (const brScrim of window.document.querySelectorAll('.br-scrim')) {
  scrimList.push(new BRScrim('br-scrim', brScrim))
}
export default BRScrim
for (const buttonBloco1 of window.document.querySelectorAll(
  '.scrimexemplo button'
)) {
  buttonBloco1.addEventListener('click', () => {
    for (const brScrim of scrimList) {
      brScrim.showScrim()
    }
  })
}
//Exemplo de scrim close
