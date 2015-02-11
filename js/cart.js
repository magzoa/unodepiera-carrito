'use strict';

var shop = angular.module('ng-shop', []);

shop.factory('$shop', ['$rootScope', function($rootScope)
{
	$rootScope.udpShopContent = [],

	$rootScope.udpShopTotalPrice = 0,

	$rootScope.udpShopTotalProducts = 0;

	return{
		minimRequeriments: function(product)
		{
			if(!product.qty || !product.price || !product.id){
				throw new Error("Los campos qty, price y id son necesarios");
			}
			if(isNaN(product.qty) || isNaN(product.price) || isNaN(product.id)){
				throw new Error("Los campos qty, price y id deben ser numericos");
			}
			if(product.qty <= 0){
				throw new Error("La cantidad añadida debe ser mayor de 0");
			}
			if()
		}
	};
}]);
