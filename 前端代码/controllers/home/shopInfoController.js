bApp.controller('shopInfoController', function($state, $http, $window, $scope){
	
	var urlHead = 'http://115.159.45.39';

	$scope.$on('$viewContentLoaded', function(){
		$scope.store = JSON.parse($window.localStorage['store']);
		getPreferential();
		$scope.getMembers();
	});
	$scope.preInfo;

	$scope.modifyStore = function(){
		var url = urlHead + '/api/store/' + $scope.store.id;

		$http.put(url, $scope.store).success(function(data){
			$window.localStorage['store'] = JSON.stringify(data);
			alert('信息修改成功');
		}).error(function(err, status){
			console.log(err, status);
		});
	};

	$scope.modifyPre = function(){
		var url = urlHead + '/api/preferential/' + $scope.store.id;

		$scope.put(url, $scope.preInfo).success(function(data){
			$scope.preInfo = data;

			if($scope.preInfo.noteString !== '' && $scope.store.description === ''){
				$scope.store.description = $scope.preInfo.noteString;
			}
		}).error(function(err, status){
			console.log(err, status);
		});
	};

	//获取优惠信息
	var getPreferential = function(){
		var url = urlHead + '/api/preferential/' + $scope.store.id;

		$http.get(url).success(function(data){
			$scope.preInfo = data;

			if($scope.preInfo.noteString !== '' && $scope.store.description === ''){
				$scope.store.description = $scope.preInfo.noteString;
			}

		}).error(function(err, status){
			console.log(err, status);
		});
	};

	$scope.members = [];

	$scope.getMembers = function(){
		var url = urlHead + '/api/applyForMemberWithUser/store';

		$http.get(url).success(function(data){
			console.log(data);
			$scope.members = data;
			if(data[0] === undefined){
				setTimeout(function(){
					alert('暂无新会员申请');
				}, 2000);
			}
		}).error(function(err, status){
			console.log(err, status);
		});
	};

	$scope.addMember = function(index){
		var url = urlHead + '/api/applyForMember/' + $scope.members[index].id;

		$scope.members[index].status = 1;
		delete $scope.members[index].username;

		$http.put(url, $scope.members[index]).success(function(data){
			console.log(data);
			$scope.members.splice(index, 1);
			alert('已成功！');
		}).error(function(err, status){
			console.log(err, status);
		});
	}

	$scope.deleteMember = function(index){
		var url = urlHead + '/api/applyForMember/' + $scope.members[index].id;

		$scope.members[index].status = 0;
		delete $scope.members[index].username;

		$http.put(url, $scope.members[index]).success(function(data){
			console.log(data);
			$scope.members.splice(index, 1);
			alert('已成功！');
		}).error(function(err, status){
			console.log(err, status);
		});
	}
	
});