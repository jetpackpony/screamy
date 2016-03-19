function Brick(options, context, framework) {

  DrawableObject.call(this, options, context, framework);
  this.setSprite({
    // ctx: context,
    imageURL: "img/enemy_png/flying/spritesheet_70_enemy.png",
    frameWidth: 106,
    frameHeight: 80,
    framesNum: 2
  });

/*    {
      x: width + 20,
      y: Math.floor((Math.random() * height) + 1),
      speedX: settings.bgSpeed
    }, ctx, framework));
*/


}
Brick.prototype = new DrawableObject({}, null, null);
Brick.prototype.draw = function () {
  var x = this._coordinates.x - 95 / 2;
  var y = this._coordinates.y - 70 / 2;

  this.drawSprite(x, y);
};
