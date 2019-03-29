<style scoped>
  #Calendar {
    border: 1px solid #0077db;
  }

  #Calendar .box {
    display: block;
    width: 60px;
    height: 60px;
    border: 1px solid #0077db;
    text-align: center;
  }

  #Calendar .week {
    display: flex;
    flex-direction: row;
  }
  #Calendar .week .box{
    height: 30px;
    line-height: 30px;
  }

  #Calendar .date-con {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 480px;
  }
</style>

<template>
  <div id="Calendar">
    <div class="header">

    </div>
    <div class="week">
      <div class="box" :key="index" v-for="(item, index) in ['日', '一', '二', '三', '四', '五', '六']">
        {{item}}
      </div>
    </div>
    <div class="date-con">
      <div class="box"
           :key="index"
           v-for="(item, index) in dates">{{item}}</div>
    </div>
  </div>
</template>

<script>
  /**
   * Calendar
   *
   */

  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  export default {
    components: {},
    props: {
      // width: {
      //   type: Number,
      //   required: true
      // },
      // height: {
      //   type: Number,
      //   required: true,
      // }
    },
    data() {
      return {
        // visible

        // options

        // form

        // data
        dates: [],
      }
    },
    computed: {
      boxWidth() {

      }
    },
    methods: {
      init() {
        let date = new Date()
        let d = date.getDate()
        let w = date.getDay()
        let m = date.getMonth()  // 月份从0 基数
        let y = date.getFullYear()

        let maxDayInMonth = days[m]
        if (m === 1 && (y % 4 === 0 || y % 400 === 0)) {
          maxDayInMonth += 1
        }

        let firstDayInMonth = new Date(y, m, 1)

        let fw = firstDayInMonth.getDay();
        let fd = firstDayInMonth.getDate();

        let dates = []
        let emptyDates = []

        let offset = fw - w + 1
        for (let i=0; i < offset;i++) {
          console.log('%c[Calendar-init]', 'color: #63ADD1', i)
          emptyDates.push(' ')
        }

        for (let i=0;i < maxDayInMonth;i++) {
          dates.push(i + 1)
        }

        dates = [
          ...emptyDates,
          ...dates
        ]
        this.dates = dates
      }
    },
    watch: {
      '$route'(to, from) {
      }
    },
    created() {
      this.init()
    },
  }
</script>
