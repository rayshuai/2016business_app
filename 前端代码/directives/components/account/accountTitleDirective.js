bApp.directive('accountTitle', function(){
	return {
		restrict: 'E',
		scope: false,
		replace: true,
		templateUrl: 'directives/components/account/accountTitle.html'
	};
});