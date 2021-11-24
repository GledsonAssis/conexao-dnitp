class BRList {
  constructor(name, component) {
    this.name = name
    this.component = component
    this.collapsible = this.name === 'br-list-collapsible'
    this.checkable = this.name === 'br-list-checkable'
    this.unique = component.hasAttribute('data-unique')
    this.cols = this.horizontal ? component.querySelectorAll('.col') : []
    this.itens = component.querySelectorAll(':scope > .br-item')
    // suporte a colunas do bootstrap dentro da lista
    if (this.itens.length === 0)
      this.itens = component.querySelectorAll('div > .br-item')
    this._setBehavior()
  }

  _setBehavior() {
    if (this.collapsible) {
      this._closeAllItens()
      this._setFocusResponsive()
      this.itens.forEach((item) => {
        item.addEventListener('click', (event) => {
          this._toggle(event, item)
        })
      })
    }
    if (this.checkable) {
      this.itens.forEach((item) => {
        this._setSelected(item)
        if (!item.classList.contains('disabled')) {
          item
            .querySelector('.br-checkbox > input')
            .addEventListener('click', (event) => {
              if (event.target.getAttribute('type') === 'checkbox') {
                this._check(event, item)
              }
            })
        }
      })
    }
    if (this.cols.length > 0) {
      const n = this.cols.length
      const pos = n > 6 && n % 2 === 1 ? n + 1 : n
      const resto = pos / Math.ceil(pos / 6)
      const equal = 100 / resto
      this.cols.forEach((col) => {
        col.style.flexBasis = `${equal}%`
      })
    }
  }

  _toggle(event, item) {
    if (!item.classList.contains('open')) {
      if (this.unique) this._closeAllItens()
    }
    if (item.classList.contains('open')) {
      item.classList.remove('open')
      item.setAttribute('aria-hidden', false)
    } else {
      item.classList.add('open')
      item.setAttribute('aria-hidden', true)
    }
    const icon = item.querySelector('.fa-angle-down')
      ? item.querySelector('.fa-angle-down')
      : item.querySelector('.fa-angle-up')
    if (icon) {
      icon.classList.toggle('fa-angle-down')
      icon.classList.toggle('fa-angle-up')
    }
  }

  _setFocusResponsive() {
    for (const item of this.component.querySelectorAll(
      '.br-list .br-item:not(.header)'
    )) {
      const itemHeader = item.parentNode.parentNode.querySelector(
        '.br-list .br-item.header'
      )
      item.addEventListener('focus', (event) => {
        item.parentNode.classList.add('open')

        this._toggle(event, itemHeader)
        itemHeader.classList.add('open')
      })
      item.addEventListener('blur', (event) => {
        this._toggle(event, itemHeader)
        itemHeader.classList.remove('open')
      })
    }

    for (const item of this.component.querySelectorAll(
      '.br-list .br-item.header:not(.open)'
    )) {
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
          if (!item.classList.contains('open')) {
            this._nextFocus(event)
          }
        }
        if (event.key === ' ') {
          event.preventDefault()
          this._toggle(event, item)
        }
      })
    }
  }
  /**
   * Verifica se elemento está visivel
   * @param {*} node
   * @returns
   */
  _isInert(node) {
    // See https://www.w3.org/TR/html5/editing.html#inert
    const sty = getComputedStyle(node)
    return (
      node.offsetHeight <= 0 ||
      /hidden/.test(sty.getPropertyValue('visibility'))
    )
  }
  /**
   * Vai para proximo componente fora do list
   * @param {*} event
   */
  _nextFocus(event) {
    const step = event && event.shiftKey ? -1 : 1

    const focussableElements =
      'a:not(.br-item:not(.header)), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'
    const focusable = Array.from(document.querySelectorAll(focussableElements))
    const activeIndex = focusable.indexOf(document.activeElement)
    const nextActiveIndex = activeIndex + step
    const nextActive = focusable[nextActiveIndex]
    while (nextActive && this._isInert(nextActive)) {
      nextActive = focusable[(nextActiveIndex += step)]
    }
    this._nextActive(nextActive)
  }

  _nextActive(nextActive) {
    if (nextActive) {
      nextActive.focus()
      event && event.preventDefault()
    } else {
      document.activeElement.blur()
    }
  }

  _closeAllItens() {
    this.itens.forEach((item) => {
      item.classList.remove('open')
      const icon = item.querySelector('.fa-angle-down')
        ? item.querySelector('.fa-angle-down')
        : item.querySelector('.fa-angle-up')
      if (icon) {
        icon.classList.add('fa-angle-down')
        icon.classList.remove('fa-angle-up')
      }
    })
  }

  _check(event, item) {
    item.classList.toggle('selected')
    this._setSelected(item)
  }

  _setSelected(item) {
    const brCheckbox = item.querySelector('.br-checkbox')
    const brCheckboxInput = brCheckbox.querySelector('input')
    const selected = item.classList.contains('selected')
    if (brCheckbox) {
      if (selected) {
        brCheckbox.classList.add('is-inverted')
        brCheckboxInput.setAttribute('checked', '')
        brCheckboxInput.checked = true
      } else {
        brCheckbox.classList.remove('is-inverted')
        brCheckboxInput.removeAttribute('checked')
        brCheckboxInput.checked = false
      }
    }
  }
}

const listList = []
for (const brList of window.document.querySelectorAll(
  '.br-list[data-toggle]'
)) {
  listList.push(new BRList('br-list-collapsible', brList))
}
for (const brList of window.document.querySelectorAll(
  '.br-list[data-checkable]'
)) {
  listList.push(new BRList('br-list-checkable', brList))
}
export default BRList
