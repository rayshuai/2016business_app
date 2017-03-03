bApp.directive('cardService', ['registerInfo', '$state', function(info, $state){
	var card = {
		icon: 'payment',
		title: '实体卡服务',
		des: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		url: 'error.coding'
	};

	var nocard = {
		icon: 'smartphone',
		title: '虚拟卡服务',
		des: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		url: 'account.register'
	};

	var linkFunc = function(scope, element, attrs){
		if(attrs.content == 'card'){
			scope.con = card;
			element.addClass('service-card');
		}else if(attrs.content == 'nocard'){
			scope.con = nocard;
			element.addClass('service-nocard');
		}

		scope.choseService = function(){
			if(attrs.content == 'card'){
				cardService();
			}else if(attrs.content == 'nocard'){
				noCardService();
			}
		};

		scope.goRegister = function(){
			if( attrs.content == 'card'){
				info.service_type = 2;
				$state.go('error.coding');
			}else if( attrs.content == 'nocard'){
				info.service_type = 1;
				$state.go('account.register');
			}
		};
	};

	var cardService = function(){
			add('service-card');
			cancel('service-nocard');
		};

	var noCardService = function(){
		add('service-nocard');
		cancel('service-card');
	};

	var add = function(type){
		var tar = angular.element(document.getElementsByClassName(type)[0]);
		tar.find('.card-area').addClass('chosen');
		tar.find('.btn-area').addClass('show');
	};

	var cancel = function(type){
		var tar = angular.element(document.getElementsByClassName(type)[0]);
		tar.find('.card-area').removeClass('chosen');
		tar.find('.btn-area').removeClass('show');
	};

	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: 'directives/components/account/cardService.html',
		link: linkFunc
	};
}]);