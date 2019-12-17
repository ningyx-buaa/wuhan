<template>
  <div class="timeline-container timeline">
    <div @click="changeCurrentTimePoint(point)" v-for="point in points" class="timeline-block" :class="{'timeline-block-active': point.active}">
      <!--HighlightClass: timeline-block-active-->
      <div class="timeline-img" :class="['timeline-img',point.pointColor===undefined?'primary':point.pointColor]">
        <i class="fa fa-newspaper-o"></i>
        <!--<img v-if="point.img" :src="getImg(point.img)" alt="">-->
      </div>
      <div class="timeline-content">
        <h2><a :href="point.url">{{ point.description }}</a></h2>
        <p class="clearfix date-more">
          <span class="date">{{ point.eventSpanDateString }}</span>
          <!-- <span class="hot">热度：{{ point.hot }}</span> -->
          <a class="read-more"
             target="_blank"
            :href="'/detail/' + point.eventId">
            相似度：{{ (point.sim * 100).toFixed(2) }}%
          </a>
          <a class="read-more"
             target="_blank"
            :href="'/detail/' + point.eventId">
            新颖度：{{ (point.novelty * 100).toFixed(2) }}%
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      points: {
        required: true
      },
    },
    data () {
      return {
        defaultImg: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDg2OTExMDgyNTYzIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxNDYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMzYxLjU2NTEwNSAwbDI5Ni44NzcxNjkgMCAwIDk3LjYwNzMxMy0yOTYuODc3MTY5IDAgMC05Ny42MDczMTNaIiBwLWlkPSIyMTQ3Ij48L3BhdGg+PHBhdGggZD0iTTQ2MS4xOTIyMDQgMzQzLjYyOTcyNWw5Ny42MDczMTMgMCAwIDI0NC4wMDI2MjYtOTcuNjA3MzEzIDAgMC0yNDQuMDAyNjI2WiIgcC1pZD0iMjE0OCI+PC9wYXRoPjxwYXRoIGQ9Ik05NTMuMjA1NzEzIDE2Mi42MDA1NjlsLTY5LjAwMTUxMy02OS4wMDE1MTMtMTI3LjcwMDU1MyAxMjcuNzAwNTUzYy03MC4yODU0MDctNDcuNzU0NjIxLTE1NS4xMTY0MDMtNzUuNzAyODE3LTI0Ni40OTIxMjktNzUuNzAyODE3QzI2Ny40MzM3MDEgMTQ1LjU5Njc5MyA3MC43OTQyNjUgMzQyLjIyMDU3MiA3MC43OTQyNjUgNTg0Ljc5ODM4OWMwIDI0Mi41NjIxNTkgMTk2LjYzOTQzNyA0MzkuMjAxNTk2IDQzOS4yMDE1OTYgNDM5LjIwMTU5NiAyNDIuNTc3ODE2IDAgNDM5LjIwMTU5Ni0xOTYuNjM5NDM3IDQzOS4yMDE1OTYtNDM5LjIwMTU5NiAwLTExNS45MjYyOTktNDUuMjQ5NDYtMjIxLjA0OTA5NC0xMTguNjM1MDA0LTI5OS41NTQ1NTlMOTUzLjIwNTcxMyAxNjIuNjAwNTY5ek04NTEuNjA1OCA1ODQuNzk4Mzg5YzAgMTg4LjY1NDIzOC0xNTIuOTQwMDQ0IDM0MS42MDk5NC0zNDEuNjA5OTQgMzQxLjYwOTk0UzE2OC40MDE1NzggNzczLjQ1MjYyNyAxNjguNDAxNTc4IDU4NC43OTgzODljMC0xODguNjY5ODk1IDE1Mi45NDAwNDQtMzQxLjYwOTk0IDM0MS42MDk5NC0zNDEuNjA5OTRTODUxLjYwNTggMzk2LjEyODQ5NCA4NTEuNjA1OCA1ODQuNzk4Mzg5eiIgcC1pZD0iMjE0OSI+PC9wYXRoPjwvc3ZnPg=='
      }
    },
    components: {},
    methods: {
      getImg: function (imgurl) {
        var ImgObj = new Image() // 判断图片是否存在
        ImgObj.src = imgurl
        // 没有图片，则返回-1
        if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
          return imgurl
        } else {
          return this.defaultImg
        }
      },
      changeCurrentTimePoint: function (point) {
        this.$on('currentPoint', point)
      }
    }
  }
</script>

<style lang="sass" scoped>

.read-more
  width: 12rem
  margin-left: 1rem
</style>

