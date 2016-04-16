GameFramework = (function ($) {
  var canvas, ctx, width, height;

  /**
   * This is a proxy for the canvas context to record all calls to canvas and aid testing
   * @param {Context} the actual 2d context of the canvas
   */
  var CanvasProxy = function (context) {
    var _ctx = context;
    var _calls = [];
          
    var methods = {
      fill: function() {
        _ctx.fill();
      },
      lineTo: function(x, y) {
        _ctx.lineTo(x, y);
      },
      moveTo: function(x, y) {
        _ctx.moveTo(x, y);
      },
      stroke: function() {
        _ctx.stroke();
      },
      clearRect: function(x, y, width, height) {
        _ctx.clearRect(x, y, width, height);
      },
      drawImage: function(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        _ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      },
      test: function() {
        // just for testing purposes
      }
    };

    var scope = this;
    var addMethod = function(name, method) {
      scope[methodName] = function() {
        record(name, arguments);
        method.apply(scope, arguments);
      };
    }
          
    for(var methodName in methods) {
      addMethod(methodName, methods[methodName]);
    }

    var record = function(methodName, args) {
      _calls.push({name: methodName, args: args});
    };

    this.getCalls = function() {
      return _calls;
    }

    this.getActualContext = function () {
      return _ctx;
    }
  };

  /**
   * Draws all existing objects on a canvas
   * @param  {float} time     time passed by requestAnimationFrame
   * @return {GameFramework}  the current instance of the framework
   */ 
  $._drawFrame = function (time) {
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    $.getAllObjects().forEach(function (obj, index) {
      obj.draw();
    });
    return $;
  };

  /**
   * Inits the canvas and installs canvas proxy
   * @param {Canvas} new_canvas the canvas html element
   * @return {GameFramework}  the current instance of the framework
   */
  $.setCanvas = function (new_canvas) {
    canvas = new_canvas;
    ctx = new CanvasProxy(canvas.getContext('2d'));
    width = canvas.width;
    height = canvas.height;
    return $;
  };

  /**
   * Returns the canvas html element
   * @return {Canvas} the canvas html element
   */
  $.getCanvas = function () {
    return canvas;
  };

  /**
   * Returns the canvas's context
   * @return {Context} The context of the canvas
   */
  $.getCTX = function () {
    return ctx;
  };

  /**
   * Returns the width and height of the canvas element
   * @return {Object} an object of format { height: height, width: width }
   */
  $.getDimensions = function () {
    return {
      height: height,
      width: width
    };
  };

  /**
   * Returns the polygon of the visible canvas
   * @return {Polygon} the polygon of the canvas
   */
  $.getScreenPolygon = function () {
    return $.Polygon.CreateNewFromPoints([0, 0], [width, 0], [0, height], [width, height]);
  };

  return $;
}(GameFramework));