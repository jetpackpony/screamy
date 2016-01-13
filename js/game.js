var framework;

var drawFrame = function () {
	console.log("FPS: " + framework.getFPS());
	document.querySelector("#fps span").innerHTML = framework.getFPS();

	var ctx = document.querySelector("#screamy").getContext('2d');
	ctx.fillStyle = "red";
	ctx.fillRect(Math.round(Math.random() * 400), Math.round(Math.random() * 400), 10, 10);
}

window.onload = function init() {
	framework = new GameFramework();
	framework.setDrawFrame(drawFrame);
	framework.start();
}