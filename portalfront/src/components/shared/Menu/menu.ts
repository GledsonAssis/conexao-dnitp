class BRMenu {
  name: any;

  component: any;

  trigger: any;

  scrim: any;

  dismiss: any;

  componentFolders: any;

  componentItems: any;

  constructor(name: string, component: any) {
    this.name = name;
    this.component = component;
    this.trigger = this.component.querySelector('[data-toggle="menu"]');
    this.scrim = this.component.querySelector('.menu-scrim');
    this.dismiss = this.component.querySelectorAll('[data-dismiss="menu"]');
    this.componentFolders = this.component.querySelectorAll('.menu-folder');
    this.componentItems = this.component.querySelectorAll('.menu-item');
    this._setBehavior();
  }

  _setBehavior() {
    this._toggleMenu();
    this._closeMenu();
    this._setDropMenu();
    this._setSideMenu();
    this._setKeyboardBehaviors();
    this._initType2Menu();
  }

  _setKeyboardBehaviors() {
    // Fechar com tecla ESC
    this.component.addEventListener('keyup', (event: { keyCode: any }) => {
      switch (event.keyCode) {
        case 27:
          this._closeMenu();
          break;
        default:
          break;
      }
    });
    // Fechar com Tab fora do menu
    if (this.scrim) {
      this.scrim.addEventListener('keyup', () => this._closeMenu());
    }
  }

  _toggleMenu() {
    // Clicar no trigger
    if (this.trigger) {
      this.trigger.addEventListener('click', () => {
        // Fechar Menu caso esteja aberto
        if (this.component.classList.contains('active')) {
          this._closeMenu();
          return;
        }
        // Abre Menu
        this._openMenu();
      });
    }
    // Clicar no dismiss
    for (const close of this.dismiss) {
      close.addEventListener('click', () => this._closeMenu());
    }
  }

  _openMenu() {
    return this.component.classList.add('active');
  }

  _closeMenu() {
    return this.component.classList.remove('active');
  }

  _setDropMenu() {
    // Configura Drop Menu para filho imediato de ".menu-folder"
    for (const item of this.component.querySelectorAll('.menu-folder > a.menu-item')) {
      // Inclui ícone de Drop Menu
      this._createIcon(item, 'fa-angle-down');
      // Configura como Drop Menu
      item.parentNode.classList.add('drop-menu');
      // Inicializa Drop Menu
      this._toggleDropMenu(item);
    }
  }

  _setSideMenu() {
    // Configura Side Menu para quem não for filho imediato de ".menu-folder"
    for (const ul of this.component.querySelectorAll('a.menu-item + ul')) {
      if (!ul.parentNode.classList.contains('menu-folder')) {
        // Inclui ícone de Side Menu
        this._createIcon(ul.previousElementSibling, 'fa-angle-right');
        // Configura como Side Menu
        ul.parentNode.classList.add('side-menu');
        // Inicializa Side Menu
        this._toggleSideMenu(ul.previousElementSibling);
      }
    }
  }

  _toggleDropMenu(element: any) {
    element.addEventListener('click', () => {
      // Fecha Drop Menu caso esteja aberto
      if (element.parentNode.classList.contains('active')) {
        element.parentNode.classList.remove('active');
        return;
      }

      // Abre Drop Menu
      element.parentNode.classList.add('active');
    });
  }

  _toggleSideMenu(element: any) {
    element.addEventListener('click', () => {
      // Esconde todos os itens
      this._hideItems(element);

      // Mostra itens do Side Menu ativo
      this._showItems(element.parentNode);

      // Fecha Side Menu caso esteja aberto
      if (element.parentNode.classList.contains('active')) {
        this._closeSideMenu(element);
        element.focus();
        return;
      }

      // Abre Side Menu
      element.parentNode.classList.add('active');
      element.focus();
    });
  }

  _closeSideMenu(element: any) {
    element.parentNode.classList.remove('active');
    // Verifica se existe Side Menu anterior, caso contrário mostra todos os itens de volta
    const parentFolder = element.parentNode.closest('.side-menu.active')
      ? element.parentNode.closest('.side-menu.active')
      : element.closest('.menu-body');
    this._showItems(parentFolder);
  }

  _hideItems(element: any) {
    for (const item of element.closest('.menu-body').querySelectorAll('.menu-item')) {
      item.setAttribute('hidden', '');
    }
  }

  _showItems(element: any) {
    for (const item of element.querySelectorAll('.menu-item')) {
      item.removeAttribute('hidden');
    }
  }

  _createIcon(element: any, icon: string) {
    const menuIconContainer = document.createElement('span');
    menuIconContainer.classList.add('support');

    const menuIcon = document.createElement('i');
    menuIcon.classList.add('fas');
    menuIcon.classList.add(icon);
    menuIcon.setAttribute('aria-hidden', 'true');

    menuIconContainer.appendChild(menuIcon);
    element.appendChild(menuIconContainer);
  }

  _initType2Menu() {
    const ativadorMenu: any = document.querySelector('[data-toggle="menu"][data-target="#navigation"]');
    if (ativadorMenu) {
      ativadorMenu.addEventListener('click', () => {
        document.querySelector(ativadorMenu.dataset.target).classList.toggle('active');
      });
    }
  }
}

// const menuList = []
// if (typeof window !== "undefined") {
//   for (const brMenu of window.document.querySelectorAll('.br-menu:not(.dsgov)')) {
//     menuList.push(new BRMenu('br-menu', brMenu))
//   }
// }

export default BRMenu;
