bApp.directive('memberClassify', function(){
	return {
		restrict: 'E',
		scope: false,
		replace: true,
		templateUrl: 'directives/components/home/memberClassify.html',
		link: function(scope, element){
			$(element).find('.collapsible').collapsible();
		}
	};
});