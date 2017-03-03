bApp.controller('registerController', ['$scope','accountDom', 'registerInfo', '$state', '$http', function($scope, dom, info, $state, $http){

	var urlHead = 'http://115.159.45.39';
	$scope.form = {
		business_name: '',
		business_phone: '',
		business_show_address: '',
		business_address: '请在地图中标记店铺的位置',
		lng: '',
		lat: '',
		business_des: '',
		category: '',
		host_name: '',
		host_phone: '',
		host_pass: ''
	};

	$scope.business_type = [
		{ name: '运动'},
		{ name: '餐饮'},
		{ name: '购物'},
		{ name: '休闲'}
	];

	$scope.pic = '';

	var getListTimer;
	$scope.searchList = [];
	$scope.searchCondition = '';
	$scope.setCondition = function(condition){
		clearInterval(getListTimer);
		$scope.searchCondition = condition;
		$scope.searchList = [];
		dom.search.call(dom, condition);
	};
	$scope.setListTimer =function(){
		getListTimer = setInterval(function(){
			$scope.searchList = dom.getList();
		},1000);
	};
	$scope.search =function(){
		clearInterval(getListTimer);
		dom.search($scope.searchCondition);
	};
	$scope.confirmMap = function(){
		$scope.form.business_address = $scope.searchCondition;
	};

	$scope.$on('$viewContentLoaded', function(){
		if(info.service_type == 0){
			$state.go('account.services');
		}else{
			dom.initMap();
		}
		
	});

	$scope.openMap = function(){
		dom.openMap();
	};

	$scope.results;

	$scope.registerAll = function(){

		var url = urlHead + '/api/storereg';

		var data = {
			'id': 0,
			'owner_name': $scope.form.host_name,
			'owner_telephone': $scope.form.host_phone,
			'owner_password': $scope.form.host_pass,
			'name': $scope.form.business_name,
			'phone': $scope.form.business_phone,
			'description': $scope.form.business_des,
			'category': $scope.form.category.name,
			'address': $scope.form.business_show_address,
			'address_province': info.province,
			'address_city': info.city,
			'address_district': info.district,
			'address_street': info.street,
			'coord_long': info.coord_long,
			'coord_lat': info.coord_lat,
			'service_type': info.service_type,
			'picture': $scope.pic,
			'restrain': ''
		};
		

		$http.post('http://115.159.45.39/api/storereg', data).success(function(data){
			console.log(data);
			alert('您的注册信息已经提交，请等待客服的联系');
			$state.go('account.login');
		}).error(function(data, status){
			console.log(data, status);
		});
	};
	
}]);