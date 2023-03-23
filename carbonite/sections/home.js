import { removeClassByPrefix } from '../base/utils';

const initializeSectionHome = $ => {
  const getDeviceWidth = () => {
    return (window.innerWidth > 0) ? window.innerWidth : screen.width;
  };

  const getDevice = () => {
    const deviceWidth = getDeviceWidth();

    let device = 'mobile';
    if (deviceWidth >= 768) device = 'tablet';
    if (deviceWidth >= 1200) device = 'desktop';

    return device;
  };

  const addPicture = (appendTo, device, srcSet) => {
    const { mobile, tablet, desktop } = srcSet;

    const picture = document.createElement('picture');
    const sourceMobile = document.createElement('source');
    const sourceTablet = document.createElement('source');
    const img = document.createElement('img');

    if (device === 'desktop') {
      sourceTablet.srcset = tablet;
      sourceTablet.media = '(max-width: 1200px)';
      sourceMobile.srcset = mobile;
      sourceMobile.media = '(max-width: 480px)';
      img.src = desktop;

      picture.appendChild(sourceTablet);
      picture.appendChild(sourceMobile);
      picture.appendChild(img);
    }

    if (device === 'tablet') {
      sourceMobile.srcset = mobile;
      sourceMobile.media = '(max-width: 480px)';
      img.src = tablet;
      picture.appendChild(sourceMobile);
      picture.appendChild(img);
    }

    if (device === 'mobile') {
      img.src = mobile;
      picture.appendChild(img);
    }

    picture.classList.add('ip-item');
    appendTo.appendChild(picture);
  };

  const addVideo = (appendTo, sectionId, video) => {
    const { url } = video;

    if (url) {
      const div = document.createElement('div');
      div.dataset.type = 'video';
      div.dataset.title = '';
      div.dataset.wrapper = sectionId;
      div.dataset.src = url;
      div.dataset.autoplay = true;
      div.dataset.muted = true;
      div.dataset.loop = true;

      div.classList.add('ip-video', 'ibc-js-lazy');
      appendTo.appendChild(div);
    }
  }

  const addSlider = (appendTo, device, sectionId, slider) => {
    const div = document.createElement('div');

    div.classList.add('ip-slider', 'js-slider-home');
    div.setAttribute('id', sectionId);

    slider.forEach(slide => {
      const { mobile, tablet, desktop } = slide;

      const picture = document.createElement('picture');
      const sourceMobile = document.createElement('source');
      const sourceTablet = document.createElement('source');
      const img = document.createElement('img');

      if (device === 'desktop') {
        sourceTablet.srcset = tablet;
        sourceTablet.media = '(max-width: 1200px)';
        sourceMobile.srcset = mobile;
        sourceMobile.media = '(max-width: 480px)';
        img.dataset.lazy = desktop;
        img.classList.add('gs-lazy');
        img.setAttribute('alt', '');
        img.setAttribute('draggable', false);

        picture.appendChild(sourceTablet);
        picture.appendChild(sourceMobile);
        picture.appendChild(img);
      }

      if (device === 'tablet') {
        sourceMobile.srcset = mobile;
        sourceMobile.media = '(max-width: 480px)';
        img.dataset.lazy = tablet;
        img.classList.add('gs-lazy');
        img.setAttribute('alt', '');
        img.setAttribute('draggable', false);
        picture.appendChild(sourceMobile);
        picture.appendChild(img);
      }

      if (device === 'mobile') {
        img.dataset.lazy = mobile;
        img.classList.add('gs-lazy');
        img.setAttribute('alt', '');
        img.setAttribute('draggable', false);
        picture.appendChild(img);
      }

      picture.classList.add('ip-item');
      div.appendChild(picture);
    });

    appendTo.appendChild(div);
  };

  const backgroundMedia = document.querySelectorAll('.js-background-media');

  if (backgroundMedia.length) {
    let device = getDevice();

    backgroundMedia.forEach(item => {
      const sectionId = item.parentNode.parentNode.getAttribute('id');
      const backgroundOverlay = document.getElementById(sectionId).querySelector('.js-background-overlay');
      const data = JSON.parse(item.dataset.bg);

      if (backgroundOverlay) {
        backgroundOverlay.style.setProperty('--ip-section-background-color', data[device].overlayColor);
      }

      if (
        data.hasOwnProperty(device) &&
        data[device].hasOwnProperty('type') &&
        data[device].hasOwnProperty(data[device].type) &&
        data[device].type
      ) {
        const type = data[device].type;
        const dataByDevice = data[device][type];

        if (dataByDevice && Object.keys(dataByDevice).length !== 0) {
          if (type === 'image') {
            addPicture(item, device, dataByDevice);
          }

          if (type === 'slider') {
            addSlider(item, device, sectionId, dataByDevice);
          }

          if (type === 'video') {
            addVideo(item, sectionId, dataByDevice);
          }
        }
      }
    });
  }

  // Content position

  const section = document.querySelectorAll('.js-section-home');

  if (section.length) {
    let device = getDevice();

    section.forEach(item => {
      const sectionId = document.getElementById(item.getAttribute('id'));

      if (sectionId.hasAttribute('data-position')) {
        const data = JSON.parse(sectionId.dataset.position);

        removeClassByPrefix(sectionId, 'content-position-');
        sectionId.classList.add(data[device]);
      }
    });
  }

  // Text animation
  const wrapText = document.querySelectorAll('.js-change-text');

  if (wrapText.length) {
    wrapText.forEach(wrap => {

      let texts = wrap.querySelectorAll('.js-text');
      let textIndex = -1;

      if (texts.length > 1) {
        showNextText(textIndex, texts);
      } else {
        $(texts).fadeIn(300, function () {
          texts.forEach(text => {
            text.classList.add('active', 'show');
          });
        })
      }

    });

    function showNextText(textIndex, texts) {
      ++textIndex;
      texts.forEach( text => {
        text.classList.remove('active','show');
      });

      texts[textIndex % texts.length].classList.add('active');
      $(texts[textIndex % texts.length])
        .fadeIn(300, function () {
          $(this).addClass("show")
        })
        .delay(4000)
        .fadeOut(900, function() {
          showNextText(textIndex, texts)
        });
    }
  }

  // Slider for section
  const $sliderHome = $('.js-slider-home');

  if ($sliderHome.length) {
    $.each($sliderHome, function() {

      let $slider = $(this);

      $slider.greatSlider({
        type: 'fade',
        nav: false,
        lazyLoad: true,
        bullets: false,
        autoHeight: false,
        autoplay: true,
        autoplaySpeed: 7000,
      });

    });
  }

  const dropdownBtn = document.querySelector('.ibc-js-dropdown-toggle');
  const dropdownMenu = document.querySelector('.ibc-js-dropdown-menu');

  if (dropdownBtn) {

    // Toggle dropdown function
    const toggleDropdown = function () {
      dropdownMenu.classList.toggle('show');
      dropdownBtn.classList.toggle('show');

      dropdownBtn.setAttribute(
        'aria-expanded',
        dropdownBtn.getAttribute('aria-expanded') === 'true'
          ? 'false'
          : 'true'
      );
    };

    // Toggle dropdown open/close when dropdown button is clicked
    dropdownBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleDropdown();
    });

    // Close dropdown when dom element is clicked
    document.documentElement.addEventListener('click', function () {
      if (dropdownMenu.classList.contains('show')) {
        toggleDropdown();
      }
    });

    const dropdownItem = dropdownMenu.querySelectorAll('.ibc-js-dropdown-item');
    const searchHybrid = document.querySelectorAll('.ibc-js-search-hybrid');
    const searchHybridButton = document.querySelector('.js-ibc-search-hybrid-button');
    const searchHybridLinkRentals = document.getElementById('search-hybrid-link-rentals');
    const searchHybridLinkRegular = document.getElementById('search-hybrid-link-regular');

    dropdownItem.forEach((item) => {
      item.addEventListener('click', toggleItem)
    })

    const dropdownMobileItem = document.querySelectorAll('.ibc-js-dropdown-mobile-item');

    dropdownMobileItem.forEach((item) => {
      item.addEventListener('click', (event) => {
        toggleItem(event, 'mobile')
      })
    })

    function toggleItem(event, mobile = '') {
      const selectedItem = event.currentTarget;
      const text = selectedItem.innerHTML;
      const target = selectedItem.dataset.target;
      const selectedPane = document.querySelector(target);

      dropdownBtn.innerHTML = text;

      dropdownItem.forEach((item) => {
        item.classList.remove('active');
      })

      if (mobile == 'mobile') {
        dropdownMobileItem.forEach((item) => {
          item.classList.remove('active');
        })
      }

      selectedItem.classList.add('active');

      searchHybrid.forEach((search) => {
        search.classList.add('ip-d-none');
      });

      selectedPane.classList.remove('ip-d-none')

      searchHybridButton.dataset.search = target === '#search-rentals' ? 'rentals' : 'regular';

      if (target === '#search-rentals') {
        searchHybridLinkRentals.classList.remove('ip-d-none')
        searchHybridLinkRegular.classList.add('ip-d-none');
      } else {
        searchHybridLinkRentals.classList.add('ip-d-none')
        searchHybridLinkRegular.classList.remove('ip-d-none');
      }

    }



    // function toggleMobileItem(event) {
    //   const selectedItem = event.currentTarget;
    //   const text = selectedItem.innerHTML;
    //   const target = selectedItem.dataset.target;
    //   const selectedPane = document.querySelector(target);

    //   dropdownBtn.innerHTML = text;

    //   dropdownItem.forEach((item) => {
    //     item.classList.remove('active');
    //   })

    //   selectedItem.classList.add('active');

    //   searchHybrid.forEach((search) => {
    //     search.classList.add('ip-d-none');
    //   });

    //   selectedPane.classList.remove('ip-d-none')

    //   searchHybridButton.dataset.search = target === '#search-rentals' ? 'rentals' : 'regular';

    // }

    let searchRentalsButton;
    const searchRegularButton = document.getElementById('clidxboost-btn-search');

    function toggleSearch(event) {
      const button = event.currentTarget;
      searchRentalsButton = document.querySelector('#search-rentals .ib-footer-modal .ib-btn.js-submit-filter');

      if (button.dataset.search === 'rentals') {
        searchRentalsButton.click();
      } else {
        searchRegularButton.click();
      }
    }

    searchHybridButton.addEventListener('click', toggleSearch);

  }
}

export default initializeSectionHome;