<style scoped>
  .timeline-container {
    /* this class is used to give a max-width to the element it is applied to, and center it horizontally when it reaches that max-width */
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    overflow: visible;
  }
  .timeline-container::after {
    /* clearfix */
    content: '';
    display: table;
    clear: both;
  }
  /* --------------------------------
  Main components
  -------------------------------- */
  .timeline {
    position: relative;
    padding: 0 0;
    margin-top: 2em;
    margin-bottom: 2em;
  }
  .timeline::before {
    /* this is the vertical line */
    position: absolute;
    content: '';
    left: 1.5rem;
    height: 100%;
    width: 4px;
    background: #d7e4ed;
  }
  @media only screen and (min-width: 1170px) {
    .timeline {
      margin-top: 1em;
      margin-bottom: 2em;
    }
  }
  .timeline-block {
    position: relative;
    margin: 2em 0;
  }
  .timeline-block:after {
    content: "";
    display: table;
    clear: both;
  }
  .timeline-block:first-child {
    margin-top: 0;
  }
  .timeline-block:last-child {
    margin-bottom: 0;
  }
  @media only screen and (min-width: 1170px) {
    .timeline-block {
      margin: 1em 0;
    }
    .timeline-block:first-child {
      margin-top: 0;
    }
    .timeline-block:last-child {
      margin-bottom: 0;
    }
  }

  .timeline-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    box-shadow: 0 0 0 4px white, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05);
  }
  .timeline-img img {
    display: block;
    width: 24px;
    height: 24px;
    position: relative;
    top: 50%;
    margin-top: -12px;
    margin-left: 8px;
  }
  .timeline-img i {
    font-size: 3rem;
    position: absolute;
    left: 50%;
    top: 50%;
    color: #787878;
    transform: translate(-50%, -50%);
  }
  .timeline-img.green {
    background: #75ce66;
  }
  .timeline-img.primary {
    background: #efefef;
  }
  .timeline-img.yellow {
    background: #f0ca45;
  }
  .timeline-block-active .timeline-img.primary {
    background: #33bbff;
  }
  .timeline-block-active .timeline-img.primary i {
    color: #fff;
  }

  @media only screen and (min-width: 1170px) {
    .timeline::before {
      left: 2.5rem;
    }
    .timeline-img {
      width: 60px;
      height: 60px;
      line-height: 60px;
      /* Force Hardware Acceleration in WebKit */
      -webkit-transform: translateZ(0);
      -webkit-backface-visibility: hidden;
    }
    .timeline-img img {
      margin-left: 18px;
    }
    .cssanimations .timeline-img.is-hidden {
      visibility: hidden;
    }
    .cssanimations .timeline-img.bounce-in {
      visibility: visible;
      -webkit-animation: bounce-1 0.6s;
      -moz-animation: bounce-1 0.6s;
      animation: bounce-1 0.6s;
    }
  }
  .timeline-content {
    position: relative;
    margin-left: 60px;
    border-radius: 0.25em;
    border: 1px solid #ddd;
    padding: 1em;
    width: calc(100% - 80px);
    background-color: #f6f6f6;
  }
  .timeline-content:after {
    content: "";
    display: table;
    clear: both;
  }
  .timeline-content h2 {
    color: #303e49;
  }
  .timeline-content h2 a {
    transition: .3s;
  }
  .timeline-content h2 a:hover {
    color: #00abff;
  }
  .timeline-content p, .timeline-content .read-more, .timeline-content .date {
    font-size: 1.4rem;
  }
  .timeline-content .read-more, .timeline-content .date {
    display: inline-block;
  }
  .timeline-content p.date-more {
    margin: 0;
    line-height: 1.6;
  }
  .timeline-content .read-more {
    float: right;
    padding: .8rem 1rem;
    background: #acb7c0;
    color: white;
    border-radius: 0.25em;
    transition: .3s;
  }
  .no-touch .timeline-content .read-more:hover {
    background-color: #424242;
  }
  a.read-more:hover {
    text-decoration: none;
    background-color: #424242;
  }
  .timeline-content .date {
    float: left;
    padding: .8rem 0;
    opacity: .7;
  }
  .timeline-content::before {
    content: '';
    position: absolute;
    top: 1.5rem;
    left: -.7rem;
    height: 15px;
    width: 15px;
    border: 1px solid #ddd;
    border-radius: 3px;
    background-color: #f6f6f6;
    border-right-color: transparent;
    border-bottom-color: transparent;
    transform: rotate(-45deg);
  }
  .timeline-block-active .timeline-content {
    background-color: #e7f7ff;
  }
  .timeline-block-active .timeline-content::before {
    background-color: #e7f7ff;
  }
  @media only screen and (min-width: 768px) {
    .timeline-content h2 {
      font-size: 1.75rem;
    }
    .timeline-content p {
      font-size: 1.4rem;
    }
    .timeline-content .read-more, .timeline-content .date {
      font-size: 1.4rem;
    }
  }
  @media only screen and (min-width: 1170px) {
    .timeline-content {
      margin-left: 0;
      padding: 1rem .5rem .5rem;
      width: calc(100% - 80px);
    }
    .timeline-content .read-more {
      float: left;
    }
    .timeline-content .date {
      top: 6px;
      font-size: 1.4rem;
    }
    .timeline-block .timeline-content {
      float: right;
    }
    .timeline-block .timeline-content::before {
      /*top: 24px;*/
      /*left: auto;*/
      /*right: 100%;*/
      /*border-color: transparent;*/
      /*border-right-color: white;*/
    }
    .timeline-block .timeline-content .read-more {
      float: right;
    }
    .cssanimations .timeline-content.is-hidden {
      visibility: hidden;
    }
    .cssanimations .timeline-content.bounce-in {
      visibility: visible;
      -webkit-animation: bounce-2 0.6s;
      -moz-animation: bounce-2 0.6s;
      animation: bounce-2 0.6s;
    }
  }
  @media only screen and (min-width: 1170px) {
    /* inverse bounce effect on even content blocks */
    .cssanimations .timeline-block:nth-child(even) .timeline-content.bounce-in {
      -webkit-animation: bounce-2-inverse 0.6s;
      -moz-animation: bounce-2-inverse 0.6s;
      animation: bounce-2-inverse 0.6s;
    }
  }
</style>
