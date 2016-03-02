function Player(options, context, framework) {

  options.x = 50;
  options.y = 30;

  DrawableObject.call(this, options, context, framework);

  this.setSprite({
    // ctx: context,
    imageURL: "img/png/flying/spritesheet_50_flying.png",
    frameWidth: 61,
    frameHeight: 60,
    framesNum: 4
  });


}
Player.prototype = new DrawableObject({}, null, null);
Player.prototype.draw = function () {
  var x = this._coordinates.x - 52 / 2;
  var y = this._coordinates.y - 50 / 2;

  this.drawSprite(x, y);

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
