describe("GameFramework >", function() {
  // Require the framework
  // require("../js/GameFramework/Collisions.js");
  // require("../js/GameFramework/GameFramework.js");
  // require("../js/GameFramework/CanvasOperations.js");
  // require("../js/GameFramework/Counters.js");
  // require("../js/GameFramework/InputListeners.js");
  // require("../js/GameFramework/ObjectCollections.js");
  // require("../js/GameFramework/Physics.js");

  beforeAll(function () {
    GameFramework.setCanvas(document.createElement("canvas"));
  });

  describe("Collisions", function() {
    var Vector = GameFramework.Vector;
    var Polygon = GameFramework.Polygon;

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

  describe("Framework", function() {
    describe("RAF callback tests", function() {
      beforeAll(function() {
        jasmine.RequestAnimationFrame.install();
        updateCallback = jasmine.createSpy("updateCallback");
        GameFramework.setUpdateObjectsFunction(updateCallback);
        GameFramework.startGame();
      });

      afterAll(function() {
        jasmine.RequestAnimationFrame.uninstall();
      });

      it("should call updateObjects function after start", function() {
        jasmine.RequestAnimationFrame.tick();
        expect(updateCallback).toHaveBeenCalled();
      });

      it("should stop calling updateObjects function when finished", function() {
        var count = updateCallback.calls.count();
        GameFramework.endGame();
        jasmine.RequestAnimationFrame.tick();
        jasmine.RequestAnimationFrame.tick();
        expect(updateCallback.calls.count()).toEqual(count);
      });
    });
  });

  describe("Canvas Operations", function() {
    var canvas, ctx;
    var width = height = 100;

    beforeAll(function() {
      canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d');
      GameFramework.setCanvas(canvas);
    });

    it("should store the canvas", function() {
      expect(GameFramework.getCanvas()).toEqual(canvas);
    });

    it("should store the canvas's 2d context", function() {
      expect(GameFramework.getCTX().getActualContext()).toEqual(ctx);
    });

    it("should return canvas dimentions", function() {
      expect(GameFramework.getDimensions().width).toEqual(width);
      expect(GameFramework.getDimensions().height).toEqual(height);
    });

    it("should record the canvas method calls", function() {
      GameFramework.getCTX().test("testme");
      var calls = GameFramework.getCTX().getCalls();
      expect(calls[calls.length - 1].name).toEqual("test");
      expect(calls[calls.length - 1].args.length).toEqual(1);
    });
  });

  describe("Input Event Listeners", function () {

    beforeAll(function() {
      GameFramework.setInputListeners(['up', 'space']);
      jasmine.triggerEvent(38, 'keydown');
    });

    afterAll(function() {
      jasmine.triggerEvent(38, 'keyup');
      jasmine.triggerEvent(32, 'keyup');
    });

    it("should detect when key is pressed", function() {
      expect(GameFramework.getInput('up')).toEqual(true);
      expect(GameFramework.getInput('space')).toEqual(false);
    });

    it("should not detect when key is not pressed", function() {
      jasmine.triggerEvent(38, 'keyup');
      jasmine.triggerEvent(32, 'keydown');
      expect(GameFramework.getInput('up')).toEqual(false);
      expect(GameFramework.getInput('down')).toBeFalsy();
      expect(GameFramework.getInput('space')).toEqual(true);
    });
  });

  describe("Counters", function () {
    beforeAll(function() {
      jasmine.RequestAnimationFrame.install();
      GameFramework.setUpdateObjectsFunction(function () {});
      GameFramework.startGame();
    });

    afterAll(function() {
      jasmine.RequestAnimationFrame.uninstall();
    });

    it("should count frames correctly", function() {
      jasmine.RequestAnimationFrame.tick(1);
      jasmine.RequestAnimationFrame.tick(300);
      jasmine.RequestAnimationFrame.tick(500);
      jasmine.RequestAnimationFrame.tick(600);
      jasmine.RequestAnimationFrame.tick(1001);
      expect(GameFramework.getFPS()).toEqual(5);
    });

    it("should calculate delta between frames correctly", function() {
      jasmine.RequestAnimationFrame.tick(1);
      jasmine.RequestAnimationFrame.tick(300);
      expect(GameFramework.getFrameDelta()).toEqual(299);
      jasmine.RequestAnimationFrame.tick(400);
      expect(GameFramework.getFrameDelta()).toEqual(100);
    });
  });

  describe("ObjectCollections", function () {
    var player = { name: "Vasya" },
        enemies = [{name: "Monster"}, {name: "Nikita"}],
        takenName = { name: "taken name" },
        objectsFlatted = [];

    beforeAll(function() {
      GameFramework.addObjects({
        player: player,
        enemies: enemies,
        getObject: takenName
      });
      objectsFlatted.push(player, enemies[0], enemies[1], takenName);
    });

    it("should be able to store the object in the framework", function() {
      expect(GameFramework.player).toEqual(player);
      expect(GameFramework.enemies).toEqual(enemies);
    });

    it("should be able to store objects with names already taken", function() {
      expect(GameFramework.getObject("getObject")).toEqual(takenName);
    });

    it("should return a flatted collection of all objects", function() {
      expect(GameFramework.getAllObjects()).toEqual(objectsFlatted);
    });
  });

  describe("DrawableObject >", function() {
    describe("Speed and acceleration >", function() {
      var obj;
      var Vector = GameFramework.Vector;

      beforeAll(function() {
        jasmine.RequestAnimationFrame.install();
        GameFramework.setUpdateObjectsFunction(function (time) { });
        GameFramework.startGame();
        jasmine.RequestAnimationFrame.tick(0);
      });

      afterAll(function() {
        jasmine.RequestAnimationFrame.uninstall();
      });

      beforeEach(function() {
        obj = new GameFramework.DrawableObject();
        GameFramework.addObjects({ obj: obj });
      });

      afterEach(function() {
        GameFramework._removeAllObjects();
      });


      it("should not change coordinates if the speed is zero", function() {
        obj.setSpeed(new Vector(0, 0));
        jasmine.RequestAnimationFrame.tick(1000);
        expect(obj.position).toEqual(new Vector(0, 0));
      });

      it("should change coordinates if the speed is non-zero", function() {
        obj.setSpeed(new Vector(1, 2));
        jasmine.RequestAnimationFrame.tick(1000);
        expect(obj.position).toEqual(new Vector(1, 2));
        jasmine.RequestAnimationFrame.tick(5000);
        expect(obj.position).toEqual(new Vector(6, 12));
      });

      it("should not change speed if acceleration is zero", function() {
        obj.setSpeed(new Vector(0, 0));
        obj.setAcceleration(new Vector(0, 0));
        jasmine.RequestAnimationFrame.tick(1000);
        expect(obj.speed).toEqual(new Vector(0, 0));
      });

      it("should change speed if acceleration is non-zero", function() {
        obj.setSpeed(new Vector(0, 0));
        obj.setAcceleration(new GameFramework.Vector(1, 2));
        jasmine.RequestAnimationFrame.tick(1000);
        expect(obj.speed).toEqual(new GameFramework.Vector(1, 2));
        jasmine.RequestAnimationFrame.tick(1000);
        expect(obj.speed).toEqual(new GameFramework.Vector(2, 4));
      });
    });

    describe("Drawing >", function() {
      var obj, image;
      var img = "";
      var objPos = {x: 0, y: 0, w: 100, h: 100};
      var spritePos = {x: 0, y: 0, w: 100, h: 100};

      beforeAll(function() {
        image = new Image();
        image.src = img;
        obj = new GameFramework.DrawableObject();
        obj.spriteCollection = new GameFramework.SpriteCollection();
        GameFramework.addObjects({ obj: obj });

        jasmine.RequestAnimationFrame.install();
        GameFramework.setUpdateObjectsFunction(function (time) { });
        GameFramework.startGame();
        jasmine.RequestAnimationFrame.tick(0);
      });

      afterAll(function() {
        jasmine.RequestAnimationFrame.uninstall();
        GameFramework._removeAllObjects();
      });

      xit("should call the draw method of canvas every frame", function() {
        jasmine.RequestAnimationFrame.tick(1000);

        var calls = GameFramework.getCTX().getCalls();
        expect(calls[calls.length - 1].name).toEqual("drawImage");
        expect(calls[calls.length - 1].args.length).toEqual(9);
        expect(calls[calls.length - 1].args[0]).toEqual(image);
        expect(calls[calls.length - 1].args[1]).toEqual(objPos.x);
        expect(calls[calls.length - 1].args[2]).toEqual(objPos.y);
        expect(calls[calls.length - 1].args[3]).toEqual(objPos.w);
        expect(calls[calls.length - 1].args[4]).toEqual(objPos.h);
        expect(calls[calls.length - 1].args[5]).toEqual(spritePos.x);
        expect(calls[calls.length - 1].args[6]).toEqual(spritePos.y);
        expect(calls[calls.length - 1].args[7]).toEqual(spritePos.w);
        expect(calls[calls.length - 1].args[8]).toEqual(spritePos.h);
      });
    });

    describe("Collisions >", function() {
      xit("should detect collision if colliding with object", function() {
        expect()
      });

      xit("should not detect collision if not colliding with object", function() {
        expect()
      });
    });
  });
});