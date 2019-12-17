<template>
  <div class="list-wrapper" ref="TableHeadWrapper">
    <div class="table list-table-head" :class="{tableHeadTop:scrolled}">
      <div class="table-tr">
        <!-- <div class="table-th td-index">序号</div> -->
        <div class="table-th td-title">标题</div>
        <div class="table-th td-date sorting" :class="sortingMap.time" @click="sortValues('time')">时间</div>
        <div class="table-th td-storage">入库时间</div>
        <div class="table-th td-emotion">情绪</div>
        <div class="table-th td-sensitive">突发指数</div>
        <div class="table-th td-source">用户来源</div>
      </div>
    </div>
    <div class="table table-striped list-table-body" >
      <div class="table-tr loading-tip" v-if="loading">加载中...</div>
      <div class="table-tr" v-for="(item, idx) in dispValues" :key="item.id">
        <!-- 正常列表 -->
        <div class="table-tr-row">
          <!-- <div class="table-td td-index">{{ idx + startIdx }}</div> -->
          <div class="table-td td-title">
            <a :href="item.url" class="title-link" target="_blank">{{ item.title }}</a>
          </div>
          <div class="table-td td-date">{{ item.timestr }}</div>
          <div class="table-td td-storage">{{ item.timestampstr }}</div>
          <div class="table-td td-emotion">{{ item.emotion | toEmotion }}</div>
          <div class="table-td td-sensitive">{{ item.secu }}</div>
          <div class="table-td td-source">
            <span @click="moreSource(item)">
              {{ item.username }}
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
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    'dispDatas': {
      type: Array,
      default () {
        return [];
      }
    },
    'start-idx': {
      type: Number,
      default () {
        return 1;
      }
    },
    'loading': {
      type: Boolean,
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
      sorting: 'time',
      sortingMap: { 'time': 'desc' },
      toggleSource: false,
      sourceMore: [],
    };
  },
  computed: {
    dispValues: function () {
      let xs = _.uniqBy(this.dispDatas, 'id');
      _.each(xs, item => {
        item.timestr = new Date(item.time).format('MM月dd日 hh:mm');
        // debugger
        if (item.timestamp) {
          item.timestampstr = new Date(item.timestamp).format('MM月dd日 hh:mm');
        }
      });
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
    moreSource (item) {
      this.sourceMore = [];
      if (this.toggleSource !== item.id) {
        if (item.sourceMore === undefined) {
          this.fetchSimitemsCb(item.id, more => {
            _.each(more, subitem => {
              subitem.timestr = new Date(subitem.time).format('MM-dd');
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
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  components: {
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/sass/common"

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
      &.td-type
        width: 8%
      &.td-title
        flex: 1
        // width: 46.6%
        text-align: left
      &.td-date
        width: 13%
        text-align: center
        &:before
          right: 18%
        &:after
          right: 8%
      &.td-storage
        width: 11%
      &.td-emotion
        width: 5%
      &.td-location
        width: 7%
      &.td-sensitive
        width: 8%
      &.td-recommend
        width: 5%
      &.td-source
        width: 10%

.loading-tip
  text-align: center
  line-height: 8rem

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
        &.sorting
          width: 5.8%!important
        &.td-index
          width: 5%
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
            &.trend_asc
              background-position: 0 0
            &.trend_desc
              background-position: 0 -16px
          .title-link
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
        &.td-date
          width: 13%
        &.td-storage
          width: 11%
        &.td-emotion
          width: 5%
        &.td-sensitive
          width: 8%
        &.td-source
          width: 10%
          vertical-align: middle
          position: relative
          display: flex
          text-align: left
          span
            text-overflow: ellipsis
            overflow: hidden
            white-space: nowrap
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
          padding-left: 65px
          flex: 1
        &.sub-date
          width: 17%
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
        text-align: left!important
        width: 18%!important
      .td-type, .td-emotion, .td-location, .td-storage, .td-sensitive, .td-recommend, .td-source
        display: none
  .list-table-body
    .td-index
      width: 14%!important
    .td-date
      width: 18%!important
    .td-type, .td-emotion, .td-location, .td-storage, .td-sensitive, .td-recommend, .td-source
      display: none!important
</style>
