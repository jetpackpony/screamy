GameFramework = (function ($) {
  var collection = {},
      ownPropertiesNameCollection = [];

  /**
   * Adds object at their names to the collection
   * @param {Object} objects an object of format { object_name: DrawableObject, object_name1: DrawableObject }
   */
  $.addObjects = function (objects) {
    for (var key in objects) {
      if (!objects.hasOwnProperty(key)) continue;

      if (Array.isArray(objects[key])) {
        objects[key].forEach(function(obj, index) {
          obj._setName(key + "_" + index);
        });
      } else {
        objects[key]._setName(key);
      }
      collection[key] = objects[key];
      if (!$.hasOwnProperty(key)) {
        ownPropertiesNameCollection.push(key);
        $[key] = collection[key];
      }
    }
    return $;
  };

  /**
   * Returs an object by its name
   * @param  {String}         name the name of the object to retrun
   * @return {DrawableObject}      the searched object
   */
  $.getObject = function (name) {
    return collection[name];
  };

  /**
   * Returns the flattened array of all of game objects
   * @return {Array} the flattened array of all of game objects
   */
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

  /**
   * Iterates over the objects collection and calls each object's updateState function
   * @return {GameFramework} Returns the current instance of GameFramework
   */
  $._updateObjectsState = function () {
    $.getAllObjects().forEach(function (obj, i) {
      obj.updateState();
    });
    return $;
  };

  /**
   * This clears the collection, for testing purposes only
   * @return {GameFramework} Returns the current instance of GameFramework
   */
  $._removeAllObjects = function () {
    $.getAllObjects().forEach(function (obj, i) {
      obj.destroy();
    });
    collection = {};
    return $;
  };

  /**
   * Removes all destroyed objects from the collection
   * @return {GameFramework} Returns the current instance of GameFramework
   */
  $._clearDestroyedObjects = function () {
    for (var key in collection) {
      if (!collection.hasOwnProperty(key)) continue;

      if (Array.isArray(collection[key])) {
        collection[key] = collection[key].filter(function (obj) {
          return obj.isAlive();
        });
      } else {
        if (!collection[key].isAlive()) {
          delete collection[key];
          if (ownPropertiesNameCollection.indexOf(key) !== -1) {
            delete $[key];
          }
        }
      }
    }
    return $;
  };

  return $;
}(GameFramework));