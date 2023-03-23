const initializeSectionAbout = $ =>  {

  // Slider for section
  const $sliderAbout = $('.js-slider-about');

  if ($sliderAbout.length) {
    $.each($sliderAbout, function() {

      let $slider = $(this);

      $slider.greatSlider({
        type: 'swipe',
        nav: true,
        lazyLoad: true,
        bullets: false,
        autoHeight: false,
      });

    });
  }

}

export default initializeSectionAbout;
