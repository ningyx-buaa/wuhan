/**
 * All provided echarts options.
 */
import Graphic from 'echarts/lib/util/graphic'

function paint (result) {
  var nodes = [];
  var links = [];
  var categories = [];
  var category_names = [];
  result.nodes.forEach(function (node) {
    if (categories.indexOf(node.category) < 0) {
      category_names.push(node.category);
      categories.push({
        name: node.category
      });
    }
    node.symbol = 'circle';
    node.symbolSize = node.value * 1.2;
    node.x = null;
    node.y = null;
    node.itemStyle = null;
    node.label = {
      normal: {
         show: true,
         position: 'right'
       }
    };
    nodes.push(node);
  });
  result.links.forEach(function (edge) {
    links.push(edge);
  });
  return {'nodes': nodes,"links": links,"categories": categories}
}

var ChartData = {
  nodes_relations: {
    "nodes": [
        {
            "id": 0,
            "name": "卷积神经网络",
            "value": 23,
            "category": "卷积神经网络"
        },
        {
            "id": 1,
            "name": "深度学习",
            "value": 25,
            "category": "深度学习"
        },
        {
            "id": 2,
            "name": "神经网络",
            "value": 17,
            "category": "神经网络"
        },
        {
            "id": 3,
            "name": "机器学习",
            "value": 33,
            "category": "机器学习"
        },
        {
            "id": 4,
            "name": "遗传算法",
            "value": 18,
            "category": "遗传算法"
        },
        {
            "id": 5,
            "name": "特征提取",
            "value": 17,
            "category": "特征提取"
        },
        {
            "id": 6,
            "name": "人工智能",
            "value": 20,
            "category": "人工智能"
        },
        {
            "id": 7,
            "name": "文本分类",
            "value": 12,
            "category": "文本分类"
        },
        {
            "id": 8,
            "name": "云计算",
            "value": 19,
            "category": "云计算"
        },
        {
            "id": 9,
            "name": "监督学习",
            "value": 18,
            "category": "监督学习"
        }
    ],
    "links": [
        {
            "source": 0,
            "target": 0,
            "count": 345
        },
        {
            "source": 0,
            "target": 1,
            "count": 118
        },
        {
            "source": 0,
            "target": 2,
            "count": 13
        },
        {
            "source": 1,
            "target": 1,
            "count": 457
        },
        {
            "source": 1,
            "target": 2,
            "count": 36
        },
        {
            "source": 1,
            "target": 3,
            "count": 31
        },
        {
            "source": 1,
            "target": 9,
            "count": 23
        },
        {
            "source": 2,
            "target": 4,
            "count": 323
        },
        {
            "source": 2,
            "target": 5,
            "count": 65
        },
        {
            "source": 2,
            "target": 6,
            "count": 8
        },
        {
            "source": 3,
            "target": 3,
            "count": 3069
        },
        {
            "source": 3,
            "target": 4,
            "count": 71
        },
        {
            "source": 3,
            "target": 5,
            "count": 198
        },
        {
            "source": 3,
            "target": 6,
            "count": 5
        },
        {
            "source": 3,
            "target": 7,
            "count": 159
        },
        {
            "source": 3,
            "target": 9,
            "count": 15
        },
        {
            "source": 4,
            "target": 4,
            "count": 4314
        },
        {
            "source": 4,
            "target": 5,
            "count": 23
        },
        {
            "source": 5,
            "target": 5,
            "count": 2501
        },
        {
            "source": 5,
            "target": 7,
            "count": 32
        },
        {
            "source": 6,
            "target": 7,
            "count": 13
        },
        {
            "source": 6,
            "target": 8,
            "count": 55
        },
        {
            "source": 6,
            "target": 9,
            "count": 21
        }
    ]
  },
  'topics': {
    '朝鲜': {
      'index': 1,
      'topic': '朝鲜',
      'date': '2019-10-07',
      'text': '朝美磋商宣告破裂，双方需重申“无核化”原则',
      'link': 'https://chinese.joins.com/gb/article.aspx?art_id=193090&category=002005'},
    '南海': {
      'index': 2,
      'topic': '南海',
      'date': '2019-11-18',
      'text': '我国第二艘航母通过台湾海峡',
      'link': 'https://new.qq.com/rain/a/TWF2019111800472700'},
    '台湾': {
      'index': 3,
      'topic': '台湾',
      'date': '2019-11-25',
      'text': '韩国瑜呛蔡英文贪污腐败',
      'link': 'http://www.taiwan.cn/taiwan/jsxw/201911/t20191125_12220568.htm'}
  },
  'exports': {
    '朝鲜': [
    '1.朝鲜巡回大使金明吉：在过去一年内，美国共发起15次制裁，并重启联合军事演习，部署尖端战争设备，威胁朝鲜生存权。',
    '2.美国: 坚持只有在朝鲜接受“宁边+α”的条件之后，才可以在一定程度上放宽煤炭和石油制裁'
    ],
    '南海': [
      '海军发言人程德伟：这次组织国产航母跨区开展试验和训练，是航母建造过程中的正常安排，不针对任何特定目标，与当前的局势无关。'
    ],
    '台湾': [
      '韩国瑜: 贪污腐败这么严重，你们吃饱没？',
      '韩国瑜: 明年台湾人要为自己投一票，不要再迷信政党.'
    ]
  },
  'future': {
    '朝鲜': [
      '1.美国民主党正主导推动针对特朗普总统的弹劾案，三个月后美国进入大选政局，届时美国将鲜有精力应付朝核问题。',
      '2.朝鲜很可能会借此机会，透露出重启洲际弹道导弹（ICBM）试射和核试验活动等撕毁协议的消息，对寻求连任的特朗普总统进行施压',
      '3.如果特朗普总统决定采取军事行动应对朝鲜的压力，2017年笼罩韩半岛的“战争阴云”可能会再次出现。 '
    ],
    '南海': [
    ],
    '台湾': [
    ],
  }
}
var kg_data = paint(ChartData.nodes_relations);
const ChartLib = {
  '风险走势&折线图': {
    option: {
      title: {
        text: '风险走势',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: ['12-01', '12-02', '12-03', '12-04', '12-05', '12-06', '12-07', '12-08'],
        boundaryGap: false,
      },
      yAxis: {},
      grid: {
        top: 50,
        left: 40,
        right: 20,
        bottom: 25
      },
      series: [
        {
          name: '查获物件',
          type: 'line',
          itemStyle: {
            normal: {
              color: '#1e98ff',
            }
          },
          areaStyle: {
            normal: {
              color: new Graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(30, 152, 255, .9)'
              }, {
                offset: 1,
                color: 'rgba(30, 152, 255, .3)'
              }])
            }
          },
          data: [20, 10, 20, 30, 35, 26, 36, 30]
        },
        {
          name: '风险旅客',
          type: 'line',
          itemStyle: {
            normal: {
              color: '#ff5421'
            }
          },
          areaStyle: {
            normal: {
              color: new Graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255, 84, 33, .9)'
              }, {
                offset: 1,
                color: 'rgba(255, 84, 33, .3)'
              }])
            }
          },
          data: [10, 20, 30, 15, 12, 20, 38, 20]
        }
      ]
    },
    update: (option) => {
      axios.get('/api/getRTAndSN', {params: {}}).then(response => {
        if (response.data.createDate.length > 0 && response.data.tourist_warningEvents.length > 0 && response.data.seizure_number.length > 0) {
          option.xAxis.data = response.data.createDate;
          option.series[0].data = response.data.tourist_warningEvents;
          option.series[1].data = response.data.seizure_number;
        }
      });
    },
  },
  '旅客风险构成-来源城市&横向柱状图': {
    option: {
      animation: true,
      title: {
        text: '旅客风险构成-来源城市'
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'value',
        position: 'top',
      },
      yAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            width: 2,
            color: '#1a41ac'
          }
        },
        axisLabel: {
          rotate: 15,
        },
        data: ['北京', '天津', '石家庄', '郑州', '上海', '深圳', '广州', '昆明', '贵阳', '西藏']
      },
      grid: {
        top: 65,
        left: 75,
        right: 20,
        bottom: 10
      },
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: 14,
          barGap: '-100%',
          itemStyle: {
            normal: {
              color: 'rgba(64, 42, 31, .8)',
            }
          },
          tooltip: {
            show: false,
          },
          data: ['3000', '3000', '3000', '3000', '3000', '3000', '3000', '3000', '3000', '3000']
        },
        {
          name: '旅客人数',
          type: 'bar',
          barWidth: 14,
          label: {
            normal: {
              textStyle: {
                color: '#682d19',
              },
              position: 'right',
              show: false,
              formatter: '{b}'
            }
          },
          itemStyle: {
            normal: {
              color: new Graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: 'rgba(255, 162, 82, 1)'
              }, {
                offset: 1,
                color: 'rgba(241, 90, 34, 1)'
              }]),
              barBorderRadius: [0, 10, 10, 0],  // 圆角
            }
          },
          data: [500, 700, 800, 900, 1200, 1600, 1900, 2200, 2600, 2900]
        }
      ]
    },
    update: (option) => {
      axios.get('/api/getDeparture', {params: {}}).then(response => {
        if (response.data.Departures.length > 0 && response.data.DepartureCount.length > 0) {
          option.yAxis.data = response.data.Departures;
          option.series[1].data = response.data.DepartureCount;
          var maxd = _.max(response.data.DepartureCount);
          option.series[0].data = _.map(response.data.DepartureCount, (obj, idx) => { return maxd })
          option.xAxis.max = maxd;
        }
      });
    },
  },
  '风险旅客&横向柱状图': {
    option: {
      animation: true,
      title: {
        text: '旅客风险构成-目的城市',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'value',
        position: 'top',
      },
      yAxis: {
        type: 'category',
        splitLine: {
          show: false,
        },
        axisLabel: {
          rotate: 15,
        },
        data: ['北京', '天津', '石家庄', '郑州', '上海', '深圳', '广州', '昆明', '贵阳', '西藏']
      },
      grid: {
        top: 65,
        left: 75,
        right: 20,
        bottom: 10
      },
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: 14,
          barGap: '-100%',
          silent: true,
          itemStyle: {
            normal: {
              color: 'rgba(42, 56, 144, .8)',
            }
          },
          tooltip: {
            show: false,
          },
          data: ['3000', '3000', '3000', '3000', '3000', '3000', '3000', '3000', '3000', '3000']
        },
        {
          name: '风险值',
          type: 'bar',
          barWidth: 14,
          label: {
            normal: {
              textStyle: {
                color: '#682d19',
              },
              position: 'right',
              formatter: '{b}'
            }
          },
          itemStyle: {
            normal: {
              color: new Graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: 'rgba(129, 153, 255, 1)'
              }, {
                offset: 1,
                color: 'rgba(18, 34, 134, 1)'
              }]),
              barBorderRadius: [0, 10, 10, 0],  // 圆角
            }
          },
          data: [500, 700, 800, 900, 1200, 1600, 1900, 2200, 2600, 2900]
        }
      ]
    },
    update: (option) => {
      axios.get('/api/getTAndRI', {params: {}}).then(response => {
        if (response.data.TouristName.length > 0 && response.data.TouristRiskIndex.length > 0) {
          option.yAxis.data = response.data.TouristName;
          option.series[1].data = response.data.TouristRiskIndex;
          var maxd = _.max(response.data.TouristRiskIndex);
          option.series[0].data = _.map(response.data.TouristRiskIndex, (obj, idx) => { return maxd })
          option.xAxis.max = maxd;
        }
      });
    },
  },
  '查获风险构成-时段分布&柱状图': {
    option: {
      animation: true,
      title: {
        text: '查获风险构成-时段分布',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        splitLine: {
          show: false,
        },
        data: ['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
      },
      yAxis: {
        type: 'value',
        position: 'top',
      },
      grid: {
        top: 50,
        left: 40,
        right: 20,
        bottom: 25
      },
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: 13,
          barGap: '-100%',
          itemStyle: {
            normal: {
              color: 'rgba(24, 50, 117, .8)',
            }
          },
          tooltip: {
            show: false,
          },
          data: [150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150]
        },
        {
          name: '设备查验次数',
          type: 'bar',
          barWidth: 13,
          label: {
            normal: {
              textStyle: {
                color: '#682d19',
              },
              position: 'right',
              show: false,
              formatter: '{b}'
            }
          },
          itemStyle: {
            normal: {
              color: new Graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(38, 216, 255, 1)'
              }, {
                offset: 1,
                color: 'rgba(32, 84, 221, 1)'
              }]),
              barBorderRadius: [10, 10, 0, 0],  // 圆角
            }
          },
          data: [0,0,67,0,30,0,140,20,112,127,113,20,5,101,90,77,116,28,68,80,30,61,88,93]
        }
      ]
    },
    update: (option) => {
      axios.get('/api/getDCD', {params: {}}).then(response => {
        if (response.data.TimeLine.length > 0 && response.data.Count.length > 0) {
          option.xAxis.data = response.data.TimeLine;
          option.series[1].data = response.data.Count;
          var maxd = _.max(response.data.Count);
          option.series[0].data = _.map(response.data.Count, (obj, idx) => { return maxd })
          option.yAxis.max = maxd;
        }
      });
    },
  },
  // '年度进出境人员构成&饼柱图': {
  //   option: {
  //     title: {
  //       text: '年度进出境人员构成'
  //     },
  //     tooltip: {
  //       trigger: 'axis',
  //     },
  //     xAxis: {
  //       type: 'category',
  //       splitLine: {
  //         show: false,
  //       },
  //       data: ['1', '2', '3']
  //     },
  //     yAxis: {
  //       type: 'value',
  //       position: 'top',
  //     },
  //     grid: {
  //       top: 50,
  //       left: 40,
  //       right: 20,
  //       bottom: 25
  //     },
  //     series: [
  //       // 柱状背景
  //       {
  //         name: '',
  //         type: 'bar',
  //         barWidth: 13,
  //         barGap: '-100%',
  //         itemStyle: {
  //           normal: {
  //             color: 'rgba(24, 50, 117, .8)',
  //           }
  //         },
  //         tooltip: {
  //           show: false,
  //         },
  //         data: [150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150]
  //       },
  //       {
  //         name: '设备查验次数',
  //         type: 'bar',
  //         barWidth: 13,
  //         label: {
  //           normal: {
  //             textStyle: {
  //               color: '#682d19',
  //             },
  //             position: 'right',
  //             show: false,
  //             formatter: '{b}'
  //           }
  //         },
  //         itemStyle: {
  //           normal: {
  //             color: new Graphic.LinearGradient(0, 0, 0, 1, [{
  //               offset: 0,
  //               color: 'rgba(38, 216, 255, 1)'
  //             }, {
  //               offset: 1,
  //               color: 'rgba(32, 84, 221, 1)'
  //             }]),
  //             barBorderRadius: [10, 10, 0, 0],  // 圆角
  //           }
  //         },
  //         data: [0,0,67,0,30,0,140,20,112,127,113,20,5,101,90,77,116,28,68,80,30,61,88,93]
  //       },
  //       // 饼状图
  //       {
  //         name: '饼状图name',
  //         type: 'pie',
  //         radius: '30%',
  //         center: ['80%', '35%'],
  //         tooltip: {trigger: 'axis',},
  //         data: [{value: 14, name: '类别1'},{value: 31, name: '类别2'},{value: 71, name: '类别3'},{value: 4, name: '类别4'}],
  //         label: {
  //           normal: {
  //             fontSize: 16,
  //           },
  //         },
  //         itemStyle: {
  //           emphasis: {
  //             shadowBlur: 10,
  //             shadowOffsetX: 0,
  //             shadowColor: 'rgba(0, 0, 0, 0.5)'
  //           }
  //         }
  //       }
  //     ]
  //   },
  //   update: (option) => {},
  // },
  '旅客风险构成-国家&横向柱状图': {
    option: {
      animation: true,
      title: {
        text: '旅客风险构成-国家/地区',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'value',
        position: 'top',
      },
      yAxis: {
        type: 'category',
        splitLine: {
          show: false,
        },
        axisLabel: {
          rotate: 15,
        },
        data: ['巴西','印尼','美国','印度','德国','法国']
      },
      grid: {
        top: 65,
        left: 75,
        right: 20,
        bottom: 10
      },
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: 14,
          barGap: '-100%',
          silent: true,
          itemStyle: {
            normal: {
              color: 'rgba(42, 56, 144, .8)',
            }
          },
          tooltip: {
            show: false,
          },
          data: [630230, 630230, 630230, 630230, 630230, 630230]
        },
        {
          name: '人次',
          type: 'bar',
          barWidth: 14,
          label: {
            normal: {
              textStyle: {
                color: '#682d19',
              },
              position: 'right',
              formatter: '{b}'
            }
          },
          itemStyle: {
            normal: {
              color: new Graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: 'rgba(129, 153, 255, 1)'
              }, {
                offset: 1,
                color: 'rgba(18, 34, 134, 1)'
              }]),
              barBorderRadius: [0, 10, 10, 0],  // 圆角
            }
          },
          data: [18203, 23489, 29034, 104970, 131744, 630230]
        }
      ]
    },
    update: (option) => {
      axios.get('/api/getTouristCountry', {params: {}}).then(response => {
        if (response.data.Country.length > 0 && response.data.Count.length > 0) {
          option.yAxis.data = response.data.Country;
          option.series[1].data = response.data.Count;
          var maxd = _.max(response.data.Count);
          option.series[0].data = _.map(response.data.Count, (obj, idx) => { return maxd })
          option.xAxis.max = maxd;
        }
      });
    },
  },
  '旅客风险构成-性别比例&饼图': {
    option: {
      title: {
        text: '旅客风险构成-性别比例'
      },
      tooltip: {
        trigger: 'item',
        enterable: true,
        confine: true,
        textStyle: {fontSize: 18},
      },
      color: [
        '#24adf1',
        '#f5d10c',
        '#a06af5',
        '#f48021',
        '#0e7fe2',
        '#4465f6',
      ],
      legend: {
        orient: 'horizontal',
        align: 'left',
        bottom: '5',
        data: ['类别1','类别2','类别3','类别4'],
        itemGap: 15,
        textStyle: {
          color: '#ccc',
          fontSize: '20',
        },
        formatter: function (name) {
          return (name.length > 4 ? (name.slice(0,4) + '...') : name);
        }
      },
      series: [{
        type: 'pie',
        radius: '50%',
        center: ['50%', '45%'],
        data: [{value: 14, name: '类别1'},{value: 31, name: '类别2'},{value: 71, name: '类别3'},{value: 4, name: '类别4'}],
        label: {
          normal: {
            fontSize: 20,
          },
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    },
    update: (option) => {
      axios.get('/api/getSexRatio', {params: {}}).then(response => {
        if (response.data.Sex.length > 0 && response.data.Count.length > 0) {
          option.legend.data = response.data.Sex;
          let res = []
          _.each(response.data.Sex, function (value, index) {
            res.push({value: response.data.Count[index], name: value})
          })
          option.series[0].data = res
        }
      });
    },
  },
  '旅客风险构成-风险标签接口&饼图': {
    option: {
      title: {
        text: '旅客风险构成-风险标签'
      },
      tooltip: {
        trigger: 'item',
        enterable: true,
        confine: true,
        textStyle: {fontSize: 18},
      },
      color: [
        '#24adf1',
        '#f5d10c',
        '#a06af5',
        '#f48021',
        '#0e7fe2',
        '#4465f6',
      ],
      legend: {
        orient: 'horizontal',
        align: 'left',
        bottom: '5',
        data: ['公安重点','模型命中','低风险','机检嫌疑'],
        itemGap: 15,
        textStyle: {
          color: '#ccc',
          fontSize: '20',
        },
        formatter: function (name) {
          return (name.length > 4 ? (name.slice(0,4) + '...') : name);
        }
      },
      series: [{
        type: 'pie',
        radius: '50%',
        center: ['50%', '45%'],
        data: [{value: 14, name: '类别1'},{value: 31, name: '类别2'},{value: 71, name: '类别3'},{value: 4, name: '类别4'}],
        label: {
          normal: {
            fontSize: 20,
          },
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    },
    update: (option) => {
      axios.get('/api/getRiskLabel', {params: {}}).then(response => {
        if (response.data.Label.length > 0 && response.data.Count.length > 0) {
          option.legend.data = response.data.Label;
          let res = []
          _.each(response.data.Label, function (value, index) {
            res.push({value: response.data.Count[index], name: value})
          })
          option.series[0].data = res
        }
      });
    },
  },
  '外部情报风险来源&饼图': {
    option: {
      title: {
        text: '外部情报风险来源'
      },
      tooltip: {
        trigger: 'item',
        enterable: true,
        confine: true,
        textStyle: {fontSize: 18},
      },
      color: [
        '#24adf1',
        '#f5d10c',
        '#a06af5',
        '#f48021',
        '#0e7fe2',
        '#4465f6',
      ],
      legend: {
        orient: 'horizontal',
        align: 'left',
        bottom: '5',
        data: ['类别1','类别2','类别3','类别4'],
        itemGap: 15,
        textStyle: {
          color: '#ccc',
          fontSize: '20',
        },
        formatter: function (name) {
          return (name.length > 4 ? (name.slice(0,4) + '...') : name);
        }
      },
      series: [{
        type: 'pie',
        radius: '50%',
        center: ['50%', '45%'],
        data: [{value: 14, name: '类别1'},{value: 31, name: '类别2'},{value: 71, name: '类别3'},{value: 4, name: '类别4'}],
        label: {
          normal: {
            fontSize: 20,
          },
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    },
    update: (option) => {
      axios.get('/api/getOtherMessage', {params: {}}).then(response => {
        if (response.data.Department.length > 0 && response.data.Count.length > 0) {
          option.legend.data = response.data.Department;
          let res = []
          _.each(response.data.Department, function (value, index) {
            res.push({value: response.data.Count[index], name: value})
          })
          option.series[0].data = res
        }
      });
    },
  },
  '内部情报风险来源&饼图': {
    option: {
      title: {
        text: '内部情报风险来源'
      },
      tooltip: {
        trigger: 'item',
        enterable: true,
        confine: true,
        textStyle: {fontSize: 18},
      },
      color: [
        '#24adf1',
        '#f5d10c',
        '#a06af5',
        '#f48021',
        '#0e7fe2',
        '#4465f6',
      ],
      legend: {
        orient: 'horizontal',
        align: 'left',
        bottom: '5',
        data: ['类别1','类别2','类别3','类别4'],
        itemGap: 15,
        textStyle: {
          color: '#ccc',
          fontSize: '20',
        },
        formatter: function (name) {
          return (name.length > 4 ? (name.slice(0,4) + '...') : name);
        }
      },
      series: [{
        type: 'pie',
        radius: '50%',
        center: ['50%', '45%'],
        data: [{value: 14, name: '类别1'},{value: 31, name: '类别2'},{value: 71, name: '类别3'},{value: 4, name: '类别4'}],
        label: {
          normal: {
            fontSize: 20,
          },
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    },
    update: (option) => {
      axios.get('/api/getOwnMessage', {params: {}}).then(response => {
        if (response.data.Department.length > 0 && response.data.Count.length > 0) {
          option.legend.data = response.data.Department;
          let res = []
          _.each(response.data.Department, function (value, index) {
            res.push({value: response.data.Count[index], name: value})
          })
          option.series[0].data = res
        }
      });
    },
  },
  '航线风险要素构成&饼图': {
    option: {
      title: {
        text: '航线风险要素构成'
      },
      tooltip: {
        trigger: 'item',
        enterable: true,
        confine: true,
        textStyle: {fontSize: 18},
      },
      color: [
        '#24adf1',
        '#f5d10c',
        '#a06af5',
        '#f48021',
        '#0e7fe2',
        '#4465f6',
      ],
      legend: {
        orient: 'horizontal',
        align: 'left',
        bottom: '5',
        data: ['类别1','类别2','类别3','类别4'],
        itemGap: 15,
        textStyle: {
          color: '#ccc',
          fontSize: '20',
        },
        formatter: function (name) {
          return (name.length > 4 ? (name.slice(0,4) + '...') : name);
        }
      },
      series: [{
        type: 'pie',
        radius: '50%',
        center: ['50%', '45%'],
        data: [{value: 14, name: '类别1'},{value: 31, name: '类别2'},{value: 71, name: '类别3'},{value: 4, name: '类别4'}],
        label: {
          normal: {
            fontSize: 20,
          },
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    },
    update: (option) => {
      axios.get('/api/getFlightWarning', {params: {}}).then(response => {
        if (response.data.Content.length > 0 && response.data.Count.length > 0) {
          option.legend.data = response.data.Content;
          let res = []
          _.each(response.data.Content, function (value, index) {
            res.push({value: response.data.Count[index], name: value})
          })
          option.series[0].data = res
        }
      });
    },
  },
  '查获重点热门物品构成&横向柱状图': {
    option: {
      animation: true,
      title: {
        text: '查获重点热门物品构成',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'value',
        position: 'top',
      },
      yAxis: {
        type: 'category',
        splitLine: {
          show: false,
        },
        axisLabel: {
          rotate: 15,
        },
        data: ['巴西','印尼','美国','印度','德国','法国']
      },
      grid: {
        top: 65,
        left: 75,
        right: 20,
        bottom: 10
      },
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: 14,
          barGap: '-100%',
          silent: true,
          itemStyle: {
            normal: {
              color: 'rgba(42, 56, 144, .8)',
            }
          },
          tooltip: {
            show: false,
          },
          data: [630230, 630230, 630230, 630230, 630230, 630230]
        },
        {
          name: '人次',
          type: 'bar',
          barWidth: 14,
          label: {
            normal: {
              textStyle: {
                color: '#682d19',
              },
              position: 'right',
              formatter: '{b}'
            }
          },
          itemStyle: {
            normal: {
              color: new Graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: 'rgba(129, 153, 255, 1)'
              }, {
                offset: 1,
                color: 'rgba(18, 34, 134, 1)'
              }]),
              barBorderRadius: [0, 10, 10, 0],  // 圆角
            }
          },
          data: [18203, 23489, 29034, 104970, 131744, 630230]
        }
      ]
    },
    update: (option) => {
      axios.get('/api/getHotGoods', {params: {}}).then(response => {
        if (response.data.Goods.length > 0 && response.data.Count.length > 0) {
          option.yAxis.data = response.data.Goods;
          option.series[1].data = response.data.Count;
          var maxd = _.max(response.data.Count);
          option.series[0].data = _.map(response.data.Count, (obj, idx) => { return maxd })
          option.xAxis.max = maxd;
        }
      });
    },
  },
  '查获禁限物品构成&横向柱状图': {
    option: {
      animation: true,
      title: {
        text: '查获禁限物品构成',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'value',
        position: 'top',
      },
      yAxis: {
        type: 'category',
        splitLine: {
          show: false,
        },
        axisLabel: {
          rotate: 15,
        },
        data: ['巴西','印尼','美国','印度','德国','法国']
      },
      grid: {
        top: 65,
        left: 75,
        right: 20,
        bottom: 10
      },
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: 14,
          barGap: '-100%',
          silent: true,
          itemStyle: {
            normal: {
              color: 'rgba(42, 56, 144, .8)',
            }
          },
          tooltip: {
            show: false,
          },
          data: [630230, 630230, 630230, 630230, 630230, 630230]
        },
        {
          name: '人次',
          type: 'bar',
          barWidth: 14,
          label: {
            normal: {
              textStyle: {
                color: '#682d19',
              },
              position: 'right',
              formatter: '{b}'
            }
          },
          itemStyle: {
            normal: {
              color: new Graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: 'rgba(129, 153, 255, 1)'
              }, {
                offset: 1,
                color: 'rgba(18, 34, 134, 1)'
              }]),
              barBorderRadius: [0, 10, 10, 0],  // 圆角
            }
          },
          data: [18203, 23489, 29034, 104970, 131744, 630230]
        }
      ]
    },
    update: (option) => {
      axios.get('/api/getContrabandGoods', {params: {}}).then(response => {
        if (response.data.Goods.length > 0 && response.data.Count.length > 0) {
          option.yAxis.data = response.data.Goods;
          option.series[1].data = response.data.Count;
          var maxd = _.max(response.data.Count);
          option.series[0].data = _.map(response.data.Count, (obj, idx) => { return maxd })
          option.xAxis.max = maxd;
        }
      });
    },
  },
  '年度监管航空器构成&饼图': {
    option: {
      title: {
        text: '年度监管航空器构成'
      },
      tooltip: {
        trigger: 'item',
        enterable: true,
        confine: true,
        textStyle: {fontSize: 18},
      },
      color: [
        '#24adf1',
        '#f5d10c',
        '#a06af5',
        '#f48021',
        '#0e7fe2',
        '#4465f6',
      ],
      legend: {
        orient: 'horizontal',
        align: 'left',
        bottom: '5',
        data: ['类别1','类别2','类别3','类别4'],
        itemGap: 15,
        textStyle: {
          color: '#ccc',
          fontSize: '20',
        },
        formatter: function (name) {
          return (name.length > 4 ? (name.slice(0,4) + '...') : name);
        }
      },
      series: [{
        type: 'pie',
        radius: '50%',
        center: ['50%', '45%'],
        data: [{value: 14, name: '类别1'},{value: 31, name: '类别2'},{value: 71, name: '类别3'},{value: 4, name: '类别4'}],
        label: {
          normal: {
            fontSize: 20,
          },
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    },
    update: (option) => {
      axios.get('/api/getYearsAircraft', {params: {}}).then(response => {
        if (response.data.Aircraft.length > 0 && response.data.Count.length > 0) {
          option.legend.data = response.data.Aircraft;
          let res = []
          _.each(response.data.Aircraft, function (value, index) {
            res.push({value: response.data.Count[index], name: value})
          })
          option.series[0].data = res
        }
      });
    },
  },
  '年度进出境人员构成&双柱图': {
    option: {
      animation: true,
      title: {
        text: '年度进出境人员构成',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        splitLine: {
          show: false,
        },
        data: ['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
      },
      yAxis: {
        type: 'value',
        position: 'top',
        boundaryGap: [0, 0.01]
      },
      grid: {
        top: 50,
        left: 40,
        right: 20,
        bottom: 25
      },
      series: [
        {
          name: '机组成员',
          type: 'bar',
          // barWidth: 13,
          label: {
            normal: {
              textStyle: {
                color: '#682d19',
              },
              position: 'right',
              show: false,
              formatter: '{b}'
            }
          },
          itemStyle: {
            normal: {
              color: new Graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(38, 216, 255, 1)'
              }, {
                offset: 1,
                color: 'rgba(32, 84, 221, 1)'
              }]),
              barBorderRadius: [10, 10, 0, 0],  // 圆角
            }
          },
          data: [0,0,67,0,30,0,140,20,112,127,113,20,5,101,90,77,116,28,68,80,30,61,88,93]
        },
        {
          name: '旅客',
          type: 'bar',
          // barWidth: 13,
          label: {
            normal: {
              textStyle: {
                color: '#682d19',
              },
              position: 'right',
              show: false,
              formatter: '{b}'
            }
          },
          itemStyle: {
            normal: {
              color: new Graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255, 162, 82, 1)'
              }, {
                offset: 1,
                color: 'rgba(241, 90, 34, 1)'
              }]),
              barBorderRadius: [10, 10, 0, 0],  // 圆角
            }
          },
          data: [0,0,67,0,30,0,140,20,112,127,113,20,5,101,90,77,116,28,68,80,30,61,88,93]
        }
      ]
    },
    update: (option) => {
      axios.get('/api/getYearsPeople', {params: {}}).then(response => {
        if (response.data.Month.length > 0 && response.data.Tourist.length > 0 && response.data.Stuff.length > 0) {
          option.xAxis.data = response.data.Month;
          option.series[0].data = response.data.Stuff;
          option.series[1].data = response.data.Tourist;
        }
      });
    },
  },
  '知识图谱图': {
    option: {
      color: ['#F35853', '#FED756', '#4BF6E6', '#FFD700', '#9CD226','#d3758f','#dcc392','#2e4783',
      '#82b6e9','#ff6347','#a092f1','#0a915d','#7d4627',
      '#6699FF','#ff6666','#3cb371'],
      backgroundColor: '',
      tooltip: {
        formatter: function (params) {
          return params.data.name;
        }
      },
      series: [{
        type: 'graph',
        layout: 'force',
        data: kg_data['nodes'],
        links: kg_data['links'],
        categories: kg_data['categories'],
        lineStyle: {
          normal: {
            color: 'source',
            width: 2,
            curveness: 0.2
          }
        },
        force: {
          repulsion: 400,
          layoutAnimation: false
        },
        roam: true,
        focusNodeAdjacency: true,
        animationDuration: 500
      }],
      textStyle: {
        fontFamily: '微软雅黑',
        fontSize: 18
      }
    }
  },
  '河流图': {
    option: {

      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'line',
              lineStyle: {
                  color: 'rgba(0,0,0,0.2)',
                  width: 1,
                  type: 'solid'
              }
          }
      },
      legend: {
          data: ['DQ', 'TY', 'SS', 'QG', 'SY', 'DD']
      },
      singleAxis: {
          top: 50,
          bottom: 50,
          axisTick: {},
          axisLabel: {},
          type: 'time',
          axisPointer: {
              animation: true,
              label: {
                  show: true
              }
          },
          splitLine: {
              show: true,
              lineStyle: {
                  type: 'dashed',
                  opacity: 0.2
              }
          }
      },
      series: [
          {
              type: 'themeRiver',
              itemStyle: {
                  emphasis: {
                      shadowBlur: 20,
                      shadowColor: 'rgba(0, 0, 0, 0.8)'
                  }
              },
              data: [['2015/11/08',10,'DQ'],['2015/11/09',15,'DQ'],['2015/11/10',35,'DQ'],
              ['2015/11/11',38,'DQ'],['2015/11/12',22,'DQ'],['2015/11/13',16,'DQ'],
              ['2015/11/14',7,'DQ'],['2015/11/15',2,'DQ'],['2015/11/16',17,'DQ'],
              ['2015/11/17',33,'DQ'],['2015/11/18',40,'DQ'],['2015/11/19',32,'DQ'],
              ['2015/11/20',26,'DQ'],['2015/11/21',35,'DQ'],['2015/11/22',40,'DQ'],
              ['2015/11/23',32,'DQ'],['2015/11/24',26,'DQ'],['2015/11/25',22,'DQ'],
              ['2015/11/26',16,'DQ'],['2015/11/27',22,'DQ'],['2015/11/28',10,'DQ'],
              ['2015/11/08',35,'TY'],['2015/11/09',36,'TY'],['2015/11/10',37,'TY'],
              ['2015/11/11',22,'TY'],['2015/11/12',24,'TY'],['2015/11/13',26,'TY'],
              ['2015/11/14',34,'TY'],['2015/11/15',21,'TY'],['2015/11/16',18,'TY'],
              ['2015/11/17',45,'TY'],['2015/11/18',32,'TY'],['2015/11/19',35,'TY'],
              ['2015/11/20',30,'TY'],['2015/11/21',28,'TY'],['2015/11/22',27,'TY'],
              ['2015/11/23',26,'TY'],['2015/11/24',15,'TY'],['2015/11/25',30,'TY'],
              ['2015/11/26',35,'TY'],['2015/11/27',42,'TY'],['2015/11/28',42,'TY'],
              ['2015/11/08',21,'SS'],['2015/11/09',25,'SS'],['2015/11/10',27,'SS'],
              ['2015/11/11',23,'SS'],['2015/11/12',24,'SS'],['2015/11/13',21,'SS'],
              ['2015/11/14',35,'SS'],['2015/11/15',39,'SS'],['2015/11/16',40,'SS'],
              ['2015/11/17',36,'SS'],['2015/11/18',33,'SS'],['2015/11/19',43,'SS'],
              ['2015/11/20',40,'SS'],['2015/11/21',34,'SS'],['2015/11/22',28,'SS'],
              ['2015/11/23',26,'SS'],['2015/11/24',37,'SS'],['2015/11/25',41,'SS'],
              ['2015/11/26',46,'SS'],['2015/11/27',47,'SS'],['2015/11/28',41,'SS'],
              ['2015/11/08',10,'QG'],['2015/11/09',15,'QG'],['2015/11/10',35,'QG'],
              ['2015/11/11',38,'QG'],['2015/11/12',22,'QG'],['2015/11/13',16,'QG'],
              ['2015/11/14',7,'QG'],['2015/11/15',2,'QG'],['2015/11/16',17,'QG'],
              ['2015/11/17',33,'QG'],['2015/11/18',40,'QG'],['2015/11/19',32,'QG'],
              ['2015/11/20',26,'QG'],['2015/11/21',35,'QG'],['2015/11/22',40,'QG'],
              ['2015/11/23',32,'QG'],['2015/11/24',26,'QG'],['2015/11/25',22,'QG'],
              ['2015/11/26',16,'QG'],['2015/11/27',22,'QG'],['2015/11/28',10,'QG'],
              ['2015/11/08',10,'SY'],['2015/11/09',15,'SY'],['2015/11/10',35,'SY'],
              ['2015/11/11',38,'SY'],['2015/11/12',22,'SY'],['2015/11/13',16,'SY'],
              ['2015/11/14',7,'SY'],['2015/11/15',2,'SY'],['2015/11/16',17,'SY'],
              ['2015/11/17',33,'SY'],['2015/11/18',40,'SY'],['2015/11/19',32,'SY'],
              ['2015/11/20',26,'SY'],['2015/11/21',35,'SY'],['2015/11/22',4,'SY'],
              ['2015/11/23',32,'SY'],['2015/11/24',26,'SY'],['2015/11/25',22,'SY'],
              ['2015/11/26',16,'SY'],['2015/11/27',22,'SY'],['2015/11/28',10,'SY'],
              ['2015/11/08',10,'DD'],['2015/11/09',15,'DD'],['2015/11/10',35,'DD'],
              ['2015/11/11',38,'DD'],['2015/11/12',22,'DD'],['2015/11/13',16,'DD'],
              ['2015/11/14',7,'DD'],['2015/11/15',2,'DD'],['2015/11/16',17,'DD'],
              ['2015/11/17',33,'DD'],['2015/11/18',4,'DD'],['2015/11/19',32,'DD'],
              ['2015/11/20',26,'DD'],['2015/11/21',35,'DD'],['2015/11/22',40,'DD'],
              ['2015/11/23',32,'DD'],['2015/11/24',26,'DD'],['2015/11/25',22,'DD'],
              ['2015/11/26',16,'DD'],['2015/11/27',22,'DD'],['2015/11/28',10,'DD']]
          }
      ]
   }
  },
  '折线图朝鲜': {
    option: {
      title: {
          text: ''
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data: ['朝鲜','南海','台湾']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '25%',
          containLabel: true
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2018年12月','2019年1月','2019年2月','2019年3月','2019年4月','2019年5月','2019年6月','2019年7月',
          '2019年8月','2019年9月','2019年10月','2019年11月']
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              name: '朝鲜',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: [3755,3511,3605,11859,4145,4635,63858,5108,4354,6547,7774,3720]
          }
      ]
  }
  },
  '折线图南海': {
    option: {
      title: {
          text: ''
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data: ['朝鲜','南海','台湾']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '25%',
          containLabel: true
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2018年12月','2019年1月','2019年2月','2019年3月','2019年4月','2019年5月','2019年6月','2019年7月',
          '2019年8月','2019年9月','2019年10月','2019年11月']
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              name: '南海',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: [1317,1283,1424,1334,1331,1382,1351,1297,1121,1069,1248,21239]
          },
      ]
  }
  },
  '折线图台湾': {
    option: {
      title: {
          text: ''
      },
      tooltip: {
          trigger: 'axis',
      },
      legend: {
          data: ['朝鲜','南海','台湾']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '25%',
          containLabel: true
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2018年12月','2019年1月','2019年2月','2019年3月','2019年4月','2019年5月','2019年6月','2019年7月',
          '2019年8月','2019年9月','2019年10月','2019年11月']
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              name: '台湾',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: [11487,36273,7931,6272,26807,12048,11896,101372,27142,6611,28080,7223]
          }
      ]
  }
  }
};
export {ChartLib, ChartData};
