function Brick(options, context, framework) {

  this.image = new Image();
  this.image.src = "img/enemy_png/flying/rsz_frame-1.png";

  DrawableObject.call(this, options, context, framework);
}
Brick.prototype = new DrawableObject({}, null, null);
Brick.prototype.draw = function () {
  this._ctx.drawImage(this.image, this._coordinates.x - this.image.width / 2, this._coordinates.y - this.image.height / 2);
};
