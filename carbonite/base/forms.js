/**
 * Handle loader icon.
 *
 * @param {String} action The action to do, add or remove loader.
 * @param {Element} button The button where to add or remove loader.
 *
 * @returns {undefined}
 */
function handleLoader(action, button) {
  const element = button.querySelector('span');
  const loaderIcon = `
    <svg class="ip-mx-2 js-form-loader-icon" width="24" height="24" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
      <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="2">
              <circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle>
              <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"></animateTransform>
              </path>
          </g>
      </g>
    </svg>
  `;

  if (action === 'add') {
    element.innerHTML = element.innerHTML + loaderIcon;
  } else {
    element.querySelector('.js-form-loader-icon').remove();
  }
}

/**
 * Handle reCAPTCHA token.
 *
 * @param {String} action The action to do, add or remove token.
 * @param {Element} form The form where to add or remove token.
 * @param {String} token Token to add.
 *
 * @returns {undefined}
 */
function handleReCaptchaToken(action, form, token) {
  if (action === 'add') {
    const fieldset = form.querySelector('fieldset');

    fieldset.insertAdjacentHTML(
      'afterbegin',
      `<input type="hidden" name="recaptcha_response" value="${token}">`
    );
  } else {
    const recaptcha = form.querySelector('input[name="recaptcha_response"]');

    if (recaptcha) recaptcha.remove();
  }
}

/**
 * Handle modal closing.
 *
 * @param {Element} form Form reference to locate the modal.
 * @param {String} action The action to process after to submit.
 *
 * @returns {undefined}
 */
function handleCloseModal(form, action) {
  const modalSelector = '.bs-modal-body';
  const modal = form.closest(modalSelector);

  if (!modal || action !== 'redirect') return false;

  const btnCloseModal = modal.querySelector('.sp-close');

  if (btnCloseModal) setTimeout(() => btnCloseModal.click(), 1000);
}

/**
 * Process custom fields and merge its values.
 *
 * @param {Element} form The form to process.
 *
 * @returns {String} Concatenated values of custom fields.
 */
 function getCustomFieldsData(form) {
  let customFieldsData = [];
  let messageFieldData = [];
  let customFields = form.querySelectorAll('.js-custom-field');

  customFields.forEach(field => {
    let type = field.getAttribute('data-type');
    let label = field.querySelector('.js-form-label').textContent;
    let value;

    if (type == 'text') {
      value = field.querySelector('input').value;
    }

    if (type == 'select') {
      value = field.querySelector('select').value;
    }

    if (type == 'textarea') {
      value = field.querySelector('textarea').value;
    }

    if (type == 'message') {
      value = field.querySelector('textarea').value;
    }

    if (type == 'checkbox') {
      value = [...field.querySelectorAll('input:checked')].map(input => {
        return input.value
      }).join(", ");
    }

    if (type == 'radio') {
      if (field.querySelector('input:checked')) {
        value = field.querySelector('input:checked').value
      }
    }

    if (value) {
      if (type == 'message') {
        messageFieldData.push(`${value}... `);
      } else {
        customFieldsData.push(`${label}: ${value}`);
      }
    }
  });

  customFieldsData = customFieldsData.join(' | ');
  return [messageFieldData, customFieldsData].join('');
}

/**
 * Post data with fetch.
 *
 * @param {Object} options
 * @param {string} options.url Url where data be posting.
 * @param {FormData} options.formData `FormData` instance.
 *
 * @returns {Object} Response body from URL that was POSTed to.
 */
async function postFormData({ url, formData }) {
  const fetchOptions = {
    method: "POST",
    body: formData
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}

/**
 * Handle form action.
 *
 * @param {Element} form Form to process.
 *
 * @returns {String} Form action .
 */
function handleFormAction(form) {
  const formContent = form.parentNode;
  const formConfirmation = formContent.nextElementSibling;
  const formAction = formConfirmation.getAttribute('data-form-action');
  const formTarget = formConfirmation.getAttribute('data-form-target');

  switch (formAction) {
    case 'redirect':
      if (formTarget) {
        location.href = formTarget;
      }
      break;

    default:
      formContent.style.display = 'none';
      formConfirmation.style.display = 'block';
      break;
  }

  return formAction;
}

/**
 * Event handler for a form submit event.
 *
 * @param {SubmitEvent} event
 *
 * @returns {undefined}
 */
async function handleFormSubmit(event) {
  event.preventDefault();

  const url = __flex_g_settings.ajaxUrl;
  const form = event.currentTarget;

  let submitButton = form.querySelector('.ip-form-submit');
  let customFieldsData = getCustomFieldsData(form);
  let messageField = form.querySelector('input[name="message"]');

  messageField.value = customFieldsData;
  submitButton.setAttribute('disabled', '');
  handleLoader('add', submitButton);

  try {

    if (
      typeof __flex_g_settings  !== 'undefined' &&
      typeof __flex_g_settings.property !== 'undefined'
    ) {

      // Forms used on Property Website
      const formData = new FormData(form);
      const responseData = await postFormData({ url, formData });

      if (responseData.success) {
        form.reset();
        const formAction = handleFormAction(form);
        handleLoader('remove', submitButton);
        submitButton.removeAttribute('disabled');
        handleCloseModal(form, formAction);
      }

    } else {

      // Forms used on CMS Website
      grecaptcha.ready(function () {
        grecaptcha
          .execute(__flex_g_settings.google_recaptcha_public_key, { action: 'contact_inquiry' })
          .then(async function (token) {

            handleReCaptchaToken('add', form, token);
            const formData = new FormData(form);
            const responseData = await postFormData({ url, formData });

            if (responseData.success) {
              form.reset();
              const formAction = handleFormAction(form);
              handleLoader('remove', submitButton);
              submitButton.removeAttribute('disabled');
              handleReCaptchaToken('remove', form);
              handleCloseModal(form, formAction);
            }

          });
      });

    }

  } catch (error) {
    console.error(error);
  }
}

/**
 * Handle boost forms.
 *
 * @returns {undefined}
 */
 function handleBoostForm () {
  let btnOpenBoostForm = document.querySelectorAll('.js-open-boost-form');

  if (btnOpenBoostForm) {
    btnOpenBoostForm.forEach(btn =>
      btn.addEventListener('click', openBoostForm)
    );
  }

  function openBoostForm() {
    const btnBoostForm = document.querySelector('#user-options .register .lg-register');

    if (btnBoostForm) {
      btnBoostForm.click();
    }
  }
}

/**
 * Handle custom forms.
 *
 * @returns {undefined}
 */
 function handleCustomForm() {
  let forms = document.querySelectorAll('.js-form');

  if (forms) {
    forms.forEach(form => {
      form.addEventListener('submit', handleFormSubmit);
    })
  }
}

function initializeForm () {
  handleBoostForm();
  handleCustomForm();
}

export default initializeForm;
