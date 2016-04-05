/**
 * Jasmine RequestAnimationFrame: a set of helpers for testing funcionality
 * that uses requestAnimationFrame under the Jasmine BDD framework for JavaScript.
 */
;(function() {

    var index = 0,
        callbacks = {};

    function MockRAF(global) {
        var realRAF = global.requestAnimationFrame,
            realCAF = global.cancelAnimationFrame,
            timeSinceStart = 0;

        /**
         * Mock for window.requestAnimationFrame
         */
        var mockRAF = function(fn) {
            if (typeof fn !== 'function') {
                throw new Error('You should pass a function to requestAnimationFrame');
            }

            index++;
            callbacks[index] = fn;

            return index;
        };

        /**
         * Mock for window.cancelAnimationFrame
         */
        var mockCAF = function(requestID) {
            delete callbacks[requestID];
        };

        /**
         * Install request animation frame mocks.
         */
        this.install = function() {
            global.requestAnimationFrame = mockRAF;
            global.cancelAnimationFrame = mockCAF;
            timeSinceStart = 0;
        };

        /**
         * Uninstall request animation frame mocks.
         */
        this.uninstall = function() {
            global.requestAnimationFrame = realRAF;
            global.cancelAnimationFrame = realCAF;
            timeSinceStart = 0;
            callbacks = {};
        };

        /**
         * Simulate animation frame readiness.
         */
        this.tick = function(time) {
            var fns = callbacks, fn, i;

            timeSinceStart += time;
            callbacks = {};

            for (i in fns) {
                fn = fns[i];
                fn.call(global, timeSinceStart);
            }
        };
    }


    jasmine.RequestAnimationFrame = new MockRAF(window);
}());
