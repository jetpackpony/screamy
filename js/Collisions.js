Collisions = (function() {
  var COL = {};

  function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  COL.Vector = Vector;

  Vector.prototype.substract = function(other) {
    return new Vector(this.x - other.x, this.y - other.y);
  };

  Vector.prototype.perpendicular = function() {
    return new Vector(this.y, -this.x);
  };

  Vector.prototype.dotProduct = function(other) {
    return this.x * other.x + this.y * other.y;
  };




  function Projection(x1, x2, axis) {
    this.x1 = x1 || 0;
    this.x2 = x2 || 0;
    this.axis = axis;
  }

  Projection.prototype.overlap = function(that) {
    return this.x1 < that.x2 && this.x2 > that.x1;
  };






  function Polygon(points) {
    this.points = points;
  }
  COL.Polygon = Polygon;

  Polygon.prototype.isCollidingWith = function (other) {
    // Calc all axes
    var axes = [];
    axes.concat(this.getAxes());
    axes.concat(other.getAxes());

    for(i = 0; i < axes.length; i++) {
      p1 = this.projectOn(axes[i]);
      p2 = other.projectOn(axes[i]);
      if (! p1.overlap(p2)) {
        return false;
      }
    }
    return true;
  };

  Polygon.prototype.projectOn = function(axis) {
    var cur, min, max;
    min = max = axis.dotProduct(this.points[0]);

    for (var i = this.points.length - 1; i >= 0; i--) {
      cur = axis.dotProduct(this.points[i]);
      if (cur <  min)
        min = cur;
      if (cur > max)
        max = cur;
    }
    return new Projection(min, max, axis);
  };

  Polygon.prototype.getAxes = function() {
    var p1, p2;
    var axes = [];
    for (var i = this.points.length - 1; i >= 0; i--) {
      p1 = this.points[i];
      p2 = this.points[i + 1 == this.points.length ? 0 : i + 1];
      axes.push(p1.substract(p2).perpendicular());
    }
    return axes;
  };

  return COL;
}());


var p1 = new Collisions.Polygon([
  new Collisions.Vector(1, 2),
  new Collisions.Vector(2, 4),
  new Collisions.Vector(3, 1)
]);

var p2 = new Collisions.Polygon([
  new Collisions.Vector(3, 3),
  new Collisions.Vector(3, 4),
  new Collisions.Vector(4, 4)
]);