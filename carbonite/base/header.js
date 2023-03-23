import { appendModalToContainer } from './utils';

/**
 * Set color.
 * @param {string|jQuery|Element} header The HTML id, jQuery object, or DOM Element for the header.
 * @returns {undefined}
 */
function setColor(header) {

  if (header.classList.contains('ip-header-transparent')) {
    let height = header.offsetHeight;

    window.addEventListener('scroll', () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      if (scrollTop > height) {
        header.classList.add('ip-header-color');
        changeLogo('dark');
      } else {
        header.classList.remove('ip-header-color');
        changeLogo('light');
      }
    });
  }

  function changeLogo(type) {
    let headerLogo = header.querySelectorAll('.js-header-logo-image');

    if (headerLogo) {
      headerLogo.forEach(logo => {
        let logoDark = logo.getAttribute('data-logo-dark');
        let logoLight = logo.getAttribute('data-logo-light');

        if (type == 'light') {
          logo.setAttribute('src', logoLight);
        }

        if (type == 'dark') {
          logo.setAttribute('src', logoDark);
        }
      });
    }
  }

}

const initializeHeader = () => {

  if ( document.body.classList.contains('home') ) {
    const header = document.querySelector('.js-header');

    if (header) {
      setColor(header);
    }
  }

  // Move modal for cta's header
  const ctaModal = document.body.querySelector('.js-modal-cta');
  appendModalToContainer(ctaModal);

}

export default initializeHeader;
