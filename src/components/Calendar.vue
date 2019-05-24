<style scoped>
  #Calendar .content .week {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  #Calendar .week .box{
    height: 30px;
    line-height: 30px;
    color: #666666;
    font-size: 14px;
  }

  #Calendar .box {
    display: block;
    width: 13%;
    height: 45px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    cursor: pointer;
  }
  
  #Calendar .box--tax {   
    color: #ffffff;
  }

  #Calendar .box--tax span {
    background-color: #31b573;
    border-radius: 20px;
    padding: 5px;
  }

  #Calendar .content .date-con {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%
  }

  #Calendar .header {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    padding: 0 10px;
    background-color: #e8e9eb;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    font-weight: bold;
    color: #454545;
  }
  #Calendar .header .prev, .next {
    border: none;

  }
  #Calendar .header i{
    border-radius: 5px;
    padding: 2px;
    cursor: pointer;
  }

</style>

<style>
  #Calendar .year-month .el-input__inner {
    text-align: center!important;
  }

</style>

<template>
  <div id="Calendar">
    <div class="header">
      <div class="prev"><i class="el-icon-arrow-left" @click="prev()"></i></div>
<!--      <div class="year-month">{{curDate.getFullYear()}}年{{curDate.getMonth() + 1}}月</div>-->

      <div class="year-month" >
        <el-date-picker
          v-model="curYearMonth"
          type="month"
          format="yyyy 年 MM 月"
          :clearable="false"
          :editable="false"
          align="center"
          prefix-icon=""
          value-format="yyyyMM"
          @change="handleYearMonthChange"
          placeholder="选择月">
        </el-date-picker>
      </div>
      <div class="next"><i class="el-icon-arrow-right" @click="next()"></i></div>
    </div>
    <div class="content">
      <div class="week">
        <div class="box" :key="index" v-for="(item, index) in ['日', '一', '二', '三', '四', '五', '六']">
          {{item}}
        </div>
      </div>
      <div class="date-con">
        <div class="box"
             :key="index"
             v-for="(date, index) in dates">
          <span v-if="!date.isEmpty">
            <el-popover
              v-if="date.isTax"
              placement="top"
              title="报税日期"
              width="200"
              trigger="hover"
              :content="`${date.taxTypeStr} 报税截至日`">
              <span :style="customStyle(date)" slot="reference">
                {{date.date < 10 ? ('0' + date.date) : date.date}}
              </span>
            </el-popover>
            <span v-else>
                {{date.date < 10 ? ('0' + date.date) : date.date}}
            </span>
          </span>
          <span v-else>&nbsp;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * Calendar
   *
   */
  import moment from 'moment'

  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const colors = ['#31b573', '#b5b273', '#a12573', '#31b5b3']

  export default {
    components: {},
    props: {},
    data() {
      return {
        curDate: new Date(), // 当前日期
        curYearMonth: '', // 当前年月
        dates: [], // 日期数组
      }
    },
    methods: {
      taxContent() {
        return ''
      },
      customStyle(dateObj) {
        if (!dateObj) {
          return {}
        }
        let {taxType=1} = dateObj
        return {
          backgroundColor: colors[taxType-1],
          borderRadius: '20px',
          padding: '5px',
          color: '#fff',
        }
      },
      handleYearMonthChange(yearMonth) {
        this.curDate = moment(yearMonth, 'YYYYMM').toDate()
        this.curYearMonth = yearMonth
        this.fetchData()
      },
      async fetchData() {
        this.init(this.curDate)
      },
      prev() {
        let curDate = this.curDate
        let m = curDate.getMonth()  // 月份从0 基数
        let y = curDate.getFullYear()
        let d = curDate.getDate()

        if (m === 0) {
          m = 11
          y -= 1
        } else {
          m -= 1
        }
        let date = new Date(y, m, d);
        this.curDate = date
        this.curYearMonth = moment(date).format('YYYYMM')
        this.fetchData()
      },
      next() {
        let curDate = this.curDate
        let m = curDate.getMonth()  // 月份从0 基数
        let y = curDate.getFullYear()
        let d = curDate.getDate()

        if (m === 11) {
          m = 0
          y += 1
        } else {
          m += 1
        }
        let date = new Date(y, m, d);
        this.curDate = date
        this.curYearMonth = moment(date).format('YYYYMM')
        this.fetchData()
      },
      init(date) {
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

        console.log('%c[Calendar-init]', 'color: #63ADD1', firstDayInMonth)

        let dates = []
        let emptyDates = []

        let offset = fw
        for (let i=0; i < offset;i++) {
          emptyDates.push({isEmpty: true})
        }

        for (let i=0;i < maxDayInMonth;i++) {
          dates.push({
            date: i + 1,
            isTax: false,
            isEmpty: false,
          })
        }

        dates = [
          ...emptyDates,
          ...dates
        ]
        this.dates = dates

        console.log('%c[Calendar-init]', 'color: #63ADD1', emptyDates)
        console.log('%c[Calendar-init]', 'color: #63ADD1', dates)
      }
    },
    computed: {
      handUpTaxDates() {
        let dates = []
        for (let i =0;i<15; i++) {
          dates.push(i + 1)
        }
        return dates
      },
    },
    created() {
      this.curDate = new Date()
      this.curYearMonth = moment(this.curDate).format('YYYYMM')
      this.fetchData()
    },
  }
</script>
