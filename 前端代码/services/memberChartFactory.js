bApp.factory('memberFactory', ['$http', function($http){
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
}])