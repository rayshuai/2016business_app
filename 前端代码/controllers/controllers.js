bApp.controller('chooseServiceController', ['$scope','accountDom', 'registerInfo', '$state', function($scope, dom, register, $state){
	$scope.noCardService = function(){
		dom.chosenService('service-nocard');
		dom.cancelService('service-card');
	};

	$scope.cardService = function(){
		dom.chosenService('service-card');
		dom.cancelService('service-nocard');
	};
	
	$scope.goToRegister = function(type){

		if(type == 'nocard'){
			register.service_type = 1;
			$state.go('account.register');
		}else if(type == 'card'){
			register.service_type = 2;
			$state.go('error.coding');
		}
	};
}]);;bApp.controller('registerController', ['$scope','accountDom', 'registerInfo', '$state', '$http', function($scope, dom, info, $state, $http){

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
	
}]);;bApp.controller('loginController', ['$scope', '$state', '$http', '$window', function($scope, $state, $http, $window){
	
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

}]);;bApp.controller('cashierController', ['$scope', '$http', '$window', function($scope, $http, $window){
	
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

}]);;bApp.controller('memberController', ['$scope', '$http', '$window', function($scope, $http, $window){
	
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

}]);;bApp.controller('giftManageController', ['$scope', '$http', '$window', function($scope, $http, $window){
	
	var urlHead = 'http://115.159.45.39';
	var store = JSON.parse($window.localStorage['store']);
	var n;

	$scope.giftList;
	$scope.chosenGift;
	$scope.gift = {
		id: 0,
		storeId: store.id,
		name: '',
		point: '',
		money: '',
		stock: 0,
		picture: '/public/img/gift_default.png'
	};
	$scope.isShowGift = false;

	$scope.$on('$viewContentLoaded', function(){
		getGiftList();
	});

	$scope.pic = '';	//用来保存上传图像的路径

	var getGiftList = function(){
		var url = 'http://115.159.45.39/api/gift/store/';

		$http.get(url + store.id).success(function(data){
			console.log(data);
			$scope.giftList = data;
		}).error(function(err){
			console.log(err);
		});
	};

	$scope.showGift = function(index){
		$scope.isShowGift = true;

		$scope.chosenGift = $scope.giftList[index];

		if($scope.chosenGift){
			n = index;
		}

		console.log($scope.chosenGift);
	};

	$scope.modifyGift = function(){
		var url = urlHead + '/api/gift/' + $scope.chosenGift.id;

		$http.put(url, $scope.chosenGift).success(function(data){
			$scope.giftList[n] = data;
			alert('礼品信息修改成功');
		}).error(function(err, status){
			console.log(err, status);
		});

		$scope.isShowGift = false;
	};

	$scope.addGift = function(){
		var url = urlHead + '/api/gift';
		$scope.gift.picture = $scope.pic;
		console.log($scope.gift);

		$http.post(url, $scope.gift).success(function(data){
			$scope.gift = {
				id: 0,
				storeId: store.id,
				name: '',
				point: '',
				money: '',
				stock: 0,
				picture: ''
			};
			getGiftList();
			alert('添加成功');
		}).error(function(err, status){
			console.log(err, status);
		});
	};

	$scope.deleteGift = function(index, e){
		e.stopPropagation();

		var url = urlHead + '/api/gift/' + $scope.chosenGift.id;

		$http.delete(url).success(function(data){
			$scope.giftList.splice(index, 1);
			$scope.chosenGift = null;
			alert('删除成功');
		}).error(function(err, status){
			console.log(err, status);
		});
	};

	$scope.card;
	$scope.clickCard = false;
	$scope.isInfo = false;
	$scope.cardInfo;

	$scope.getCardInfo = function(){
		var url = urlHead + '/api/exchangeTicket/store?code=' + $scope.card;

		$http.get(url).success(function(data){
			$scope.clickCard = true;
			$scope.isInfo  = true;
			console.log(data);
			$scope.cardInfo = data;
		}).error(function(err, data){
			$scope.clickCard = true;
			console.log(err, data);
		})
	};

	$scope.exchangeCard = function(){
		var url = urlHead + '/api/applyForGift/exchange/' + $scope.cardInfo.applyForGiftId;

		$http.put(url).success(function(data){
			console.log(data);
			$scope.clickCard = false;
			$scope.isInfo = false;
			$scope.card = '';
			getGiftList();
			alert('成功兑换！');
		}).error(function(err, status){
			console.log(err, status);
		});
	};

}]);
;bApp.controller('shopInfoController', function($state, $http, $window, $scope){
	
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
	
});;bApp.controller('vipController', ['$scope', '$http', function($scope, $http){
	$scope.pic = '';

	var file = null;
	var url = 'http://115.159.45.39/api/upload';

	
}]);