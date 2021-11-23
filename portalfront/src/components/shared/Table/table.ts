// import Collapse from '../../partial/js/behavior/collapse'
// import Dropdown from '../../partial/js/behavior/dropdown'

/* eslint-disable complexity */
class BRTable {
  name: any
  component: any
  _header: any
  _table: any
  _sequence: any
  constructor(name, component, sequence) {
    this.name = name
    this.component = component
    this._header = this.component.querySelector('.header, .table-header')
    this._table = this.component.querySelector('table')
    this._sequence = sequence
    this._setBehaviors()
  }

  _setBehaviors() {
    this._makeResponsiveTable()
    this._headerBehavior()
    this._setHeaderWidth()
    this._searchBehavior()
    // this._dropdownBehavior()
    // this._collpaseBehavior()
    // this._densityBehavior()
    this._setClickActions()
    this._getBRHeaderHeight()
    this._setAttBrTable();
  }

  _setAttBrTable() {
    this.component.setAttribute('br-table-att', '');
  }

  _getBRHeaderHeight() {
    const BRHeader = document.querySelector('.br-header')
    if (BRHeader) {
      window.addEventListener('scroll', () => {
        this._header.style.top = `${BRHeader.clientHeight}px`
      })
    }
  }

  _makeResponsiveTable() {
    const responsiveClass = 'responsive'
    if (!this.component.querySelector(`.${responsiveClass}`)) {
      const responsiveElement = document.createElement('div')
      responsiveElement.classList.add(responsiveClass)
      responsiveElement.appendChild(this._table)
      this._header.after(responsiveElement)
    }
  }

  _headerBehavior() {
    // this._hideThead()

    window.addEventListener('resize', () => {
      // this._hideThead()
    })

    for (const responsive of this.component.querySelectorAll('.responsive')) {
      if (window.innerWidth > 575) {
        // this._setSyncScroll(responsive)
      }
    }

    // this._cloneHeaders()
  }

  _makeScroller() {
    const scrollerTag = document.createElement('div')
    // this._setSyncScroll(scrollerTag)
    scrollerTag.classList.add('scroller')
    for (const header of this._table.querySelectorAll('thead tr th')) {
      const clonedHeader = document.createElement('div')
      clonedHeader.classList.add('item')
      clonedHeader.innerHTML = header.innerHTML
      if (header.offsetWidth) {
        clonedHeader.style.flex = `1 0 ${header.offsetWidth}px`
      }
      scrollerTag.appendChild(clonedHeader)
      const checkbox = clonedHeader.querySelector('.br-checkbox')
      if (checkbox) {
        const input = checkbox.querySelector('input')
        const label = checkbox.querySelector('label')
        input.id = `${input.id}-clone`
        label.setAttribute('for', input.id)
      }
    }
    return scrollerTag
  }

  _cloneHeaders() {
    const headersTag = document.createElement('div')
    headersTag.classList.add('headers')
    headersTag.style.top = `${this._header.offsetHeight}px`
    headersTag.appendChild(this._makeScroller())
    this._header.after(headersTag)
  }

  _hideThead() {
    this._table.style.marginTop = `-${this._table.querySelector('thead').offsetHeight
      }px`
  }

  _setSyncScroll(element) {
    element.classList.add('syncscroll')
    element.setAttribute('name', `table-${this._sequence}`)
    element.setAttribute('style', 'overflow-y: hidden')
    // element.setAttribute('tabindex', 0)
  }

  _setHeaderWidth() {
    for (const clonedHeader of this.component.querySelectorAll(
      '.headers > div'
    )) {
      for (const [index, header] of this.component
        .querySelectorAll('table thead tr th')
        .entries()) {
        clonedHeader.children[index].style.flex = `1 0 ${header.offsetWidth}px`
      }
    }
  }
  // _dropdownBehavior() {
  //   this.component
  //     .querySelectorAll('[data-toggle="dropdown"]')
  //     .forEach((trigger) => {
  //       const config = {
  //         trigger,
  //         iconToShow: 'fa-chevron-down',
  //         iconToHide: 'fa-chevron-up',
  //         useIcons: true,
  //       }
  //       const dropdown = new Dropdown(config)
  //       dropdown.setBehavior()
  //     })
  // }

  // _collpaseBehavior() {
  //   this.component
  //     .querySelectorAll('[data-toggle="collapse"]')
  //     .forEach((trigger) => {
  //       const config = {
  //         trigger,
  //         iconToShow: 'fa-chevron-down',
  //         iconToHide: 'fa-chevron-up',
  //         useIcons: true,
  //       }
  //       const collapse = new Collapse(config)
  //       collapse.setBehavior()
  //     })
  // }

