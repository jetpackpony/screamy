GameFramework = (function ($) {
  var inputStates = {};

  var eventListener = function (listenedKey, event, state) {
    if (listenedKey === 'up' && event.keyCode === 38) {
      inputStates[listenedKey] = state;
    }
    if (listenedKey === 'space' && event.keyCode === 32) {
      inputStates[listenedKey] = state;
    }
  };

  $.setInputListeners = function (keys) {
    keys.forEach(function (el, i, arr) {
      window.addEventListener('keydown', function (event) {
        eventListener(el, event, true);
      }, false);
      window.addEventListener('keyup', function (event) {
        eventListener(el, event, false);
      }, false);
    });

    return $;
  };

  $.getInput = function (key) {
    return inputStates[key];
  };

  return $;  
}(GameFramework));