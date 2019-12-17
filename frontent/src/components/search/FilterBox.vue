<template>
  <div class="search-row row form-horizontal">
    <!-- 时间选取功能只在PC端显示 -->
    <div class="col-md-3 date-wrapper">
      <label for="date-start" class="control-label date-label">起始时间：</label>
      <v-datepicker placeholder="选择日期" :value="searchInput.dateStart" :disabled="dateStartEnd" @selected="v => searchInput.dateStart = v"></v-datepicker>
    </div>
    <div class="col-md-3 date-wrapper">
      <label for="date-end" class="control-label date-label">结束时间：</label>
      <v-datepicker placeholder="选择日期" :value="searchInput.dateEnd" :disabled="dateEndStart"  @selected="v => searchInput.dateEnd = v"></v-datepicker>
    </div>
    <div class="col-md-2 search-btns">
      <!-- 以下提交按钮在PC端显示 -->
      <button class="search-title btn" @click="searchTitle">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Datepicker from 'components/datepicker/Datepicker'

  export default {
    props: {
      buttonText: {
        type: String,
        default () {
          return '搜索预警';
        }
      },
      searchInput: {
        type: Object,
        default () {
          return {
            dateStart: new Date().format('yyyy-MM-dd'),
            dateEnd: new Date().format('yyyy-MM-dd'),
            includeText: false,
          };
        }
      },
    },
    data () {
      return {
      };
    },
    computed: {
      dateStartEnd () {
        return { from: this.searchInput.dateEnd };
      },
      dateEndStart () {
        return { from: new Date(), to: this.searchInput.dateStart };
      },
    },
    methods: {
      searchTitle: function () {
        this.searchInput.includeText = true;
        this.$emit('update:searchInput', _.cloneDeep(this.searchInput));
      },
    },
    components: {
      'v-datepicker': Datepicker,
    }
  }
</script>

<style lang="sass">
.form-control
  font-size: 1.6rem
  line-height: 1.5rem
.search-row
  margin-bottom: 20px
  .search-wrapper
    position: relative
    .search-submit
      display: none
    label
      width: 28%
      padding: 7px 0 0 0px
      margin-bottom: 0
    select
      width: 60%
      height: 100% !important
  .search-ipt
    height: 100%
  .date-wrapper
    font-size: 1.6rem
    display: flex
    justify-content: space-around
    label
      display: inline-block
      width: 28%
      padding: 7px 0 0 0px
      margin-bottom: 0
  .search-btns
    display: flex
    justify-content: space-between
    button
      color: #fff
      font-size: 1.6rem
      margin-left: 10px
      background-color: #158bdc
      cursor: pointer
      &:hover
        background-color: #0a7ac9

@media (min-width:768px)
  .search-row
    .search-wrapper
      flex: 0 0 20%
    .date-wrapper
      flex: 0 0 28%
      max-width: 28%

@media (max-width:768px)
  .search-row
    .date-wrapper
      display: none
    .search-wrapper
      height: 44px
      .search-submit
        display: block
        position: absolute
        top: 0
        right: 10px
        height: 100%
        line-height: 1
        padding: 0 1.5rem
        font-size: 2.2rem
        border: none
        background-color: #00abff
        color: #fff
        border-radius: 0 .25rem .25rem 0
        outline: none
    .search-btns
      display: none
</style>
