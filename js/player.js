function Player(options, context, framework) {

  options.x = 50;
  options.y = 30;

  DrawableObject.call(this, options, context, framework);

  this.setSprite({
    // ctx: context,
    imageURL: "img/png/flying/player_sprite_50.png",
    frameWidth: 52,
    frameHeight: 50,
    framesNum: 8
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
