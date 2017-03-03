bApp.factory('moneyOriginChartFactory', ['$http', function($http){
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