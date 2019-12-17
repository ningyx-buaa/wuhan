<template>
  <div class="list-wrapper" ref="TableHeadWrapper">
    <!-- 使用DIV模拟Table布局 -->
    <div class="table list-table-head" :class="{tableHeadTop:scrolled}">
      <div class="table-tr">
        <div class="table-th td-index">序号</div>
        <div class="table-th td-expert" v-if="!isevent">专家</div>
        <div class="table-th td-title">标题</div>
        <div class="table-th td-date sorting" :class="sortingMap.time"  @click="sortValues('time')">时间</div>
        <div class="table-th td-location" v-if="_.has(dispValues[0], 'location')">位置</div>
        <div class="table-th td-hot sorting" :class="sortingMap.hot" @click="sortValues('hot')">热度</div>
        <div class="table-th td-emotion">情绪</div>
        <div class="table-th td-sensitive sorting" :class="sortingMap.secu" @click="sortValues('secu')">敏感</div>
        <div class="table-th td-recommend sorting" :class="sortingMap.recommend" @click="sortValues('recommend')">推荐</div>
        <div class="table-th td-source">来源</div>
      </div class="table-tr">
    </div>
    <div class="table table-striped list-table-body" >
        <div class="table-tr" v-for="(item, idx) in dispValues" :key="item.id">
          <!-- 正常列表 -->
          <div class="table-tr-row">
            <div class="table-td td-index">{{ idx + 1 }}</div>
            <div class="table-td td-expert" v-if="!isevent">{{ item.holder }}</div>
            <!-- <div class="table-td td-type">{{ item.type1 | toMajorType }}</div> -->
            <div class="table-td td-title" v-if='isevent'>
              <a class="title-link" :href="item.url" target="_blank">
                {{ item.title }}
              </a>
            </div>
            <div class="table-td td-title" v-else>
              <span v-b-model.modaltrend
                    class="trend"
                    title="查看详情"
                   :class="{ 'trend_asc': item.trend > 0, 'trend_desc': item.trend <= 0 }"
                   @click="viewTrendGraph(item.id, item.title, item.time)">
              </span>
              <a :href="item.url" class="title-link" target="_blank">{{ item.title }}</a>
            </div>
            <div class="table-td sorting td-date">{{ item.timestr }}</div>
            <div class="table-td td-location" v-if="_.has(item, 'location')">{{ item.location }}</div>
            <div class="table-td td-hot">{{ item.hot }}</div>
            <div class="table-td td-emotion">{{ item.emotion | toEmotion }}</div>
            <div class="table-td td-sensitive sorting">{{ _.has(item, 'sensitive') ? Math.max(item.sensitive, 0) : Math.max(item.secu, 0) }}</div>
            <div class="table-td td-recommend sorting">{{ item.recommend }}</div>
            <div class="table-td td-source">
              <span @click="moreSource(item)">
                {{ item.user }}
              </span>
              <i v-if="item.simids && item.simids.length > 0" class="fa fa-chevron-down"></i>
            </div>
          </div>
          <!-- 更多列表 -->
          <div class="from-source" v-if="toggleSource == item.id" v-for="(subitem, idx) in sourceMore">
            <p class="sub-title"><a :href="subitem.url" target="_blank">{{ subitem.title }}</a></p>
            <p class="sub-date">{{ subitem.timestr }}</p>
            <p class="sub-source">{{ subitem.user }}</p>
          </div>
        </div>
    </div>
    <b-modal id="modaltrend" size="lg" :title="viewtitle">
      <div class="chart">
        <Echarts theme="ring" :resizable="true" :option="trend_option" :loading="loading.trend" :loadingOpts="{ text: '加载中...' }"></Echarts>
      </div>
      <footer slot="modal-footer"></footer>
    </b-modal>
  </div>
</template>

<script type="text/ecmascript-6">

import Vue from 'vue'
import VBModal from 'bootstrap-vue/es/directives/modal/modal'
Vue.directive('b-model', VBModal);

import Echarts from 'vue-echarts-v3/src/lite.js'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

