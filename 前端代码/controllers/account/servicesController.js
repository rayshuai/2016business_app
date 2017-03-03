bApp.controller('chooseServiceController', ['$scope','accountDom', 'registerInfo', '$state', function($scope, dom, register, $state){
	$scope.noCardService = function(){
		dom.chosenService('service-nocard');
		dom.cancelService('service-card');
	};

	$scope.cardService = function(){
		dom.chosenService('service-card');
		dom.cancelService('service-nocard');
	};
	
	$scope.goToRegister = function(type){

		if(type == 'nocard'){
			register.service_type = 1;
			$state.go('account.register');
		}else if(type == 'card'){
			register.service_type = 2;
			$state.go('error.coding');
		}
	};
}]);