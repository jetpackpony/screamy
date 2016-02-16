function Brick(options, context, framework) {

  this.setSprite("img/enemy_png/flying/enemy_sprite_70.png", 95, 70, 50);

  DrawableObject.call(this, options, context, framework);
}
Brick.prototype = new DrawableObject({}, null, null);
Brick.prototype.draw = function () {
  var x = this._coordinates.x - 95 / 2;
  var y = this._coordinates.y - 70 / 2;

  this.drawSpriteFrame(x, y);
};
