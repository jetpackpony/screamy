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

  $._drawFrame = function (time) {
    // Draw the thing
    ctx.clearRect(0, 0, width, height);

    $.getAllObjects().forEach(function (obj, index) {
      obj.drawFrame();
    });
    return $;
  };

  $.setCanvas = function (new_canvas) {
    canvas = new_canvas;
    ctx = new CanvasProxy(canvas.getContext('2d'));
    width = canvas.width;
    height = canvas.height;
    return $;
  };

  $.getCanvas = function () {
    return canvas;
  };

  $.getCTX = function () {
    return ctx;
  };

  $.getDimensions = function () {
    return {
      height: height,
      width: width
    };
  };

  return $;
}(GameFramework));