  _searchBehavior() {
    if (this.component.dataset.search) {
      const trigger = this.component.querySelector('[data-toggle="search"]')
      const target = this.component.querySelector('.search-bar')
      const dismiss = this.component.querySelector('[data-dismiss="search"]')

      // Inicializar
      this._searchInit(trigger)

      // Abre busca
      trigger?.addEventListener('click', () => {
        return this._searchOpen(trigger, target)
      })

      // Fecha busca
      dismiss.addEventListener('click', () => {
        return this._searchClose(trigger, target)
      })
      target.querySelector('input').addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          this._searchClose(trigger, target)
        }
      })
    }
  }

  _searchInit(trigger) {
    trigger?.setAttribute('aria-expanded', 'false')
  }

  _searchOpen(trigger, target) {
    trigger.setAttribute('aria-expanded', 'true')
    target.classList.add('show')
    target.querySelector('input').focus()
  }

  _searchClose(trigger, target) {
    target.querySelector('input').value = ''
    target?.classList.remove('show')
    trigger?.focus()
    trigger?.setAttribute('aria-expanded', 'false')
  }

  // _densityBehavior() {
  //   const desityTriggers = this.component.querySelectorAll('[data-density]')
  //   for (const desityTrigger of desityTriggers) {
  //     desityTrigger.addEventListener('click', () => {
  //       this.component.classList.remove('small', 'medium', 'large')
  //       this.component.classList.add(desityTrigger.dataset.density)
  //       // this._hideThead()
  //       this._dropdownClose(
  //         desityTrigger
  //           .closest('.dropdown')
  //           .querySelector('[data-toggle="dropdown"]')
  //       )
  //     })
  //   }
  // }
  // _dropdownClose(arg0: any) {
  //   throw new Error("Method not implemented.")
  // }

  _setClickActions() {
    const headerCheckbox = this.component.querySelector(
      '.headers [type="checkbox"]'
    )
    const tableCheckboxes = this.component.querySelectorAll(
      'tbody [type="checkbox"]'
    )
    const selectedBar = this.component.querySelector('.selected-bar')
    const checkAlls = this.component.querySelectorAll(
      '[data-toggle="check-all"]'
    )
    for (const checkAll of checkAlls) {
      checkAll.addEventListener('click', () => {
        this._checkAllTable(selectedBar, tableCheckboxes, headerCheckbox)
        // if (checkAll.parentElement.classList.contains('br-list')) {
        //   this._dropdownClose(
        //     checkAll
        //       .closest('.dropdown')
        //       .querySelector('[data-toggle="dropdown"]')
        //   )
        // }
      })
    }
    if (tableCheckboxes) {
      for (const checkbox of tableCheckboxes) {
        checkbox.addEventListener('change', () => {
          this._checkRow(checkbox, selectedBar, tableCheckboxes, headerCheckbox)
        })
      }
    }
  }

  _verifyAllCheckbox(item) {
    const checkboxes = this.component.querySelectorAll(`[name^="${item}"]`);
    let stValidaAll = true;
    checkboxes.forEach((item: HTMLInputElement) => {
      stValidaAll = stValidaAll && item.checked;
    });
    return stValidaAll;
  }

  _setRowkAction(component: HTMLInputElement) {
    const headerCheckbox = this.component.querySelector('.headers [type="checkbox"]');
    const tableCheckboxes = this.component.querySelectorAll('tbody [type="checkbox"]');
    const selectedBar = this.component.querySelector('.selected-bar');

    this._checkRow(component, selectedBar, tableCheckboxes, headerCheckbox);
  }

  _checkSelectAll(elemName: string) {
    const headerCheckbox: HTMLInputElement = this.component.querySelector('thead [type="checkbox"]');
    headerCheckbox.checked = this._verifyAllCheckbox(elemName);
  }

  _checkAllClick(elemName) {
    const headerCheckbox: HTMLInputElement = this.component.querySelector('.headers [type="checkbox"]');
    const tableCheckboxes: HTMLInputElement[] = this.component.querySelectorAll('tbody [type="checkbox"]');
    const selectedBar: HTMLDivElement = this.component.querySelector('.selected-bar');
    const checkAll: HTMLInputElement = this.component.querySelector('[data-toggle="check-all"]');
    // if (checkAll.parentElement.classList.contains('br-list')) {
    //   this._dropdownClose(checkAll.closest('.dropdown').querySelector('[data-toggle="dropdown"]'));
    // }
    this._checkAllTable(selectedBar, tableCheckboxes, headerCheckbox);
  }

  _getSelectedsValues(item: string) {
    const trList = this.component.querySelectorAll(`tbody [type="checkbox"][name^="${item}"]:checked`);
    return Array.from(trList).map((item: HTMLInputElement) => item.value);
  }

  _setRow(checkbox, check) {
    const tr = checkbox.parentNode.parentNode.parentNode
    if (check) {
      tr.classList.add('is-selected')
      checkbox.parentNode.classList.add('is-inverted')
      checkbox.checked = true
    } else {
      tr.classList.remove('is-selected')
      checkbox.parentNode.classList.remove('is-inverted')
      checkbox.checked = false
    }
  }

  _checkRow(checkbox, selectedBar, tableCheckboxes, headerCheckbox) {
    const check = checkbox.checked
    this._setRow(checkbox, check)
    this._setSelectedBar(
      check ? 1 : -1,
      selectedBar,
      tableCheckboxes,
      headerCheckbox
    )
  }

  _checkAllRows(tableCheckboxes) {
    for (const checkbox of tableCheckboxes) {
      this._setRow(checkbox, true)
    }
  }

  _uncheckAllRows(tableCheckboxes) {
    for (const checkbox of tableCheckboxes) {
      this._setRow(checkbox, false)
    }
  }

  _checkAllTable(selectedBar, tableCheckboxes, headerCheckbox) {
    let count = tableCheckboxes.length
    const infoCount = selectedBar.querySelector('.info .count')
    const total = parseInt(infoCount.innerHTML, 10)
    if (total === count) {
      this._uncheckAllRows(tableCheckboxes)
      count = -1 * count
    } else {
      this._checkAllRows(tableCheckboxes)
    }
    this._setSelectedBar(count, selectedBar, tableCheckboxes, headerCheckbox)
  }

  _setSelectedBar(count, selectedBar, tableCheckboxes, headerCheckbox) {
    const infoCount = selectedBar.querySelector('.info .count')
    const infoText = selectedBar.querySelector('.info .text')
    const total = count < 2 ? parseInt(infoCount.innerHTML, 10) + count : count
    if (total > 0) {
      selectedBar.classList.add('show')
      infoCount.innerHTML = total
      infoText.innerHTML = total > 1 ? 'itens selecionados' : 'item selecionado'
      if (headerCheckbox) headerCheckbox.parentNode.classList.add('is-checking')
      if (total === tableCheckboxes.length) {
        if (headerCheckbox) {
          headerCheckbox.checked = true
          headerCheckbox.parentNode.classList.remove('is-checking')
        }
      }
    } else {
      infoCount.innerHTML = 0
      if (headerCheckbox) {
        headerCheckbox.checked = false
        headerCheckbox.parentNode.classList.remove('is-checking')
      }
      selectedBar.classList.remove('show')
    }
  }

  static _elSyn(el, name, scroll, elems, EventListener, length, names) {
    const addEventListener = `add${EventListener}`
    const client = 'client'
    const Height = 'Height'
    const Left = 'Left'
    const mathRound = Math.round
    const Top = 'Top'
    const Width = 'Width'
    el[addEventListener](
      scroll,
      () => {
        const otherElems = names[name]
        let scrollX = el[scroll + Left]
        let scrollY = el[scroll + Top]
        const xRate = scrollX / (el[scroll + Width] - el[client + Width])
        const yRate = scrollY / (el[scroll + Height] - el[client + Height])
        const updateX = scrollX !== el.eX
        const updateY = scrollY !== el.eY
        el.eX = scrollX
        el.eY = scrollY
        otherElems.forEach((element) => {
          if (element !== el) {
            if (
              updateX &&
              mathRound(
                element[scroll + Left] -
                (scrollX = element.eX =
                  mathRound(
                    xRate *
                    (element[scroll + Width] - element[client + Width])
                  ))
              )
            ) {
              element[scroll + Left] = scrollX
            }
            if (
              updateY &&
              mathRound(
                element[scroll + Top] -
                (scrollY = element.eY =
                  mathRound(
                    yRate *
                    (element[scroll + Height] - element[client + Height])
                  ))
              )
            ) {
              element[scroll + Top] = scrollY
            }
          }
        })
      },
      0
    )
  }
}
// const tableList = []
// for (const [index, brTable] of window.document
//   .querySelectorAll('.br-table')
//   .entries()) {
//   tableList.push(new BRTable('br-table', brTable, index))
// }
// BRTable._syncscroll()
export default BRTable
