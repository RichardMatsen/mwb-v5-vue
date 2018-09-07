// Ref: https://github.com/vuejs/vue-devtools/issues/124
//      https://gist.github.com/rtfleg/cc159e4f773a8a3d9ec3a0f8ca821464

let promise = null;

/**
 * Returns promise which resolves after devtools ready state became determined (see awaitDevtoolsImpl below).
 * @param {number} [timeout] - devtools ready state detection timeout (one second by default).
 * @returns {Promise.<boolean|null>}
 */
export function awaitDevtools(timeout) {
  /* istanbul ignore next */
  return promise || (promise = awaitDevtoolsImpl(timeout || 1000));
}

/**
 * Refreshes devtools, useful if you bootstrap app inside callback of the promise which returned by awaitDevtools.
 * Call that function after app bootstrapped in order to deal with missing component tree and so on.
 */
export function refreshDevtools() {
  /* istanbul ignore next */
  window.postMessage({ source: 'vue-devtools-proxy', payload: 'refresh' }, '*');
}

/**
 * Returns promise which resolves after devtools ready state became determined.
 * This promise will be resolved in any case (we need to bootstrap app after all) except some internal error happens.
 *
 * Possible promise results are:
 *  - false - devtools are not available at the moment (good);
 *  - true - devtools are available and ready (good);
 *  - null - unable to determine devtools ready state (bad, some commits might be not reflected in devtools).
 *
 * NOTE:
 * Function will work only in case devtools tab is opened before page load, in opposite case it's useless.
 * So, if you have problems with it, then switch to devtools tab and refresh the page.
 *
 * @param {number} timeout - devtools ready state detection timeout.
 * @returns {Promise.<boolean|null>}
 */
function awaitDevtoolsImpl(timeout) {
  /* istanbul ignore next */
  if (!window['__VUE_DEVTOOLS_GLOBAL_HOOK__']) {
    return Promise.resolve(false);
  }

  return new Promise(
    resolve => {
      window.addEventListener('message', onMessage, false);
      const timeoutId = setTimeout(() => onTimeout(), timeout);

      function onMessage(e) {
        if (isReadyMessage(e)) {
          clearTimeout(timeoutId);
          resolve(true);
        }
      }

      function onTimeout() {
        window.removeEventListener('message', onMessage)
        resolve(null)
      }

      function isReadyMessage(e) {
        return e &&
          e.data &&
          e.data.source === 'vue-devtools-backend' &&
          e.data.payload &&
          e.data.payload.event === 'ready'
      }
    }
  );
}
