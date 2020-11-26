const HIDDEN_CLASS = 'hidden';

function MenuToggleBtn() {
  const siteNavElement = document.getElementById('site-nav');
  const menuToggleTemplate = document.getElementById('menu-toggle-template');
  let isOpen = false;
  let menuToggler = null;
  let menuIcons = { menu: null, close: null };
  let onStateChangeCallback = null;

  return {
    toggleState() {
      if (!menuToggler) return;

      isOpen = !isOpen;
      menuToggler.innerHTML = '';
      menuToggler.appendChild(isOpen ? menuIcons.close : menuIcons.menu);

      if (onStateChangeCallback) {
        onStateChangeCallback(isOpen);
      }
    },
    onStateChange(cb) {
      onStateChangeCallback = cb;
    },
    show() {
      if (!menuToggler) return;

      menuToggler.classList.remove(HIDDEN_CLASS);
    },
    hide() {
      if (!menuToggler) return;

      isOpen = false;
      menuToggler.classList.add(HIDDEN_CLASS);
      menuToggler.innerHTML = '';
      menuToggler.appendChild(menuIcons.menu);
    },
    render() {
      siteNavElement
        .querySelector('.content')
        .appendChild(menuToggleTemplate.content.cloneNode(true));

      menuToggler = siteNavElement.querySelector('.menu-toggle');
      menuIcons.menu = siteNavElement.querySelector('.menu-icon');
      menuIcons.close = siteNavElement.querySelector('.close-icon');

      menuToggler.addEventListener('click', this.toggleState);

      menuIcons.close.remove();
      menuToggleTemplate.remove();
      siteNavElement.querySelector('script').remove();
    }
  }
}

function SiteNav () {
  const largeScreen = window.matchMedia('(min-width: 768px)');
  const menuTogglerBtn = new MenuToggleBtn();
  const menu = document.getElementById('menu');

  function toggle(isOpen) {
    if (isOpen) {
      menu.classList.remove(HIDDEN_CLASS);
    } else {
      menu.classList.add(HIDDEN_CLASS);
    }
  }

  function updateUI () {
    if (!largeScreen.matches) {
      menu.classList.add(HIDDEN_CLASS);
      menuTogglerBtn.show();
    } else {
      menu.classList.remove(HIDDEN_CLASS);
      menuTogglerBtn.hide();
    }
  }

  function initialize() {
    menuTogglerBtn.render();
    menuTogglerBtn.onStateChange(toggle);

    updateUI();

    largeScreen.addEventListener('change', updateUI);
  }

  document.addEventListener('DOMContentLoaded', initialize);
}

SiteNav();
