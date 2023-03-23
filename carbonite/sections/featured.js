import { setAriaLabelOnArrows, setAriaLabelOnBullets } from '../base/slider';

const initializeSectionFeatured = $ => {

  // Slider for section
  const $sliderFeatured = $('.js-slider-featured');

  if ($sliderFeatured.length) {
    $.each($sliderFeatured, function() {

      // Get slider's format to show
      let $slider = $(this);
      let format =  $slider.parents(".ip-section-featured");

      if (format.hasClass('ip-format-a')) {
        $slider.greatSlider({
          type: 'swipe',
          nav: true,
          bullets: false,
          autoDestroy: true,
          breakPoints: {
            640: { items: 2 },
            1024: { items: 3 },
            1200: { items: 4},
            1400: { items: 5}
          },
          onInited: function() {
            setAriaLabelOnArrows($slider);
          },
          onResized: function() {
            setAriaLabelOnArrows($slider);
          }
        });
      } else if(format.hasClass('ip-format-c')){
        $slider.greatSlider({
          type: 'swipe',
          nav: true,
          bullets: true,
          items: 1,
          autoDestroy: true,
          layout: { resizeClass: 'ms-resize' },
          breakPoints: {
            320: { items: 1 },
            640: { items: 2, nav: true, bullets: false },
          },
          onInited: function() {
            setAriaLabelOnArrows($slider);
          },
          onResized: function() {
            setAriaLabelOnArrows($slider);
          }
        });
      }else {
        $slider.greatSlider({
          type: 'swipe',
          navSpeed: 1000,
          lazyLoad: true,
          nav: false,
          bullets: true,
          items: 1,
          autoDestroy: true,
          layout: { resizeClass: 'ms-resize' },
          breakPoints: {
            640: { items: 2, nav: true, bullets: false },
            1024: { items: 3 },
            1400: { items: 4 }
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
      }
    });
  }

}

export default initializeSectionFeatured;
