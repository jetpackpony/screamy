GameFramework = (function ($) {
  var collection = {};

  $.addObjects = function (objects) {
    for (var key in objects) {
      if (!objects.hasOwnProperty(key)) continue;

      collection[key] = objects[key];
      if (!$.hasOwnProperty(key)) {
        $[key] = collection[key];
      }
    }
    return $;
  };

  $.getObject = function (name) {
    return collection[name];
  };

  $.getAllObjects = function () {
    var result = [];
    for (var key in collection) {
      if (!collection.hasOwnProperty(key)) continue;

      if (Array.isArray(collection[key])) {
        collection[key].forEach(function(obj, index) {
          result.push(obj);
        });
      } else {
        result.push(collection[key]);
      }
    }
    return result;
  };

  return $;
}(GameFramework));