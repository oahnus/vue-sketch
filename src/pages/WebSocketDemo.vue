<style scoped>
  #WebSocketDemo {
  }
</style>

<template>
  <div id="WebSocketDemo">
    <div style="margin: 30px;">
      <el-input v-model="input" style="width: 200px" placeholder="enter message"></el-input>
      <el-button @click="send">Send</el-button>
    </div>
  </div>
</template>

<script>
  /**
   * Live Template 0.0.2
   * 2019/9/16
   * WebSocketDemo
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
        imgFile: null,
        input: '',
        websocket: null,
      }
    },
    computed: {
      ...mapGetters({}),
    },
    created() {
      this.fetchData()
      this.init()
      // this.$nextTick(() => {})
    },
    mounted() {
    },
    methods: {
      // handler

      // biz

      // ui

      // api
      init() {
        this.websocket = new WebSocket('ws://127.0.0.1:7772/chat')
        this.websocket.onopen = this.onWebsocketOpen
        this.websocket.onerror = this.onWebsocketErr
        this.websocket.onmessage = this.onWebsocketMsg
        this.websocket.onclose = this.onWebsocketClose

        // this.websocket.send()
      },
      onWebsocketOpen() {
        this.websocket.send(JSON.stringify({sendName: 'aaa', msgType: 'SYSTEM', content: 'LOGIN'}))
        console.log('%c[WebSocketDemo-onWebsocketOpen]', 'color: #63ADD1', )
      },
      onWebsocketErr(e) {
        console.log('%c[WebSocketDemo-onWebsocketErr]', 'color: #63ADD1', e)
      },
      onWebsocketMsg(e) {
        console.log('%c[WebSocketDemo-onWebsocketMsg]', 'color: #63ADD1', )
        let data = e.data
      },
      onWebsocketClose(e) {
        console.log('%c[WebSocketDemo-onWebsocketClose]', 'color: #63ADD1', e.code)
      },
      send() {
        // this.websocket.send(JSON.stringify({sendName: 'aaa', msgType: 'CHAT', content: msg, }))
      },

      async fetchData() {

      }
    },
    watch: {
      '$route'(to, from) {
      }
    },
  }
</script>
