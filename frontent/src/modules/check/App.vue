<template>
  <div id="app" class="real-body">
    <h2 class="ct">查验现场实时监控</h2>
    <div class="con-left">
      <Conbox :info="info0"></Conbox>
      <Conbox :info="info1"></Conbox>
    </div>
    <div class="con-right">
      <Conbox :info="info2"></Conbox>
      <Conbox :info="info3"></Conbox>
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
  // import Vue from 'vue'
  import 'components/charts/theme/Ring.js'
  // import Graphic from 'echarts/lib/util/graphic'
  // import Echarts from 'vue-echarts-v3/src/full.js'
  // import 'echarts-wordcloud'
  // import bCarousel from 'bootstrap-vue/es/components/carousel/carousel'
  // import bCarouselSlide from 'bootstrap-vue/es/components/carousel/carousel-slide'
  import Common from 'components/Common.js'

  import Conbox from './Conbox.vue'

  export default {
    name: 'app',
    data () {
      return {
        intervalID: null,
        jumpto: 'page2',
        intervalAc: null,
        info: {
          title: 'test',
          isredman: false,
          // title: '敏感词云',
          info_detail_portrait_image: '',
          info_detail_name: '安倍',
          info_detail_sex: '',
          info_detail_nationality: '',
          info_detail_birthday: '',
          info_detail_passportID: '',
          info_detail_flight: '',
          info_detail_luggage: '',
          hold_reason: '',
          hold_result: '',
          hold_time: '2019-01-24 00:00:00',
          hold_image: '',
          opencheck_image: '',
          id_number: '210xxx'
        },
        info0: {},
        info1: {},
        info2: {},
        info3: {},
        resData: [],
        interIndex: 0
      };
    },
    watch: {
      // infos: function (infos) {
      //   // WordCloud.cloud('wordcloud', words);
      // }
    },
    created () {
      this.updateData('start');
      this.info0 = _.cloneDeep(this.info);
      this.info1 = _.cloneDeep(this.info);
      this.info2 = _.cloneDeep(this.info);
      this.info3 = _.cloneDeep(this.info);
      this.intervalID = setInterval(() => {
        this.updateData()
      }, 1 * 60 * 1000);
      this.intervalAc = setInterval(() => {
        this.updatePageData()
      }, 1 * 10 * 1000);
      axios.get('/api/getPageJump', {params: {}}).then(response => {
      //   // alert(response.data.page0.to)
      //   // eslint-disable-next-line no-unused-vars
        this.jumpto = response.data.check.to;
        let timer = setTimeout(function () { location.href = '../' + response.data.check.to; } , response.data.check.delay * 1000);
      })
    },
    mounted () {
      // WordCloud.cloud('wordcloud', this.words); // initial word cloud at start.
    },
    methods: {
      goto () {
        // document.location.href = Common.addr + Common.page3;
      },
      updateData (isStart) {
        axios.get('/api/getInterceptingOpen', {}).then(response => {
          if (!_.isEmpty(response.data)) {
            this.resData = response.data;
          }
          if (isStart === 'start') {
            this.updatePageData();
          }
        })
      },
      updatePageData () {
        if (this.interIndex * 4 + 0 < this.resData.length) {
          this.info0 = _.cloneDeep(this.resData[this.interIndex * 4 + 0]);
        }
        if (this.interIndex * 4 + 1 < this.resData.length) {
          this.info1 = _.cloneDeep(this.resData[this.interIndex * 4 + 1]);
        }
        if (this.interIndex * 4 + 2 < this.resData.length) {
          this.info2 = _.cloneDeep(this.resData[this.interIndex * 4 + 2]);
        }
        if (this.interIndex * 4 + 3 < this.resData.length) {
          this.info3 = _.cloneDeep(this.resData[this.interIndex * 4 + 3]);
        }
        this.interIndex = (this.interIndex + 1) % 3;
      },
    },
    beforeDestroy () {
      clearInterval(this.intervalID)
      clearInterval(this.intervalAc)
    },
    components: {
      Conbox,
    },
  }
</script>

<style lang="sass">
  @import "~assets/sass/common"

  // #wordcloud
  //   height: calc(100% - 30px)
  //   width: 100%
  //   overflow-y: hidden

  //   #div1
  //     position: relative
  //     width: height
  //     height: 80%

  //   #div1 a
  //     position: absolute
  //     top: 0px
  //     left: 0px
  //     font-family: Microsoft YaHei
  //     color: #0b85ff
  //     font-weight: bold
  //     text-decoration: none
  //     padding: 3px 6px
  //     &:hover
  //       color: red

  //   #div1 .blue
  //     color: blue
  //   #div1 .red
  //     color: red
  //   #div1 .yellow
  //     color: yellow

  .real-body
    overflow-y: hidden;

  .con-left
    float: left
    width: 49%
    height: 100%
    // padding: 1rem 1rem .8rem
    // background-image: url("~assets/images/page3-right-bg.png")
    background-size: 100% 100%
    // overflow-y: hidden
    font-size: 1rem

  .con-box
    height: 50%
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

  h2
    color: #ffffff
    font-size: 30px
    font-weight: bold
    text-align: center
  //  margin-bottom: 0
  //  background: rgba(32, 82, 211, 0.4);
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
    // overflow-y: hidden
    font-size: 1rem
</style>
