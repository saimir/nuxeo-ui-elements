/*
 * (C) Copyright 2016 Nuxeo SA (http://nuxeo.com/) and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Contributors:
 *   Gabriel Barata <gbarata@nuxeo.com>
 */

function timePasses(ms) {
  return new Promise(function(resolve) {
    window.setTimeout(function() {
      resolve();
    }, ms || 1);
  });
}

var flushCb = window.flush;
window.flush = function() {
  return new Promise(function(resolve) {
    flushCb(function() {
      resolve();
    });
  });
}

function waitForEvent(el, event, times) {
  times = times || 1;
  return new Promise(function(resolve) {
    var listener = function(event) {
      if (--times === 0) {
        el.removeEventListener(event, listener);
        resolve(event);
      }
    };
    el.addEventListener(event, listener);
  });
}

function waitChanged(el, prop, times) {
  return waitForEvent(el, prop + '-changed', times)
      .then(function(evt) {
        return evt.detail;
      });
}
