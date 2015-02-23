'use strict';

var myApp = angular.module('myApp.map', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'map/map.html',
    controller: 'MapCtrl'
  });
}]);

myApp.controller('MapCtrl', ['$scope', function($scope) {
	/* Horizontal & Vertical layout settings */
	/* odd = impair & even = pair */
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

	this.map = {
		dimensions : {x:0,y:0}, 
		direction  : null,
		offset     : {x: null, y: null}
	};

	this.mapArray = [];

	this.init = function(direction,width,height) {
		var that = this;

		that.map.dimensions.x = width || 1;
		that.map.dimensions.y = height || 1;
		that.map.direction    = direction || 'vertical';

		that.map.offset.x     = that.layout[direction].x.containerOffset;
		that.map.offset.y     = that.layout[direction].y.containerOffset;

		that.buildMap();
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
				that.mapArray.push({x: posX, y: posY});
			};
		};
	}

	this.foo = function(bar) {

	}
}]);