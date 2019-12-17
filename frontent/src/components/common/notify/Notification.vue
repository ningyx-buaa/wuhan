<template>
  <transition
    :name="transition"
    mode="in-out"
    appear
    :appear-active-class="enterClass"
    :enter-active-class="enterClass"
    :leave-active-class="leaveClass"
    @after-leave="afterLeave"
  >
    <div :class="['notification', 'animated', type ? `is-${type}` : '']" v-if="show">
      <button class="delete touchable" @click="closedByUser()"></button>
      <div class="title is-5" v-if="title">{{ title }}</div>
      <div v-if="html" v-html="message"></div>
      <div v-else>{{ message }}</div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    type: String,
    title: String,
    message: String,
    direction: {
      type: String,
      default: 'Right'
    },
    duration: {
      type: Number,
      default: 4500
    },
    container: {
      type: String,
      default: '.notifications'
    },
    html: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      $_parent_: null,
      show: true
    }
  },
  created () {
    let $parent = this.$parent
    if (!$parent) {
      let parent = document.querySelector(this.container)
      if (!parent) {
        // Lazy creating `div.notifications` container.
        const className = this.container.replace('.', '')
        const Notifications = Vue.extend({
          name: 'Notifications',
          render (h) {
            return h('div', {
              'class': {
                [`${className}`]: true
              }
            })
          }
        })
        $parent = new Notifications().$mount()
        document.body.appendChild($parent.$el)
      } else {
        $parent = parent.__vue__
      }
      // Hacked.
      this.$_parent_ = $parent
    }
  },
  mounted () {
    if (this.$_parent_) {
      this.$_parent_.$el.appendChild(this.$el)
      this.$parent = this.$_parent_
      delete this.$_parent_
    }
    if (this.duration > 0) {
      this.timer = setTimeout(() => this.close(), this.duration)
    }
  },
  destroyed () {
    this.$el.remove()
  },
  computed: {
    transition () {
      return `bounce-${this.direction}`
    },
    enterClass () {
      return `bounceIn${this.direction}`
    },
    leaveClass () {
      return `bounceOut${this.direction}`
    },
  },
  methods: {
    closedByUser () {
      this.$emit('closed-by-user')
      clearTimeout(this.timer)
      this.show = false
    },
    close () {
      this.$emit('closed-automatically')
      clearTimeout(this.timer)
      this.show = false
    },
    afterLeave () {
      this.$destroy()
    }
  }
}
</script>

<style lang="sass" scoped>

// @import '~bulma/sass/utilities/variables';
$black:        hsl(0, 0%, 4%) !default
$black-bis:    hsl(0, 0%, 7%) !default
$black-ter:    hsl(0, 0%, 14%) !default

$grey-darker:  hsl(0, 0%, 21%) !default
$grey-dark:    hsl(0, 0%, 29%) !default
$grey:         hsl(0, 0%, 48%) !default
$grey-light:   hsl(0, 0%, 71%) !default
$grey-lighter: hsl(0, 0%, 86%) !default

$white-ter:    hsl(0, 0%, 96%) !default
$white-bis:    hsl(0, 0%, 98%) !default
$white:        hsl(0, 0%, 100%) !default

$orange:       hsl(14,  100%, 53%) !default
$yellow:       hsl(48,  100%, 67%) !default
$green:        hsl(141, 71%,  48%) !default
$turquoise:    hsl(171, 100%, 41%) !default
$blue:         hsl(217, 71%,  53%) !default
$purple:       hsl(271, 100%, 71%) !default
$red:          hsl(348, 100%, 61%) !default

$light: $white-ter !default
$dark: $grey-darker !default

$light-invert: $dark !default
$dark-invert: $light !default

$body-background: $white-ter !default
$background: $white-ter !default

$border: $grey-lighter !default
$border-hover: $grey-light !default

$primary: $turquoise !default
$info: $blue !default
$success: $green !default
$warning: $yellow !default
$danger: $red !default

