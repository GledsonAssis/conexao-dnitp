class BRCard {
  constructor(name, component, id) {
    this.name = name
    this.component = component
    this.component.setAttribute('id', `card${id}`)
    this._setBehavior()
    new BRCardFlip()
    new BRCardCollapse(component)
  }

  _setBehavior() {
    this._setFlipBehavior()
    // this._setExpandBehavior()
    this._setDragBehavior()
    this._setDisableBehavior()
  }

  _setDisableBehavior() {
    if (this.component.classList.contains('disabled')) {
      this.component.setAttribute('aria-hidden', 'true')
      const buttons = this.component.querySelectorAll('button')
      const inputs = this.component.querySelectorAll('input')
      const selects = this.component.querySelectorAll('select')
      const textareas = this.component.querySelectorAll('textarea')
      for (const button of buttons) {
        button.setAttribute('disabled', 'disabled')
      }
      for (const input of inputs) {
        input.setAttribute('disabled', 'disabled')
      }
      for (const select of selects) {
        input.setAttribute('disabled', 'disabled')
      }
      for (const textarea of textareas) {
        input.setAttribute('disabled', 'disabled')
      }
    }
  }

  _setFlipBehavior() {
    for (const flip of this.component.querySelectorAll('button.flip')) {
      flip.addEventListener('click', () => {
        if (this.component.getAttribute('flipped') === 'off') {
          this.component.setAttribute('flipped', 'on')
        } else {
          this.component.setAttribute('flipped', 'off')
        }
      })
    }
  }

  // _setExpandBehavior() {
  //   for (const expand of this.component.querySelectorAll('[data-expanded]')) {
  //     expand.addEventListener('click', () => {
  //       console.log('teste')
  //       if (this.component.getAttribute('data-expanded') === 'off') {
  //         this.component.setAttribute('data-expanded', 'on')
  //       } else {
  //         this.component.setAttribute('data-expanded', 'off')
  //       }
  //     })
  //   }
  // }

  _setDragBehavior() {
    for (const img of this.component.querySelectorAll('img')) {
      img.setAttribute('draggable', 'false')
    }
    for (const link of this.component.querySelectorAll('a')) {
      link.setAttribute('draggable', 'false')
    }
    this.component.addEventListener('dragstart', (event) => {
      event.stopPropagation()
      event.dataTransfer.setData(
        'text/plain',
        this.component.getAttribute('id')
      )
      event.dropEffect = 'move'
    })
  }
}

class BRCardFlip {
  constructor() {
    this._setBehavior()
  }

  _setBehavior() {
    const cardFlippers = document.querySelectorAll('.br-card[data-flip]')

    for (const cardFlip of cardFlippers) {
      const cardFront = cardFlip.querySelector('.front')
      const cardBack = cardFlip.querySelector('.back')
      const cardFrontTrigger = cardFlip.querySelector(
        '.front [data-toggle="flip"]'
      )
      const cardBackTrigger = cardFlip.querySelector(
        '.back [data-toggle="flip"]'
      )
      this._cardFlipInit(cardFront, cardBack, cardFrontTrigger, cardBackTrigger)
      this._setCardFrontTrigger(
        cardFrontTrigger,
        cardFront,
        cardBack,
        cardBackTrigger
      )
      this._setCardBackTrigger(
        cardBackTrigger,
        cardFront,
        cardBack,
        cardFrontTrigger
      )
    }
  }

  _setCardFrontTrigger(cardFrontTrigger, cardFront, cardBack, cardBackTrigger) {
    cardFrontTrigger.addEventListener('click', () => {
      return this._cardFlipShowBack(
        cardFront,
        cardBack,
        cardFrontTrigger,
        cardBackTrigger
      )
    })
  }

  _setCardBackTrigger(cardBackTrigger, cardFront, cardBack, cardFrontTrigger) {
    cardBackTrigger.addEventListener('click', () => {
      return this._cardFlipShowFront(
        cardFront,
        cardBack,
        cardFrontTrigger,
        cardBackTrigger
      )
    })
  }

  _cardFlipInit(cardFront, cardBack, cardFrontTrigger, cardBackTrigger) {
    this._cardFlipShowFront(
      cardFront,
      cardBack,
      cardFrontTrigger,
      cardBackTrigger
    )
  }

  _cardFlipShowFront(cardFront, cardBack, cardFrontTrigger, cardBackTrigger) {
    cardFront.removeAttribute('hidden')
    cardFront.setAttribute('aria-hidden', 'false')
    cardFrontTrigger.setAttribute('aria-expanded', 'true')
    cardBack.setAttribute('aria-hidden', 'true')
    cardBack.setAttribute('hidden', '')
    cardBackTrigger.setAttribute('aria-expanded', 'false')
  }

  _cardFlipShowBack(cardFront, cardBack, cardFrontTrigger, cardBackTrigger) {
    cardFront.setAttribute('hidden', '')
    cardFront.setAttribute('aria-hidden', 'true')
    cardFrontTrigger.setAttribute('aria-expanded', 'false')
    cardBack.removeAttribute('hidden')
    cardBack.setAttribute('aria-hidden', 'false')
    cardBackTrigger.setAttribute('aria-expanded', 'true')
  }
}

class BRCardCollapse {
  constructor(component) {
    this.component = component
    this._setBehavior()
  }

  _setBehavior() {
    // Padrão de toggle no card
    const cardToggler = this.component.querySelector('[data-expanded]')

    if (cardToggler !== null) {
      const cardTogglerTarget = this.component.querySelector(
        cardToggler.dataset.target
      )
      this._cardCollapseInit(cardToggler, cardTogglerTarget)
      cardToggler.addEventListener('click', () => {
        if (cardToggler.getAttribute('data-expanded') === 'on') {
          this._cardHiddenContent(cardToggler, cardTogglerTarget)
        } else {
          this._cardShowContent(cardToggler, cardTogglerTarget)
        }
      })
    }
  }

  _cardShowContent(cardToggler, cardTogglerTarget) {
    cardToggler.setAttribute('data-expanded', 'on')
    cardTogglerTarget.setAttribute('aria-hidden', 'false')
    cardTogglerTarget.removeAttribute('hidden')
    cardToggler.querySelector('i').classList.remove('fa-angle-down')
    cardToggler.querySelector('i').classList.add('fa-angle-up')
  }

  _cardHiddenContent(cardToggler, cardTogglerTarget) {
    cardToggler.setAttribute('data-expanded', 'off')
    cardTogglerTarget.setAttribute('aria-hidden', 'true')
    cardTogglerTarget.setAttribute('hidden', '')
    cardToggler.querySelector('i').classList.remove('fa-angle-up')
    cardToggler.querySelector('i').classList.add('fa-angle-down')
  }

  _cardCollapseInit(cardToggler, cardTogglerTarget) {
    if (cardToggler.dataset.visible) {
      if (cardToggler.dataset.visible === 'true') {
        this._cardShowContent(cardToggler, cardTogglerTarget)
      } else {
        this._cardHiddenContent(cardToggler, cardTogglerTarget)
      }
    } else {
      this._cardHiddenContent(cardToggler, cardTogglerTarget)
    }
  }
}

const listCard = []
for (const [index, brCard] of window.document
  .querySelectorAll('.br-card')
  .entries()) {
  listCard.push(new BRCard('br-card', brCard, index))
}

export default BRCard
