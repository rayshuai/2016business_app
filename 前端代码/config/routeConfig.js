bApp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/login');

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'htm/login.html',
			controller: 'loginController'
		})
		.state('choose-service', {
			url: '/chooseService',
			templateUrl: 'htm/chooseService.html',
			controller: 'chooseServiceController'
		})
		.state('register', {
			url: '/register',
			templateUrl: 'htm/register.html',
			controller: 'registerController'
		})
});