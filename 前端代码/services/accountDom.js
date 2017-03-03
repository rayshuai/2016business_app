bApp.service('accountDom', ['registerInfo', function(info){
	this.map = null;
	this.list = [];
	var self = this;

	this.chosenService = function(type){
		$('.'+type).find('.card-area').addClass('chosen');
		$('.'+type).find('.btn-area').addClass('show');
	};

	this.cancelService = function(type){
		$('.'+type).find('.card-area').removeClass('chosen');
		$('.'+type).find('.btn-area').removeClass('show');
	};

	this.initSelect = function(){
		$('.register-info').find('.info-con').find('select').material_select();
	};
	
	this.openMap = function(){
		$('#choose-map-modal').openModal();
	};

	this.initMap = function(){
		this.map = new BMap.Map('business-address-map');
		this.map.centerAndZoom('杭州', 12);
		this.map.enableScrollWheelZoom();

		var map = this.map;
		var ac = new BMap.Autocomplete({
			'input': 'business-address-map-input',
			'location': map,
			'onSearchComplete': function(result){
				searchComplete.call(self, result);
			}
		});

		var searchComplete = function(result){
			// console.log(result);

			this.list = [];
			var wr = result.wr;
			for(var i=0; i<wr.length; i++){
				this.list.push('' + wr[i].city + wr[i].district + wr[i].street + wr[i].business);
			}
			// console.log(this);
		};
	};

	this.getList = function(){
		return this.list;
	};

	this.search = function(condition){
		var map = this.map;
		map.clearOverlays();

		var addMarker = function(){
			var point = local.getResults().getPoi(0).point;
			map.centerAndZoom(point, 16);
			map.addOverlay(new BMap.Marker(point));
			info.coord_long = point.lng;
			info.coord_lat = point. lat;
			info.province = local.getResults().province;
			info.city = local.getResults().city;
		};

		var local = new BMap.LocalSearch(this.map, {
			'onSearchComplete': addMarker
		});

		local.search(condition);
	};

}]);