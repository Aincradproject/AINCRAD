(function() {
"use strict";

angular.module('factory.graphicObject', [])
.factory('groPolygon', function() {
  var polygonType = {
    'triangle' : {corner: 3, tileable: true, 
                  orientationOffset: {
                    'pointyLeft': 0.5, 'pointyBottom': 0.75, 'pointyRight': 0,   'pointyTop': 0.25,
                    'flatLeft'  : 0,   'flatBottom'  : 0.25, 'flatRight'  : 0.5, 'flatTop'  : 0.75}},
    'square'   : {corner: 4, tileable: true, 
                  orientationOffset: {'pointy': 0, 'flat': 0.5}},
    'pentagon' : {corner: 5, tileable: false, 
                  orientationOffset: {
                    'pointyLeft': 0.5, 'pointyBottom': 0.25, 'pointyRight': 0,   'pointyTop': 0.75,
                    'flatLeft'  : 0,   'flatBottom'  : 0.75, 'flatRight'  : 0.5, 'flatTop'  : 0.25}},
    'hexagon'  : {corner: 6, tileable: true, 
                  orientationOffset: {'pointy': 0.5, 'flat': 0}},
    'heptagon' : {corner: 7, tileable: false, 
                  orientationOffset: {
                    'pointyLeft': 0.5, 'pointyBottom': 0.75, 'pointyRight': 0,   'pointyTop': 0.25,
                    'flatLeft'  : 0,   'flatBottom'  : 0.25, 'flatRight'  : 0.5, 'flatTop'  : 0.75}},
    'octagon'  : {corner: 8, tileable: false, 
                  orientationOffset: {'pointy': 0, 'flat': 0.5}},
    'nonagon'  : {corner: 9, tileable: false, 
                  orientationOffset: {
                    'pointyLeft': 0.5, 'pointyBottom': 0.25, 'pointyRight': 0,   'pointyTop': 0.75,
                    'flatLeft'  : 0,   'flatBottom'  : 0.75, 'flatRight'  : 0.5, 'flatTop'  : 0.25}},
    'decagon'  : {corner:10, tileable: false, 
                  orientationOffset: {
                    'pointyLeft': 0,   'pointyBottom': 0.5, 'pointyRight': 0,   'pointyTop': 0.5,
                    'flatLeft'  : 0.5, 'flatBottom'  : 0,   'flatRight'  : 0.5, 'flatTop'  : 0}},
  };

  var polygonCorner = function(polygon, orientation, center, size, i) {
    if (typeof polygonType[polygon].orientationOffset[orientation] == 'undefined') {return false};
    var angle = 2 * Math.PI / polygonType[polygon].corner * (i + polygonType[polygon].orientationOffset[orientation]);

    return {
      x: center.x + size * Math.cos(angle),
      y: center.y + size * Math.sin(angle)
    };
  };

  return {
    getPoints: function(polygon, options) {
      var polygonOptions = {
        orientation : options.orientation || 'pointy',
        center      : options.center      || {x:0,y:0},
        size        : options.size        || 20
      };

      var totalCorners = polygonType[polygon].corner;

      var points = [];

      for (var i = 0; i < totalCorners; i++) {
        points.push(polygonCorner(
          polygon,
          polygonOptions.orientation,
          polygonOptions.center ,
          polygonOptions.size, i
          ));
      };
      return points;
    }
  };
});

}());