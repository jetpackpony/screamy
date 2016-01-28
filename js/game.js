var framework;
var player;

var canvas;
var ctx;
var width;
var height;
var aG = 0;   // gravity acceleration (set in onload)

var minY, maxY = 0;

var bgImage;

var bgSpeed = -100;
var prevtime = 0;

function Player(options, context, framework) {
	DrawableObject.call(this, options, context, framework);
}
Player.prototype = new DrawableObject({}, null, null);
Player.prototype.draw = function () {
	this._ctx.fillStyle = "black";
	this._ctx.fillRect(this._coordinates.x, this._coordinates.y, 30, 30);

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

function Background(options, context, framework) {
	DrawableObject.call(this, options, context, framework);
}
Background.prototype = new DrawableObject({}, null, null);
Background.prototype.draw = function () {
	var scaled_width = bgImage.width * (height / bgImage.height);

	this._ctx.globalAlpha = 0.3;
	this._ctx.drawImage(bgImage, this._coordinates.x, 0, scaled_width, height);
	this._ctx.drawImage(bgImage, this._coordinates.x + scaled_width, 0, scaled_width, height);
	if (Math.abs(this._coordinates.x) >= scaled_width) {
		this._coordinates.x = 0;
	}
	this._ctx.globalAlpha = 1;
};

function Brick(options, context, framework) {
	DrawableObject.call(this, options, context, framework);
}
Brick.prototype = new DrawableObject({}, null, null);
Brick.prototype.draw = function () {
	this._ctx.fillStyle = "red";
	this._ctx.fillRect(this._coordinates.x, this._coordinates.y, 30, 30);
}

var drawFrame = function (time) {
	// Respond to inputs
	document.querySelector("#fps span").innerHTML = framework.getFPS();
	if (framework.getInputState().up) {
		text = "up";
		player.setAcceleration({y: aG * -3});
	} else {
		text = "nothing";
		player.setAcceleration({y: aG});
	}
	document.querySelector("#inputStates span").innerHTML = text;

	// Create the bricks
	if (time - prevtime > 1000) {
		prevtime = time;
		bricks.push(new Brick({
			x: width,
			y: Math.floor((Math.random() * height) + 1),
			speedX: bgSpeed
		}, ctx, framework));
	}

	// Draw the thing
	// Clear the canvas
	ctx.clearRect(0, 0, width, height);

	// Draw the background
	background.drawFrame();

	// Draw the player
	player.drawFrame();

	// Draw the brick
	bricks.forEach(function (brick) {
		brick.drawFrame();
	});
}

window.onload = function init() {
	canvas = document.querySelector("#screamy");
	ctx = canvas.getContext('2d');
	width = canvas.width;
	height = canvas.height;
	minY = 1;
	maxY = height - 31;
	aG = Math.round(height * 0.75);

	bgImage = new Image();
	bgImage.src = "img/full-background.png";

	framework = new GameFramework();
	framework.setDrawFrame(drawFrame);
	framework.setInputListeners(['up']);
	framework.start();

	player = new Player({
		aY: aG,
		x: 30,
		y: 30
	}, ctx, framework);

	background = new Background({
		speedX: bgSpeed
	}, ctx, framework);

	bricks = [];
}