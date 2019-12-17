<template>
  <div id="app" class="real-body">
    <div :href="'/' + jumpto" class="con-box l-t-box">
      <!-- <Echarts theme="ring" :option="options.left_up.option" className="chart" ></Echarts> -->
      <center>
        <font size="7" color="white">综合选题</font>
      </center>
      <ul>
        <font size="5" color="white">
          <table border="" cellspacing="" cellpadding="" >
            <tr v-bind:key=v v-for="v in left_up_list" @click="clicking(v.topic)">
                <td width=50px>{{v.index}}</td>
                <td width=70px>{{v.topic}}</td>
                <a :href="v.link">
                  <font size="5" color="white">
                    <td>{{v.date}} {{v.text}}</td>
                  </font>
                </a>
            </tr>
          </table> 
        </font>
      </ul>
    </div>
    <div class="con-box r-t-box" @click="goto">
      <!-- <Echarts theme="ring" :option="options.right_up.option" className="chart" ></Echarts> -->
      <center>
        <font size="7" color="white">专家观点</font>
      </center>
      <ul>
          <li v-bind:key=tab v-for="tab in right_up_list">
            <a :href="tab.link">
              <font size="5" color="white">{{tab.text}}</font>
            </a>
          </li>
      </ul>
    </div>
    <div class="con-box l-b-box" @click="goto">
      <center>
        <font size="7" color="white">热度趋势</font>
      </center>
      <Echarts theme="ring" :option="options.left_down.option" className="chart" ></Echarts>
    </div>
    <div class="con-box r-b-box" @click="goto">
      <center>
        <font size="7" color="white">事件演化</font>
      </center>
      <div class="chart">
        <Echarts theme="ring" :option="options.right_down.option" className="chart" ></Echarts>
      </div>
    </div>
    <div class="center-box">
      <div class="chart" id="echarts-globe"></div>
    </div>
    <a :href="'/' + jumpto" class="next-page">
      <img src="~assets/images/next-page.png" alt="">
    </a>
    <a href="/" class="next-home">
      <img src="~assets/images/next-home.png" alt="">
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  import 'components/charts/theme/Ring.js'
  import Echarts from 'vue-echarts-v3/src/full.js'
  // import "yugu/js/jquery-1.8.0.min.js"
  // import {fishBone} from "yugu/js/fishBone.js"
  // import "yugu/js/jquery.SuperSlide.2.1.1.js"
  import echarts from 'echarts'
  require('echarts-gl');

  import "echarts/map/js/world.js";

  import Common from 'components/Common.js'

  import {fish_data, fishBone, ChartLib, ChartData} from './ChartLib.js'

  import BaseTexture from 'components/texture/Base.js'
  // import HeightTexture from 'components/texture/Height.js'
  import BlendTexture from 'components/texture/Blend.js'
  // import OverlayTexture from 'components/texture/Overlay.js'
  // import ambientTexture from '../assets/get/s/data-1491837984109-r1u7NmY6e.hdr'

  const baseTexture = new Image();
  baseTexture.src = BaseTexture.texture;
  // baseTexture.crossOrigin = 'anonymous';
  // baseTexture.src = require('../../assets/map-rc/data-1491890179041-Hkj-elqpe.jpg');

  // const heightTexture = new Image();
  // heightTexture.src = HeightTexture.texture;
  // heightTexture.crossOrigin = 'anonymous';
  // heightTexture.src = require('../../assets/map-rc/data-1491889019097-rJQYikcpl.jpg');

  const blendTexture = new Image();
  blendTexture.src = BlendTexture.texture;
  // blendTexture.crossOrigin = 'anonymous';
  // blendTexture.src = require('../../assets/map-rc/data-1491890291849-rJ2uee5ag.jpg')

  // This one is indeed not needed.
  // const overlayTexture = new Image();
  // overlayTexture.src = GlobeTexture.overlayTexture;
  // // overlayTexture.crossOrigin = 'anonymous';
  // // overlayTexture.src = require('../../assets/map-rc/data-1491890092270-BJEhJg96l.png')

  const heightTexture = new Image();
  heightTexture.src = require('../assets/get/s/data-1491889019097-rJQYikcpl.jpg');

  // const ambientTexture_src = require('../assets/get/s/data-1491837984109-r1u7NmY6e.hdr');

  // import jpg from '../assets/get/s/data-1491889019097-rJQYikcpl.jpg'
  // import hdr from '../assets/get/s/data-1491837984109-r1u7NmY6e.hdr'

  export default {
    data () {
      return {
        Common: Common,
        jumpto: "",
        topic: '朝鲜',
        topics: ['朝鲜','南海','台湾'],
        topic_index: 0,
        intervalID: null,
        intervalRotate: null,
        region: null,
        regions: null,
        nowCityIndex: 0,
        rotateCities: [],
        left_up_list: [],
        right_up_list: [],
        options: {
          left_up: { option: {}, update: () => { return; } },
          right_up: { option: {}, update: () => { return; } },
          left_down: { option: {}, update: () => { return; } },
          right_down: { option: {}, update: () => { return; } },
        },
        globe_t_option: {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          //  title: {
          //    text: '铜仁 -> 北京',
          //    left: 'center',
          //    bottom: '80',
          //    textStyle: {
          //      color: '#fff',
          //      width: '200%',
          //      fontSize: 40
          //    },
          //    padding: [20, 50],
          //    borderWidth: 2,
          //    borderColor: 'rgb(1, 241, 228)',
          //    borderRadius: 10,
          //    backgroundColor: 'rgba(29, 81, 203, .8)',
          //    zlevel: 101
          //  },
          globe: {
            globeRadius: 95,
            globeOuterRadius: 500,
            baseTexture: baseTexture.src,
            heightTexture: heightTexture.src,
            displacementScale: 0.2,
            shading: 'lambert',
            light: {
              ambient: {
                intensity: 0.5
              },
              main: {
                intensity: 1.25
              }
            },
            layers: [{
              type: 'blend',
              blendTo: 'emission',
              texture: blendTexture.src,
            }],
            viewControl: {
              alpha: 27,
              // beta: -160,
              autoRotate: true,
              autoRotateSpeed: 20,
              zoomSensitivity: 1,
              // rotateSensitivity: 0,
              // targetCoord: [110, 33],
              animationDurationUpdate: 1250,
            },
          },
          series: [{
            name: '城市',
            type: 'scatter3D',
            coordinateSystem: 'globe',
            zlevel: 100,
            animation: true,
            blendMode: 'lighter',
            symbol: 'pin',
            symbolSize: 30,
            itemStyle: {
              normal: {
                color: '#fa3434',
                opacity: 1,
              },
            },
            label: {
              normal: {
                show: true,
                formatter: '{b}',
                distance: 5,
                textStyle: {
                  color: '#fff',
                  padding: 5,
                  fontSize: 20,
                  borderWidth: 1,
                  borderColor: '#0775e4',
                  backgroundColor: 'rgba(29, 81, 203, .8)',
                },
              },
            },
            data: [],
          }, {
            type: 'lines3D',
            coordinateSystem: 'globe',
            name: '航线',
            lineStyle: {
              color: '#00abe0',
              opacity: 1,
              width: 4,
            },
            effect: {
              show: false,
              period: 4,
              // constantSpeed: 30,
              symbol: 'arrow',
              trailWidth: 3,
              trailLength: 0.8,
              trailOpacity: 1,
              // trailColor: '#ff4d43'
            },
            data: [],
          }]
        },
        // globe_new_option: {
        //   backgroundColor: 'rgba(0, 0, 0, 0)',
        //   geo: {
        //     type: 'map',
        //     map: 'world',
        //     top: 0,
        //     left: 0,
        //     right: 0,
        //     bottom: 0,
        //     boundingCoords: [[-180, 90], [180, -90]],
        //     // silent: true,
        //     itemStyle: {
        //       normal: {
        //         borderColor: '#000'
        //       }
        //     },
        //     label: {
        //       normal: {
        //         textStyle: {
        //           color: '#fff',
        //           fontSize: 40
        //         }
        //       }
        //     }
        //   },
        //   globe: {
        //     baseTexture: this.globe,
        //     heightTexture: heightTexture.src,
        //     displacementScale: 0.1,
        //     shading: 'realistic',
        //     realisticMaterial: {
        //       roughness: 0.8,
        //       metalness: 0
        //     },
        //     postEffect: {
        //       enable: true
        //     },
        //     temporalSuperSampling: {
        //       enable: true
        //     },
        //     // light: {
        //     //   ambient: {
        //     //     intensity: 0
        //     //   },
        //     //   main: {
        //     //     intensity: 2,
        //     //     shadow: true
        //     //   },
        //     //   ambientCubemap: {
        //     //     texture: '',
        //     //     exposure: 1,
        //     //     diffuseIntensity: 0.2
        //     //   }
        //     // },
        //     viewControl: {
        //       animationDurationUpdate: 1000,
        //       animationEasingUpdate: 'cubicInOut',
        //       targetCoord: [116.46, 39.92],
        //       autoRotate: false
        //     }
        //   }
        // },
      }
    },
    mounted () {
      this.echartsGlobe();
      this.left_up_list = ChartData['topics'];
      this.right_up_list = ChartData['exports'][this.topic];
      this.options.right_down.option = ChartLib['事件演化朝鲜'].option;
      this.options.left_down.option = ChartLib['折线图' + this.topic].option;
    },
    created () {
      this.initOptions();
      this.intervalID = setInterval(() => {
        this.initOptions()
      }, 100 * 1000);

      setInterval(() => {
        if (this.topic_index === (3)) {
           this.topic_index = 0;
        };
        if (this.topic_index === 0) {
          this.around(63);
        } else {
          this.around(41);
        }
        this.clicking(this.topics[this.topic_index]);
        this.topic_index = this.topic_index + 1;
      }, 10000);
      // setInterval(function() {
      //   this.around();
      // }, 2000);

      this.intervalGlobe = setInterval(() => {
        if (this.globe) {
          this.globe.clear();
          this.echartsGlobe();
        }
      }, 1 * 60 * 60 * 1000);
      // console.log(Common.addr + '');
      // this.intervalRotate = setInterval(() => {
      //   this.rotate_globe()
      // }, 4 * 1000);
      axios.get('/api/getPageJump', {params: {}}).then(response => {
        // alert(response.data.page0.to)
        // eslint-disable-next-line no-unused-vars
        this.jumpto = response.data.page2.to;
        // let timer = setTimeout(function () { location.href = '../' + response.data.page1.to; } , response.data.page1.delay * 1000);
      });
    },
    methods: {
      goto: function () {
        // document.location.href = Common.addr + Common.page1;
      },
      initOptions: function () {
        axios.get('/api/getShowCharts').then(response => {
          _.each(response.data, (v, k) => {
            if (ChartLib[v]) {
              this.options[k].option = _.cloneDeep(ChartLib[v].option);
              this.options[k].update = ChartLib[v].update;
            }
          });
          this.updateData();
        });
      },
      clicking: function (term) {
        this.topic = term;
        this.right_up_list = ChartData['exports'][this.topic];
        this.options.left_down.option = ChartLib['折线图' + this.topic].option;
        this.options.right_down.option = ChartLib['事件演化' + this.topic].option;
        this.around(41);
      },
      findcountry: function (country) {
        var o;
        console.log(country);
        for (o in this.regions) {
          if (o.name === country) {
            return o;
          }
        }
      },
      updateData: function () {
        _.each(this.options, opt => {
          opt.update(opt.option);
        });
        this.update_globe_option();
      },
      echartsGlobe () {
        // 创建一个canvas类型的对象(mapChart)来作为地球的纹理(baseTexture)
        let canvas = document.createElement('canvas');
        let mapChart = echarts.init(canvas, null, {
            width: 2048,
            height: 1024
        });

        mapChart.setOption({
            backgroundColor: '#999',
            geo: {
                type: 'map',
                map: 'world',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                boundingCoords: [[-180, 90], [180, -90]],
                // silent: true,
                itemStyle: {
                    normal: {
                        borderColor: '#000'
                    }
                },
                label: {
                    normal: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 40
                        }
                    }
                }
            }
        });

        let globe_new_option = {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          globe: {
            baseTexture: mapChart,
            heightTexture: heightTexture.src,
            displacementScale: 0.1,
            shading: 'realistic',
            realisticMaterial: {
              roughness: 0.8,
              metalness: 0
            },
            postEffect: {
              enable: true
            },
            temporalSuperSampling: {
              enable: true
            },
            // light: {
            //   ambient: {
            //     intensity: 0
            //   },
            //   main: {
            //     intensity: 2,
            //     shadow: true
            //   },
            //   ambientCubemap: {
            //     texture: '',
            //     exposure: 1,
            //     diffuseIntensity: 0.2
            //   }
            // },
            viewControl: {
              autoRotateSpeed: 0,
              animationDurationUpdate: 1000,
              animationEasingUpdate: 'cubicInOut',
              targetCoord: [116.46, 39.92],
              autoRotate: true
            }
          }
        };
        this.globe = echarts.init(document.getElementById('echarts-globe'));
        this.globe.setOption(globe_new_option);
        this.regions = mapChart.getModel().getComponent('geo').coordinateSystem.regions;
        var geo;
        geo = mapChart.getModel().getComponent('geo').coordinateSystem;
        console.log("---------------------------------");
        console.log(this.regions);
        console.log(geo.getRegion('China'));
        console.log(geo.getRegion('Dem.Rep.korea'));
        console.log(geo.getRegion('朝鲜'));
        console.log(this.findcountry("Dem.Rep.korea"));
      },
      around (index) {
        // this.region = this.regions[Math.round(Math.random() * (this.regions.length - 1))];
        this.region = this.regions[index];
        this.globe.setOption({
          title: {
            left: 'center',
            top: 'center',
            text: this.region.name,
            textStyle: {
              fontSize: 40
            }
          },
          globe: {
            viewControl: {
              targetCoord: this.region.center
            }
          }
        });
        this.globe.setOption({
          geo: {
            regions: [{
              name: this.region.name,
              itemStyle: {
                normal: {
                  areaColor: '#444'
                }
              }
            }]
          }
        });
      },
      update_globe_option () {
        this.globe_t_option.globe.displacementScale = 0.1249;
        axios.get('/api/getAirway', {params: {
          from: Math.floor(new Date().getTime() / 1000) - 24 * 3600,
          to: Math.floor(new Date().getTime() / 1000),
        }}).then(response => {
          let cities = [];
          let lines = [];
          _.each(response.data, item => {
            cities.push({name: item.departure.CityName, value: item.departure.Coordinate});
            cities.push({name: item.destination.CityName, value: item.destination.Coordinate});
            lines.push([item.departure.Coordinate, item.destination.Coordinate]);
          });
          this.globe_t_option.series[0].data = cities; // _.uniqBy(cities, 'name');
          this.globe_t_option.series[1].data = lines;
          this.globe_t_option.globe.displacementScale = 0.125;
          if (this.globe) {
            this.globe.setOption(this.globe_t_option);
          }
          this.rotateCities = response.data;
        });
      },
      rotate_globe: function () {
        if (!_.isEmpty(this.rotateCities)) {
          let tmpx = Math.floor(this.nowCityIndex / 2);
          let tmpy = this.nowCityIndex % 2;
          // console.log(tmpx + "  " + tmpy + " length:" + this.rotateCities.length)
          // let centerl = [110, 33]
          let cantern = '铜仁'
          if (tmpy === 0) {
          //  centerl = this.rotateCities[tmpx].departure.Coordinate;
            cantern = this.rotateCities[tmpx].departure.CityName + ' -> ' + this.rotateCities[tmpx].destination.CityName;
          } else {
          //  centerl = this.rotateCities[tmpx].destination.Coordinate;
            cantern = this.rotateCities[tmpx].departure.CityName + ' -> ' + this.rotateCities[tmpx].destination.CityName;
          }
          this.nowCityIndex = this.nowCityIndex + 1;
          this.nowCityIndex = Math.floor(this.nowCityIndex / 2) >= this.rotateCities.length ? 0 : this.nowCityIndex;
          this.globe.setOption({
            title: {
              text: cantern
            },
            globe: {
              viewControl: {
                // targetCoord: centerl,
              },
            }
          });
        }
      }
    },
    beforeDestroy () {
      clearInterval(this.intervalID)
      clearInterval(this.intervalGlobe)
      clearInterval(this.intervalRotate)
    },
    components: {
      'Echarts': Echarts,
    }
  }
</script>

<style lang="sass">
  @import "~assets/sass/common"
  .con-box
    position: absolute
    width: 37%
    height: 45%
    padding: .7rem 1rem .8rem
    background-image: url("~assets/images/box-bg.png")
    background-size: 100% 100%
    z-index: 1000
    cursor: pointer
    &.l-t-box
      left: 2.5rem
      top: 2.5rem
    &.r-t-box
      right: 2.5rem
      top: 2.5rem
    &.l-b-box
      left: 2.5rem
      bottom: 2.5rem
    &.r-b-box
      right: 2.5rem
      bottom: 2.5rem
      .chart
        bottom: 100rem
        width: 100%
        height: 80%
  .center-box
    position: absolute
    left: 0rem
    top: 0rem
    width: 100%
    height: 100%
    z-index: 0
    .chart
      width: 100%
      height: 100%
      cursor: pointer
</style>
