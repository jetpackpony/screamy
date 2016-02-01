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

var collisionCount = 0;
var bricksNumber = 0;
var bricksToRemove = [];

function Player(options, context, framework) {
	DrawableObject.call(this, options, context, framework);
}
Player.prototype = new DrawableObject({}, null, null);
Player.prototype.draw = function () {
	// this._ctx.fillStyle = "black";
	// this._ctx.fillRect(this._coordinates.x, this._coordinates.y, 30, 30);
	this._ctx.beginPath();
	this._ctx.fillStyle = "black";
	this._ctx.arc(this._coordinates.x, this._coordinates.y, this._measures.radius, 0, 2*Math.PI);
	this._ctx.fill();

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
	this._ctx.globalAlpha = 0.3;
	this._ctx.drawImage(bgImage, this._coordinates.x, 0);
	this._ctx.drawImage(bgImage, this._coordinates.x + width, 0);
	if (Math.abs(this._coordinates.x) >= width) {
		this._coordinates.x = 0;
	}
	this._ctx.globalAlpha = 1;
};

function Brick(options, context, framework) {
	DrawableObject.call(this, options, context, framework);
}
Brick.prototype = new DrawableObject({}, null, null);
Brick.prototype.draw = function () {
	// this._ctx.fillStyle = "red";
	// this._ctx.fillRect(this._coordinates.x, this._coordinates.y, 30, 30);
	this._ctx.beginPath();
	this._ctx.fillStyle = "red";
	this._ctx.arc(this._coordinates.x, this._coordinates.y, this._measures.radius, 0, 2*Math.PI);
	this._ctx.fill();
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
	document.querySelector("#collisionCount span").innerHTML = collisionCount;

	// Create the bricks
	if (time - prevtime > 1000) {
		prevtime = time;
		bricks.push(new Brick({
			x: width + 20,
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
	bricks.forEach(function (brick, index) {
		if (!brick.collided && brick.isCollidingWith(player)) {
			collisionCount++;
			brick.collided = true;
		}
		brick.drawFrame();
		if (brick.getCoordinates().right <= 0) {
			bricksToRemove.push(index);
		}
	});

	// Remove the unwanted bricks
	bricksToRemove.forEach(function (el) {
		bricks.splice(el, 1);
	});
	bricksToRemove = [];
}

window.onload = function init() {
	canvas = document.querySelector("#screamy");
	ctx = canvas.getContext('2d');
	width = canvas.width;
	height = canvas.height;
	minY = 21;
	maxY = height - 21;
	aG = Math.round(height * 0.75);

	bgImage = new Image();
	bgImage.src = "img/full-background_500_1000.png";

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
	bricks.push(new Brick({
		x: width + 20,
		y: Math.floor((Math.random() * height) + 1),
		speedX: bgSpeed
	}, ctx, framework));
}