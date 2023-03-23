/**
 * @module utils
 */

/**
 * Is the DOM ready?
 * This implementation is coming from https://gomakethings.com/a-native-javascript-equivalent-of-jquerys-ready-method/
 *
 * @param {Function} fn Callback function to run.
 */
export function ibcDomReady(fn) {
  if (typeof fn !== 'function') {
    return;
  }

  if (
    document.readyState === 'interactive' ||
    document.readyState === 'complete'
  ) {
    return fn();
  }

  document.addEventListener('DOMContentLoaded', fn, false);
}

/**
 * On pages different to home, modal needs to be
 * appened to carbonite container.
 *
 * @param {Element} modal Modal to append.
 * @returns {undefined}
 */
export function appendModalToContainer(modal) {
  if ( document.body.classList.contains('home') ) {
    let ip = document.querySelector('div.ip');

    if (ip && modal) ip.append(modal);
  }
}

/**
 * Create an embed from element data inside an element.
 *
 * @param {Element} element The element to put the embed in.
 * @param {string} src The source for the video.
 * @returns {undefined}
 */
export function createEmbed(element, src, params) {
  if (src !== undefined) {
    const { id, service } = getVideoId(src.toString());
    const { wrapper, autoplay, controls, muted, loop, } = params;

    switch (service) {
      case 'youtube':

        if (wrapper) {
          const wrapper = document.createElement('div');
          wrapper.setAttribute('id', wrapper);
          element.appendChild(wrapper);

          const script = document.createElement('script');
          script.innerHTML = `
            var tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            var player, firstScriptTag = document.getElementsByTagName("script")[0];
            function onYouTubeIframeAPIReady(){
              player=new YT.Player("${wrapper}",{
                width:"100%",
                videoId:"${id}",
                host:"${window.location.protocol}//www.youtube.com",
                playerVars:{
                  autoplay:${autoplay === 'true' ? 1 : 0 || 0},
                  playsinline:1,loop:1,rel:0,showinfo:0,controls:0,fs:0,
                  origin:'${window.location.origin}'
                },
                events:{
                  onReady:onPlayerReady,
                  onStateChange:onPlayerStateChange
                }
              })
            }
            function onPlayerReady(e){
              e.target.mute()${autoplay === 'true' ? ',e.target.playVideo()' : '' || ''}
            }
            function onPlayerStateChange(e){
              e.data==YT.PlayerState.ENDED&&(player.seekTo(0),player.playVideo())
            }
            function stopVideo(){
              player.stopVideo()
            }
            firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);
          `;
          document.body.appendChild(script);
        } else {
          const iframe = document.createElement('iframe');

          iframe.src = `https://www.youtube.com/embed/${id}?autoplay=${autoplay === 'true' ? 1 : 0 || 0}&mute=${muted === 'true' ? 1 : 0 || 0}&rel=0&showinfo=0`;
          iframe.setAttribute('allow', 'autoplay; encrypted-media');
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allowfullscreen', '');

          element.appendChild(iframe);
        }
        break;

      case 'vimeo':
        const iframe = document.createElement('iframe');

        iframe.src = `https://player.vimeo.com/video/${id}?autopause=0&autoplay=${autoplay === 'true' ? 1 : 0 || 0}&muted=${muted === 'true' ? 1 : 0 || 0}&controls=${controls === 'true' ? 1 : 0 || 0}&loop=${loop === 'true' ? 1 : 0 || 0}`;
        iframe.setAttribute('allow', 'autoplay; encrypted-media');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');

        element.appendChild(iframe);
        break;

      default:
        const video = document.createElement('video');

        video.src = src;
        video.autoplay = autoplay || false;
        video.controls = controls || false;
        video.muted = muted || false;
        video.loop = loop || false;
        video.playsInline = true;

        element.appendChild(video);
        break;
    }
  }
}

