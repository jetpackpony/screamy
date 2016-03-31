/**
 * Jasmine triggerEvent function: allows to trigger the events easily
 */
;(function() {

  var trigger = function (key, type) {
    var eventObj = document.createEventObject ?
        document.createEventObject() : document.createEvent("Events");
  
    if(eventObj.initEvent){
      eventObj.initEvent(type, true, true);
    }
  
    eventObj.keyCode = key;
    eventObj.which = key;
    
    window.dispatchEvent ? window.dispatchEvent(eventObj) : window.fireEvent("onkeydown", eventObj); 
  };

  jasmine.triggerEvent = trigger;
}());
