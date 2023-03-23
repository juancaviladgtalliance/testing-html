/**
 * @module video
 */

import { createEmbed } from "./utils";

const SELECTOR = '.js-open-video';

function loadVideo(e) {
  const el = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
  const { videoType, src, ...params } = el.dataset;

  if (videoType === 'inline') {
    createEmbed(el.parentNode, src, params);
  } else {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="video-inside">
        <div class="iframe"></div>
        <button class="close-vi" aria-label="Close">
          <span class="op-icon-close">x</span>
        </button>
        <div class="bg-close"></div>
      </div>
    `);

    const popup = document.querySelector('.video-inside');

    createEmbed(
      popup.querySelector('.iframe'),
      src,
      params
    );

    setTimeout(() => {
      popup.classList.add('ms-show-video');
    }, 500)
  }
}

function initializeVideo() {
  jQuery(document).on('click', SELECTOR, loadVideo);
}

export default initializeVideo;
