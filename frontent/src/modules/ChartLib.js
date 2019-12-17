/**
 * All provided echarts options.
 */
import Graphic from 'echarts/lib/util/graphic'

var fish_data = [
  {'审理时间': '2016-12-20 至 2016-12-20', '承办庭室': 'XXXX','承办法官': 'XXX', '承办法院': 'XXXXXXX法院', '案件状态': 'XX', '案号': '(XXXX)XXXXXX第XXXX号'},
  {'审理时间': '2016-12-20 至 2016-12-20', '承办庭室': 'XXXX','承办法官': 'XXX', '承办法院': 'XXXXXXX法院', '案件状态': 'XX', '案号': '(XXXX)XXXXXX第XXXX号'},
  {'审理时间': '2016-12-20 至 2016-12-20', '承办庭室': 'XXXX','承办法官': 'XXX', '承办法院': 'XXXXXXX法院', '案件状态': 'XX', '案号': '(XXXX)XXXXXX第XXXX号(当前案件)'},
  {'审理时间': '2016-12-20 至 2016-12-20', '承办庭室': 'XXXX','承办法官': 'XXX', '承办法院': 'XXXXXXX法院', '案件状态': 'XX', '案号': '(XXXX)XXXXXX第XXXX号'},
  {'审理时间': '2016-12-20 至 2016-12-20', '承办庭室': 'XXXX','承办法官': 'XXX', '承办法院': 'XXXXXXX法院', '案件状态': 'XX', '案号': '(XXXX)XXXXXX第XXXX号'},
  {'审理时间': '2016-12-20 至 2016-12-20', '承办庭室': 'XXXX','承办法官': 'XXX', '承办法院': 'XXXXXXX法院', '案件状态': 'XX', '案号': '(XXXX)XXXXXX第XXXX号'},
  {'审理时间': '2016-12-20 至 2016-12-20', '承办庭室': 'XXXX','承办法官': 'XXX', '承办法院': 'XXXXXXX法院', '案件状态': 'XX', '案号': '(XXXX)XXXXXX第XXXX号(当前案件)'},
  {'审理时间': '2016-12-20 至 2016-12-20', '承办庭室': 'XXXX','承办法官': 'XXX', '承办法院': 'XXXXXXX法院', '案件状态': 'XX', '案号': '(XXXX)XXXXXX第XXXX号(当前案件)'},
  {'审理时间': '2016-12-20 至 2016-12-20', '承办庭室': 'XXXX','承办法官': 'XXX', '承办法院': 'XXXXXXX法院', '案件状态': 'XX', '案号': '(XXXX)XXXXXX第XXXX号(当前案件)'},
  {'审理时间': '2016-12-20 至 2016-12-20', '承办庭室': 'XXXX','承办法官': 'XXX', '承办法院': 'XXXXXXX法院', '案件状态': 'XX', '案号': '(XXXX)XXXXXX第XXXX号'},
  {'审理时间': '2016-12-20 至 2016-12-20', '承办庭室': 'XXXX','承办法官': 'XXX', '承办法院': 'XXXXXXX法院', '案件状态': 'XX', '案号': '(XXXX)XXXXXX第XXXX号(当前案件)'},
  {'审理时间': '2016-12-20 至 2016-12-20', '承办庭室': 'XXXX','承办法官': 'XXX', '承办法院': 'XXXXXXX法院', '案件状态': 'XX', '案号': '(XXXX)XXXXXX第XXXX号(当前案件)'},
  {'审理时间': '2016-12-20 至 2016-12-20', '承办庭室': 'XXXX','承办法官': 'XXX', '承办法院': 'XXXXXXX法院', '案件状态': 'XX', '案号': '(XXXX)XXXXXX第XXXX号'},
  {'审理时间': '2016-12-20 至 2016-12-20', '承办庭室': 'XXXX','承办法官': 'XXX', '承办法院': 'XXXXXXX法院', '案件状态': 'XX', '案号': '(XXXX)XXXXXX第XXXX号(当前案件)'}
]

