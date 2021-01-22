
//地图旁边的进度条
var progress2chart="";
function progress2char(){
	progress2chart = echarts.init(document.getElementById("progress2-chart"));
	var baifenbi = [0.333, 0.444, 0.555, 0.777, 0.888];
	var grayBar = [1, 1, 1, 1, 1, ];
	var xingm = ['宁波', '台州', '焦作', '邢台', '嘉兴'];
	option = {
	    title: {
	        text: '设备故障率排名',
	        left: '20%',
	        top:"20%",
	        textStyle:{
	        	color:"#fff",
	        	fontSize:12
	        }
	    },
	     grid: {
	         left: '32%',  //如果离左边太远就用这个......
	         right: '25%',
	         bottom: '35%',
	         top: '25%',
	         containLabel: true
	     },
	    xAxis: [{
	            show: false,
	       },
	        {
	            show: false,
	        }
	    ],
	    yAxis: {
	        type: 'category',
	        axisLabel: {
	            show: true, //让Y轴数据不显示
	        },

	        axisTick: {
	            show: false, //隐藏Y轴刻度
	        },
	        axisLine: {
	            show: false, //隐藏Y轴线段
	        },
	    },
	    series: [
	        //背景色
	        {
	            show: true,
	            type: 'bar',
	            barGap: '-100%',
	            barWidth: '10%', //统计条宽度 
	            itemStyle: {
	                normal: {
	                    barBorderRadius: 50,
	                    color: 'rgba(41, 55, 94)'
	                },
	            },
	            label: {
	                normal: {
	                    show: true,
	                    textStyle: {
	                        color: '#fff', //百分比颜色
	                    },
	                     position: 'right',
	                    formatter: function(data) {
	                    	return baifenbi[data.dataIndex]+'%'  
	                    },
	                    
	                }
	            },
	            z: 1,
	            data: grayBar,
	        },
	        //蓝条
	        {
	            show: true,
	            type: 'bar',
	            barGap: '-100%',
	            barWidth: '10%', //统计条宽度
	            itemStyle: {
	                normal: {
	                    barBorderRadius: 50, //统计条弧度
	                    color:"#ffa322"
	                },
	            },
	            max: 1,
	            label: {
	                normal: {
	                    show: true,
	                    textStyle: {
	                        color: '#fff', //百分比颜色
	                    },
	                    position:"left",
	                    formatter: function(data) {
	                        //富文本固定格式{colorName|这里填你想要写的内容}
	                        		return  xingm[data.dataIndex]      
	                    },
	                    
	                }
	            },
	          data: baifenbi,
	        },
	        
	    ]
	};
	progress2chart.setOption(option)
}

//地图
var mapchart="";
function mapchar(){
    var  data = [
        { name: '焦作', value: 75 },
        { name: '北京', value: 79 },
        { name: '天津', value: 79 },
        { name: '上海', value: 80 },
        { name: '西安', value: 80 },
        { name: '广州', value: 80 },
        { name: '深圳', value: 84 },
   
    ];
    
   
    var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };
    console.log(convertData(data));
    var uploadedDataURL = "js/data-1517645039291-B1vgpymUz.json";
   		mapchart= echarts.init(document.getElementById("map-chart"));
	$.getJSON(uploadedDataURL, function(geoJson) {
    	echarts.registerMap('zhongguo', geoJson);
	    option = {
	        tooltip: {
	            trigger: 'item',
	            formatter: function(params) {
	            	//console.log(params)
	                if (typeof(params.value)[2] == "undefined") {
	                    return params.name
	                } else {
	                    return params.name + ' : ' + params.value[2];
	                }
	            }
	        },
	        geo: {
	            show: true,
	            map: 'zhongguo',
	            label: {
	                emphasis: {
	                    show: false
	                }
	            },
	            roam: true,
	            left:'6%',
	            right:'5%',
	            top:"8%",
	            itemStyle: {
	                normal: {
	                    borderColor: '#4085d3',
		                borderWidth: 2,
		                shadowColor: '#000',
		                shadowBlur: 50,
		                areaColor: '#565cf8',
	                },
	                emphasis: {
	                    areaColor: '#4f92fa'  //鼠标移上每一省份的颜色
	                }
	            }
	        },
	        series: [
	            {
	                type: 'map',
	                map: 'zhongguo',
	                geoIndex: 0,
					
	            },
	            {
	                name: 'Tooltip Test',
	                type: 'effectScatter',
	                coordinateSystem: 'geo',
	                data: convertData(data),
	                symbolSize: function (val) {
	                    return val[2] / 5;
	                },
	                showEffectOn: 'render',
	                rippleEffect: {
	                    brushType: 'stroke'
	                },
	                hoverAnimation: true,
	                label: {
	                    normal: {
	                        formatter: '{b}',
	                        position: 'right',
	                        show: true
	                    }
	                },
	                itemStyle: {
	                    normal: {
	                        color: '#f4e925',
	                        shadowBlur: 10,
	                        shadowColor: '#333'
	                    }
	                },
	                zlevel: 1
	            }

	        ]
	    };
    	//myChart.setOption(option);
    	mapchart.setOption(option);
	    mapchart.on('click',function(params){ //点击事件
	    		alert(params) 
            });
	});	
};




















