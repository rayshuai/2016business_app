/**
 * Created by shuaiquan on 2016/10/16.
 */

var bApp = angular.module('business-app', ['ui.router','ngAnimate']);

/**
 * run方法只会在angular启动的时候运行一次
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 */
bApp.run(function($rootScope, $state, $stateParams){
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});

bApp.config(function($stateProvider, $urlRouterProvider){
	// $urlRouterProvider.otherwise('/account/login');
	$urlRouterProvider.otherwise('/home/admin');

	$stateProvider
		.state('account', {
			url: '/account',
			template: '<div ui-view=""></div>',
			abstract: true
		})
		.state('account.login', {
			url: '/login',
			templateUrl: 'controllers/account/login.html',
			controller: 'loginController'
		})
		.state('account.services', {
			url: '/services',
			templateUrl: 'controllers/account/services.html',
			controller: 'chooseServiceController'			
		})
		.state('account.register', {
			url: '/register',
			templateUrl: 'controllers/account/register.html',
			controller: 'registerController'
		});

	$stateProvider
		.state('error', {
			url: '/error',
			template: '<div ui-view=""></div>',
			abstract: true
		})
		.state('error.notFound', {
			url: '/notFound',
			templateUrl: 'controllers/webError/notFound.html'
		})
		.state('error.coding', {
			url: '/coding',
			templateUrl: 'controllers/webError/coding.html'
		});

	$stateProvider
		.state('home', {
			url: '/home',
			template: '<div ui-view="" class="page"></div>',
			abstract: true
		})
		.state('home.admin', {
			url: '/admin',
			templateUrl: 'controllers/home/admin.html'
		})
		.state('home.admin.cashier', {
			url: '/cashier',
			templateUrl: 'controllers/home/cashier.html',
			controller: 'cashierController'
		})
		.state('home.admin.vip', {
			url: '/vip',
			templateUrl: 'controllers/home/vip.html',
			controller: 'vipController'
		})
		.state('home.admin.member', {
			url: '/member',
			templateUrl: 'controllers/home/member.html',
			controller: 'memberController'
		})
		.state('home.admin.gift', {
			url: '/gift',
			templateUrl: 'controllers/home/giftManage.html',
			controller: 'giftManageController'
		})
		.state('home.admin.shopInfo', {
			url: 'shopInfo',
			templateUrl: 'controllers/home/shopInfo.html',
			controller: 'shopInfoController'
		});
});
