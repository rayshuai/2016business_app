bApp.controller('giftManageController', ['$scope', '$http', '$window', function($scope, $http, $window){
	
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
