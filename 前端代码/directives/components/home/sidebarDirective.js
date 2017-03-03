bApp.directive('sidebar', function(){
	return {
		restrict: 'E',
		scope: false,
		replace: true,
		templateUrl: 'directives/components/home/sidebar.html'
	};
});