(function() {
"use strict";

angular.module('factory.graphicObject', [])
.factory('goHexagon', function() {
  var hexCorner = function(orientation, center, size, i) {
    var angle;

    if (orientation === 'pointy') {
      angle = 2 * Math.PI / 6 * (i + 0.5);
    } else if (orientation === 'flat') {
      angle = 2 * Math.PI / 6 * i;
    }
   
    return {
      x: center.x + size * Math.cos(angle),
      y: center.y + size * Math.sin(angle)
    };
  };

  return {
    getPoints: function(orientation, center, size) {
      var hexOrientation = orientation || 'pointy',
          hexCenter      = center || {x:0,y:0},
          hexSize        = size || 20;
      var points = [],
          totalCorners = 6;

      for (var i = 0; i < totalCorners; i++) {
        points.push(hexCorner(hexOrientation, hexCenter, hexSize, i));
      };
      return points;
    }
  };
});

}());