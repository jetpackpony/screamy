/**
 * Jasmine performance.now(): stubbing the performance.now() function call
 */
;(function() {

    var index = 0,
        callbacks = {};

    function MockPerfNow(global) {
        var realPerfNow = global.performance.now(),
            setTime = 0;

        /**
         * Mock for window.performance.now()
         */
        var mockPerfNow = function() {
            return setTime;
        };

        /**
         * Install performance.now() mock
         */
        this.install = function() {
            global.performance.now = mockPerfNow;
            setTime = 0;
        };

        /**
         * Uninstall request animation frame mocks.
         */
        this.uninstall = function() {
            global.performance.now = realPerfNow;
            setTime = 0;
        };

        /**
         * Simulate the clock ticking
         */
        this.tick = function(time) {
            setTime += time;
        };
    }

    jasmine.PerformanceNow = new MockPerfNow(window);
}());