function fishBone (data) {
  var colors = ['#F89782', '#1A84CE', '#F7A259', '#43A6DA', '#F9BF3B','#88C7CC','#EF6D5F','#60A96E','#F03852','#3A9284'];
  $(this).children().remove();
  $(this).append(creataFishBone(data));
  // 2.自适应
  var rowcount = fixWindow();
  // 3.翻页滚动效果
  // jQuery(".fishBone").slide({
  //     titCell: ".hd ul",
  //     mainCell: ".bd>ul",
  //     autoPage: true,
  //     effect: "left",
  //     autoPlay: false,
  //     scroll: rowcount,
  //     vis: rowcount
  // });

  function fixWindow () {
      // item所占的宽度 = 自身宽度+marginleft
      var item = $(".fishBone .bd .item");
      var marginleft = parseInt(item.css('margin-left'))
      var item_w = item.width() + marginleft;

      // 显示区域
      var bd_w = $(".fishBone .bd").width();
      // 能显示的个数 取整
      var rowcount = parseInt(bd_w / item_w);
      if (rowcount > item.size()) {
          // rowcount = item.size();
          $(".fishBone .prev,.fishBone .next").hide()
      }
      // 设置新的宽度使其平均分布
      var item_w_temp = bd_w / rowcount - marginleft;
      item.width(item_w_temp);
      return rowcount;
  };

  function getColor (i) {
      var length = colors.length;
      var color = 'gray';
      if (i <= length - 1) {
          color = colors[i];
      } else {
          color = colors[i % length];
      }
      return color;
  };

  function getLinePointY (i) {
      var length = colors.length;
      var y = 0;
      if (i <= length - 1) {
          y = -i * 20;
      } else {
          y = -(i % length) * 20;
      }
      return y + "px";
  };

  function getLineFirstY (i) {
      var length = colors.length;
      var y = 0;
      if (i <= length - 1) {
          y = -i * 60;
      } else {
          y = -(i % length) * 60;
      }
      return y + "px";
  };

  function getTitleLeftY (i) {
      var length = colors.length;
      var y = 0;// 图片位置
      if (i <= length - 1) {
          y += -i * 60;
      } else {
          y += -(i % length) * 60;
      }
      return y + "px";
  };

  function getTitleCenterY (i) {
      var length = colors.length;
      var y = -598;// 图片位置
      if (i <= length - 1) {
          y += -i * 60;
      } else {
          y += -(i % length) * 60;
      }
      return y + "px";
  };

  function getTitleRightY (i) {
      var length = colors.length;
      var y = -1200;// 图片位置
      if (i <= length - 1) {
          y += -i * 60;
      } else {
          y += -(i % length) * 60;
      }
      return y + "px";
  };

  function creataFishBone (data) {
      var fishBone = $("<div class='fishBone'/>");
      var wrapper = $("<div class='wrapper'></div>");
      var bd = $("<div class='bd'></div>");
      var ul_item = $("<ul/>");
      // 遍历数据
      $(data).each(function (index) {
          var itemclass = itemClass(index);// 显示在轴上方或下方标识 top/bottom

          var color = getColor(index);
          var lineFirstY = getLineFirstY(index);
          var titleLeftY = getTitleLeftY(index);
          var titleCenterY = getTitleCenterY(index);
          var titleRightY = getTitleRightY(index);
          var ul = $("<ul></ul>");
          // 遍历封装属性
          // 封装审理时间和案号
          if (itemclass === 'top') {
              $.each(this, function (name, value) {
                  if (name === '审理时间') {
                      var li = $("<li class='line-first'>" + value + "</li>")
                                  .css('background-position-y', (parseInt(lineFirstY) + 9) + "px");// 9是原计算结果的偏移量，显示位置正合适
                      li.appendTo(ul);
                      return;
                  }
              });
              $.each(this, function (name, value) {
                  if (name === '案号') {
                      var li = $("<li class='title'></li>");
                      var titleLeft = $("<span class='title-left'>&nbsp;</span>").css('background-position-y',titleLeftY);
                      var titleCenter = $("<span class='title-center'>" + value + "</span>").css('background-position-y',titleCenterY);
                      var titleRight = $("<span class='title-right'>&nbsp;</span>").css('background-position-y',titleRightY);
                      li.append(titleLeft).append(titleCenter).append(titleRight);
                      li.appendTo(ul);
                      return;
                  }
              });
          }
          // 封装其他属性
          $.each(this, function (name, value) {
              if (name !== '案号' && name !== '审理时间') {
                  var li = $("<li>" + name + "：" + value + "</li>").css("border-left","1px solid " + color);
                  li.appendTo(ul);
              }
          });
        // 封装审理时间和案号
          if (itemclass === "bottom") {
              $.each(this, function (name, value) {
                  if (name === '案号') {
                      var li = $("<li class='title'></li>");
                      var titleLeft = $("<span class='title-left'>&nbsp;</span>").css('background-position-y',titleLeftY);
                      var titleCenter = $("<span class='title-center'>" + value + "</span>").css('background-position-y',titleCenterY);
                      var titleRight = $("<span class='title-right'>&nbsp;</span>").css('background-position-y',titleRightY);
                      li.append(titleLeft).append(titleCenter).append(titleRight);
                      li.appendTo(ul);
                      return;
                  }
              });
              $.each(this, function (name, value) {
                  if (name === '审理时间') {
                      var li = $("<li class='line-first'>" + value + "</li>")
                      .css('background-position-y', (parseInt(lineFirstY) - 33) + "px");// 30是原计算结果的偏移量
                      li.appendTo(ul);
                      return;
                  }
              });
          }
          // 封装轴线上的圆点
          var linePointY = getLinePointY(index);
          var point = $("<li class='line-last line-point'></li>").css('background-position', '0px ' + linePointY);
          point.appendTo(ul);
          // 生成一个item（一个完整的案件）
          var li_item = $("<li class='item'></li>");
          var content = $("<div class='content'></div>");
          ul.appendTo(content);
          content.appendTo(li_item);
          li_item.addClass(itemClass(index)).appendTo(ul_item);
      });
      ul_item.appendTo(bd);
      bd.appendTo(wrapper);

      var prev = $("<a class='prev'></a>");
      var next = $("<a class='next'></a>");
      var line = $("<div class='line'/>")

      fishBone.append(wrapper).append(prev).append(next).append(line);
      return fishBone;
  };

  function itemClass (index) {
      index += 1;
      if (index % 2 === 0) {
          // 偶数显示到下方
          return "bottom";
      } else {
          // 奇数显示到上方
          return "top";
      }
  }
}

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
      'date': '2019-12-14',
      'text': '朝鲜丰溪里核试验场现重启迹象，卫星发现汽车驶过痕迹',
      'link': 'http://news.cctv.com/2019/12/14/ARTI95FJ4WPyLbdwTrTuitlj191214.shtml'},
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
    {
      'text': '1.韩国《中央日报》：仅从这些轻微的迹象，尚无法判断朝鲜正在重启核试验基地。',
      'link': 'http://news.cctv.com/2019/12/14/ARTI95FJ4WPyLbdwTrTuitlj191214.shtml'
    },{
      'text': '2.韩国 当局：朝鲜可以在数周或数月内完成核试验场的复原工作。',
      'link': 'http://news.cctv.com/2019/12/14/ARTI95FJ4WPyLbdwTrTuitlj191214.shtml'
    },{
      'text': '3.外界：朝鲜可能在年底期限到来之际重启洲际导弹试射等活动。',
      'link': 'http://news.cctv.com/2019/12/14/ARTI95FJ4WPyLbdwTrTuitlj191214.shtml'
    },{
      'text': '4.美国 斯蒂芬·比根：称朝鲜为“流氓国家”。',
      'link': 'https://k.sina.com.cn/article_1686546714_6486a91a02000wxzp.html?from=news&subch=onews'
    },{
      'text': '5.日本 菅义伟：日本将继续与美国等紧密合作，高度关注朝鲜动向，确保信息收集和警戒监视万无一失。',
      'link': 'https://k.sina.com.cn/article_1686546714_6486a91a02000wxzp.html?from=news&subch=onews'
    }
    ],
    '南海': [
      {
       'text': '1.海军发言人程德伟：这次组织国产航母跨区开展试验和训练，是航母建造过程中的正常安排，不针对任何特定目标，与当前的局势无关。',
       'link': 'https://new.qq.com/rain/a/TWF2019111800472700'
      },{
       'text': '2.美国 国防部长 埃斯珀：美国国防的重中之重，第一是中国，第二是俄罗斯。',
       'link': 'https://mil.news.sina.com.cn/china/2019-12-14/doc-iihnzhfz5845352.shtml'
      },{
       'text': '3.印度：中国的崛起令亚洲国家普遍感到不安。',
       'link': 'https://news.sina.com.cn/w/2019-12-02/doc-iihnzhfz2998428.shtml'
      }
    ],
    '台湾': [
      {
       'text': '1.台湾 韩国瑜: 明年台湾人要为自己投一票，不要再迷信政党。',
       'link': 'http://www.taiwan.cn/taiwan/jsxw/201911/t20191125_12220568.htm'
      },{
       'text': '2.香港 中评社：民调失真，政治操作取代了政策、政纲比拼。',
       'link': 'https://k.sina.com.cn/article_1709286740_65e1a55402000ma0d.html?from=news&subch=onews'
      },{
       'text': '3.香港 中评社：民进党选战信心不足。',
       'link': 'https://k.sina.com.cn/article_1709286740_65e1a55402000m9e5.html?from=news&subch=onews'
      }
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
  },
  '事件演化朝鲜': {
      option: {
                title: {
                    text: '朝鲜核试验',
                    top: '12%',
                    left: '43%',
                    textStyle: {fontSize: 22},
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    data: ['朝鲜'],
                    show: 'true',
                    top: '40',
                    textStyle: {
                        fontWeight: 'bold',
                        fontSize: '18',
                        color: ['#01a2e9'],
                    }
                },
                singleAxis: {
                    top: '60%',
                    bottom: '50%',
                    axisLabel: {
                        interval: 1
                    },
                    type: 'category',
                    axisLine: {
                        lineStyle: {
                            color: 'white',
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    boundaryGap: false,
                    data: ['2018年12月','2019年1月','2019年2月','2019年3月','2019年4月','2019年5月','2019年6月','2019年7月',
                    '2019年8月','2019年9月','2019年10月','2019年11月'],
                },
                series: [{
                    name: '朝鲜核实验',
                    label: {
                        normal: {
                            show: false,
                            position: 'top',
                            color: 'rgb(21,162,233,0.8)',
                            fontSize: '14'
                        }
                    },
                    coordinateSystem: 'singleAxis',
                    type: 'scatter',
                    markPoint: {
                        data: [{
                                coord: [1, 29],
                                label: {
                                    normal: {
                                        padding: [5, 10, 10, 10],
                                        fontSize: 17,
                                        color: "yellow",
                                        formatter: ['就朝鲜\n“重大\n试验”\n特朗普\n警告\n“会失去\n一切\n'].join(""),
                                    }
                                },
                                itemStyle: {
                                    color: '#c03636',
                                },
                            },
                            {
                                label: {
                                    normal: {
                                        padding: [5, 10, 10, 10],
                                        fontSize: 17,
                                        color: "yellow",
                                        formatter: ['朝鲜\n试验\n疑涉及\n洲际\n导弹\n美朝\n融洽\n关系\n或将\n走向\n破裂'].join(""),
                                    }
                                },
                                itemStyle: {
                                    color: '#c03636',
                                },
                                coord: [2, 24],
                            },
                            {
                                label: {
                                    normal: {
                                        padding: [5, 10, 10, 10],
                                        fontSize: 17,
                                        color: "yellow",
                                        formatter: ['外媒：\n朝鲜\n丰溪里\n核试\n验场\n现重启\n迹象\n有汽车\n痕迹'].join(""),
                                    }
                                },
                                itemStyle: {
                                    color: '#c03636',
                                },
                                coord: [4, 24],
                            },
                            {
                                coord: [7, 21],
                                label: {
                                    normal: {
                                        padding: [5, 10, 10, 10],
                                        fontSize: 17,
                                        color: "yellow",
                                        formatter: ['美国\n卫星\n监拍：\n朝鲜\n核试\n验场\n出现\n异动 '].join(""),
                                    }
                                },
                                itemStyle: {
                                    color: '#344b5b',
                                },
                            },
                            {
                                label: {
                                    normal: {
                                        padding: [5, 10, 10, 10],
                                        fontSize: 17,
                                        color: "yellow",
                                        formatter: ['朝鲜\n要送\n美国\n圣诞"大礼" \n张召忠：\n意义\n不亚于\n核试验'].join(""),
                                    }
                                },
                                itemStyle: {
                                    color: '#344b5b',
                                },
                                coord: [6, 21],
                            },
                            {
                                label: {
                                    normal: {
                                        padding: [5, 10, 10, 10],
                                        fontSize: 17,
                                        color: "yellow",
                                        formatter: ['中俄\n提议\n解除\n部分\n对朝\n制裁'].join(""),
                                    }
                                },
                                itemStyle: {
                                    color: '#344b5b',
                                },
                                coord: [15, 21],
                            },
                            // {type : 'max',
                            //     formatter: ['1'].join(""),
                            //     name: '最大值',symbolOffset:[0,'-20%'],
                            //     itemStyle:{
                            //         color:'#c03636',
                            //     },},
                            // {type : 'min', name: '最小值',symbolOffset:[0,'-20%'],
                            //     itemStyle:{
                            //         color:'#344b5b',
                            //     }}
                        ]
                    },
                    symbolSize: function (data) {
                        return Math.floor(Math.random() * data + 20);
                    },
                    data: ['20', '50', '29', '27', '25', '22', '4', '5', '25', '22', '21', '22', '24', '25.5',
                        '26', '2'
                    ],
                    itemStyle: {
                        normal: {
                            color: 'rgb(21,162,233,0.9)',
                        }
                    }
                }, ]
    }
  },
  '事件演化南海': {
    option: {
              title: {
                  text: '南海争端',
                  top: '12%',
                  left: '43%',
                  textStyle: {fontSize: 22},
              },
              tooltip: {
                  trigger: 'item'
              },
              legend: {
                  data: ['南海'],
                  show: 'true',
                  top: '40',
                  textStyle: {
                      fontWeight: 'bold',
                      fontSize: '18',
                      color: ['#01a2e9'],
                  }
              },
              singleAxis: {
                  top: '60%',
                  bottom: '50%',
                  axisLabel: {
                      interval: 1
                  },
                  type: 'category',
                  axisLine: {
                      lineStyle: {
                          color: 'white',
                      }
                  },
                  splitLine: {
                      lineStyle: {
                          type: 'dashed'
                      }
                  },
                  boundaryGap: false,
                  data: ['2018年12月','2019年1月','2019年2月','2019年3月','2019年4月','2019年5月','2019年6月','2019年7月',
                  '2019年8月','2019年9月','2019年10月','2019年11月'],
              },
              series: [{
                  name: '南海争端',
                  label: {
                      normal: {
                          show: false,
                          position: 'top',
                          color: 'rgb(21,162,233,0.8)',
                          fontSize: '14'
                      }
                  },
                  coordinateSystem: 'singleAxis',
                  type: 'scatter',
                  markPoint: {
                      data: [{
                              coord: [1, 29],
                              label: {
                                  normal: {
                                      padding: [5, 10, 10, 10],
                                      fontSize: 17,
                                      color: "yellow",
                                      formatter: ['印日\n举行\n首次\n部长级\n"2+2"\n对话\n双方\n讨论\n南海\n问题'].join(""),
                                  }
                              },
                              itemStyle: {
                                  color: '#c03636',
                              },
                          },
                          {
                              label: {
                                  normal: {
                                      padding: [5, 10, 10, 10],
                                      fontSize: 17,
                                      color: "yellow",
                                      formatter: ['越南\n阻拦\n失败，\n经过\n数月\n努力后，\n中国\n海警\n已在\n万安滩\n常态化\n巡逻 '].join(""),
                                  }
                              },
                              itemStyle: {
                                  color: '#c03636',
                              },
                              coord: [2, 24],
                          },
                          {
                              label: {
                                  normal: {
                                      padding: [5, 10, 10, 10],
                                      fontSize: 17,
                                      color: "yellow",
                                      formatter: ['外网评：\n加速\n“南海\n行为\n准则”\n磋商，\n中国\n和东盟\n做了\n哪些\n工作？'].join(""),
                                  }
                              },
                              itemStyle: {
                                  color: '#c03636',
                              },
                              coord: [4, 24],
                          },
                          {
                              coord: [7, 21],
                              label: {
                                  normal: {
                                      padding: [5, 10, 10, 10],
                                      fontSize: 17,
                                      color: "yellow",
                                      formatter: ['越南\n在南海\n建岛，\n投入\n美国\n怀抱后，\n更需\n警惕\n双方\n狼狈\n为奸'].join(""),
                                  }
                              },
                              itemStyle: {
                                  color: '#344b5b',
                              },
                          },
                          {
                              label: {
                                  normal: {
                                      padding: [5, 10, 10, 10],
                                      fontSize: 17,
                                      color: "yellow",
                                      formatter: ['令美国\n失望了！\n中越\n海军\n在南海\n相遇，\n实力\n差距\n明显！\n没掐\n起来'].join(""),
                                  }
                              },
                              itemStyle: {
                                  color: '#344b5b',
                              },
                              coord: [6, 21],
                          },
                          {
                              label: {
                                  normal: {
                                      padding: [5, 10, 10, 10],
                                      fontSize: 17,
                                      color: "yellow",
                                      formatter: ['令美国失望了！中越海军在南海相遇，实力差距明显！没掐起来 '].join(""),
                                  }
                              },
                              itemStyle: {
                                  color: '#344b5b',
                              },
                              coord: [15, 21],
                          },
                          // {type : 'max',
                          //     formatter: ['1'].join(""),
                          //     name: '最大值',symbolOffset:[0,'-20%'],
                          //     itemStyle:{
                          //         color:'#c03636',
                          //     },},
                          // {type : 'min', name: '最小值',symbolOffset:[0,'-20%'],
                          //     itemStyle:{
                          //         color:'#344b5b',
                          //     }}
                      ]
                  },
                  symbolSize: function (data) {
                      return Math.floor(Math.random() * data + 20);
                  },
                  data: ['20', '50', '29', '27', '25', '22', '4', '5', '25', '22', '21', '22', '24', '25.5',
                      '26', '2'
                  ],
                  itemStyle: {
                      normal: {
                          color: 'rgb(21,162,233,0.9)',
                      }
                  }
              }, ]
  }
  },
  '事件演化台湾': {
    option: {
              title: {
                  text: '台湾大选',
                  top: '12%',
                  left: '43%',
                  textStyle: {fontSize: 22},
              },
              tooltip: {
                  trigger: 'item'
              },
              legend: {
                  data: ['台湾'],
                  show: 'true',
                  top: '40',
                  textStyle: {
                      fontWeight: 'bold',
                      fontSize: '18',
                      color: ['#01a2e9'],
                  }
              },
              singleAxis: {
                  top: '60%',
                  bottom: '50%',
                  axisLabel: {
                      interval: 1
                  },
                  type: 'category',
                  axisLine: {
                      lineStyle: {
                          color: 'white',
                      }
                  },
                  splitLine: {
                      lineStyle: {
                          type: 'dashed'
                      }
                  },
                  boundaryGap: false,
                  data: ['2018年12月','2019年1月','2019年2月','2019年3月','2019年4月','2019年5月','2019年6月','2019年7月',
                  '2019年8月','2019年9月','2019年10月','2019年11月'],
              },
              series: [{
                  name: '台湾大选',
                  label: {
                      normal: {
                          show: false,
                          position: 'top',
                          color: 'rgb(21,162,233,0.8)',
                          fontSize: '14'
                      }
                  },
                  coordinateSystem: 'singleAxis',
                  type: 'scatter',
                  markPoint: {
                      data: [{
                              coord: [1, 29],
                              label: {
                                  normal: {
                                      padding: [5, 10, 10, 10],
                                      fontSize: 17,
                                      color: "yellow",
                                      formatter: ['蔡英文\n宣称\n年内\n完成\n“反渗透法”,\n马英九\n斥：\n制造\n恐惧\n骗选票，\n其心\n可诛'].join(""),
                                  }
                              },
                              itemStyle: {
                                  color: '#c03636',
                              },
                          },
                          {
                              label: {
                                  normal: {
                                      padding: [5, 10, 10, 10],
                                      fontSize: 17,
                                      color: "yellow",
                                      formatter: ['蓝绿\n决战\n“中彰投”，\n没想到\n民进党\n竟用\n一招\n“独领风骚”？'].join(""),
                                  }
                              },
                              itemStyle: {
                                  color: '#c03636',
                              },
                              coord: [2, 24],
                          },
                          {
                              label: {
                                  normal: {
                                      padding: [5, 10, 10, 10],
                                      fontSize: 17,
                                      color: "yellow",
                                      formatter: ['来去\n蔡办\n住一晚？\n蔡英文\n用办公室\n拉选票\n被批：\n台湾\n不是\n你家'].join(""),
                                  }
                              },
                              itemStyle: {
                                  color: '#c03636',
                              },
                              coord: [4, 24],
                          },
                          {
                              coord: [7, 21],
                              label: {
                                  normal: {
                                      padding: [5, 10, 10, 10],
                                      fontSize: 17,
                                      color: "yellow",
                                      formatter: ['港媒：\n台湾\n选情\n诡异，\n三个\n现象\n异于\n过往'].join(""),
                                  }
                              },
                              itemStyle: {
                                  color: '#344b5b',
                              },
                          },
                          {
                              label: {
                                  normal: {
                                      padding: [5, 10, 10, 10],
                                      fontSize: 17,
                                      color: "yellow",
                                      formatter: ['马英九\n痛批：\n蔡英文\n用香港人\n的鲜血\n骗台湾\n选票'].join(""),
                                  }
                              },
                              itemStyle: {
                                  color: '#344b5b',
                              },
                              coord: [6, 21],
                          },
                          {
                              label: {
                                  normal: {
                                      padding: [5, 10, 10, 10],
                                      fontSize: 17,
                                      color: "yellow",
                                      formatter: ['台湾\n2020\n选举\n有漏洞！\n台"中选会"\n擅改\n规则\n空白\n选票\n恐成\n输赢\n关键'].join(""),
                                  }
                              },
                              itemStyle: {
                                  color: '#344b5b',
                              },
                              coord: [15, 21],
                          },
                          // {type : 'max',
                          //     formatter: ['1'].join(""),
                          //     name: '最大值',symbolOffset:[0,'-20%'],
                          //     itemStyle:{
                          //         color:'#c03636',
                          //     },},
                          // {type : 'min', name: '最小值',symbolOffset:[0,'-20%'],
                          //     itemStyle:{
                          //         color:'#344b5b',
                          //     }}
                      ]
                  },
                  symbolSize: function (data) {
                      return Math.floor(Math.random() * data + 20);
                  },
                  data: ['20', '50', '29', '27', '25', '22', '4', '5', '25', '22', '21', '22', '24', '25.5',
                      '26', '2'
                  ],
                  itemStyle: {
                      normal: {
                          color: 'rgb(21,162,233,0.9)',
                      }
                  }
              }, ]
  }
  }
};
export {fish_data, fishBone, ChartLib, ChartData};
