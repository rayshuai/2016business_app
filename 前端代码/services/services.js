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

}]);;bApp.factory('registerFactory', ['registerInfo', function(register){
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
}]);;bApp.value('registerInfo', {
	'province': '',
	'city': '',
	'district': '',
	'street': '',
	"coord_long": '',
	"coord_lat": '',
	"service_type": 0
});;bApp.factory('memberFactory', ['$http', function($http){
	var service = {};

	var chart;

	var option = {
	    title: {
	        text: '会员变化趋势'
	    },
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	    	left: 'center',
	    	top: 30,
	    	width: '60%',
	        data:['银卡会员','金卡会员','钻石卡会员']
	    },
	    toolbox: {
	        feature: {
	            saveAsImage: {}
	        }
	    },
	    grid: {
	    	top: 80,
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data : ['6月','7月','8月','9月','10月','11月','12月']
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'银卡会员',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[20, 88, 210, 310, 372, 410, 444]
	        },
	        {
	            name:'金卡会员',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[0, 21, 98, 142, 199, 240, 262]
	        },
	        {
	            name:'钻石卡会员',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[0, 0, 8, 17, 31, 58, 80]
	        }
	    ]
	};


	service.initChart = function(){

		chart = echarts.init(document.getElementById('memberChart'));
		console.log(chart);
		chart.setOption(option);
	};

	return service;
}]);bApp.factory('moneyChartFactory', ['$http', function($http){
	var service = {};

	var chart;

	option = {
	    title: {
	        text: '店铺各类收入'
	    },
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	    	top: 30,
	    	left: 'center',
	    	width: '80%',
	        data:['银卡消费','金卡消费','钻石卡消费','其他消费']
	    },
	    toolbox: {
	        feature: {
	            saveAsImage: {}
	        }
	    },
	    grid: {
	    	top: 80,
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data : ['6月','7月','8月','9月','10月','11月','12月']
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'银卡消费',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[120, 132, 101, 134, 90, 230, 210]
	        },
	        {
	            name:'金卡消费',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[220, 182, 191, 234, 290, 330, 310]
	        },
	        {
	            name:'钻石卡消费',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[150, 232, 201, 154, 190, 330, 410]
	        },
	        {
	            name:'其他消费',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[320, 332, 301, 334, 390, 330, 320]
	        }
	    ]
	};


	service.initChart = function(){

		chart = echarts.init(document.getElementById('money-chart'));
		chart.setOption(option);
	};

	return service;
}]);;bApp.factory('moneyOriginChartFactory', ['$http', function($http){
	var service = {};

	var chart;

	var option = {
	    title : {
	        text: '店铺各类收入占比',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['银卡消费','金卡消费','钻石卡消费','其他消费']
	    },
	    series : [
	        {
	            name: '消费来源',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:335, name:'银卡消费'},
	                {value:310, name:'金卡消费'},
	                {value:234, name:'钻石卡消费'},
	                {value:135, name:'其他消费'}
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};


	service.initChart = function(){

		chart = echarts.init(document.getElementById('money-origin-chart'));
		chart.setOption(option);
	};

	return service;
}]);