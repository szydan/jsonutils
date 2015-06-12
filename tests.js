var jsonUtils = require('./jsonutils.js');

exports.testSomething = function(test){

  var expected = 100;
  var o = {
    A: {
      B:{
        C:{
          id: 100
        }
      }
    }
  };

  jsonUtils.goToElement(o, ['A','B','C','id'], function (json) {
    var actual = json;

    test.equal(actual, expected, "Values not equal");
    test.done();
  });
};

