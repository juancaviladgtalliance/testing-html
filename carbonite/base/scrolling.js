function handleScrolling (event) {
  let btn = event.currentTarget;
  let section = btn.closest('.js-section');
  let sectionSibling = section.nextElementSibling;

  if (sectionSibling) {
    let $header = jQuery('.ip-header');
    let headerHeight = jQuery('.ip-header').outerHeight();

    if ( $header.hasClass('ip-header-transparent') ) {
      headerHeight -= 10;
    }

    //Se calcula la altura en la que se encuentra el elmeneto y se realiza un resta para una mejor posicion
    let sectionSiblingPosition = ( jQuery(sectionSibling).offset().top ) - headerHeight;
    //Se realiza la animacion del scroll hacia la posicion calculada
    jQuery('html, body').animate({
      scrollTop: sectionSiblingPosition
    }, 800);
  }
}

function handleScroll(event) {
  let anchor = event.currentTarget;

  if (
    anchor.getAttribute('href') === '#' ||
    anchor.getAttribute('href') === ''
  ) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  if ( anchor.hash ) {
    let target = document.querySelector(`${anchor.hash}`);
    if (target) {
      event.preventDefault();

      let $header = jQuery('.ip-header');
      let headerHeight = jQuery('.ip-header').outerHeight();

      if ( $header.hasClass('ip-header-transparent') ) {
        headerHeight -= 10;
      }

      // Se calcula la altura en la que se encuentra el elmeneto y se realiza un resta para una mejor posicion
      let targetPosition = ( jQuery(target).offset().top ) - headerHeight;
      // Se realiza la animacion del scroll hacia la posicion calculada
      jQuery('html, body').animate({
        scrollTop: targetPosition
      }, 800);

    }
  }
}

function initializeScrolling() {
  let scrollingBtn = document.querySelectorAll('.js-btn-scrolling');

  if (scrollingBtn) {
    scrollingBtn.forEach(btn => {
      btn.addEventListener('click', handleScrolling)
    })
  }

  let anchors = document.querySelectorAll('.js-btn');

  if (anchors) {
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleScroll)
    })
  }
}

export default initializeScrolling;
