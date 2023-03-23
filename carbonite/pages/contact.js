(function( $ ) {

  const map = document.getElementById('ip-map');

  if (map) {
    let address = map.dataset.address;
    let zoom = parseInt(map.dataset.zoom);

    const API_KEY = __flex_g_settings.overwrite_settings.google_maps_api_key || '';

    if (!API_KEY) return;

    const GEOCODE_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
    const URL = `${GEOCODE_BASE_URL}?address=${encodeURIComponent(address)}&key=${API_KEY}`;

    fetch(URL)
      .then(response => {
        if (response.status == 200) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then(data => {
        if (data.status == "OK") {

          let location, lat, lng;
          let results = data.results;

          results.forEach(result => {
            location = result.geometry.location;
            lat = parseFloat(location.lat);
            lng = parseFloat(location.lng);
          });

          let gMap = new google.maps.Map(map, {
            center: { lat: lat, lng: lng },
            zoom: zoom,
            mapTypeControl: false,
            streetViewControl: false
          });

          let gMarker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: gMap
          });

        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  var ipContactForm;

  $(function () {

    ipContactForm = $('.js-contact-form');

    if (ipContactForm.length) {
      ipContactForm.on("submit", function(event) {
        event.preventDefault();

        let form = $(this);
        let fieldset = form.find('fieldset');
        let submitButton = form.find('.ip-form-submit');
        let formData = form.serialize();

        submitButton.attr('disabled', 'disabled');

        try {

          grecaptcha.ready(function () {
            grecaptcha
              .execute(__flex_g_settings.google_recaptcha_public_key, { action: 'contact_inquiry' })
              .then(async function (token) {

                fieldset.prepend(`<input type="hidden" name="recaptcha_response" value="${token}">`);

                $.ajax({
                  url: __flex_g_settings.ajaxUrl,
                  type: "POST",
                  data: formData,
                  dataType: "json",
                  success: function(response) {
                    if (response.success) {
                      form.trigger('reset');
                      sweetAlert(word_translate.email_sent, word_translate.your_email_was_sent_succesfully, "success");
                      fieldset.find('input[name="recaptcha_response"]').remove();
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
