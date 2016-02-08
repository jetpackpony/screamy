function Brick(options, context, framework) {

  this.image = new Image();
  this.image.src = "img/enemy_png/flying/enemy_sprite_70.png";

  this.width = this.image.width / 2;
  this.height = this.image.height;
  this.totalTimeSinceLastRedraw = 0;
  this.currentFrame = 0;
  this.delayBetweenFrames = 50;
  this.then = performance.now();

  DrawableObject.call(this, options, context, framework);
}
Brick.prototype = new DrawableObject({}, null, null);
Brick.prototype.draw = function () {
  // this._ctx.drawImage(this.image, this._coordinates.x - this.image.width / 2, this._coordinates.y - this.image.height / 2);
  var x = this._coordinates.x - this.image.width / 2;
  var y = this._coordinates.y - this.image.height / 2;
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
