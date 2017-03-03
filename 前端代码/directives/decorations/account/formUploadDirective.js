bApp.directive('formUpload', ['$http', function($http){
	// Runs during compile
	return {
		restrict: 'A',
		scope: false,
		link: function($scope, iElm, iAttrs, controller) {
			var file = null;
			var url = 'http://115.159.45.39/api/upload';

			iElm.bind('change', function(e){
				var fd = new FormData();
				file = (e.srcElement || e.target).files[0];
				console.log(file);

				fd.append('file', file);
				$http.post(url, fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				}).success(function(data){
					console.log(data);
					$scope.pic = data;
				}).error(function(err, status){
					console.log(err, status);
				});
			});
		}
	};
}]); 