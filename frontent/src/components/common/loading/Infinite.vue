<!-- Infinite loading components, taken from
     https://github.com/PeachScript/vue-infinite-loading
 -->
<template>
  <div class="infinite-loading-container">
    <div class="infinite-loading-item" v-show="isLoading">
      <slot name="spinner">
        <v-loading-circle8></v-loading-circle8>
      </slot>
    </div>
    <div class="infinite-status-prompt" v-show="!isLoading && isComplete && isFirstLoad">
      <slot name="no-results">无更多内容</slot>
    </div>
    <div class="infinite-status-prompt" v-show="!isLoading && isComplete && !isFirstLoad">
      <slot name="no-more">无更多结果</slot>
    </div>
  </div>
</template>

<script>

import Circle8 from 'components/common/loading/Circle8'

/**
 * get the first scroll parent of an element
 * @param  {DOM} elm    the element which find scorll parent
 * @return {DOM}        the first scroll parent
 */
function getScrollParent (elm) {
  if (elm.tagName === 'BODY') {
    return window;
  } else if (['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
    return elm;
  } else if (elm.hasAttribute('infinite-wrapper') || elm.hasAttribute('data-infinite-wrapper')) {
    return elm;
  }
  return getScrollParent(elm.parentNode);
}

/**
 * get current distance from bottom
 * @param  {DOM}    scrollElm     scroll element
 * @param  {DOM}    infiniteElm   infinite element
 * @param  {String} dir           calculate direction
 * @return {Number}     distance
 */
function getCurrentDistance (scrollElm, infiniteElm, dir) {
  let distance;
  if (dir === 'top') {
    distance = isNaN(scrollElm.scrollTop)
      ? scrollElm.pageYOffset
      : scrollElm.scrollTop;
  } else {
    const infiniteElmOffsetTopFromBottom = infiniteElm.getBoundingClientRect().top;
    const scrollElmOffsetTopFromBottom = scrollElm === window
      ? window.innerHeight
      : scrollElm.getBoundingClientRect().bottom;
    distance = infiniteElmOffsetTopFromBottom - scrollElmOffsetTopFromBottom;
  }
  return distance;
}

export default {
  props: {
    distance: {
      type: Number,
      default: 100,
    },
    onInfinite: {
      type: Function,
      default: (callback) => {
        callback.complete.call();
      },
    },
    direction: {
      type: String,
      default: 'bottom',
    },
  },
  data () {
    return {
      scrollParent: null,
      scrollHandler: null,
      isLoading: false,
      isComplete: false,
      isFirstLoad: true, // save the current loading whether it is the first loading
      callback: {
        loaded: () => {
          this.isFirstLoad = false;
          if (this.isLoading) {
            this.$nextTick(this.attemptLoad);
          }
        },
        complete: () => {
          this.isLoading = false;
          this.isComplete = true;
          this.scrollParent.removeEventListener('scroll', this.scrollHandler, {passive: true});
        },
        reset: () => {
          this.isLoading = false;
          this.isComplete = false;
          this.isFirstLoad = true;
          this.scrollParent.addEventListener('scroll', this.scrollHandler, {passive: true});
          // setTimeout(this.scrollHandler, 1);
        },
      },
    };
  },
  computed: {
  },
  mounted () {
    this.scrollParent = getScrollParent(this.$el);
    this.scrollHandler = function scrollHandlerOriginal () {
      if (!this.isLoading) {
        this.attemptLoad();
      }
    }.bind(this);
    // setTimeout(this.scrollHandler, 1);
    this.scrollParent.addEventListener('scroll', this.scrollHandler);
  },
  /**
   * To adapt to keep-alive feature, but only work on Vue 2.2.0 and above, see: https://vuejs.org/v2/api/#keep-alive
   */
  deactivated () {
    this.isLoading = false;
    this.scrollParent.removeEventListener('scroll', this.scrollHandler);
  },
  activated () {
    this.scrollParent.addEventListener('scroll', this.scrollHandler);
  },
  methods: {
    attemptLoad () {
      const currentDistance = getCurrentDistance(this.scrollParent, this.$el, this.direction);
      if (!this.isComplete && currentDistance <= this.distance) {
        this.isLoading = true;
        this.onInfinite(this.callback);
      } else {
        this.isLoading = false;
      }
    },
  },
  destroyed () {
    if (!this.isComplete) {
      this.scrollParent.removeEventListener('scroll', this.scrollHandler);
    }
  },
  components: {
    'v-loading-circle8': Circle8,
  },
};
</script>
<style lang="sass" scoped>
.infinite-loading-container
  clear: both
  text-align: center
  [class^="loading-"]
    $size: 28px
    display: inline-block
    margin: 15px 0
    width: $size
    height: $size
    font-size: $size
    line-height: $size
    border-radius: 50%
  .infinite-loading-item
    display: flex;
    justify-content: center

.infinite-status-prompt
  color: #666
  font-size: 14px
  text-align: center
  padding: 10px 0
</style>