$primary-invert: findColorInvert($primary) !default
$info-invert: findColorInvert($info) !default
$success-invert: findColorInvert($success) !default
$warning-invert: findColorInvert($warning) !default
$danger-invert: findColorInvert($danger) !default

$colors: (white: ($white, $black), black: ($black, $white), light: ($light, $light-invert), dark: ($dark, $dark-invert), primary: ($primary, $primary-invert), info: ($info, $info-invert), success: ($success, $success-invert), warning: ($warning, $warning-invert), danger: ($danger, $danger-invert)) !default

$easing: ease-out !default
$radius-small: 2px !default
$radius: 3px !default
$radius-large: 5px !default
$speed: 86ms !default

$border: $grey-lighter !default
$border-hover: $grey-light !default

$text: $grey-dark !default
$text-invert: findColorInvert($text) !default
$text-light: $grey !default
$text-strong: $grey-darker !default

$size-1: 48px !default
$size-2: 40px !default
$size-3: 28px !default
$size-4: 24px !default
$size-5: 18px !default
$size-6: 14px !default
$size-7: 11px !default

$size-small: $size-7 !default
$size-normal: $size-6 !default
$size-medium: $size-5 !default
$size-large: $size-3 !default
$size-huge: $size-1 !default

.is-primary
  color: $primary
.is-info
  color: $info
.is-success
  color: $success
.is-warning
  color: $warning
.is-danger
  color: $danger

.notification
  position: relative
  min-width: 240px
  backface-visibility: hidden
  transform: translate3d(0, 0, 0)
  pointer-events: all

=block
  &:not(:last-child)
    margin-bottom: 20px

=unselectable
  -webkit-touch-callout: none
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none

=delete
  +unselectable
  -moz-appearance: none
  -webkit-appearance: none
  background-color: rgba($black, 0.2)
  border: none
  border-radius: 290486px
  cursor: pointer
  display: inline-block
  flex-grow: 0
  flex-shrink: 0
  font-size: $size-normal
  height: 20px
  max-height: 20px
  max-width: 20px
  min-height: 20px
  min-width: 20px
  outline: none
  position: relative
  vertical-align: top
  width: 20px
  &:before,
  &:after
    background-color: $white
    content: ""
    display: block
    left: 50%
    position: absolute
    top: 50%
    transform: translateX(-50%) translateY(-50%) rotate(45deg)
    transform-origin: center center
  &:before
    height: 2px
    width: 50%
  &:after
    height: 50%
    width: 2px
  &:hover,
  &:focus
    background-color: rgba($black, 0.3)
  &:active
    background-color: rgba($black, 0.4)
  // Sizes
  &.is-small
    height: 16px
    width: 16px
  &.is-medium
    height: 24px
    width: 24px
  &.is-large
    height: 32px
    width: 32px

.notification
  +block
  background-color: $background
  border-radius: $radius
  padding: 1.25rem 2.5rem 1.25rem 1.5rem
  position: relative
  a:not(.button)
    color: currentColor
    text-decoration: underline
  code,
  pre
    background: $white
  pre code
    background: transparent
  & > .delete
    +delete
    position: absolute
    right: 0.5em
    top: 0.5em
  color: $white
  .title,
  .subtitle,
  .content
    color: inherit
  // Colors
  @each $name, $pair in $colors
    $color: nth($pair, 1)
    $color-invert: nth($pair, 2)
    &.is-#{$name}
      background-color: $color
      color: $color-invert
</style>

<style lang="sass">
// @import '~bulma/sass/utilities/mixins';
$tablet: 769px !default

=mobile
  @media screen and (max-width: $tablet - 1px)
    @content

=tablet
  @media screen and (min-width: $tablet)
    @content

=tablet-only
  @media screen and (min-width: $tablet) and (max-width: $desktop - 1px)
    @content

.notifications
  position: fixed
  top: 50px
  right: 0
  z-index: 1024 + 233
  pointer-events: none
  @include tablet()
    max-width: 320px
  .notification
    margin: 20px
</style>
