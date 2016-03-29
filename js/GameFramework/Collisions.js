GameFramework = (function($) {

  function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  $.Vector = Vector;

  Vector.prototype.substract = function(other) {
    return new Vector(this.x - other.x, this.y - other.y);
  };

  Vector.prototype.add = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
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

  Vector.prototype.lengthSquared = function() {
    return this.dotProduct(this);
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




  function Polygon(points, center) {
    this._relativePoints = points;
    this._calcPoints = [];
    this.setCenter(center || new Vector());
  }
  $.Polygon = Polygon;

  Polygon.prototype.setCenter = function(new_center) {
    this._center = new_center;
    for (var i = 0; i < this._relativePoints.length; i++) {
      this._calcPoints.push(this._center.add(this._relativePoints[i]));
    }
    return this;
  };

  Polygon.prototype.getCenter = function() {
    return this._center;
  };

  Polygon.prototype.getCalcPoints = function() {
    return this._calcPoints;
  };

  Polygon.prototype.getRelativePoints = function() {
    return this._relativePoints;
  };


  var makeProjection = function(polygon, axis) {
    var cur, min, max;
    min = max = axis.dotProduct(polygon.getCalcPoints()[0]);

    for (var i = 0; i < polygon.getCalcPoints().length; i++) {
      cur = axis.dotProduct(polygon.getCalcPoints()[i]);
      if (cur <  min)
        min = cur;
      if (cur > max)
        max = cur;
    }
    return new Projection(min, max, axis);
  };

  var getAxesForPolygon = function (polygon) {
    var p1, p2;
    var axes = [];
    for (var i = 0; i < polygon.getCalcPoints().length; i++) {
      p1 = polygon.getCalcPoints()[i];
      p2 = polygon.getCalcPoints()[i + 1 == polygon.getCalcPoints().length ? 0 : i + 1];
      axes.push(p1.substract(p2).perpendicular());
    }
    return axes;
  };

  var isPreciseCollision = function (polygon1, polygon2) {
    // Calc all axes
    var axes = [].concat(getAxesForPolygon(polygon1)).concat(getAxesForPolygon(polygon2));

    for (var i = 0; i < axes.length; i++) {
      p1 = makeProjection(polygon1, axes[i]);
      p2 = makeProjection(polygon2, axes[i]);
      if (!p1.overlap(p2)) {
        return false;
      }
    }
    return true;
  };

  var getPolygonRadius = function (polygon) {
    var relPoints = polygon.getRelativePoints();
    var max = 0;

    for (var i = 0; i < relPoints.length; i++) {
      if (max < relPoints[i].lengthSquared()) {
        max = relPoints[i].lengthSquared();
      }
    }
    return Math.sqrt(max);
  };

  Polygon.prototype.getRadius = function() {
    if (!this._radius) {
      return this._radius = getPolygonRadius(this);
    }
    return this._radius;
  };

  var isBroadCollision = function (polygon1, polygon2) {
    var center_distance, rad_distance;
    center_distance = polygon1.getCenter().substract(polygon2.getCenter());
    center_distance = center_distance.dotProduct(center_distance);
    rad_distance = (polygon1.getRadius() + polygon2.getRadius());
    return center_distance < rad_distance * rad_distance;
  };

  Polygon.prototype.isCollidingWith = function (other) {
    if (isBroadCollision(this, other)) {
      if (isPreciseCollision(this, other)) {
        return true;
      }
    }
    return false;
  };

  Polygon.CreateNewFromPoints = function() {
    var points = Array.prototype.slice.call(arguments);
    var vectors = [];
    for (var i = 0; i < points.length; i++) {
      vectors.push(new Vector(points[i][0], points[i][1]));
    }
    return new Polygon(vectors);
  };

  return $;
}({}));
