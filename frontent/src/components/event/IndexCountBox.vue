<template>
  <div class="col-md-3 col-sm-6">
    <div class="r-panel index-panel">
      <Echarts :option="pie_option" className="chart"></Echarts>
      <div class="content">
        <h3>{{ name }}</h3>
        <p>
          <i class="fa fa-level-up" v-if="update >= 0"></i>
          <i class="fa fa-level-down" v-else></i>
          {{ Math.abs(update) }}
          <span class="percent">%</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import Vue from 'vue'
import Echarts from 'vue-echarts-v3/src/lite'
import 'echarts/lib/chart/pie'

Vue.filter('formatNum', function (num) {
  if (num <= 1000000) {
    return num.toLocaleString('en');
  } else if (num <= 100000000) {
    return (num / 1000).toFixed(0).toLocaleString('en') + '万';
  } else {
    return (num / 100000000).toFixed(2).toLocaleString('en') + '亿';
  }
});

const valueLabel = {
  normal: {
    show: true,
    formatter: '{c}',
    position: 'center',
    textStyle: {
      fontSize: '28',
      fontWeight: 'bold'
    }
  }
};
const otherLabel = {
  normal: {show: false},
  emphasis: {show: false}
};

export default {
  props: {
    name: {
      required: true,
    },
    value: {
      required: true,
    },
    count: {
      default: 64,
    },
    update: {
      default: 0,
    },
    frontcolor: {
      type: String,
      default: '#45c5ff',
    },
  },
  data () {
    return {
    }
  },
  computed: {
    pie_option: function () {
      return {
        series: [{
          name: '',
          type: 'pie',
          radius: ['60%', '80%'],
          hoverAnimation: false,
          data: [
            {name: '指数', value: Math.round(this.value), label: valueLabel},
            {name: '', value: Math.round(100 - this.value), label: otherLabel},
          ],
          labelLine: {
            normal: {show: false},
            emphasis: {show: false}
          }
        }],
        color: [this.frontcolor, '#eee'],
      };
    },
  },
  components: {
    'Echarts': Echarts
  }
}
</script>

<style lang="sass" scoped>
@import "../../assets/sass/mixin"
/*指数*/
.index-panel
  height: 12rem
  display: flex
  flex-direction: row!important
  align-items: center
  justify-content: space-around
  margin-bottom: 2rem
  .chart
    width: 10rem
    height: 100%
    max-height: 10rem
    text-align: center
  .content
    display: inline-block
    flex: 0 0 45%
    h3
      font-size: 2rem
      color: $index_h3
      font-weight: 700
    p
      font-size: 3rem
      font-weight: bold
      margin-bottom: 0
      color: $index_p
      i
        margin-right: .2rem
      i.fa-level-up
        color: $icon_arrow_up
      i.fa-level-down
        color: $icon_arrow_down
@media (max-width: 768px)
  .index-panel
    height: 8rem
    margin-bottom: 1rem
    .chart
      height: 100%
    .content
      h3
        font-size: 1.8rem
      p
        font-size: 2.8rem
</style>
