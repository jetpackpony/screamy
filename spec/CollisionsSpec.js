describe("Collisions:", function() {
  require("../js/Collisions.js");
  var Vector = Collisions.Vector;
  var Polygon = Collisions.Polygon;


  describe("Vector:", function() {
    var v1, v2;
    beforeEach(function() {
      v1 = new Vector(3, 1);
      v2 = new Vector(2, 4);
    });

    it("should substract vectors correctly", function() {
      var v3 = v1.substract(v2);
      expect(v3.x).toEqual(1);
      expect(v3.y).toEqual(-3);
    });

    it("should add vectors correctly", function() {
      var v3 = v1.add(v2);
      expect(v3.x).toEqual(5);
      expect(v3.y).toEqual(5);
    });

    it("should find perpendicular vector correctly", function() {
      var v3 = new Vector(1, -3);
      var v4 = new Vector(4, -2);
      expect(v3.isEqual(v1.perpendicular())).toBeTruthy();
      expect(v4.isEqual(v2.perpendicular())).toBeTruthy();
    });

    it("should calculate dot product correctly", function() {
      var prod = v1.x * v2.x + v1.y * v2.y;
      expect(v1.dotProduct(v2)).toEqual(prod);
    });

    it("should compare vectors correctly", function() {
      var v3 = new Vector(3, 1);
      expect(v3.isEqual(v1)).toBeTruthy();
      expect(v3.isEqual(v2)).toBeFalsy();
    });

    it("should calculate length squared correctly", function() {
      expect(v1.lengthSquared()).toEqual(10);
      expect(v2.lengthSquared()).toEqual(20);
    });
  });

  describe("Polygon:", function() {
    var p1, p2, p3;

    beforeEach(function() {
      p1 = new Polygon([
        new Vector(-2, 0),
        new Vector(0, 2),
        new Vector(1, 1),
        new Vector(1, -1),
        new Vector(-1, -2)
      ], new Vector(2, 2));

      p2 = new Polygon([
        new Vector(-1, 2),
        new Vector(2, 0),
        new Vector(-1, -2)
      ], new Vector(4, 2));

      p3 = new Polygon([
        new Vector(-1, 1),
        new Vector(2, 0),
        new Vector(2, -1),
        new Vector(1, -2)
      ], new Vector(5, 2));

      p4 = new Polygon([
        new Vector(-1, 1),
        new Vector(2, 0),
        new Vector(2, -1),
        new Vector(1, -2)
      ], new Vector(10, 2));      
    });

    describe("Collsion detection:", function() {
      it("should detect collision with overlapping polygon", function() {
        expect(p2.isCollidingWith(p3)).toBeTruthy();
      });

      it("should detect collision with touching polygon", function() {
        expect(p1.isCollidingWith(p2)).toBeTruthy();
      }); 

      it("should not detect collision with not overlapping polygon", function() {
        expect(p1.isCollidingWith(p3)).toBeFalsy();
      });

      it("should not detect collision with not overlapping polygon", function() {
        expect(p1.isCollidingWith(p4)).toBeFalsy();
      });      
    });

    describe("Polygon creation:", function() {
      var point1 = [0, 2];
      var point2 = [2, 3];
      var point3 = [3, 2];
      var p1 = new Polygon([
        new Vector(point1[0], point1[1]),
        new Vector(point2[0], point2[1]),
        new Vector(point3[0], point3[1])
      ]);

      it("should create new a polygon object from given points", function() {
        var p2 = Polygon.CreateNewFromPoints(point1, point2, point3);
        expect(p2).toEqual(p1);
      });
    });
  });
});