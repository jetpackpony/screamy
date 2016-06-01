function Background(options, context, framework) {

  this.image = new Image();
  this.image.src = "img/full-background_500_1000.png";

  DrawableObject.call(this, options, context, framework);
}
Background.prototype = new DrawableObject({}, null, null);
Background.prototype.draw = function () {
  this._ctx.globalAlpha = 0.3;
  this._ctx.drawImage(this.image, this._coordinates.x, 0);
  this._ctx.drawImage(this.image, this._coordinates.x + width, 0);
  if (Math.abs(this._coordinates.x) >= width) {
    this._coordinates.x = 0;
  }
  this._ctx.globalAlpha = 1;
};
