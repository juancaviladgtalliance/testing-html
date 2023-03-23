import { setAriaLabelOnArrows, setAriaLabelOnBullets } from '../base/slider';

const initializeSectionTestimonials = $ => {

  // Slider for section
  const $sliderTestimonials = $('.js-slider-testimonials');

  if ($sliderTestimonials.length) {
    $.each($sliderTestimonials, function() {

      // Get slider's format to show
      let $slider = $(this);
      let format =  $slider.parents(".ip-section-testimonials");

      if (format.hasClass('ip-format-a') ||  format.hasClass('ip-format-b')) {
        $slider.greatSlider({
          type: 'swipe',
          nav: false,
          bullets: true,
          items: 1,
          autoDestroy: true,
          autoHeight: true,
          layout: { resizeClass: 'ms-resize' },
          breakPoints: {
            768: { items: 2 },
            1024: { items: 3 },
            1400: { nav: true }
          },
          onInited: function() {
            setAriaLabelOnArrows($slider);
            setAriaLabelOnBullets($slider);
          },
          onResized: function() {
            setAriaLabelOnArrows($slider);
            setAriaLabelOnBullets($slider);
          }
        });
      } else {
        $slider.greatSlider({
          type: 'swipe',
          nav: false,
          bullets: true,
          autoHeight: true,
          autoDestroy: true,
          items: 1,
          layout: { resizeClass: 'ms-resize' },
          onInited: function() {
            setAriaLabelOnBullets($slider);
          },
          onResized: function() {
            setAriaLabelOnBullets($slider);
          }
        });
      }

    });
  }

}

export default initializeSectionTestimonials;
