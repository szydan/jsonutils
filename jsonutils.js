(function() {

  'use strict';


  function JsonUtils () {}

  JsonUtils.prototype = (function(){

    //
    // PRIVATE methods
    //

    var _goToElement0 = function (json, path, ind, cb) {
      // the path is created from splitting a string on PATH_SEPARATOR.
      // If that string is empty, then the element in the array
      // is an empty string.
      if (path.length === ind || path[ind].length === 0) {
        cb(json);
      } else {
        // Walk down the path
        if (json.constructor === Object) {
          if (!json.hasOwnProperty(path[ind])) {
            throw new Error('No property=[' + path[ind] + '] in ' + JSON.stringify(json, null, ' '));
          }
          _goToElement0(json[path[ind]], path, ind + 1, cb);
        } else if (json.constructor === Array) {
          var arrayInd = parseInt(path[ind], 10);
          _goToElement0(json[arrayInd], path, ind + 1, cb);
        } else {
          throw new Error('Unexpected JSON type: ' + JSON.stringify(json, null, ' '));
        }
      }
    };

    //
    // PUBLIC METHODS
    //

    return {
      /**
      * Goto goes to the element located at path, and calls the callback
      * cb once there with that element as argument.
      * The path is an array.
      */
      goToElement: function (json, path, cb) {
        _goToElement0.call(this, json, path, 0, cb);
      }
    }

  })();

  // Make it to work in node and browser and AMD style
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = new JsonUtils();
  } else {
    if (typeof define === 'function' && define.amd) {
      define([], function () {
        return new JsonUtils();
      });
    } else {
      window.jsonUtils = new JsonUtils();
    }
  }

})();
