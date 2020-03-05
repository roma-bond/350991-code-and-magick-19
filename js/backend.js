'use strict';

(function () {
  var DEBOUNCE_INTERVAL_IN_MS = 500;
  var TIMEOUT_IN_MS = 15000;
  var StatusCode = {
    OK: 200
  };

  var wizardsList = [];

  var serverRequest = function (url, onLoad, onError, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(method, url);
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        window.backend.wizardsList = xhr.response;
        onLoad(window.backend.wizardsList);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';
    serverRequest(URL, onLoad, onError, 'GET');
  };

  var save = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';
    serverRequest(URL, onLoad, onError, 'POST', data);
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL_IN_MS);
    };
  };

  window.backend = {
    wizardsList: wizardsList,
    debounce: debounce,

    load: load,
    save: save
  };
})();
