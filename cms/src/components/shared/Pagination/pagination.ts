class BRPagination {
  component: any
  name: string
  currentPage: number
  constructor(name: string, component: Element) {
    this.name = name
    this.component = component
    this.currentPage = 1
    this._setBehaviors()
  }

  _setBehaviors() {
    // this._setActive()
    this._setAttSelect()
  }

  _setAttSelect() {
    this.component.setAttribute('br-pagination-att', '');
  }

  _setLayout() {
    const ul = this.component.querySelector('ul')
    const pages = this.component.querySelectorAll('.page')
    pages.forEach((page) => {
      if (page.classList.contains('active')) {
        this.currentPage = parseInt(page.querySelector('a'))
      }
      page.classList.remove('d-none')
    })

    if (this.currentPage === 1) {
      ul.querySelector('[data-previous-page]').setAttribute('disabled', '')
    } else {
      ul.querySelector('[data-previous-page]').removeAttribute('disabled')
    }

    if (this.currentPage === pages.length) {
      ul.querySelector('[data-next-page').setAttribute('disabled', '')
    } else {
      ul.querySelector('[data-next-page]').removeAttribute('disabled')
    }

    if (pages.length > 9) {
      if (this.currentPage < 6) {
        if (ul.querySelector('[data-previous-interval]')) {
          ul.querySelector('[data-previous-interval]').remove()
        }
        for (let page = 7; page < pages.length - 1; page++) {
          pages[page].classList.add('d-none')
        }
        if (!ul.querySelector('[data-next-interval]')) {
          ul.insertBefore(
            this._createIntervalElement('next'),
            ul.children[ul.children.length - 2]
          )
        }
      }
      if (this.currentPage >= 6 && this.currentPage < pages.length - 4) {
        for (let page = this.currentPage - 4; page > 0; page--) {
          pages[page].classList.add('d-none')
        }
        if (!ul.querySelector('[data-previous-interval]')) {
          ul.insertBefore(
            this._createIntervalElement('previous'),
            ul.children[2]
          )
        }
        for (let page = this.currentPage + 2; page < pages.length - 1; page++) {
          pages[page].classList.add('d-none')
        }
        if (!ul.querySelector('[data-next-interval]')) {
          ul.insertBefore(
            this._createIntervalElement('next'),
            ul.children[ul.children.length - 2]
          )
        }
      }
      if (this.currentPage >= pages.length - 4) {
        if (ul.querySelector('[data-next-interval]')) {
          ul.querySelector('[data-next-interval]').remove()
        }
        for (let page = pages.length - 8; page > 0; page--) {
          pages[page].classList.add('d-none')
        }
        if (!ul.querySelector('[data-previous-interval]')) {
          ul.insertBefore(
            this._createIntervalElement('previous'),
            ul.children[2]
          )
        }
      }
    }
  }

  _createIntervalElement(type: string) {
    const interval = document.createElement('li')
    interval.setAttribute(`data-${type}-interval`, '')

    const a = document.createElement('a')
    a.setAttribute('href', 'javascript:void(0)')

    const icon = document.createElement('i')
    icon.classList.add('fas', 'fa-ellipsis-h')

    a.appendChild(icon)
    interval.appendChild(a)

    return interval
  }

  _setActive() {
    for (const page of this.component.querySelectorAll('.page')) {
      page.addEventListener('click', (event: any) => {
        this._selectPage(event.currentTarget)
      })
    }
  }

  _selectPage(currentPage: Element) {
    this.component.querySelectorAll('.page').forEach((page: Element) => {
      page.classList.remove('active')
    })
    currentPage.classList.add('active')
    this._setLayout()
  }
}

export default BRPagination
