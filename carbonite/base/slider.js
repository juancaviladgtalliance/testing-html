/**
 * Set ARIA label on arrows.
 *
 * @param {jQuery} slider jQuery object for the slider.
 * @returns {undefined}
 */
export function setAriaLabelOnArrows(slider) {
  // Get all arrow elements within the slider
  let $prevArrow = slider.find('.gs-prev-arrow');
  let $nextArrow = slider.find('.gs-next-arrow');

  if (!$prevArrow && !$nextArrow) {
    return false;
  }

  $prevArrow.attr('aria-label', 'Previous');
  $nextArrow.attr('aria-label', 'Next');
}

/**
 * Set ARIA label on bullets.
 *
 * @param {jQuery} slider jQuery object for the slider.
 * @returns {undefined}
 */
 export function setAriaLabelOnBullets(slider) {
  // Get all bullet elements within the slider
  let $bullets = slider.find('.gs-bullet');

  if (!$bullets) {
    return false;
  }

  let position = 0;
  $bullets.each(function () {
    position += 1;
    let $bullet = jQuery(this);
    let label = `View slide ${position}`;
    $bullet.attr('aria-label', label);
  });
}
