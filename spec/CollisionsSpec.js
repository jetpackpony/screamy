describe("Collisions:", function() {
  require("../js/Collisions.js");
  var Vector = Collisions.Vector;
  var Projection = Collisions.Projection;
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
  });

  describe("Projection:", function() {
    var p1, p2;
    var axis = new Vector(1, 1);

    beforeEach(function() {
      p1 = new Projection(0, 2, axis);
      p2 = new Projection(1, 3, axis);
      p3 = new Projection(3, 4, axis);
    });

    it("should detect overlap between overlapping projections", function() {
      expect(p1.overlap(p2)).toBeTruthy();
    });
    it("should detect overlap between touching projections", function() {
      expect(p2.overlap(p3)).toBeTruthy();
    });
    it("should NOT detect overlap between NOT overlapping projections", function() {
      expect(p1.overlap(p3)).toBeFalsy();
    });
  });

  describe("Polygon:", function() {
    var p1, p2, p3;

    beforeEach(function() {
      p1 = new Polygon([
        new Vector(0, 2),
        new Vector(2, 3),
        new Vector(3, 2),
        new Vector(3, 1),
        new Vector(1, 0)
      ]);

      p2 = new Polygon([
        new Vector(3, 0),
        new Vector(3, 3),
        new Vector(6, 2)
      ]);

      p3 = new Polygon([
        new Vector(4, 2),
        new Vector(5, 3),
        new Vector(7, 1),
        new Vector(6, 0)
      ]);
    });

    describe("Inner calculations:", function() {
      var axes1 = [
        new Vector(-1, 2),
        new Vector(1, 1),
        new Vector(1, 0),
        new Vector(1, -2),
        new Vector(-2, -1)
      ];
      
      var axes2 = [
        new Vector(-3, 0), 
        new Vector(1, 3),
        new Vector(2, -3)
      ];

      var axes3 = [
        new Vector(-1, 1),
        new Vector(2, 2),
        new Vector(1, -1),
        new Vector(-2, -2)
      ];

      var proj1_2_3 = new Projection(-6, 3, axes2[2]);
      var proj2_1_2 = new Projection(3, 8, axes1[1]);
      var proj3_3_4 = new Projection(-16, -12, axes3[3]);

      it("should calculate axes for it's sides correctly", function() {
        expect(p1.getAxes()).toContainAllVectors(axes1);
        expect(p2.getAxes()).toContainAllVectors(axes2);
        expect(p3.getAxes()).toContainAllVectors(axes3);
      });

      it("should calculate it's projection on an axis correctly", function() {
        expect(p1.projectOn(axes2[2])).toEqual(proj1_2_3);
        expect(p2.projectOn(axes1[1])).toEqual(proj2_1_2);
        expect(p3.projectOn(axes3[3])).toEqual(proj3_3_4);
      });
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