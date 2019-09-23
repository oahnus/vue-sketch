<style scoped lang="less">
  #ScrollBarDemo {
    .con {
      height: 500px;
      max-height: 500px;
      overflow-y: scroll;
      width: 400px;
      border: 1px solid #eee;

      .message {
        padding: 10px;
        margin: 5px;
        border: 1px solid orangered;
      }
    }
  }
</style>

<template>
  <div id="ScrollBarDemo">
    <div class="con" id="con">
      <div class="message" :key="index" v-for="(item, index) in messageList">
        {{item}}
      </div>
    </div>
    <el-button @click="add">Add</el-button>
  </div>
</template>

<script>
  /**
   * Live Template 0.0.2
   * 2019/9/17
   * ScrollBarDemo
   * EVENT: {}
   *
   */
  import {mapGetters} from 'vuex'

  export default {
    components: {},
    props: {},
    data() {
      return {
        // visible

        // options

        // form

        // data
        messageList: [],
      }
    },
    computed: {
      ...mapGetters({}),
    },
    created() {
      this.fetchData()
      // this.$nextTick(() => {})
    },
    mounted() {
    },
    methods: {
      // handler
      add() {
        this.messageList.push('asdfasfsdfs')
        let con = document.getElementById('con')
        console.log('%c[ScrollBarDemo-add]', 'color: #63ADD1', con.scrollHeight)

        setTimeout(() => {
          console.log('%c[ScrollBarDemo-con.scr]', 'color: #63ADD1', con.scrollHeight)
          con.scrollTop = con.scrollHeight
        },200)
      },
      // biz

      // ui

      // api
      async fetchData() {

      }
    },
  }
</script>
