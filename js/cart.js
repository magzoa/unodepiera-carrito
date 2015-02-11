'use strict';

var shop = angular.module('ng-shop', []);

shop.factory('$shop', ['$rootScope', function($rootScope)
{
	$rootScope.udpShopContent = [],

	$rootScope.udpShopTotalPrice = 0,

	$rootScope.udpShopTotalProducts = 0;
}]);
