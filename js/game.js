var framework;
var player;

var canvas;
var ctx;
var width;
var height;
var aG = 0;   // gravity acceleration (set in onload)

var minY, maxY = 0;

var bgImage;

var bgSpeed = -250;
var prevtime = 0;

var collisionCount = 0;
var bricksNumber = 0;
var bricksToRemove = [];

var drawFrame = function (time) {
	// Respond to inputs
	document.querySelector("#fps span").innerHTML = framework.getFPS();
	if (framework.getInputState().up || framework.getInputState().space) {
		text = "up";
		player.setAcceleration({y: aG * -3});
	} else {
		text = "nothing";
		player.setAcceleration({y: aG});
	}
	document.querySelector("#inputStates span").innerHTML = text;
	document.querySelector("#collisionCount span").innerHTML = collisionCount;

	// Create the bricks
	if (time - prevtime > 300) {
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
			framework.end();
			// collisionCount++;
			// brick.collided = true;
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

	framework = new GameFramework();
	framework.setDrawFrame(drawFrame);
	framework.setInputListeners(['up','space']);
	framework.start();

	player = new Player({
		aY: aG
	}, ctx, framework);

	background = new Background({
		speedX: bgSpeed
	}, ctx, framework);

	bricks = [];
}