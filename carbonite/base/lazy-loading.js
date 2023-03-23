/**
 * @module lazyLoad
 */

import { createEmbed } from '../base/utils';

function loadImage(element, src) {
  element.src = src;
  element.classList.add('ms-loaded');
}

function loadPicture(element, src, params) {
  const { srcSmall, srcMedium, srcLarge, classList, title } = params;

  const picture = document.createElement('picture');
  const sourceSM = document.createElement('source');
  const sourceMD = document.createElement('source');
  const sourceLG = document.createElement('source');
  const img = document.createElement('img');

  sourceSM.srcset = srcSmall;
  sourceSM.media = '(max-width: 640px)';
  sourceMD.srcset = srcMedium;
  sourceMD.media = '(max-width: 990px)';
  sourceLG.srcset = srcLarge;
  sourceLG.media = '(max-width: 1200px)';

  img.src = src;
  img.alt = title
  img.classList.add(...classList.split(' '));

  picture.appendChild(sourceSM);
  picture.appendChild(sourceMD);
  picture.appendChild(sourceLG);
  picture.appendChild(img);

  element.prepend(picture);
  img.classList.add('ms-loaded');
}

function loadVideo(element, src, params) {
  createEmbed(element, src, params);
}

function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  script.async = 1;

  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);
}

function initializeLazyLoading() {
  let lazyItems = document.querySelectorAll('.ibc-js-lazy');

  if ( lazyItems.length ) {
    if ('IntersectionObserver' in window) {

      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            const { type, src, ...params } = entry.target.dataset;

            switch (type) {
              case 'image':
                loadImage(entry.target, src);
                break;

              case 'picture':
                loadPicture(entry.target.parentElement, src, params);
                break;

              case 'video':
                loadVideo(entry.target, src, params);
                break;

              case 'script':
                loadScript(src);
                break;
            }

            entry.target.classList.remove('ibc-js-lazy');
            intersectionObserver.unobserve(entry.target);
          }

        });
      });

      lazyItems.forEach((item) => {
        intersectionObserver.observe(item);
      });
    } else {
      let active = false;

      const lazyLoad = () => {
        if (active === false) {
          active = true;

          setTimeout(() => {
            lazyItems.forEach((item) => {

              const isInViewport = item.getBoundingClientRect().top <= window.innerHeight && item.getBoundingClientRect().bottom >= 0;
              const isVisible = getComputedStyle(item).display !== "none";

              if (isInViewport && isVisible) {
                const { type, src, ...params } = item.dataset;

                switch (type) {
                  case 'image':
                    loadImage(item, src);
                    break;

                  case 'picture':
                    loadPicture(item.parentElement, src, params);
                    break;

                  case 'video':
                    loadVideo(item, src, params);
                    break;

                  case 'script':
                    loadScript(src);
                    break;
                }

                item.classList.remove('ibc-js-lazy');

                lazyItems = [...lazyItems].filter((image) => {
                  return image !== item;
                });

                if (lazyItems.length === 0) {
                  document.removeEventListener("scroll", lazyLoad);
                  window.removeEventListener("resize", lazyLoad);
                  window.removeEventListener("orientationchange", lazyLoad);
                }
              }

            });

            active = false;
          }, 200);
        }
      };

      document.addEventListener('scroll', lazyLoad);
      window.addEventListener('resize', lazyLoad);
      window.addEventListener('orientationchange', lazyLoad);
    }
  }
}

export default initializeLazyLoading;
