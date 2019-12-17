<template>
  <div class="list-wrapper" ref="TableHeadWrapper">
    <!-- 使用DIV模拟Table布局 -->
    <div class="table list-table-head" :class="{tableHeadTop:scrolled}">
      <div class="table-tr">
        <!-- <div class="table-th td-index">序号</div> -->
        <div class="table-th td-type">内容分类</div>
        <div class="table-th td-title">标题</div>
        <div class="table-th td-date sorting" :class="sortingMap.time" @click="sortValues('time')">时间</div>
        <div class="table-th td-location">位置</div>
        <div class="table-th td-emotion">情绪</div>
        <div class="table-th td-sensitive sorting" :class="sortingMap.risk" @click="sortValues('risk')">风险度</div>
        <div class="table-th td-recommend sorting" :class="sortingMap.recommend" @click="sortValues('recommend')">推荐</div>
        <div class="table-th td-source" v-if='!isevent'>来源</div>
        <div class="table-th td-feedback" v-if='!isevent'>相关性标注</div>
      </div class="table-tr">
    </div>
    <div class="table table-striped list-table-body" >
        <div class="table-tr" v-for="(item, idx) in dispValues" :key="item.id">
          <!-- 正常列表 -->
          <div class="table-tr-row">
            <!-- <div class="table-td td-index">{{ idx + 1 }}</div> -->
            <div class="table-td td-type">{{ item.type0 | toLegacyType }}</div>
            <!-- <div class="table-td td-type">{{ item.type1 | toMinorType }}</div> -->
            <div class="table-td td-title" v-if='isevent'>
              <router-link class="title-link" :to="{name:'Event/Detail/Overall', params: {index: item.esIndex, eventId: item.id}}" target="_blank">
                {{ item.title }}
              </router-link>
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
            <div class="table-td td-date">{{ item.timestr }}</div>
            <div class="table-td td-location">{{ item.location }}</div>
            <div class="table-td td-emotion">{{ item.emotion | toEmotion }}</div>
            <div class="table-td td-sensitive">{{ Math.max(item.risk, 0) }}</div>
            <div class="table-td td-recommend">{{ Math.max(item.recommend, 0) }}</div>
            <div class="table-td td-source" v-if="!isevent">
              <span v-if="item.datatag === 'event'">
                <a class="event-link" :href="'#/event/detail/' + item.esIndex + '/' + item.id" target="_blank">演化分析</a>
              </span>
              <span v-else @click="moreSource(item)">
                {{ item.user }}
                <i v-if="item.simids && item.simids.length > 0" class="fa fa-chevron-down"></i>
              </span>
            </div>
            <div class="table-td td-feedback" v-if="!isevent">
              <div class="switch">
                <span class="fa fa-rotate-180"
                  :class="{
                    'fa-toggle-on': item.related,
                    'fa-toggle-off': !item.related
                  }"
                  @click="toggleItem(idx)"></span>
                <label class="toggle-label">不相关</label>
              </div>
            </div>
          </div>
          <!-- 更多列表 -->
          <div class="from-source" v-if="toggleSource == item.id" v-for="(subitem, idx) in sourceMore">
            <p class="sub-title"><a :href="subitem.url" target="_blank">{{ subitem.title }}</a></p>
            <p class="sub-date">{{ subitem.timestr }}</p>
            <p class="sub-source">{{ subitem.user }}</p>
            <p class="sub-related"></p>
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

