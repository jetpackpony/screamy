function DrawableObject(options, context, framework) {
  this._defaults = {
    x: 0, y: 0, speedX: 0, speedY: 0, aX: 0, aY: 0, radius: 20
  };

  this._coordinates = {
    x: options.x || this._defaults.x,
    y: options.y || this._defaults.y
  };
  this._measures = {
    radius: options.radius || this._defaults.radius
  };
  this._speed = {
    x: options.speedX || this._defaults.speedX,
    y: options.speedY || this._defaults.speedY
  };
  this._acceleration = {
    x: options.aX || this._defaults.aX,
    y: options.aY || this._defaults.aY
  };
  this.image = options.image || this.image;
  this._ctx = context;
  this._framework = framework;
};
DrawableObject.prototype.setAcceleration = function (newAccs) {
  if (newAccs.x !== undefined) this._acceleration.x = newAccs.x;
  if (newAccs.y !== undefined) this._acceleration.y = newAccs.y;
};
DrawableObject.prototype.calculateCoordinates = function () {
  var delta = this._framework.getFrameDelta() / 1000;
  this._speed.y += this._acceleration.y * delta;
  this._coordinates.y += framework.convertSpeed(this._speed.y);

  this._speed.x += this._acceleration.x * delta;
  this._coordinates.x += framework.convertSpeed(this._speed.x);
};
DrawableObject.prototype.stop = function () {
  this._speed.y = 0;
  this.setAcceleration({y: 0});
};
DrawableObject.prototype.drawFrame = function () {
  this.calculateCoordinates();
  this.draw();
};
DrawableObject.prototype.draw = function () {

};
DrawableObject.prototype.getCoordinates = function () {
  return {
    x: this._coordinates.x,
    y: this._coordinates.y,
    r: this._measures.radius,
    left: this._coordinates.x - this._measures.radius,
    right: this._coordinates.x + this._measures.radius
  };
};

DrawableObject.prototype.setSprite = function (options) {
  options.ctx = this._ctx;
  this.sprite = new Sprite(options);
};

DrawableObject.prototype.drawSprite = function (x, y) {
  this.sprite.draw(x, y);
};

DrawableObject.prototype.isCollidingWith = function (object) {
  if (!isBroadCollision(this._coordinates.x, this._coordinates.y, this.sprite.width, this.sprite.height, object._coordinates.x, object._coordinates.y, object.sprite.width, object.sprite.height)) {
    return false;
  }
  return true;
};

var isBroadCollision = function(x1, y1, w1, h1, x2, y2, w2, h2) {
  return (
    x1 < x2 + w2 && 
    x1 + w1 > x2 && 
    y1 < y2 + h2 && 
    y1 + h1 > y2
  );
}