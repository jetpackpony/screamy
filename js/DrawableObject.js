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
DrawableObject.prototype.isCollidingWith = function (object) {
  var dx = this._coordinates.x - object.getCoordinates().x;
  var dy = this._coordinates.y - object.getCoordinates().y;
  var radSum = this._measures.radius + object.getCoordinates().r;

  if (dx * dx + dy * dy <= radSum * radSum) {
    return true;
  }
  return false;
};

DrawableObject.prototype.setSprite = function (imageURL, frameWidth, frameHeight, delayBetweenFrames) {
  this.image = new Image();
  this.image.src = imageURL;
  this.totalTimeSinceLastRedraw = 0;
  this.currentFrame = 0;
  this.delayBetweenFrames = delayBetweenFrames;
  this.then = performance.now();
  this.width = frameWidth;
  this.height = frameHeight;
};

DrawableObject.prototype.drawSpriteFrame = function (x, y) {
  var now = performance.now();
  var delta = now - this.then;

  if (this.totalTimeSinceLastRedraw > this.delayBetweenFrames) {
    this.currentFrame++;
    this.currentFrame %= 2;
    this.totalTimeSinceLastRedraw = 0;
  } else {
    this. totalTimeSinceLastRedraw += delta;
  }
  this.then = now;

  this._ctx.drawImage(this.image, this.currentFrame * this.width, 0, this.width, this.height, x, y, this.width, this.height);
};