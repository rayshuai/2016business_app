bApp.controller('loginController', ['$scope', '$state', '$http', '$window', function($scope, $state, $http, $window){
	
	$scope.formInfo = {
		account: '',
		pass: '',
		remember: false
	};

	//跳转至选择服务页面
	$scope.goToService = function(){
		$state.go('account.services');
	};

	//发送登录信息到后台
	$scope.login = function(){
		var url = 'http://115.159.45.39/api/storelogin';
		var data = {
			username: $scope.formInfo.account,
			password: $scope.formInfo.pass
		}

		$http({
			method: 'POST',
			url: url,
			data: data
		}).success(function(data){
			$window.localStorage['store'] = JSON.stringify(data);
			$state.go('home.admin.cashier');
		}).error(function(err, status){
			alert('账户或密码出错！');
			console.log(err, status);
		});
	};

}]);