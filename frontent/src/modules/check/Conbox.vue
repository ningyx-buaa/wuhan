<template>
      <div class="con-box">
        <div class="box-title">
          <span class="redman" v-show="info.isredman">嫌疑人</span>
          <h3>{{ info.title }}</h3>
        </div>
        <div class="box-left">
          <div class="box-box-l">
            <img class="portrait" :src="info.info_detail_portrait_image  | imagesplit"  width="100%" height="100%"/>
            <div class="info-detail">
              <p class="small"><i class="fa fa-user "></i> 姓名：<span>{{ info.info_detail_name | ellipsis }}</span></p>
              <p class="small"><i class="fa fa-intersex"></i> 性别：<span>{{ info.info_detail_sex }}</span></p>
              <p class="small"><i class="fa fa-flag"></i> 国籍：<span>{{ info.info_detail_nationality }}</span></p>
              <p class="small"><i class="fa fa-calendar"></i> 出生日期：<span>{{ info.info_detail_birthday }}</span></p>
              <p class="small"><i class="fa fa-drivers-license-o"></i> 护照号：<span>{{ info.info_detail_passportID }}</span></p>
              <p class="small"><i class="fa fa-id-card-o"></i> 身份证号：<span>{{ info.id_number }}</span></p>
              <p class="small"><i class="fa fa-plane"></i> 航班号：<span>{{ info.info_detail_flight }}</span></p>
              <p class="small"><i class="fa fa-suitcase"></i> 行李码：<span>{{ info.info_detail_luggage }}</span></p>
           </div>
          </div>
          <div class="box-box-l">
            <div class="notes">
              <span class="category">拦截原因</span>
              <p>{{ info.hold_reason }}</p>
            </div>
            <div class="notes">
              <span class="category">处置结果</span>
              <p>{{ info.hold_result }}</p>
            </div>
          </div>
        </div>
        <div class="box-right">
          <div class="box-box-r">
            <span class="hold-up">拦截图像 {{info.hold_time}}</span>
            <img :src="info.hold_image | imagesplit"  width="100%" height="100%"/>
          </div>
          <div class="box-box-r">
            <span class="hold-bottom">开包图像</span>
            <img :src="info.opencheck_image  | imagesplit"  width="100%" height="100%"/>
          </div>
        </div>
        <!-- <div class="chart" id="wordcloud"></div> -->
      </div>
</template>

