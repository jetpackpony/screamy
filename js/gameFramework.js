var GameFramework = function () {
	var drawFrame;
	var lastSecondFrameTime = 0;
	var fps = 0;
	var fpsCounter = 0;
	var frameDelta = 0;
	var prevFrameTime = 0;
	var inputStates = {};
	var firstFrame = true;

	var getFPS = function () {
		return fps;
	};

	var countFPS = function (time) {
		if (time - lastSecondFrameTime > 1000) {
			lastSecondFrameTime = time;
			fps = fpsCounter;
			fpsCounter = 0;
		}
		fpsCounter++;
	};

	var	countFrameDelta = function (time) {
		if (firstFrame) {
			firstFrame = false;
			prevFrameTime = time;
		}
		frameDelta = time - prevFrameTime;
		prevFrameTime = time;
	};

	var mainLoop = function (time) {
		countFrameDelta(time);
		countFPS(time);

		drawFrame(time);

		requestAnimationFrame(mainLoop);
	};

	var start = function () {
		requestAnimationFrame(mainLoop);
	};

	var convertSpeed = function (speed) {
		return speed * (frameDelta / 1000);
	};

	/**
	 * Input listeners
	 */
	var eventListener = function (listenedKey, event, state) {
		if (listenedKey === 'up' && event.keyCode === 38) {
			inputStates[listenedKey] = state;
		}
	};

	var setInputListeners = function (keys) {
		keys.forEach(function (el, i, arr) {
			window.addEventListener('keydown', function (event) {
				eventListener(el, event, true);
			}, false);
			window.addEventListener('keyup', function (event) {
				eventListener(el, event, false);
			}, false);
		});
	};

	var getInputState = function () {
		return inputStates;
	};

	var getFrameDelta = function () {
		return frameDelta;
	};

	/** 
	 * Framework's public interface
	 */
	return {
		start: start,
		setDrawFrame: function (drawFrameFunction) {
			drawFrame = drawFrameFunction;
		},
		getFPS: getFPS,
		getFrameDelta: getFrameDelta,
		getInputState: getInputState,
		setInputListeners: setInputListeners,
		convertSpeed: convertSpeed
	};
};