/**
 * Download file given it's url.
 *
 * @param {string} url File's Url.
 * @returns {undefined}
 */
 export function downloadFile(url) {
  let a = document.createElement('a');
  let fileName = getFileName(url);

  a.href = `${url}`;
  a.target = '_blank';
  a.setAttribute('download', fileName);
  a.style.display = 'none';

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Get file name given it's url.
 *
 * @param {string} url File's Url.
 * @returns {string} File name.
 */
 export function getFileName(url) {
  let name = url.lastIndexOf('/') + 1;
  let fileName = url.substring(name);

  return decodeURI(fileName.split("?")[0]);
}

/**
 * Get file extension given it's url.
 *
 * @param {string} url File's Url.
 * @returns {string} File extension.
 */
export function getFileExtension(url) {
  return url.split(/[#?]/)[0].split('.').pop().trim();
}

/**
 * Slide up.
 *
 * @param {Element} element The element.
 * @param {string} duration Animation's duration.
 * @returns {undefined}
 */
export function slideUp(element, duration = 500) {
  element.style.transitionProperty = 'height, margin, padding';
  element.style.transitionDuration = duration + 'ms';
  element.style.boxSizing = 'border-box';
  element.style.height = element.offsetHeight + 'px';
  element.offsetHeight;
  element.style.overflow = 'hidden';
  element.style.height = 0;
  element.style.paddingTop = 0;
  element.style.paddingBottom = 0;
  element.style.marginTop = 0;
  element.style.marginBottom = 0;

  window.setTimeout(() => {
    element.style.display = 'none';
    element.style.removeProperty('height');
    element.style.removeProperty('padding-top');
    element.style.removeProperty('padding-bottom');
    element.style.removeProperty('margin-top');
    element.style.removeProperty('margin-bottom');
    element.style.removeProperty('overflow');
    element.style.removeProperty('transition-duration');
    element.style.removeProperty('transition-property');
  }, duration);
}

/**
 * Slide down.
 *
 * @param {Element} element The element.
 * @param {string} duration Animation's duration.
 * @returns {undefined}
 */
export function slideDown(element, duration = 500) {
  element.style.removeProperty('display');
  let display = window.getComputedStyle(element).display;

  if (display === 'none') display = 'block';

  element.style.display = display;
  let height = element.offsetHeight;
  element.style.overflow = 'hidden';
  element.style.height = 0;
  element.style.paddingTop = 0;
  element.style.paddingBottom = 0;
  element.style.marginTop = 0;
  element.style.marginBottom = 0;
  element.offsetHeight;
  element.style.boxSizing = 'border-box';
  element.style.transitionProperty = 'height, margin, padding';
  element.style.transitionDuration = duration + 'ms';
  element.style.height = height + 'px';
  element.style.removeProperty('padding-top');
  element.style.removeProperty('padding-bottom');
  element.style.removeProperty('margin-top');
  element.style.removeProperty('margin-bottom');

  window.setTimeout(() => {
    element.style.removeProperty('height');
    element.style.removeProperty('overflow');
    element.style.removeProperty('transition-duration');
    element.style.removeProperty('transition-property');
  }, duration);
}

/**
 * Slide toggle.
 *
 * @param {Element} element The element.
 * @param {string} duration Animation's duration.
 * @returns {undefined}
 */
export function slideToggle(element, duration = 500) {
  if (window.getComputedStyle(element).display === 'none') {
    return slideDown(element, duration);
  } else {
    return slideUp(element, duration);
  }
}

/**
 * Get iframe's document.
 *
 * @param {Element} iframe The iframe.
 * @returns {Element}
 */
 export function getIframeDocument(iframe) {
  return iframe.contentDocument || iframe.contentWindow.document;
}

/**
 * Remove class by prefix.
 *
 * @param {Element} element The element.
 * @param {string} prefix Prefix to find and remove.
 * @returns {Element}
 */
export function removeClassByPrefix(element, prefix) {
  const regExp = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
  element.className = element.className.replace(regExp, '');

  return element;
}

/**
 * Get cookie.
 *
 * @param {string} name Name of cookie.
 * @returns {string} Cookies' value.
 */
export function getCookie(name) {
  let cookies = decodeURIComponent(document.cookie).split(';');
  name = `${name}=`;

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return '';
}

/**
 * Delete cookie.
 *
 * @param {string} name Name of cookie.
 * @returns {undefined}
 */
 export function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=-99999999;`;
}
