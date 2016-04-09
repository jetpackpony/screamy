// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

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
          if (actual.name == expected.name && Array.prototype.slice.call(actual.args).equals(expected.args)) {            
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
