// TODO: Work on implementation...
const THEME_TOGGLER_ELEMENT = document.getElementById(ELE_ID);
const ICON_CLASS = {
  LIGHT: 'light',
  DARK: 'dark'
};

function ThemeToggler() {
  function render() {
    THEME_TOGGLER_ELEMENT.classList.remove('hidden');
  }
  function initialize() {
    render();
  }

  initialize();
}

ThemeToggler();
