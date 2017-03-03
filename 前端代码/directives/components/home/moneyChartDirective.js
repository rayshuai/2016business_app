bApp.directive('moneyChart', ['moneyChartFactory', function($money){
	return {
		restrict: 'E',
		scope: false,
		replace: true,
		templateUrl: 'directives/components/home/moneyChart.html',
		link: function($scope, iElm){
			$money.initChart();
		}
	};
}]);