var framework;
var player;

var canvas;
var ctx;
var width;
var height;
var aG = 0;   // gravity acceleration (set in onload)

var minY, maxY = 0;

var bgImage;

function Player(options) {
	var defaults = {
		speedX: 0, speedY: 0, aX: 0, aY: 0, x: 0, y: 0
	};

	var speedX = options.speedX || defaults.speedX;
	var speedY = options.speedY || defaults.speedY;
	var aX = options.aX || defaults.aX;
	var aY = options.aY || defaults.aY;
	var x = options.x || defaults.x;
	var y = options.y || defaults.y;
	var yInc = 0;

	function setSpeed (newSpeeds) {
		speedX = newSpeeds.speedX || speedX;
		speedY = newSpeeds.speedY || speedY;
	}

	function setAcceleration (newAccs) {
		aX = newAccs.aX || aX;
		aY = newAccs.aY || aY;
	}

	function draw() {
		ctx.fillStyle = "black";
		ctx.fillRect(x, y, 30, 30);

		// Changing the positionS
		speedY += aY * framework.getFrameDelta() / 1000;
		yInc = framework.convertSpeed(speedY);
		if (y + yInc > maxY) {
			yInc = maxY - y;
			speedY = 0;
			aY = 0;
		}
		if (y + yInc < minY) {
			yInc = minY - y;
			speedY = 0;
			aY = 0;
		}
		y += yInc;
		y = y;
	}

	function getPosition () {
		return {
			x: x, y: y, radius: calcRadius()
		}
	}

	function calcRadius () {
		return 20;
	}

	return {
		draw: draw,
		setSpeed: setSpeed,
		setAcceleration: setAcceleration
	};
}

function Background(options) {
	var defaults = {
		speedX: 0, speedY: 0, aX: 0, aY: 0, x: 0, y: 0
	};

	var speedX = options.speedX || defaults.speedX;
	var speedY = options.speedY || defaults.speedY;
	var aX = options.aX || defaults.aX;
	var aY = options.aY || defaults.aY;
	var x = options.x || defaults.x;
	var y = options.y || defaults.y;
	var yInc = 0;

	function setSpeed (newSpeeds) {
		speedX = newSpeeds.speedX || speedX;
		speedY = newSpeeds.speedY || speedY;
	}

	function setAcceleration (newAccs) {
		aX = newAccs.aX || aX;
		aY = newAccs.aY || aY;
	}

	function draw() {
		var scaled_width = bgImage.width * (height / bgImage.height);
		x += framework.convertSpeed(speedX);
		ctx.globalAlpha = 0.3;
		ctx.drawImage(bgImage, x, 0, scaled_width, height);
		ctx.drawImage(bgImage, x + scaled_width, 0, scaled_width, height);
		if (Math.abs(x) >= scaled_width) {
			x = 0;
		}
		ctx.globalAlpha = 1;
	}

	function getPosition () {
		return {
			x: x, y: y, radius: calcRadius()
		}
	}

	function calcRadius () {
		return 20;
	}

	return {
		draw: draw,
		setSpeed: setSpeed,
		setAcceleration: setAcceleration
	};
}

function Brick(options) {
	var defaults = {
		speedX: 0, speedY: 0, aX: 0, aY: 0, x: 0, y: 0
	};

	var speedX = options.speedX || defaults.speedX;
	var speedY = options.speedY || defaults.speedY;
	var aX = options.aX || defaults.aX;
	var aY = options.aY || defaults.aY;
	var x = options.x || defaults.x;
	var y = options.y || defaults.y;
	var yInc = 0;

	function setSpeed (newSpeeds) {
		speedX = newSpeeds.speedX || speedX;
		speedY = newSpeeds.speedY || speedY;
	}

	function setAcceleration (newAccs) {
		aX = newAccs.aX || aX;
		aY = newAccs.aY || aY;
	}

	function draw() {
		ctx.fillStyle = "red";
		ctx.fillRect(x, y, 30, 30);

		// Changing the positionS
		speedX += aX * framework.getFrameDelta() / 1000;
		xInc = framework.convertSpeed(speedX);
		// if (y + xInc > maxX) {
		// 	xInc = maxX - y;
		// 	speedX = 0;
		// 	aY = 0;
		// }
		// if (y + xInc < minY) {
		// 	xInc = minY - y;
		// 	speedX = 0;
		// 	aY = 0;
		// }
		x += xInc;
	}

	function getPosition () {
		return {
			x: x, y: y, radius: calcRadius()
		}
	}

	function calcRadius () {
		return 20;
	}

	return {
		draw: draw,
		setSpeed: setSpeed,
		setAcceleration: setAcceleration
	};
}

var drawFrame = function (time) {
	document.querySelector("#fps span").innerHTML = framework.getFPS();
	if (framework.getInputState().up) {
		text = "up";
		player.setAcceleration({aY: aG * -3});
	} else {
		text = "nothing";
		player.setAcceleration({aY: aG});
	}
	document.querySelector("#inputStates span").innerHTML = text;

	// Clear the canvas
	ctx.clearRect(0, 0, width, height);

	// Draw the background
	background.draw();

	// Draw the player
	player.draw();

	// Draw the brick
	brick.draw();
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
	});

	background = new Background({
		speedX: -100
	});

	brick = new Brick({
		x: width,
		y: 100,
		speedX: -100
	});
}