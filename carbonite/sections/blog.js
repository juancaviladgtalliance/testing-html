import { setAriaLabelOnArrows } from '../base/slider';

const initializeSectionBlog = $ => {

  // Slider for section
  const $sliderBlog = $('.js-slider-blog');

  if ($sliderBlog.length) {
    $.each($sliderBlog, function() {

      // Get slider's format to show
      let $slider = $(this);
      let format =  $slider.parents(".ip-section");

      if (format.hasClass('ip-format-a')) {
        $slider.greatSlider({
          type: 'swipe',
          nav: true,
          bullets: false,
          items: 1,
          autoDestroy: true,
          breakPoints: {
            640: { items: 2 },
            1024: { items: 3 },
            1400: { items: 4}
          },
          onInited: function() {
            setAriaLabelOnArrows($slider);
          },
          onResized: function() {
            setAriaLabelOnArrows($slider);
          }
        });
      }

    });
  }

}

export default initializeSectionBlog;