<script type="text/ecmascript-6">
  // import Vue from 'vue'
  import 'components/charts/theme/Ring.js'
  import Graphic from 'echarts/lib/util/graphic'

  export default {
    // props: ['title'],
    props: {
      info: {
        type: Object,
        default: () => ({title: 'OK'})
      }
    },
    name: 'app',
    filters: {
      ellipsis (value) {
        if (!value) return ''
        if (value.length > 14) {
          return value.slice(0,14) + '...'
        }
        return value
      },
      imagesplit (value) {
        if (!value) return ''
        return value.split(',')[0];
      }
    },
    data () {
      return {
        intervalID: null,
        ttitle: 'sssssssss',
        isredman: true,
        // title: '敏感词云',
        info_detail_portrait_image: 'http://www.w3school.com.cn/i/eg_tulip.jpg',
        info_detail_name: '安倍',
        info_detail_sex: '',
        info_detail_nationality: '',
        info_detail_birthday: '',
        info_detail_passportID: '',
        info_detail_flight: '',
        info_detail_luggage: '',
        hold_reason: '',
        hold_result: '',
        hold_image: 'http://www.w3school.com.cn/i/eg_tulip.jpg',
        opencheck_image: 'http://www.w3school.com.cn/i/eg_tulip.jpg',
        newsdata: [{
          'title': '【重磅】2017 年中国进口葡萄酒海关数据新鲜出炉',
          'content': '据最新数据显示，2017 年，总额约为 27.89 亿美元，同比增长约 17.95%；总量约为 7.46 亿升，同比增长约 16.88%；平均约为 3.74 美元/升，同比增长 0.91%，幅度较小。 　　在总额和总量方面，2017 年度有一定增长，同 2016 较之 2015 年的增长幅度相似，显示出中国葡萄酒市场发展态势趋于平稳。平均价格自 2013 年起就逐年下降，2016 年和 2017 年虽有增长，但幅度均不明显，说明大众型葡萄酒仍是国内市场的主流。 　　接下来，本文将从瓶装葡萄酒、散装葡萄酒和起泡酒3大方面入手为你解读 2017 年中国进口葡萄酒状况。 　　注：本文所有数据均按进口总额高低排名 　　2017 年进口瓶装葡萄酒数据 　　2017 年，中国进口瓶装葡萄酒总额约 25.55 亿美元，同比上涨 16.38%；总量约 5.52 亿升，同比上涨 14.62%；平均价格为 4.63 美元/升，同比上升 1.54%。 　　（1）10 大瓶装葡萄酒来源国　　法国守住了进口瓶装葡萄酒来源国老大的地位，总额约为 10.5 亿美元，同比增长 8.84%，约占进口瓶装葡萄酒总额的 41.13%；总量约为 2.18 亿升，同比增长 14.05%，约占进口瓶装葡萄酒总量的 39.46%。显而易见，法国葡萄酒还是国民心中品质的象征。不过同比增长幅度比 2016 年要小一些，这也顺应了整个葡萄酒市场的平稳发展态势。 　　从均价来看，新西兰价格仍是最高，为 10.68 美元/升，这主要是由于新西兰地域较小，葡萄种植和酿造成本高，葡萄酒本身就定位为精品酒。均价最低的还是西班牙，为 2.21 美元/升。不过，两国均价相比 2015 年都有小幅上升。 　　此外，10 大瓶装葡萄酒来源国与 2016 年一样，且前 6 名和2016年保持一致，后几名名次略有变动，这说明中国人对这 10 大国家的精品葡萄酒比较信赖和关注。 　　（2）10 大进口瓶装葡萄酒贸易地区　　虽然上海市比广东省的进口总量还要多，但广东省依然稳坐进口瓶装葡萄酒的贸易龙头位置，其进口额高约 9.10 亿美元，几乎比上海进口额多了1.74亿。整体而言，广东和上海依旧是瓶装进口葡萄酒的主要贸易区，两者加起来的总值已经占到总额的 64.41% 和总量的 52.86% 左右。 　　整体排名与 2016 年无大差别，部分保持不动，其它多半只有一个名次的升降，唯有北京从 2016 年的第3降到了今年的第5。同比2016年，仅有北京的进口总额和总量均呈下降趋势，此外广东的进口总额也有所下降。 　　2017 年进口散装葡萄酒数据 　　2017 年，中国进口散装葡萄酒总额约 1.59 亿美元，同比增长 40.80%；总量约 1.81 亿升，同比上升 25.51%；平均价格为 0.88 美元/升，同比上涨 12.18%。 　　（1）10 大散装葡萄酒来源国　　2017 年中国散装葡萄酒最大来源国依然是智利，进口金额约为 6,012 万美元，同比上升 4.66%，约占散装葡萄酒总额的 37.84%；进口总量约 5,606 万升，同比下降 34.71%，约占散装葡萄酒总量的 31.05%。虽然总量下降，但总额却上升了，可见智利葡萄酒并不是一贯认为的“低端”代名词。 　　从均价来看，加拿大最高，为5.19 美元/升，远高于其它国家，也远高于2016年的最高均价意大利（3.18美元/升）。均价最低的并非2016年的南非（0.53 美元/升），而是葡萄牙，为 0.48 美元/升。 　　排名的 10 个国家与 2016 年一样，只是名次有小许变化，如从2016年的美法南到2017年的法南美，还有德国和加拿大互换名次等。 　　（2）10 大进口散装葡萄酒贸易地区　　山东继续蝉联进口散装葡萄酒最大的贸易地区，2017 年进口总额约 1.10 亿美元，同比增长 66.01%，占散装葡萄酒总额的 69.31%；总量约 1.28 亿升，同比增长 36.82%，占散装葡萄酒总量的71.05%。也就是说山东省 2016 年就消耗/转手了全国一半多的进口散装葡萄酒。 　　整体排名与 2016 年相比，有一定差异，除了山东和北京名次一样外，其余8个地区都有一定幅度的升降。 　　2017 年进口起泡酒数据 　　2017 年，中国进口起泡酒总额约 7,527 万美元，同比上升 33.03%；总量约 1,311 万升，同比上升 4.57%；平均价格为 5.74美元/升，同比上升 27.22%。 　　（1）10 大进口起泡酒来源国　　从进口总额来看，法国还是最大的进口起泡酒来源国，进口总额约 4,038 万美元，同比上升 57.36%；总量约 216 万升，同比上升 26.56%。可见，光是法国起泡酒在进口总量和总额两方面的上升，就带动了整个起泡酒在 2017 年进口量和进口额的上升。 　　值得一提的是，在进口总额上，法国高于意大利；但在进口总量上，意大利明显更高，这导致两者的均价相差悬殊。这和法国主要生产高质高价香槟有关，因而价格普遍高于意大利起泡酒；当然，这也从侧面反映了意大利起泡酒性价比更高，更受中国消费者喜爱。 　　从均价方面，法国最高，为 18.68 美元/升，最低依然是西班牙，为 2.33 美元/升。 　　从排名来看，前7名和2016年保持一致，新西兰强势上榜，并把阿根廷（2016年排第8）挤出了前10之列。这和新西兰葡萄酒价高不无关系，因为同新西兰瓶装酒一样，新西兰起泡酒均价也较高，达到了8.66美元/升，在前10中位居第2。 　　（2）10 大进口起泡酒贸易地区　　与前 2 年一样，上海依然是全国消费进口起泡酒最多的地方，总额约 4,901 万美元，同比上升 50.63%；总量约 633 万升，同比上升19.51%。 　　总体来看，北上广仍是起泡酒的主要消费地区，其中以上海尤为突出，这主要是因为这些一线城市对以时尚而著称的起泡酒接纳度更高。此外，河南代替四川排在第10，其余名次略有升降。 　　酒百科总结 　　（1）整体来看，2017 年中国进口葡萄酒在总额、总量和均价上都比 2016 年有一定幅度的增长，可见葡萄酒在中国的普及度越来越高，国人对葡萄酒更深的认识和了解直接体现在了对葡萄酒的消费需求上，均价的小幅提高也说明对葡萄酒的品质/性价比要求越来越高。 　　（2）从进口葡萄酒总额来看，2017 年达到 27.89 亿美元，同比增长 17.95%。其中，瓶装葡萄酒占 91.60%，散装葡萄酒占 5.70%，起泡酒占 2.70%，再次体现出瓶装葡萄酒是主流。 　　（3）从进口葡萄酒总量来看，2017 年达到 7.46 亿升，同比增长 16.88%。其中，瓶装葡萄酒占 74.03%，散装葡萄酒占 24.21%，起泡酒占 1.76%，显而易见，瓶装葡萄酒还是进口葡萄酒中的中流砥柱。 　　（4）从进口葡萄酒均价来看，2017 年为 3.74 美元/升，同比增长 0.91%，其中瓶装葡萄酒、散装葡萄酒和起泡酒的均价都小幅下跌，说明国人越来越注重葡萄酒的性价比，而不是一味追求高价。 　　（5）从瓶装葡萄酒均价来看，排在前 5 位的分别是：新西兰（10.68 美元/升）、美国（7.85 美元/升）、澳大利亚（6.45美元/升）、法国（4.82 美元/升）和意大利（4.72 美元/升）。 　　（6）西班牙葡萄酒具有非常大的价格优势，在瓶装葡萄酒输出国中，其均价最低，为 2.21 美元/升，在散装葡萄酒输出国中，其均价仅比葡萄牙要高，为 0.58 美元/升，在起泡酒中，均价也是最低，为 2.33 美元/升。 　　（7）从进口葡萄酒来源国来看，法国和智利分别站稳了瓶装葡萄酒和散装葡萄酒最大来源国的地位，两者也是中国进口葡萄酒的主要来源国。法国主要得益于其高品质和品牌推广，而智利主要是价格方面的优势。 　　（8）从进口葡萄酒贸易地区来看，北上广等沿海一线城市还是消费主力军，广东消费瓶装酒最多，山东消费散装酒最多，上海消费起泡酒最多，跟前几年的情况无异。得益于较高的消费水平和葡萄酒普及程度，这些城市更易接受不同的葡萄酒消费。当然，葡萄酒在内陆的消费也有所增长，但相对沿海城市要缓慢一些。 　　（9）值得一提的是，在进口瓶装葡萄酒贸易地区中，广东比上海的进口量要低，但广东省的进口额更高，达到 9.10 亿美元，几乎比上海进口额多了1.74亿，这显示出广东人对瓶装葡萄酒的品质要求更高，当然这里也是沿海极具代表性的精品葡萄酒消费市场，前景可观。 　　（10）进口葡萄酒成本上涨是2017年底热议的话题，根据海关数据，2017年进口葡萄酒中，不论是瓶装酒、散装酒还是起泡酒，进口额涨幅都高于进口量的涨幅，极有可能是受2017年天气原因和葡萄减产影响。',
          'ID': 0,
          'keyword': '垃圾 团伙 成品油 柬埔寨 专项',
          'date': '2018-01-30 00:00:00'
        }], // b-carousel请求的数据不能是空数组，会导致typeIdex无法设置
        slide: 0,
        sliding: null,
        items: ['新年快乐', '新年快乐，上线顺利'],
      };
    },
    watch: {
    //   words: function (words) {
    //     WordCloud.cloud('wordcloud', words);
    //   }
    },
    created () {
    //   this.updateData()
    //   this.intervalID = setInterval(() => {
    //     this.updateData()
    //   }, 5 * 60 * 1000);
    //   axios.get('/api/getPageJump', {params: {}}).then(response => {
    //     // alert(response.data.page0.to)
    //     // eslint-disable-next-line no-unused-vars
    //     let timer = setTimeout(function () { location.href = '../' + response.data.page3.to; } , response.data.page3.delay * 1000);
    //   })
    },
    mounted () {
    //   WordCloud.cloud('wordcloud', this.words); // initial word cloud at start.
    },
    methods: {
    //   goto () {
    //     document.location.href = Common.addr + Common.page3;
    //   },
    //   onSlideStart (slide) {
    //     this.sliding = true
    //   },
    //   onSlideEnd (slide) {
    //     this.sliding = false
    //   },
    //   updateData () {
    //     this.update_top_option();
    //     this.update_bottom_option();
    //     this.update_right();
    //     this.update_word_cloud_option();
    //   },
    //   update_top_option () {
    //     axios.get('/api/getCount').then(response => {
    //       this.top_option.xAxis.data = _.isUndefined(response.data.Date) ? this.top_option.xAxis.data : response.data.Date;
    //       this.top_option.series[0].data = _.isUndefined(response.data.count) ? this.top_option.series[0].data : response.data.count;
    //     });
    //   },
    //   update_bottom_option () {
    //     axios.get('/api/getViewPoint').then(response => {
    //       let legendData = [];
    //       let dataValue = [];
    //       var total_num = _.sumBy(response.data, function (item) { return item.value })
    //       _.each(response.data, function (item, index) {
    //         if (item.name.indexOf('暂无关键词') === -1) {
    //           let keywords = item.name + (item.value / total_num).toFixed(2).toString();
    //           legendData.push(keywords);
    //           dataValue.push({value: item.value, name: keywords, text: item.docs});
    //         }
    //       });
    //       this.bottom_option.legend.data = legendData;
    //       this.bottom_option.series[0].data = dataValue;
    //     });
    //   },
    //   update_word_cloud_option () {
    //     axios.get('/api/getWordCloud').then(response => {
    //       let sizes = _.map(response.data, item => parseInt(item.value));
    //       let max = _.max(sizes);
    //       let min = _.min(sizes);
    //       let words = {};
    //       _.each(response.data, item => {
    //         words[item.name] = (parseInt(item.value) - min) / (max - min + 1) * 50 + 25;
    //       })
    //       this.words = words;
    //     });
    //   },
    //   update_right () {
    //     axios.get('/api/getNews').then(response => {
    //       this.activeNewsIndex = 0;
    //       if (response.data.length > 0) {
    //         this.newsdata = response.data;
    //       }
    //     });
    //   },
    },
    beforeDestroy () {
      clearInterval(this.intervalID)
      clearInterval(this.intervalAc)
    },
    components: {
    },
  }
