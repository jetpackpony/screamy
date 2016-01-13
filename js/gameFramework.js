var GameFramework = function () {
	var drawFrame;
	var prevFrameTime = 0;
	var fps = 0;
	var fpsCounter = 0;
	
	var getFPS = function () {
		return fps;
	}

	var countFPS = function (time) {
		if (time - prevFrameTime > 1000) {
			prevFrameTime = time;
			fps = fpsCounter;
			fpsCounter = 0;
		}
		fpsCounter++;
	};

	var mainLoop = function (time) {
		countFPS(time);

		drawFrame();

		requestAnimationFrame(mainLoop);
	};

	var start = function () {
		requestAnimationFrame(mainLoop);
	};

	return {
		start: start,
		setDrawFrame: function (drawFrameFunction) {
			drawFrame = drawFrameFunction;
		},
		getFPS: getFPS
	}
};