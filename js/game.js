var framework;
// var speed = 100; // in pixels per second

var canvas;
var ctx;
var width;
var height;
var x = 30;
var y = 30;
var direction = 1;
var aY = 0;		
var aG = 0;   // gravity acceleration (set in onload)
// var speed = aG; // in pixels per second
var speed = 0;

var prevTime = 0;
var yInc = 0;

var minY, maxY = 0;

var bgImage;
var bgX = 0;
var bgSpeed = 100;

var drawFrame = function (time) {
	document.querySelector("#fps span").innerHTML = framework.getFPS();
	if (framework.getInputState().up) {
		text = "up";
		aY = aG * -3;
	} else {
		text = "nothing";
		aY = aG;
	}
	document.querySelector("#inputStates span").innerHTML = text;

	// Clear the canvas
	ctx.clearRect(0, 0, width, height);

	// Draw the background
	var scaled_width = bgImage.width * (height / bgImage.height);
	bgX -= framework.convertSpeed(bgSpeed);
	ctx.globalAlpha = 0.3;
	ctx.drawImage(bgImage, bgX, 0, scaled_width, height);
	ctx.drawImage(bgImage, bgX + scaled_width, 0, scaled_width, height);
	if (Math.abs(bgX) >= scaled_width) {
		bgX = 0;
	}
	ctx.globalAlpha = 1;

	// Draw the player
	ctx.fillStyle = "black";
	ctx.fillRect(x, y, 30, 30);

	// Changing the positionS
	speed += aY * framework.getFrameDelta() / 1000;
	yInc = framework.convertSpeed(speed);
	if (y + yInc > maxY) {
		yInc = maxY - y;
		speed = 0;
		aY = 0;
	}
	if (y + yInc < minY) {
		yInc = minY - y;
		speed = 0;
		aY = 0;
	}
	y += yInc;
	y = y;

	if (time - prevTime > 1000) {
		prevTime = time;
		console.log("speed, yInc, y: ", Math.round(speed), yInc, y);
	}
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
}