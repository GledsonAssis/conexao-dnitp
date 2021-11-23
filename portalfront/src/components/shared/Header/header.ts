class BRHeader {
  name: any;

  component: any;

  componentSearch: any;

  componentSearchInput: any;

  componentSearchTrigger: any;

  componentSearchDismiss: any;

  constructor(name: string, component: Element) {
    this.name = name;
    this.component = component;
    this.componentSearch = this.component.querySelector('.header-search');
    this.componentSearchInput = this.component.querySelector('.header-search input');
    this.componentSearchTrigger = this.component.querySelector('[data-toggle="search"]');
    this.componentSearchDismiss = this.component.querySelector('[data-dismiss="search"]');
    this._setBehavior();
  }

  _setBehavior() {
    this._setLoginBehavior();
    this._setLogoutBehavior();
    this._setSearchBehaviors();
    this._setKeyboardBehaviors();
    this._setDropdownBehavior();
    this._setSticky();
  }

  _setLoginBehavior() {
    for (const login of this.component.querySelectorAll('[data-trigger="login"]')) {
      login.addEventListener('click', () => {
        const loginParent = login.closest('.header-login');
        loginParent.querySelector('.header-sign-in').classList.add('d-none');
        loginParent.querySelector('.header-avatar').classList.remove('d-none');
      });
    }
  }

  _setLogoutBehavior() {
    for (const logout of this.component.querySelectorAll('[data-trigger="logout"]')) {
      logout.addEventListener('click', () => {
        const logoutParent = logout.closest('.header-login');
        logoutParent.querySelector('.avatar').classList.remove('show');
        logoutParent.querySelector('[data-toggle="dropdown"]').classList.remove('active');
        logoutParent.querySelector('.header-sign-in').classList.remove('d-none');
        logoutParent.querySelector('.header-avatar').classList.add('d-none');
      });
    }
  }

  _setSearchBehaviors() {
    // Abrir busca
    if (this.componentSearchTrigger) {
      this.componentSearchTrigger.addEventListener('click', () => {
        this._openSearch();
      });
    }

    // Fechar busca
    if (this.componentSearchDismiss) {
      this.componentSearchDismiss.addEventListener('click', () => {
        this._closeSearch();
      });
    }
  }

  _setKeyboardBehaviors() {
    if (this.componentSearchInput) {
      this.componentSearchInput.addEventListener('keydown', (event: any) => {
        switch (event.keyCode) {
          // Tecla ESC
          case 27:
            this._closeSearch();
            break;
          default:
            break;
        }
      });
    }
  }

  _openSearch() {
    if (this.componentSearch) {
      this.componentSearch.classList.add('active');
      this.componentSearch.querySelector('input').focus();
    }
  }

  _closeSearch() {
    if (this.componentSearch) {
      this.componentSearch.classList.remove('active');
      this.componentSearchTrigger.focus();
    }
  }

  _setDropdownBehavior() {
    for (const trigger of this.component.querySelectorAll('.dropdown [data-toggle="dropdown"]')) {
      trigger.addEventListener('click', () => {
        if (trigger.parentNode.classList.contains('show')) {
          trigger.classList.remove('active');
          trigger.parentNode.classList.remove('show');
          return;
        }
        trigger.classList.add('active');
        trigger.parentNode.classList.add('show');
      });
    }
  }

  _setSticky() {
    if (this.component.hasAttribute('data-sticky')) {
      window.onscroll = () => {
        if (window.pageYOffset > this.component.offsetHeight) {
          this.component.classList.add('sticky', 'compact');
        } else {
          this.component.classList.remove('sticky', 'compact');
        }
      };
    }
  }
}

export default BRHeader;
