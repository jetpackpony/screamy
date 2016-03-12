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

  Vector.prototype.isEqual = function(other) {
    return this.x === other.x && this.y === other.y;
  };



  function Projection(x1, x2, axis) {
    this.x1 = x1 || 0;
    this.x2 = x2 || 0;
    this.axis = axis;
  }

  Projection.prototype.overlap = function(that) {
    return this.x1 <= that.x2 && this.x2 >= that.x1;
  };

  Projection.prototype.isEqual = function(that) {
    return this.axis.isEqual(that.axis) && this.x1 === that.x1 && this.x2 === that.x2;
  };
  COL.Projection = Projection;






  function Polygon(points) {
    this.points = points;
  }
  COL.Polygon = Polygon;

  Polygon.prototype.isCollidingWith = function (other) {
    // Calc all axes
    var axes = [].concat(this.getAxes()).concat(other.getAxes());

    for (var i = 0; i < axes.length; i++) {
      p1 = this.projectOn(axes[i]);
      p2 = other.projectOn(axes[i]);
      if (!p1.overlap(p2)) {
        return false;
      }
    }
    return true;
  };

  Polygon.prototype.projectOn = function(axis) {
    var cur, min, max;
    min = max = axis.dotProduct(this.points[0]);

    for (var i = 0; i < this.points.length; i++) {
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
    for (var i = 0; i < this.points.length; i++) {
      p1 = this.points[i];
      p2 = this.points[i + 1 == this.points.length ? 0 : i + 1];
      axes.push(p1.substract(p2).perpendicular());
    }
    return axes;
  };

  Polygon.CreateNewFromPoints = function() {
    var points = Array.prototype.slice.call(arguments);
    var vectors = [];
    for (var i = 0; i < points.length; i++) {
      vectors.push(new Vector(points[i][0], points[i][1]));
    }
    return new Polygon(vectors);
  };

  return COL;
}());
