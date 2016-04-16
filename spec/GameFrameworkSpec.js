describe("GameFramework >", function() {
  var canvas, ctx;
  var width = height = 1000;

  beforeEach(function () {
    jasmine.RequestAnimationFrame.install();
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');
    GameFramework.setCanvas(canvas);
  });

  afterEach(function () {
    GameFramework.endGame();
    GameFramework._removeAllObjects();
    GameFramework._resetCounters();
    jasmine.RequestAnimationFrame.uninstall();
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

        it("should be able to move the center of polygon not affecting the polygon", function() {
          p1.setCenter(new Vector(0, 0));
          p2.setCenter(new Vector(2, 0));
          p3.setCenter(new Vector(3, 0));
          p4.setCenter(new Vector(8, 0));
          expect(p2.isCollidingWith(p3)).toBeTruthy();
          expect(p1.isCollidingWith(p2)).toBeTruthy();
          expect(p1.isCollidingWith(p3)).toBeFalsy();
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
      beforeEach(function() {
        updateCallback = jasmine.createSpy("updateCallback");
        GameFramework.setUpdateObjectsFunction(updateCallback);
        GameFramework.startGame();
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

    it("should return the screen polygon", function() {
      expect(GameFramework.getScreenPolygon()).toEqual(GameFramework.Polygon.CreateNewFromPoints([0, 0], [width, 0], [0, height], [width, height]));
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
    beforeEach(function() {
      GameFramework.setUpdateObjectsFunction(function () {});
      GameFramework.startGame();
      jasmine.RequestAnimationFrame.tick(0);
    });

    it("should count frames correctly", function() {
      jasmine.RequestAnimationFrame.tick(300);
      jasmine.RequestAnimationFrame.tick(200);
      jasmine.RequestAnimationFrame.tick(100);
      jasmine.RequestAnimationFrame.tick(400);
      expect(GameFramework.getFPS()).toEqual(4);
    });

    it("should calculate delta between frames correctly", function() {
      jasmine.RequestAnimationFrame.tick(300);
      expect(GameFramework.getFrameDelta()).toEqual(300);
      jasmine.RequestAnimationFrame.tick(100);
      expect(GameFramework.getFrameDelta()).toEqual(100);
    });
  });

  describe("ObjectCollections", function () {
    var player, enemies, takenName, objectsFlatted, objectsFlatted_Destroyed;

    beforeEach(function() {
      player = new GameFramework.DrawableObject();
      enemies = [new GameFramework.DrawableObject(), new GameFramework.DrawableObject()];
      takenName = new GameFramework.DrawableObject();
      // player = { name: "Vasya", isAlive: isAlive };
      // enemies = [{name: "Monster", isAlive: isAlive}, {name: "Nikita", isAlive: isAlive}];
      // takenName = { name: "taken name", isAlive: isAlive };
      objectsFlatted = [];
      objectsFlatted_Destroyed = [];
      objectsFlatted.push(player, enemies[0], enemies[1], takenName);
      objectsFlatted_Destroyed.push(enemies[0], takenName);
      GameFramework.addObjects({
        player: player,
        enemies: enemies,
        getObject: takenName
      });
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

    it("should remove destroyed objects from the collection", function() {
      enemies[1].destroy();
      player.destroy();
      expect(GameFramework.getAllObjects()).toEqual(objectsFlatted_Destroyed);
      expect(GameFramework.getObject("player")).toEqual(undefined);
    });

    it("should remove destroyed objects from GameFramework object", function() {
      player.destroy();
      expect(GameFramework.player).toEqual(undefined);
    });
  });

  describe("Sprite >", function () {
    var obj, image, sprite, position1, position2, spritePos1, spritePos2, pol1, pol2;
    var img = "";
    var frameBounds1 = {x: 0, y: 0, w: 100, h: 100};
    var frameBounds2 = {x: 100, y: 0, w: 100, h: 100};
    var pos1 = { x: 100, y: 100 };
    var pos2 = { x: 200, y: 200 };

    beforeEach(function() {
      jasmine.PerformanceNow.install();
      position1 = new GameFramework.Vector(pos1.x, pos1.y);
      spritePos1 = {x: pos1.x, y: pos1.y, w: frameBounds1.w, h: frameBounds1.h};
      position2 = new GameFramework.Vector(pos2.x, pos2.y);
      spritePos2 = {x: pos2.x, y: pos2.y, w: frameBounds2.w, h: frameBounds2.h};
      pol1 = new GameFramework.Polygon.CreateNewFromPoints([0, 0], [frameBounds1.w, 0], [0, frameBounds1.h], [frameBounds1.w, frameBounds1.h]);
      pol2 = new GameFramework.Polygon.CreateNewFromPoints([0, 0], [frameBounds2.w, 0], [0, frameBounds2.h], [frameBounds2.w, frameBounds2.h]);
      image = new Image();
      image.src = img;
      sprite = 
        (new GameFramework.Sprite())
        .setImage(image)
        .addFrames([
          { x: frameBounds1.x, y: frameBounds1.y, h: frameBounds1.h, w: frameBounds1.w },
          { x: frameBounds2.x, y: frameBounds2.y, h: frameBounds2.h, w: frameBounds2.w }
        ])
        .setFrameDelay(100);
    });

    afterEach(function() {
      jasmine.PerformanceNow.uninstall();
    });

    it("should call the draw method with the right arguments", function() {
      sprite.drawAt(position1);
      var calls = GameFramework.getCTX().getCalls();
      expect(calls[calls.length - 1]).toBeACallTo({
        name: "drawImage",
        args: [
          image,
          frameBounds1.x, frameBounds1.y, frameBounds1.w, frameBounds1.h,
          spritePos1.x, spritePos1.y, spritePos1.w, spritePos1.h,
        ]
      });
    });

    it("should call the draw method for the correct sprite frame", function() {
      jasmine.PerformanceNow.tick(110);
      sprite.drawAt(position2);
      var calls = GameFramework.getCTX().getCalls();
      expect(calls[calls.length - 1]).toBeACallTo({
        name: "drawImage",
        args: [
          image,
          frameBounds2.x, frameBounds2.y, frameBounds2.w, frameBounds2.h,
          spritePos2.x, spritePos2.y, spritePos2.w, spritePos2.h,
        ]
      });
    });

    it("should skip frames if there was a pause between calls", function() {
      jasmine.PerformanceNow.tick(510);
      sprite.drawAt(position2);
      var calls = GameFramework.getCTX().getCalls();
      expect(calls[calls.length - 1]).toBeACallTo({
        name: "drawImage",
        args: [
          image,
          frameBounds2.x, frameBounds2.y, frameBounds2.w, frameBounds2.h,
          spritePos2.x, spritePos2.y, spritePos2.w, spritePos2.h,
        ]
      });
    });

    it("should return the correct polygon for the frame", function() {
      expect(sprite.getCurrentPolygon()).toEqual(pol1);
    });

    it("should return the correct polygon for the frame if there is a delay between frames", function() {
      jasmine.PerformanceNow.tick(510);
      expect(sprite.getCurrentPolygon()).toEqual(pol2);
    });
  });

  describe("DrawableObject >", function () {
    describe("Speed and acceleration >", function() {
      var obj;
      var Vector = GameFramework.Vector;

      beforeEach(function() {
        GameFramework.setUpdateObjectsFunction(function (time) { });
        GameFramework.startGame();
        jasmine.RequestAnimationFrame.tick(0);
        obj = new GameFramework.DrawableObject();
        GameFramework.addObjects({ obj: obj });
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
      var obj, sprite;
      var objPos = new GameFramework.Vector(10, 10);
      var spritePos = {x: 0, y: 0, w: 100, h: 100};

      beforeEach(function() {
        sprite = new GameFramework.Sprite();
        spyOn(sprite, 'drawAt');
        obj = 
          (new GameFramework.DrawableObject())
          .setSprite(sprite)
          .setPosition(objPos);

        GameFramework
          .addObjects({ obj: obj })
          .setUpdateObjectsFunction(function (time) { })
          .startGame();

        jasmine.RequestAnimationFrame.tick(0);
      });

      it("should call draw the sprite at the current position", function() {
        jasmine.RequestAnimationFrame.tick(1000);
        expect(sprite.drawAt).toHaveBeenCalledWith(objPos);
      });
    });

    describe("Collisions >", function() {
      var obj, image, sprite;
      var img = "";
      var frameBounds = {x: 0, y: 0, w: 100, h: 100};
      var objPos1 = new GameFramework.Vector(100, 100);
      var objPos2 = new GameFramework.Vector(150, 150);

      beforeEach(function() {
        image = new Image();
        image.src = img;
        sprite1 = 
          (new GameFramework.Sprite())
          .setImage(image)
          .addFrames([
            { x: frameBounds.x, y: frameBounds.y, h: frameBounds.h, w: frameBounds.w }
          ])
          .setFrameDelay(100);

        sprite2 = 
          (new GameFramework.Sprite())
          .setImage(image)
          .addFrames([
            { x: frameBounds.x, y: frameBounds.y, h: frameBounds.h, w: frameBounds.w }
          ])
          .setFrameDelay(100);

        obj1 = 
          (new GameFramework.DrawableObject())
          .setSprite(sprite1)
          .setPosition(objPos1);

        obj2 = 
          (new GameFramework.DrawableObject())
          .setSprite(sprite2)
          .setPosition(objPos2);

        GameFramework
          .addObjects({ obj1: obj1, obj2: obj2 })
          .setUpdateObjectsFunction(function (time) { })
          .startGame();

        jasmine.RequestAnimationFrame.tick(0);
      });

      it("should detect collision if colliding with object", function() {
        expect(GameFramework.obj1.isCollidingWith(GameFramework.obj2)).toBeTruthy();
      });

      it("should detect collision if objects are touching", function() {
        GameFramework.obj2.setPosition(new GameFramework.Vector(200, 200));
        expect(GameFramework.obj1.isCollidingWith(GameFramework.obj2)).toBeTruthy();
      });

      it("should not detect collision if not colliding with object", function() {
        GameFramework.obj2.setPosition(new GameFramework.Vector(300, 300));
        expect(GameFramework.obj1.isCollidingWith(GameFramework.obj2)).toBeFalsy();
      });

      it("should be nulled when destroyed", function() {
        obj1.destroy();
        expect(obj1.isAlive()).toBeFalsy();
        expect(obj1.sprite).toEqual(undefined);
      });
    });

    describe("Canvas related methods > ", function () {
      var obj, image, sprite;
      var img = "";
      var frameBounds = {x: 0, y: 0, w: 100, h: 100};
      var objPos1 = new GameFramework.Vector(100, 100);
      var objPos2 = new GameFramework.Vector(150, 150);

      beforeEach(function() {
        image = new Image();
        image.src = img;
        sprite1 = 
          (new GameFramework.Sprite())
          .setImage(image)
          .addFrames([
            { x: frameBounds.x, y: frameBounds.y, h: frameBounds.h, w: frameBounds.w }
          ])
          .setFrameDelay(100);

        sprite2 = 
          (new GameFramework.Sprite())
          .setImage(image)
          .addFrames([
            { x: frameBounds.x, y: frameBounds.y, h: frameBounds.h, w: frameBounds.w }
          ])
          .setFrameDelay(100);

        obj1 = 
          (new GameFramework.DrawableObject())
          .setSprite(sprite1)
          .setPosition(objPos1);

        obj2 = 
          (new GameFramework.DrawableObject())
          .setSprite(sprite2)
          .setPosition(objPos2);

        GameFramework
          .addObjects({ obj1: obj1, obj2: obj2 })
          .setUpdateObjectsFunction(function (time) { })
          .startGame();

        jasmine.RequestAnimationFrame.tick(0);
      });

      it("should detect when it is off screen", function() {
        GameFramework.obj1.setPosition(new GameFramework.Vector(1200, 1200));
        expect(GameFramework.obj1.isOffScreen()).toEqual(true);
      });

      it("should detect when it is not off screen", function() {
        GameFramework.obj1.setPosition(new GameFramework.Vector(100, 100));
        expect(GameFramework.obj1.isOffScreen()).toEqual(false);
      });

      it("should detect when it is touching the bottom border", function() {
        GameFramework.obj1.setPosition(new GameFramework.Vector(900, 900));
        expect(GameFramework.obj1.isTouchingBottomBorder()).toEqual(true);
      });

      it("should detect when it is not touching the bottom border", function() {
        GameFramework.obj1.setPosition(new GameFramework.Vector(100, 100));
        expect(GameFramework.obj1.isTouchingBottomBorder()).toEqual(false);
      });

      it("should detect when it is touching the top border", function() {
        GameFramework.obj1.setPosition(new GameFramework.Vector(0, 0));
        expect(GameFramework.obj1.isTouchingTopBorder()).toEqual(true);
      });

      it("should detect when it is not touching the top border", function() {
        GameFramework.obj1.setPosition(new GameFramework.Vector(100, 100));
        expect(GameFramework.obj1.isTouchingTopBorder()).toEqual(false);
      });

      describe("Set to stay on canvas true > ", function() {

        beforeEach(function () {
          GameFramework.obj1.setStaysOnCanvas(true);
        });

        it("should not change coordinates when off canvas", function() {
          GameFramework.obj1.setPosition(new GameFramework.Vector(1200, 1200));
          GameFramework.obj1.setSpeed(new GameFramework.Vector(1, 2));
          jasmine.RequestAnimationFrame.tick(1000);
          expect(GameFramework.obj1.position).toEqual(new GameFramework.Vector(1200, 1200));
          expect(GameFramework.obj1.speed).toEqual(new GameFramework.Vector(0, 0));
          expect(GameFramework.obj1.acceleration).toEqual(new GameFramework.Vector(0, 0));
        });

        it("should not change coordinates if touching the border", function() {
          GameFramework.obj1.setPosition(new GameFramework.Vector(900, 900));
          GameFramework.obj1.setSpeed(new GameFramework.Vector(1, 2));
          jasmine.RequestAnimationFrame.tick(1000);
          expect(GameFramework.obj1.position).toEqual(new GameFramework.Vector(900, 900));
          expect(GameFramework.obj1.speed).toEqual(new GameFramework.Vector(0, 0));
          expect(GameFramework.obj1.acceleration).toEqual(new GameFramework.Vector(0, 0));
        });

        it("should change coordinates if not at the border or off canvas", function() {
          GameFramework.obj1.setPosition(new GameFramework.Vector(150, 150));
          GameFramework.obj1.setSpeed(new GameFramework.Vector(1, 2));
          jasmine.RequestAnimationFrame.tick(1000);
          expect(GameFramework.obj1.position).toEqual(new GameFramework.Vector(151, 152));
          expect(GameFramework.obj1.speed).toEqual(new GameFramework.Vector(1, 2));
          expect(GameFramework.obj1.acceleration).toEqual(new GameFramework.Vector(0, 0));
        });

        it("should change coordinates when touching border but speed goes the other way", function() {
          GameFramework.obj1.setPosition(new GameFramework.Vector(0, 0));
          GameFramework.obj1.setSpeed(new GameFramework.Vector(1, 2));
          jasmine.RequestAnimationFrame.tick(1000);
          expect(GameFramework.obj1.position).toEqual(new GameFramework.Vector(1, 2));
          expect(GameFramework.obj1.speed).toEqual(new GameFramework.Vector(1, 2));
          expect(GameFramework.obj1.acceleration).toEqual(new GameFramework.Vector(0, 0));
        });
      });

      describe("Set to stay on canvas false > ", function() {

        beforeEach(function () {
          GameFramework.obj1.setStaysOnCanvas(false);
        });

        it("should change coordinates when off canvas", function() {
          GameFramework.obj1.setPosition(new GameFramework.Vector(1200, 1200));
          GameFramework.obj1.setSpeed(new GameFramework.Vector(1, 2));
          jasmine.RequestAnimationFrame.tick(1000);
          expect(GameFramework.obj1.position).toEqual(new GameFramework.Vector(1201, 1202));
          expect(GameFramework.obj1.speed).toEqual(new GameFramework.Vector(1, 2));
          expect(GameFramework.obj1.acceleration).toEqual(new GameFramework.Vector(0, 0));
        });

        it("should change coordinates if touching the border", function() {
          GameFramework.obj1.setPosition(new GameFramework.Vector(900, 900));
          GameFramework.obj1.setSpeed(new GameFramework.Vector(1, 2));
          jasmine.RequestAnimationFrame.tick(1000);
          expect(GameFramework.obj1.position).toEqual(new GameFramework.Vector(901, 902));
          expect(GameFramework.obj1.speed).toEqual(new GameFramework.Vector(1, 2));
          expect(GameFramework.obj1.acceleration).toEqual(new GameFramework.Vector(0, 0));
        });

        it("should change coordinates if not at the border or off canvas", function() {
          GameFramework.obj1.setPosition(new GameFramework.Vector(150, 150));
          GameFramework.obj1.setSpeed(new GameFramework.Vector(1, 2));
          jasmine.RequestAnimationFrame.tick(1000);
          expect(GameFramework.obj1.position).toEqual(new GameFramework.Vector(151, 152));
          expect(GameFramework.obj1.speed).toEqual(new GameFramework.Vector(1, 2));
          expect(GameFramework.obj1.acceleration).toEqual(new GameFramework.Vector(0, 0));
        });

        it("should change coordinates when touching border but speed goes the other way", function() {
          GameFramework.obj1.setPosition(new GameFramework.Vector(0, 0));
          GameFramework.obj1.setSpeed(new GameFramework.Vector(1, 2));
          jasmine.RequestAnimationFrame.tick(1000);
          expect(GameFramework.obj1.position).toEqual(new GameFramework.Vector(1, 2));
          expect(GameFramework.obj1.speed).toEqual(new GameFramework.Vector(1, 2));
          expect(GameFramework.obj1.acceleration).toEqual(new GameFramework.Vector(0, 0));
        });
      });
    });
  });

  describe("Physics > ", function () {
    var aG = 0.75,
        vector = new GameFramework.Vector(0, height * aG);
    beforeEach(function () {
      GameFramework.setGravity(aG);
    });

    it("should return the gravity vector", function() {
      expect(GameFramework.getGravity()).toEqual(vector);
    });
  });

});