import URLSearchParams from 'url-search-params'

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
      dispValues: [],
      sorting: 'time',
      sortingMap: { 'time': 'desc' },
    };
  },
  watch: {
    dispDatas: function (datas) {
      let xs = _.map(_.uniqBy(datas, 'id'), item => {
        // fix the time.
        let s = '' + new Date(item.time).getTime();
        if (_.startsWith(s, '2017')) {
          item.timestr = s.substring(4, 6) + '-' + s.substring(6, 8);
        } else {
          if (_.isInteger(item.time)) {
            item.timestr = new Date(item.time).format('MM-dd');
          } else {
            item.timestr = new Date(item.time.replace('+0000', 'Z')).format('MM-dd');
          }
        }

        if (item.eventLoc) {
          item.location = item.eventLoc;
        }
        if (item.eventId) {
          item.id = item.eventId;
        }
        if (item.risk > 0 && item.risk < 1) {
          item.risk = Math.round(item.risk * 100);
        }

        // fix the trend
        item.trend = item.type0 - 5; // TODO
        // fix the event's link and source
        if (item.datatag === 'event') {
          item.url = '#/event/detail/' + item.esIndex + '/' + item.id;
        }
        // Location去掉”中国“前缀
        if (_.startsWith(item.location, '中国')) {
          item.location = item.location.substring(2);
        }
        // 相关/不相关标注
        item.related = true;
        return item;
      });
      if (this.sorting) {
        this.dispValues = _.orderBy(xs, this.sorting, this.sortingMap[this.sorting]);
      } else {
        this.dispValues = xs;
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
        kind: 'daily',
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
    toggleItem (idx) {
      let item = this.dispValues[idx];
      item.related = !item.related;
      Vue.set(this.dispValues, idx, _.cloneDeep(item));
      this.setFieldValueAs(item.esIndex, item.id, 'type0', 0);
    },
    setFieldValueAs (esIndex, id, field, value) {
      const params = new URLSearchParams();
      params.append('esIndex', esIndex);
      params.append('id', id);
      params.append('field', field);
      params.append('value', value);
      params.append('type', 'int');
      axios.post('/api/cncert/source/setFieldValueAs', params.toString()).then(response => {
        console.log('success: set filed value as ... (' + esIndex + ', ' + id + '), ' + response.data);
      }).catch(error => {
        console.log(error);
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
      this.dispValues = _.orderBy(this.dispValues, this.sorting, this.sortingMap[this.sorting]);
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
@import "~assets/sass/common"

// special switch, double-orientated.
.switch
  font-size: 1.6rem;
  span.fa
    font-size: 2.0rem;
    cursor: pointer;
  .fa-toggle-on
    // color: rgba(255, 255, 255, .6)
    color: #2196f3
  .fa-toggle-off
    color: rgba(51, 204, 255, 1)

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
      &.sorting
        text-align: left
      &.td-index
        width: 5%
      &.td-type
        width: 10%
      &.td-title
        flex: 1
        // width: 46.6%
        text-align: left
      &.td-date
        width: 7%
        text-align: center
        &:before
          right: 18%
        &:after
          right: 8%
      &.td-emotion
        width: 5%
      &.td-location
        width: 7%
      &.td-sensitive
        width: 7%
      &.td-recommend
        width: 6%
      &.td-source
        width: 10%
      &.td-feedback
        width: 8%

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
        &.td-type
          width: 10%
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
            background: url('~assets/images/trend_icon.png') no-repeat center
            &.trend_asc
              background-position: 0 0
            &.trend_desc
              background-position: 0 -16px
          .title-link
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
        &.td-date
          width: 7%
          text-align: center
        &.td-emotion
          width: 5%
        &.td-location
          width: 7%
        &.td-sensitive
          width: 7%
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
        &.td-feedback
          width: 8%
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
          width: 29%
          text-align: left
        &.sub-source
          width: 10%
        &.sub-related
          width: 8%

a.event-link
  text-decoration: underline
  color: rgba(53, 76, 255, 0.9)

// 移动端隐藏多余表格内容
@media (max-width: 768px)
  .list-table-head
    .table-tr
      .td-index
        width: 14%!important
      .td-date
        text-align: center!important
        width: 18%!important
      .td-type, .td-emotion, .td-location, .td-sensitive, .td-recommend, .td-source, .td-feedback
        display: none
  .list-table-body
    .td-index
      width: 14%!important
    .td-date
      width: 18%!important
    .td-type, .td-emotion, .td-location, .td-sensitive, .td-recommend, .td-source, .td-feedback
      display: none!important
</style>
