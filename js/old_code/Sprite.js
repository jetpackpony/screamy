function Sprite(options) {
  this.ctx = options.ctx;

  this.image = new Image();
  this.image.src = options.imageURL;
  this.delayBetweenFrames = options.delayBetweenFrames || settings.defaultSpriteDelay;
  this.width = options.frameWidth;
  this.height = options.frameHeight;
  this.framesNum = options.framesNum;

  this.totalTimeSinceLastRedraw = 0;
  this.currentFrame = 0;
  this.then = performance.now();
}
Sprite.prototype.draw = function (x, y) {
  var now = performance.now();
  var delta = now - this.then;

  if (this.totalTimeSinceLastRedraw > this.delayBetweenFrames) {
    this.currentFrame++;
    this.currentFrame %= this.framesNum;
    this.totalTimeSinceLastRedraw = 0;
  } else {
    this. totalTimeSinceLastRedraw += delta;
  }
  this.then = now;

  this.ctx.drawImage(this.image, this.currentFrame * this.width, 0, this.width, this.height, x, y, this.width, this.height);
};