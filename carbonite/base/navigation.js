import { slideUp, slideToggle } from './utils';

function validate(event) {
  let anchor = event.currentTarget;

  if (
    anchor.getAttribute('href').trim() === '#' ||
    anchor.getAttribute('href').trim() === ''
  ) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
}

function toggleMenu() {
  document.body.classList.remove('opened-menu');
}

function toggleSubMenu(event) {
  const btnToggle = event.currentTarget;
  const currentSubmenu = btnToggle.parentNode.nextElementSibling;
  const subMenu = document.querySelectorAll('.js-submenu');

  if (btnToggle.classList.contains('active')) {
    slideUp(currentSubmenu);
    currentSubmenu.classList.remove('active');
    btnToggle.classList.remove('active');
  } else {
    subMenu.forEach(item => item.classList.remove('active'));
    currentSubmenu.classList.add('active');
    slideToggle(currentSubmenu);
    btnToggle.classList.add('active');
  }
}

function initializeNavigation() {
  const links = document.querySelectorAll('.ip-menu-link');

  if (links) {
    links.forEach(link => {
      link.addEventListener('click', validate)
    });
  }

  const btnToggleMenu = document.querySelectorAll('.js-toggle-menu');

  if (btnToggleMenu) {
    btnToggleMenu.forEach(btn =>
      btn.addEventListener('click', toggleMenu)
    );
  }

  const btnToggleSubMenu = document.querySelectorAll('.js-submenu-toggle');

  if (btnToggleSubMenu) {
    btnToggleSubMenu.forEach(btn => {
      btn.addEventListener('click', toggleSubMenu)
    })
  }
}

export default initializeNavigation;
