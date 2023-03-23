(function ($) {

  $(document).on('click', '.sp-close', function (e) {
    e.preventDefault();
    let modalId = $(this).attr('data-id');
    // $(this).parents('.sp-wrap-modal').removeClass('active_modal');
    // $('body').removeClass('openModal');
    $(this).parents('.bs-modal').removeClass('show');
    $('body').removeClass('bs-modal-open');
    $('body').css('overflow', '');
    $(this).parents('.bs-modal').hide();
    $(this).parents('.bs-modal').find(".bs-modal-backdrop").remove();
  });

  $(document).on('click', '.js-open-popup-form', function (e) {
    e.preventDefault();
    let modalId = $(this).attr('data-modal');
    // $(modalId).addClass('active_modal');
    // $('body').addClass('openModal');
    $('<div class="bs-modal-backdrop fade show"></div>').appendTo($(modalId));
    $('body').addClass('bs-modal-open');
    $('body').css('overflow', 'hidden');
    $(modalId).addClass('show in');
    $(modalId).show();
  });

  $(document).on('click', '[data-toggle="modal"]', function () {
    $('body').addClass('ip-modal-open');
    $($(this).attr('data-target')).addClass('show');
    $($(this).attr('data-target')).show();
    $('body').append('<div class="ip-modal-backdrop fade"></div>');
    $('.ip-modal-backdrop').addClass('show');
  });

  $(document).on('click', '[data-dismiss="modal"]', function () {
    $(this).parents('.modal').removeClass('show').hide();
    $('.ip-modal-backdrop').removeClass('show').remove();
    $('body').removeClass('ip-modal-open');
  });

})(jQuery);

import { ibcDomReady } from './base/utils';
// import initializeLoader from './base/loader';
import initializeLazyLoading from './base/lazy-loading';
import initializeScrolling from './base/scrolling';
import initializeNavigation from './base/navigation';
import initializeHeader from './base/header';
import initializeForm from './base/forms';
import initializeVideo from './base/video';

window.ibcDomReady = ibcDomReady;

ibcDomReady(() => {
  // initializeLoader();             // loader
  initializeLazyLoading();        // lazy loading
  initializeScrolling();          // scrolling
  initializeNavigation();         // navigation
  initializeHeader();             // header
  initializeForm();               // forms
  initializeVideo();              // video
});

// Fix when be posibble, this is implemented becuase is necessary in boostbox

// Namespace
var idxpages = window.idxpages || {};

idxpages.forms = {

  init: function () {
    initializeForm();
  },

};

window.idxpages = idxpages;
