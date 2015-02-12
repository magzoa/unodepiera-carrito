'use strict';

/**
* ng-Shop v0.0.1 Israel Parra - modulo que cumple el proceso de compra con angularjs
* @link - http://uno-de-piera.com/carrito-de-compras-con-paypal-en-angularjs
*/

var shop = angular.module('ng-shop', []);

//nuestra factoria se llamará $shop, inyectamos $rootScope
//devuleve un objeto con toda la funcionalidad que debe tener un carrito
shop.factory('$shop', ['$rootScope', function($rootScope)
{
	/**
    * @var array con el contenido del carrito
    */
	$rootScope.udpShopContent = [];
	/**
    * @var float con el precio total del carrito
    */
	$rootScope.udpShopTotalPrice = 0;
	/**
    * @var integer con el número de artículos del carrito
    */
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
			if(this.isInteger(product.qty) === false){
				throw new Error("La cantidad del producto debe ser un numero entero");
			},

		/**
        * @desc - comprueba si el número pasado es un entero
        * @return - bool
        */
			isInteger: function(n)
			{
				if(n % 1 === 0)
					return true;
				else
					return false;
			},

		/*
        * @desc - añade nuevos productos al carrito
        * @param - array con los datos del producto
        * @return - mixed
        */
			add: function(producto)
			{
				try{
					//comprobamos si el producto cumple los requisitos
					this.minimRequeriments(producto);
					//si el producto existe le actualizamos la cantidad
					if(this.checkExistProduct(producto, $rootScope.udpShopContent) === true){
						$rootScope.udpShopTotalPrice += parseFloat(producto.price * producto.qty, 10);
						$rootScope.udpShopTotalProducts += producto.qty;
						return {"msg":"updated"};
					}
					//en otro caso, lo añadimos al carrito
					else{
						$rootScope.udpShopTotalPrice += parseFloat(producto.price * producto.qty, 10);
						$rootScope.udpShopTotalProducts += producto.qty;
						$rootScope.udpShopContent.push(producto);
						return{"msg":"insert"};
					}
				}
				catch(error){
					alert("Error" + error);
				}
			},

			checkExistProduct: function(product, products)
			{
				var i, len;
				for(i = 0; len = products.length; i < len; i++){
					if(products[i].id === product.id){
						products[i].qty += product.qty;
						return true;
					}
				}
				return false;
			},

			remove: function(id)
			{
				try{
					var i, len;
					for(i = 0; len = $rootScope.udpShopContent.length; i < len; i++){
						if($rootScope.udpShopContent[i].id === id){
							$rootScope.udpShopTotalPrice -= parseFloat($rootScope.udpShopContent[i].price * $rootScope.udpShopContent[i].qty, 10);
							$rootScope.udpShopTotalProducts -= $rootScope.udpShopContent[i].qty;
							$rootScope.udpShopContent.splice(i, 1);
							if(isNaN($rootScope.udpShopTotalPrice)){
								$rootScope.udpShopTotalPrice = 0;
							}
							return {"msg" : "deleted"};
						}
					}
				}
				catch(error){
					alert("Error" + error);
				}
			},

			destroy: function()
			{
				try{
					$rootScope.udpShopContent = [];
					$rootScope.udpShopTotalPrice = 0;
					$rootScope.udpShopTotalProducts = 0;
				}
				catch(error){
					alert("Error" + error);
				}
			},
		}
	};
}]);
