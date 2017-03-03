bApp.directive('homeTitle', function($window){
	return {
		restrict: 'E',
		scope: {},
		replace: true,
		templateUrl: 'directives/components/home/homeTitle.html',
		link: function(scope){
			var store = JSON.parse($window.localStorage['store']);
			scope.owner = store.owner_name;
		}
	};
});