beforeEach(function () {
  jasmine.addMatchers({
    toContainAllVectors: function() {
      return {
        compare: function (actual, expected) {
          var contains = 0;
          for (var i = actual.length - 1; i >= 0; i--) {
            for (var j = expected.length - 1; j >= 0; j--) {
              if (actual[i].isEqual(expected[j]))
                contains++;
            }
          }
          if (contains == expected.length) {
            return {
              pass: true
            }
          }
          return {
            pass: false
          }
        }
      }
    },
    toBeACallTo: function () {
      return {
        compare: function (actual, expected) {
          if (actual.name == expected.name && actual.args == expected.args) {            
            // expect(calls[calls.length - 1].name).toEqual("drawImage");
            // expect(calls[calls.length - 1].args.length).toEqual(9);
            // expect(calls[calls.length - 1].args[0]).toEqual(image);
            // expect(calls[calls.length - 1].args[1]).toEqual(frameBounds1.x);
            // expect(calls[calls.length - 1].args[2]).toEqual(frameBounds1.y);
            // expect(calls[calls.length - 1].args[3]).toEqual(frameBounds1.w);
            // expect(calls[calls.length - 1].args[4]).toEqual(frameBounds1.h);
            // expect(calls[calls.length - 1].args[5]).toEqual(spritePos1.x);
            // expect(calls[calls.length - 1].args[6]).toEqual(spritePos1.y);
            // expect(calls[calls.length - 1].args[7]).toEqual(spritePos1.w);
            // expect(calls[calls.length - 1].args[8]).toEqual(spritePos1.h);
            return {
              pass: true
            }
          }
          return {
            pass: false
          }
        }
      };
    }
  });
});
