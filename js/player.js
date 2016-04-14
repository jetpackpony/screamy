var GF = GameFramework;

function Player() {
  GF.DrawableObject.apply(this, arguments);

  var frames = [],
      image = new Image(),
      w, h, sprite;
  image.src = "img/png/flying/spritesheet_50_flying.png";
  h = 60;
  w = 61;
  for(var i = 0; i < 4; i++) {
    frames.push({ x: w * i, y: 0, h: h, w: w });
  }

  sprite = 
    (new GF.Sprite())
    .setImage(image)
    .addFrames(frames)
    .setFrameDelay(100);

  this.setSprite(sprite);
  this.setPosition(new GF.Vector(50, 30));
}

Player.prototype = new GF.DrawableObject();
Player.prototype.constructor = Player;

Player.prototype.updateState = function() {
  GF.DrawableObject.prototype.updateState.apply(this, arguments);

  // if (this.isCollidingWith(GF.ground)) {
    
  // }
};
