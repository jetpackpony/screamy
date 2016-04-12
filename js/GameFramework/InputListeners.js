GameFramework = (function ($) {
  var inputStates = {};

  /**
   * The event handler to be attached to the event
   * @param  {String}  listenedKey the name of the key
   * @param  {Event}   event       the triggered event
   * @param  {Boolean} state       true if the key is pressed, false if it is released
   * @return {void}
   */
  var eventListener = function (listenedKey, event, state) {
    if (listenedKey === 'up' && event.keyCode === 38) {
      inputStates[listenedKey] = state;
    }
    if (listenedKey === 'space' && event.keyCode === 32) {
      inputStates[listenedKey] = state;
    }
  };

  /**
   * Attaches input listeneres to the provided keys
   * @param {Array} keys the list of keys to listen to
   */
  $.setInputListeners = function (keys) {
    keys.forEach(function (el, i, arr) {
      inputStates[el] = false;
      window.addEventListener('keydown', function (event) {
        eventListener(el, event, true);
      }, false);
      window.addEventListener('keyup', function (event) {
        eventListener(el, event, false);
      }, false);
    });

    return $;
  };

  /**
   * Returns the current state of the key provided
   * @param  {String} key the key to get the input for
   * @return {Boolean}    true if the key is pressed, false otherwise
   */
  $.getInput = function (key) {
    return inputStates[key];
  };

  return $;  
}(GameFramework));