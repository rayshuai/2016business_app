bApp.directive('memberChart', ['memberFactory', function($member){
	// Runs during compile
	return {
		restrict: 'E',
		scope: false,
		replace: true,
		templateUrl: 'directives/components/home/memberChart.html',
		link: function($scope, iElm) {
			$member.initChart();
		}
	};
}]);