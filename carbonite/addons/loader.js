ibcDomReady(() => {

  const loader = document.querySelector('.js-loader');

  if (loader) {
    const animationName = loader.dataset.animationName || 'ibc-a-fade-out';
    const animationDuration = loader.dataset.animationDuration || '2000ms';

    if (animationName && animationDuration) {
      window.addEventListener('load', function() {
        loader.style.animation = `${animationName} ${animationDuration} ease 300ms both`;

        loader.addEventListener('animationend', () => {
          loader.classList.remove('ip-d-flex');
          loader.classList.add('ip-d-none');
        });
      });
    }
  }

});
