bApp.controller('cashierController', ['$scope', '$http', '$window', function($scope, $http, $window){
	
	var memberLevel = ['银卡', '金卡', '钻石卡', '至尊卡'];
	var urlHead = 'http://115.159.45.39';
	
	$scope.userId = '';			//查询条件
	$scope.isQuery = false;		//是否查询过
	$scope.isUser = false;		//是否查到用户
	$scope.showUser = {
		id: 0,
		name: '',
		level: '',
		birthday: '',
		point: 0,
		discount: 1,
		exchange: 1
	};				//当前消费的用户信息
	$scope.cost;	//实际消费金额
	$scope.discount;	//折后金额
	$scope.point;	//可得积分
	$scope.info;	//备注


	$scope.$on('$viewContentLoaded', function(){
		
	});

	$scope.calculate = function(){
		console.log($scope.cost);
		if(!isNaN($scope.cost)){
			$scope.discount = $scope.cost * $scope.showUser.discount;
			$scope.discount = $scope.discount.toFixed(1); 
			$scope.point = Math.floor($scope.cost * $scope.showUser.exchange);
		}else{
			alert('请输入正确的金额');
		}
	};

	//查询当前用户
	$scope.lookForUser = function(){
		var url = urlHead + '/api/cashierInfo/';

		var store = JSON.parse($window.localStorage['store']);

		$http.get(url+$scope.userId).success(function(data){
			console.log(data);
			$scope.showUser.id = data.userId;
			$scope.showUser.name = data.username;
			$scope.showUser.level = memberLevel[data.level];
			$scope.showUser.point = data.point;
			$scope.showUser.birthday = data.birthday;
			$scope.showUser.discount = data.discount;
			$scope.showUser.exchange = data.exchange;
			
			$scope.isUser = true;
			$scope.isQuery = true;
		}).error(function(err){
			console.log(err);
			$scope.isQuery = true;
		});

	};

	//结算功能
	$scope.settlement = function(){
		var url = urlHead + '/api/pointDetail';

		var params = {
			id: 0,
			userId: $scope.showUser.id,
			storeId: 161,
			detail: '消费' + $scope.cost + '元',
			alteration: $scope.point,
			note: $scope.info,
			time: '2016-12-26 15:50:02'
		};

		$http.post(url, params).success(function(data){
			// console.log(data);
			$scope.isQuery = false;
			$scope.isUser = false;
			$scope.userId = '';

			$scope.cost = undefined;
			$scope.discount = undefined;
			$scope.point = undefined;
			$scope.info = undefined;

			alert('消费成功！');
		}).error(function(err){
			alert('服务故障，请稍后重试！');
			console.log(err);
		});
	};

}]);