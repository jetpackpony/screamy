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
    }
  });
});