</script>

<style lang="sass">
//   @import "~assets/sass/common"

    #div1
      position: relative
      width: height
      height: 80%

    #div1 a
      position: absolute
      top: 0px
      left: 0px
      font-family: Microsoft YaHei
      color: #0b85ff
      font-weight: bold
      text-decoration: none
      padding: 3px 6px
      &:hover
        color: red

    #div1 .blue
      color: blue
    #div1 .red
      color: red
    #div1 .yellow
      color: yellow

  .con-left
    float: left
    width: 49%
    height: 100%
    // padding: 1rem 1rem .8rem
    // background-image: url("~assets/images/page3-right-bg.png")
    background-size: 100% 100%
    overflow-y: hidden
    font-size: 1rem

  .con-box
    height: 48%
    padding: .7rem 1rem .8rem
    background-image: url("~assets/images/page3-left-bg.png")
    background-size: 100% 100%
    cursor: pointer
    &:first-child
      margin-bottom: 4%
    .box-title
      position: relative
      .redman
        position: absolute
        font-size: 22px
        left: 0
        top: 0
        display: inline-block
        // border-radius: 5px
        color: #fff
        padding: 3px 18px
        background-color: #e63c3cc9
        margin-right: 2.2rem
        text-shadow: 1px 1px 1px #222
        // background-image: url("~assets/images/tag-bg.png")
        background-size: 100% 100%
        // border: 2px solid #fff
        &:before
          position: absolute
          right: -.8rem
          top: 0.02rem
          content: ""
          display: block
          width: 1.8rem
          height: 1.9rem
          border-radius: 50%
          background-color: #b93845
    .box-left
      width: 49%
      float: left
      height: 100%
      .box-box-l
        height: 42%
        width: 100%
        overflow: hidden
        padding: 2%
        margin: 2%
        margin-left: 0
        background: rgba(32, 82, 211, 0.4);
        .portrait
          width: 49%
          height: 100%
          float: left
        .info-detail
          width: 49%
          height: 100%
          float: right
          color: #fff
          font-size: .7rem
          .small
            margin: 0
        .notes
          height: 50%
          font-size: 0.6rem
          color: #fff
          .category
            position: relative
            display: inline-block
            // border-radius: 5px
            color: #fff
            padding: 3px 3px
            background-color: #e63c3c
            margin-right: 2.2rem
            text-shadow: 1px 1px 1px #222
            // background-image: url("~assets/images/tag-bg.png")
            background-size: 100% 100%
            // border: 2px solid #fff
    .box-right
      width: 49%
      float: right
      height: 100%
      .box-box-r
        position: relative
        height: 42%
        width: 100%
        overflow: hidden
        margin: 2%
        margin-left: 0
        background: rgba(32, 82, 211, 0.4);
        .hold-up
          position: absolute
          font-size: 0.6rem
          left: 0
          top: 0
          display: inline-block
          // border-radius: 5px
          color: #fff
          padding: 3px 3px
          background-color: #e63c3cc9
          margin-right: 2.2rem
          text-shadow: 1px 1px 1px #222
          // background-image: url("~assets/images/tag-bg.png")
          background-size: 100% 100%
          // border: 2px solid #fff
        .hold-bottom
          position: absolute
          font-size: 0.6rem
          left: 0
          bottom: 0
          display: inline-block
          // border-radius: 5px
          color: #fff
          padding: 3px 23px
          background-color: rgba(32, 82, 211, 0.7);
          margin-right: 2.2rem
          text-shadow: 1px 1px 1px #222
          // background-image: url("~assets/images/tag-bg.png")
          background-size: 100% 100%
          // border: 2px solid #fff
  h3
    color: #ffffff
    font-size: 22px
    font-weight: bold
    text-align: center
    margin-bottom: 0
    background: rgba(32, 82, 211, 0.4);
    height: 40px;
    line-height: 40px;
    overflow: hidden;
  // .portrait
  //   height: 50%

  .con-right
    float: right
    width: 49%
    height: 100%
    // padding: 1rem 1rem .8rem
    // background-image: url("~assets/images/page3-right-bg.png")
    background-size: 100% 100%
    overflow-y: hidden
    font-size: 1rem
</style>
