import initializeSectionHome from './sections/home';
import initializeSectionAbout from './sections/about';
import initializeSectionFeatured from './sections/featured';
import initializeSectionTestimonials from './sections/testimonials';
import initializeSectionBlog from './sections/blog';

(function ($) {

  initializeSectionHome($);
  initializeSectionAbout($);
  initializeSectionFeatured($);
  initializeSectionTestimonials($);
  initializeSectionBlog($);

  $(document).on('click', '.ip-header-navigation .js-menu-link', function(e) {
    e.preventDefault();

    let target = this.hash;

    if (target) {
        target = $(target);

        $('html, body').stop().animate({
          'scrollTop': target.offset().top - headerHeight
        }, 500, 'swing');
    } else {
      target = this.href;

      if (target.indexOf('#') == -1 ) {
        window.open(target, '_self');
      }
    }

  });

})(jQuery);
