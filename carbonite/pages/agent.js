(function( $ ) {

  let ipContactForm;

  $(function () {
    ipContactForm = $('.js-contact-form');

    if (ipContactForm.length) {
      ipContactForm.on("submit", function(event) {
        event.preventDefault();

        let form = $(this);
        let submitButton = form.find('.ip-form-submit');

        submitButton.attr('disabled', 'disabled');

        try {

          grecaptcha.ready(function() {
            grecaptcha
              .execute(__flex_g_settings.google_recaptcha_public_key, { action: 'contact_inquiry' })
              .then(function(token) {
                form.prepend(`<input type="hidden" name="recaptcha_response" value="${token}">`);

                $.ajax({
                  url: __flex_g_settings.ajaxUrl,
                  type: "POST",
                  data: form.serialize(),
                  dataType: "json",
                  success: function(response) {
                    if (response.success) {
                      form.trigger('reset');
                      sweetAlert(
                        word_translate.email_sent,
                        word_translate.your_email_was_sent_succesfully,
                        "success"
                      );
                      form.find('input[name="recaptcha_response"]').remove();
                      submitButton.removeAttr('disabled');
                    }
                  }
                });
              });
          });

        } catch (error) {
          console.error(error);
        }

      });
    }
  });

})( jQuery );
