var framework;
var speed = 100; // in pixels per second

var canvas;
var ctx;
var width;
var height;
var x = 10;
var y = 10;
var direction = 1;

var drawFrame = function () {
	console.log("FPS: " + framework.getFPS());
	document.querySelector("#fps span").innerHTML = framework.getFPS();
	if (framework.getInputState().up) {
		text = "up";
	} else {
		text = "nothing";
	}
	document.querySelector("#inputStates span").innerHTML = text;

	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = "red";
	ctx.fillRect(x, y, 10, 10);

	if (y < 10) {
		direction = 1;
	}
	if (y > 350) {
		direction = -1;
	}

	y += framework.convertSpeed(speed) * direction;
}

window.onload = function init() {
	canvas = document.querySelector("#screamy");
	ctx = canvas.getContext('2d');
	width = canvas.width;
	height = canvas.height;

	framework = new GameFramework();
	framework.setDrawFrame(drawFrame);
	framework.setInputListeners(['up']);
	framework.start();
}