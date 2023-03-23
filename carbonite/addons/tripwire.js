import { appendModalToContainer } from '../base/utils';

(function() {

  function removeTripwire(event) {
    const btnClose = event.currentTarget;
    const currentTripwire = btnClose.closest('.js-tripwire');

    if (currentTripwire) {
      currentTripwire.classList.add('ip-transition-close');
      setTimeout(() => currentTripwire.remove(), 1000);
    }
  }

  const btnCloseTripwire = document.querySelectorAll('.js-tripwire-close');

  if (btnCloseTripwire) {
    btnCloseTripwire.forEach(btn => {
      btn.addEventListener('click', removeTripwire)
    });
  }

  // Move modal for tripwire
  const modalTripwire = document.body.querySelector('.js-modal-tripwire');
  appendModalToContainer(modalTripwire);

})();
