<template>
  <ul class="event-panel-detail">
    <li >
      <label for="">描&nbsp;&nbsp;&nbsp;述：</label><span class="title">{{ event.description && event.description.trim() }}</span>
    </li>
    <li>
      <label for="">参与者：</label><span>{{ event.participant }}</span><br class="event-br">
      <label for="">关键词：</label><span>{{ event.corewords }}</span>
    </li>
    <li>
      <label for="">类&nbsp;&nbsp;&nbsp;型：</label><span>{{ event.e_type | toLegacyType }}</span><br class="event-br">
      <label for="">标&nbsp;&nbsp;&nbsp;签：</label><span>{{ event.eventType2 | toManyType }}</span><br class="event-br">
      <label for="">情&nbsp;&nbsp;&nbsp;绪：</label><span>{{ event.emotion | toEmotion }}</span>
    </li>
    <li>
      <label for="">时&nbsp;&nbsp;&nbsp;间：</label><span>{{ event.eventSpanDateString }}</span><br class="event-br">
      <label for="">地&nbsp;&nbsp;&nbsp;点：</label><span>{{ event.eventLoc }}</span><br class="event-br">
      <label for="">来&nbsp;&nbsp;&nbsp;源：</label><span>{{ event | eventFrom }}</span>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    event: {
      type: Object,
    }
  },
}
</script>

<style lang="sass" scoped>
@import "~assets/sass/mixin"

.event-br
  display: none
@media (max-width: 768px)
  .event-br
    display: block
  .event-panel-detail
    li
      span
        min-width: 0

.event-panel-detail
  flex-direction: column
  padding: 1rem 0 .2rem
  margin: 0 1.5rem 1.2rem
  border-bottom: 1px solid #dddddd
  overflow-y: auto
  li
    line-height: 32px
    &:first-child
      white-space: nowrap
      overflow: hidden
    label
      margin-bottom: .8rem
      color: #787878
    span
      margin-bottom: .8rem
      color: #333
      display: inline-block
      min-width: 18rem
      padding-right: 3rem
      &.title
        font-size: 1.5rem
        font-weight: bold
@media (max-width: 1440px)
  .event-panel-detail
    li
      span
        min-width: 13rem
</style>
