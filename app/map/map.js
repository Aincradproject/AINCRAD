(function() {
'use strict';

angular.module('myApp.map', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'map/map.html',
    controller: 'MapCtrl'
  });
}])

.controller('MapCtrl', ['$scope', 'groPolygon', function($scope, groPolygon) {
  /* Horizontal & Vertical layout settings */
  /* odd = impair & even = pair */
  this.polygon = groPolygon;

  /* horizontal for flat, and vertical for pointy tile */
  this.layout = {
    horizontal : {
      x: {base: {odd: 0, even: 17.32050807568877}, offset: 34.64101615137754,
        containerOffset: 27.416697508022978},
      y: {base: 0, offset: 30,
        containerOffset: 27.5}
    },
    vertical   : {
      x: {base: 0, offset: 30, 
        containerOffset: 30},
      y: {base: {odd: 0, even: 17.32050807568877}, offset: 34.64101615137754, 
        containerOffset: 24.74}
    }
  };

  this.tile = {
    orientation   : null,
    center        : {x: 0, y: 0},
    size          : 20,
    points        : null,
    pointsString  : ''
  };

  this.map = {
    dimensions : {x:0,y:0}, 
    direction  : null,
    size       : {width: 0, height: 0},
    offset     : {x: null, y: null}
  };

  this.mapArray = [];

  this.init = function(mapParams,tileParams) {
    var that = this;

    that.tile.polygon     = tileParams.polygon     || 'hexagon',
    that.tile.orientation = tileParams.orientation || 'pointy';
    that.tile.center      = tileParams.center      || {x:0,y:0};
    that.tile.size        = tileParams.size        || 20;

    that.map.dimensions.x = mapParams.height       || 1;
    that.map.dimensions.y = mapParams.width        || 1;
    that.map.direction    = mapParams.direction    || 'vertical';
    that.map.offset.x     = that.layout[mapParams.direction].x.containerOffset;
    that.map.offset.y     = that.layout[mapParams.direction].y.containerOffset;

    that.buildTile();
    that.buildMap();
    
  }

  this.buildTile = function() {
    var that = this;
    var tile = that.tile;

    tile.points = that.polygon.getPoints(
      tile.polygon, {
        orientation : tile.orientation,
        center      : tile.center,
        size        : tile.size
      });
    
    for (var i = 0; i < (tile.points).length; i++) {
      tile.pointsString += tile.points[i].x + ',' + tile.points[i].y + ' ';
    };
  }

  this.buildMap = function() {
    var that = this;

    for (var cY = 0; cY < that.map.dimensions.y; cY++) {
      for (var cX = 0; cX < that.map.dimensions.x; cX++) {
        if (that.map.direction == 'horizontal') {
          var data = that.layout.horizontal;

          var posY = data.y.base + (data.y.offset * cX);
          if ((cX+1) % 2) {
            /* impair */
            var posX = data.x.base.odd + (data.x.offset * cY);
          } else {
            /* pair */
            var posX = data.x.base.even + (data.x.offset * cY);
          }
        } else if (that.map.direction == 'vertical') {
          var data = that.layout.vertical;

          var posX = data.x.base + (data.x.offset * cY);
          if ((cY+1) % 2) {
            /* impair */
            var posY = data.y.base.odd + (data.y.offset * cX);
          } else {
            /* pair */
            var posY = data.y.base.even + (data.y.offset * cX);
          }
        }
        /* add the tile */
        that.mapArray.push({x: posX, y: posY});

        /* set the length for the container */
        if (posX > that.map.size.width) {
          that.map.size.width = posX;
        }
        if (posY > that.map.size.height) {
          that.map.size.height = posY;
        }
      };
    };
  }

  this.foo = function(bar) {

  }
}]);
}());