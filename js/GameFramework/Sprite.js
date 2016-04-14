GameFramework = (function ($) {

  /**
   * Represents a whole spritesheet. 
   * Stores the image object, a collection of SpriteFrames and a delay with which to iterate over the collection
   */
  function Sprite() {
    this._image = {};
    this._frames = [];
    this._current_frame_id = 0;
    this._frameDelay = 100;
    this._prevFrameTime = 0;
  }
  $.Sprite = Sprite;

  /**
   * Helper function to calculate the next frame ID
   * @param  {int} delta    Time passed since the last frame
   * @param  {int} delay    Minimum delay between frames
   * @param  {int} currrent The id of a current frame
   * @param  {int} size     The number of frames
   * @return {int}          The ID of a next frame to show
   */
  var getNextFrameId = function(delta, delay, currrent, size) {

    var getNext = function() {
      return Math.floor(delta / delay) + currrent;
    };
    if (getNext() >= size)
      return getNext() % size;
    return getNext();
  }

  /**
   * Returns the SpriteFrame to be drawn at the moment
   * @return {SpriteFrame} the sprite frame to draw at the moment
   */
  Sprite.prototype._getCurrentFrame = function() {
    var delta = performance.now() - this._prevFrameTime;
    if (delta > this._frameDelay) {
      this._current_frame_id = getNextFrameId(delta, this._frameDelay, this._current_frame_id, this._frames.length);
      this._prevFrameTime = performance.now();
    }
    return this._frames[this._current_frame_id];
  };

  /**
   * Draws a SpriteFrame on the framework's canvas
   * @param  {Vector} position The position to draw the frame at
   * @return {Sprite} this
   */
  Sprite.prototype.drawAt = function(position) {
    this._getCurrentFrame().drawAt(position);
    return this;
  };

  /**
   * Setter for the spritesheet's image object
   * @param {Image} new_image The spritesheet's image object
   * @return {Sprite} this
   */
  Sprite.prototype.setImage = function(new_image) {
    this._image = new_image;
    return this;
  };

  /**
   * Adds frames' info to the spritesheet
   * @param {Array} more_frames An array of objects of format { x: x, y: y, w: w, h: h }
   * @return {Sprite} this
   */
  Sprite.prototype.addFrames = function(more_frames) {
    var that = this;
    more_frames.forEach(function(obj, index) {
      that._frames.push((new SpriteFrame()).setCollection(that).setDimentions(obj));
    });
    return this;
  };

  /**
   * Setter for minimum delay between 2 frames
   * @param {int} new_delay The minimum delay between 2 frames
   * @return {Sprite} this
   */
  Sprite.prototype.setFrameDelay = function(new_delay) {
    this._frameDelay = new_delay;
    return this;
  };

  /**
   * Getter for the image object
   * @return {Image} the spritesheet's image object
   */
  Sprite.prototype.getImage = function() {
    return this._image;
  };

  /**
   * Returns the polygon of the current frame
   * @return {Polygon} the polygon of the current frame
   */
  Sprite.prototype.getCurrentPolygon = function() {
    return this._getCurrentFrame().getPolygon();
  };

  /**
   * SpriteFrame represents a single image on a spritesheet
   */
  function SpriteFrame() {
    this._collection = {};
    this._x = 0;
    this._y = 0;
    this._w = 0;
    this._h = 0;
    this._polygon = {};

  }

  /**
   * Stores the reference to parent Sprite collection
   * @param {Sprite} coll parent Sprite collections
   * @return {SpriteFrame} this
   */
  SpriteFrame.prototype.setCollection = function(coll) {
    this._collection = coll;
    return this;
  };

  /**
   * Sets the dimentions of the sprite frame
   * @param {Object} new_dimentions the object of format { x: x, y: y, w: w, h: h }
   * @return {SpriteFrame} this
   */
  SpriteFrame.prototype.setDimentions = function(new_dimentions) {
    var x = this._x = new_dimentions.x;
    var y = this._y = new_dimentions.y;
    var w = this._w = new_dimentions.w;
    var h = this._h = new_dimentions.h;
    this._polygon = new $.Polygon.CreateNewFromPoints([0, 0], [w, 0], [0, h], [w, h]);
    return this;
  };

  /**
   * Draws the sprite frame on a framework's canvas
   * @param  {Vector} position the position at which to draw the image
   * @return {SpriteFrame} this
   */
  SpriteFrame.prototype.drawAt = function(position) {
    $.getCTX().drawImage(
      this._collection.getImage(), 
      this._x,
      this._y,
      this._w,
      this._h,
      position.x,
      position.y,
      this._w,
      this._h
    );
    return this;
  };

  /**
   * Returns the polygon of the SpriteFrame
   * @return {Polygon} the polygon of the SpriteFrame
   */
  SpriteFrame.prototype.getPolygon = function() {
    return this._polygon;
  };

  return $;
}(GameFramework));
