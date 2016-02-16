function Player(options, context, framework) {

  this.setSprite("img/png/flying/player_sprite_50.png", 52, 50, 50);

  options.x = 50;
  options.y = 30;

  DrawableObject.call(this, options, context, framework);
}
Player.prototype = new DrawableObject({}, null, null);
Player.prototype.draw = function () {
  // The image player
  // this._ctx.drawImage(this.image, this._coordinates.x - this.image.width / 2, this._coordinates.y - this.image.height / 2);
  var x = this._coordinates.x - 52 / 2;
  var y = this._coordinates.y - 50 / 2;

  this.drawSpriteFrame(x, y);

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
