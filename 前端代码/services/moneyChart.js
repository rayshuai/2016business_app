bApp.factory('moneyChartFactory', ['$http', function($http){
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
}]);