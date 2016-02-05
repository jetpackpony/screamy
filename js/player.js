function Player(options, context, framework) {

  this.image = new Image();
  this.image.src = "img/png/flying/rsz_frame-1.png";

  options.x = 50;
  options.y = 30;

  DrawableObject.call(this, options, context, framework);
}
Player.prototype = new DrawableObject({}, null, null);
Player.prototype.draw = function () {
  // The image player
  this._ctx.drawImage(this.image, this._coordinates.x - this.image.width / 2, this._coordinates.y - this.image.height / 2);

  // Changing the position
  if (this._coordinates.y > maxY) {
    this._coordinates.y = maxY;
    this.stop();
  }
  if (this._coordinates.y < minY) {
    this._coordinates.y = minY;
    this.stop();
  }
};
