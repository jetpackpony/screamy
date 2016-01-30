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

function DrawableObject(options, context, framework) {
	this._defaults = {
		x: 0, y: 0, speedX: 0, speedY: 0, aX: 0, aY: 0, radius: 20
	};

	this._coordinates = {
		x: options.x || this._defaults.x,
		y: options.y || this._defaults.y
	};
	this._measures = {
		radius: options.radius || this._defaults.radius
	};
	this._speed = {
		x: options.speedX || this._defaults.speedX,
		y: options.speedY || this._defaults.speedY
	};
	this._acceleration = {
		x: options.aX || this._defaults.aX,
		y: options.aY || this._defaults.aY
	};
	this._ctx = context;
	this._framework = framework;
};
DrawableObject.prototype.setAcceleration = function (newAccs) {
	if (newAccs.x !== undefined) this._acceleration.x = newAccs.x;
	if (newAccs.y !== undefined) this._acceleration.y = newAccs.y;
};
DrawableObject.prototype.calculateCoordinates = function () {
	var delta = this._framework.getFrameDelta() / 1000;
	this._speed.y += this._acceleration.y * delta;
	this._coordinates.y += framework.convertSpeed(this._speed.y);

	this._speed.x += this._acceleration.x * delta;
	this._coordinates.x += framework.convertSpeed(this._speed.x);
};
DrawableObject.prototype.stop = function () {
	this._speed.y = 0;
	this.setAcceleration({y: 0});
};
DrawableObject.prototype.drawFrame = function () {
	this.calculateCoordinates();
	this.draw();
};
DrawableObject.prototype.getCoordinates = function () {
	return {
		x: this._coordinates.x,
		y: this._coordinates.y,
		r: this._measures.radius,
	};
};
DrawableObject.prototype.isCollidingWith = function (object) {
	var dx = this._coordinates.x - object.getCoordinates().x;
	var dy = this._coordinates.y - object.getCoordinates().y;
	var radSum = this._measures.radius + object.getCoordinates().r;

	if (dx * dx + dy * dy <= radSum * radSum) {
		return true;
	}
	return false;
};