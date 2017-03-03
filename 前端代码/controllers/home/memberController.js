bApp.controller('memberController', ['$scope', '$http', '$window', function($scope, $http, $window){
	
	var urlHead = 'http://115.159.45.39';
	$scope.levels = ['银卡会员', '金卡会员', '钻石卡会员', '至尊卡会员'];
	var store = JSON.parse($window.localStorage['store']);

	$scope.memberList;
	$scope.memberLevel;
	$scope.search = '';

	$scope.$on('$viewContentLoaded', function(){
		getMemberList();
		getLevel();
	});


	var getMemberList = function(){
		var url = urlHead + '/api/memberWithUser/store';

		$http.get(url).success(function(data){
			$scope.memberList = data;
		}).error(function(err, status){
			console.log(err, status);
		});
	};

	var getLevel = function(){
		var url = urlHead + '/api/memberLevel/store/' + store.id;

		$http.get(url).success(function(data){
			$scope.memberLevel = data;
		}).error(function(err, status){
			console.log(err, status);
		});
	};

	$scope.modifyLevel = function(level){
		var url = urlHead + '/api/memberLevel/' + $scope.memberLevel[level].id; 

		$http.put(url, $scope.memberLevel[level]).success(function(data){
			console.log(data);
			getLevel();
			alert('修改成功');
		}).error(function(err, status){
			console.log(err, status);
		});
	};

}]);