export default {
  props: {
    'dispDatas': {
      type: Array,
      default () {
        return [];
      }
    },
    'fetchSimitemsCb': {
      type: Function,
      default () {
        return [];
      }
    },
    'isevent': {
      type: Boolean,
      default () {
        return false;
      }
    }
  },
  data () {
    return {
      scrolled: false,
      toggleSource: false,
      sourceMore: [],
      sorting: 'time',
      sortingMap: { 'time': 'desc' },
      viewtitle: '',
      loading: { trend: true },
      trend_option: {
        title: {
          text: '热度趋势图',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          name: '时间',
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          name: '热度',
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '热度',
            type: 'line',
            data: [],
          },
        ]
      },
    };
  },
  computed: {
    dispValues: function () {
      let xs = _.map(this.dispDatas, item => {
        let s = '' + new Date(item.time).getTime();
        if (_.startsWith(s, '2017')) {
          item.timestr = s.substring(4, 6) + '-' + s.substring(6, 8);
        } else {
          item.timestr = new Date(item.time.replace('+0000', 'Z')).format('MM-dd');
        }
        item.trend = item.type0 - 5; // TODO
        return item;
      });
      // debugger
      if (this.sorting) {
        return _.orderBy(xs, this.sorting, this.sortingMap[this.sorting]);
      } else {
        return xs;
      }
    },
  },
  methods: {
    handleScroll () {
      // 当页面滚动超过当前元素距视口顶部的距离时，表格头置顶
      var topHeight = this.$refs.TableHeadWrapper.offsetTop;
      this.scrolled = window.scrollY > topHeight;
    },
    moreSource (item) {
      this.sourceMore = [];
      if (this.toggleSource !== item.id) {
        if (item.sourceMore === undefined) {
          this.fetchSimitemsCb(item.id, more => {
            _.each(more, subitem => {
              let s = '' + new Date(subitem.time).getTime();
              if (_.startsWith(s, '2017')) {
                subitem.timestr = s.substring(4, 6) + '-' + s.substring(6, 8);
              } else {
                subitem.timestr = new Date(subitem.time).format('MM-dd');
              }
            })
            item.sourceMore = more;
            this.sourceMore = more;
          });
        } else {
          this.sourceMore = item.sourceMore;
        }
        this.toggleSource = item.id;
      } else {
        this.toggleSource = false;
      }
    },
    viewTrendGraph (id, text, time) {
      this.viewtitle = text;
      this.loading.trend = true;
      axios.get('/api/cache3/source/fetchTrendById', {params: {
        id: id,
        text: text,
        kind: 'hour',
        time: new Date(time).format('yyyy-MM-ddThh:mm:ss.000+0800'),
      }}).then(response => {
        this.loading.trend = false;
        let dates = _.map(_.keys(response.data), date => {
          return new Date(date).format('dd日hh时');
        });
        let values = _.values(response.data);
        this.trend_option.xAxis.data = dates;
        this.trend_option.series[0].data = values;
      });
    },
    sortValues: function (sorting) {
      this.sorting = sorting;
      if (this.sortingMap[this.sorting]) {
        if (this.sortingMap[this.sorting] === 'asc') {
          this.sortingMap[this.sorting] = 'desc';
        } else {
          this.sortingMap[this.sorting] = 'asc';
        }
      } else {
        let x = {};
        x[this.sorting] = 'desc';
        this.sortingMap = x; // only change the sortingMap once.
      }
    },
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  components: {
    'Echarts': Echarts,
  }
}
</script>

<style lang="sass" scoped>
.form-control
  font-size: 1.6rem
.list-wrapper
  width: 100%
  margin-bottom: 1rem
.list-table-head
  width: 1170px
  position: relative
  top: 0
  margin-bottom: 0
  z-index: 99
  white-space: nowrap
  &.tableHeadTop
    position: fixed
  .table-tr
    display: flex
    .table-th
      background-color: #158bdc
      border-bottom: none
      border-top: none
      text-align: center
      color: #fff
      position: relative
      padding: .75rem
      &.td-index
        width: 5%
      &.td-expert
      	width: 8%
      &.td-type
        width: 8%
      &.td-title
        flex: 1
        // width: 46.6%
        text-align: left
      &.td-date
        width: 9%
        text-align: center
        &:before
        	right: 20%
        &:after
          right: 12%
      &.td-hot
        width: 6%
        &:before
          right: 10%
        &:after
          right: 0%
      &.td-emotion
        width: 5%
      &.td-location
        width: 10%
      &.td-sensitive
        width: 6%
        &:before
          right: 10%
        &:after
          right: 0%
      &.td-recommend
        width: 6%
        &:before
          right: 10%
        &:after
          right: 0%
      &.td-source
        width: 10%

.chart
  width: 750px
  height: 400px

@media (max-width: 768px)
  .list-table-head
    width: 100%
    &.tableHeadTop
      width: calc(100% - 30px)
  .chart
    width: 100%
    height: 400px
.list-table-body
  &.table-striped tbody tr:nth-of-type(odd)
    background-color: rgba(0, 0, 0, 0.03)
  .table-tr
    &:nth-child(even)
      background-color: #f1f1f1
    .table-tr-row
      display: flex
      .table-td
        padding: .75rem
        text-align: center
        border-top: none
        border-bottom: 1px solid #eceeef
        text-overflow: ellipsis
        white-space: nowrap
        overflow: hidden
        display: inline-block
        &.td-index
          width: 5%
        &.td-expert
      		width: 8%
        &.td-type
          width: 8%
        &.td-title
          flex: 1
          display: flex
          text-align: left
          align-items: center
          .trend
            flex: none
            width: 18px
            height: 16px
            line-height: 24px
            margin-right: .5rem
            cursor: pointer
            background: url('~assets/image/trend_icon.png') no-repeat center
            background-position: 0 0
            &.trend_asc
              background-position: 0 0
            &.trend_desc
              background-position: 0 -16px
          .title-link
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
        &.td-date
          width: 9%
          text-align: center
        &.td-emotion
          width: 5%
        &.td-location
          width: 10%
        &.td-hot
        	width: 6%
        &.td-sensitive
          width: 6%
        &.td-recommend
          width: 6%
        &.td-source
          width: 10%
          vertical-align: middle
          position: relative
          cursor: pointer
          display: flex
          align-items: center
          justify-content: center
          span
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            margin-right: 2px
            // &:hover
            //   color: #00abff
          .fa
            flex: none
            font-size: 12px
    .from-source
      display: flex
      background-color: #ebf9ff
      border-bottom: 1px solid #e4e4e4
      p
        padding: .8rem
        margin-bottom: 0
        text-align: center
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        &.sub-title
          text-align: left
          padding-left: 160px
          flex: 1
        &.sub-date
          width: 30.7%
          text-align: left
        &.sub-source
          width: 10%
// 移动端隐藏多余表格内容
@media (max-width: 768px)
  .list-table-head
    .table-tr
      .td-index
        width: 14%!important
      .td-date
        text-align: center!important
        width: 18%!important
      .td-type, .td-emotion, .td-location, .td-sensitive, .td-recommend, .td-source
        display: none
  .list-table-body
    .td-index
      width: 14%!important
    .td-date
      width: 18%!important
    .td-type, .td-emotion, .td-location, .td-sensitive, .td-recommend, .td-source
      display: none!important
</style>
