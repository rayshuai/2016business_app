bApp.directive('moneyOriginChart', ['moneyOriginChartFactory', function($moneyOrigin){
	return {
		restrict: 'E',
		scope: false,
		replace: true,
		templateUrl: 'directives/components/home/moneyOriginChart.html',
		link: function(){
			$moneyOrigin.initChart();
		}
	};
}]);