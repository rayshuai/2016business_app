bApp.factory('registerFactory', ['registerInfo', function(register){
	var service = {
		map: null,
		locationInfo: '',
		point: null,
	};

	service.initSelect = function(){
		$('.register-info').find('.info-con').find('select').material_select();
	};

	service.openMap = function(){
		$('#choose-map-modal').openModal();
	};

	service.initMap = function(){
		this.map = new BMap.Map('business-address-map');
		this.map.centerAndZoom('杭州', 12);
  
		this.map.addControl(new BMap.OverviewMapControl());
		this.map.enableScrollWheelZoom();


		test(this.map);
	};

	var myValue;

	var test = function(map){
		var ac = new BMap.Autocomplete({
			'input': 'business-address-map-input',
			'location': map,
			'onSearchComplete': searchComplete
		});
		
		var searchComplete = function(result){
			console.log(result);
			var list = [];
			var wr = result.wr;
			for(var i=0; i<wr.length; i++){
				var str = '' + wr[i].provice + wr[i].city + wr[i].district + wr[i].street + wr[i].business;
				list.push(str);
			}
			console.log(list);
		};

		ac.addEventListener('onhighlight', function(e){
			console.log(e, e.fromitem);
		});

		ac.addEventListener('onconfirm', function(e){
			console.log(e, e.item);
		});

		// setPlace(map);
	};

	function setPlace(map){
		map.clearOverlays();    //清除地图上所有覆盖物
		function myFun(){
			var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
			map.centerAndZoom(pp, 18);
			map.addOverlay(new BMap.Marker(pp));    //添加标注
		}
		var local = new BMap.LocalSearch(map, { //智能搜索
		  onSearchComplete: myFun
		});
		local.search(myValue);
	};

	service.search = function(condition){
		var local = new BMap.LocalSearch(service.map, {
			onSearchComplete: searchComplete
		});

		function searchComplete(result){
			console.log(result);
		};
	};

	return service;
}]);