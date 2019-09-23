<style scoped>
  #QiNiuUpload {
  }
</style>

<template>
  <div id="QiNiuUpload">
    <input type="file"
           accept="image/*" @change="fileChange"></input>

    <el-button @click="upload">Upload</el-button>
  </div>
</template>

<script>
  /**
   * Live Template 0.0.2
   * 2019/9/20
   * QiNiuUpload
   * EVENT: {}
   *
   */
  import {mapGetters} from 'vuex'
  import * as qiniu from 'qiniu-js'
  import axios from 'axios'

  export default {
    components: {},
    props: {},
    data() {
      return {
        // visible

        // options

        // form

        // data
        uploadToken: null,
        file: null,
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
      // this.fetchToken()
    },
    methods: {
      // handler
      fileChange(e) {
        this.fetchToken()
        this.file = e.target.files[0]
        console.log('%c[QiNiuUpload-fileChange]', 'color: #63ADD1', e.target.files[0])
      },
      // biz

      // ui

      // api
      async fetchToken() {
        let resp = await axios({
          method: 'get',
          url: 'http://127.0.0.1:7744/open/qiniu/token',
        })
        console.log('%c[QiNiuUpload-fetchToken]', 'color: #63ADD1', resp)
        this.token = resp.data
      },
      upload() {
        let formData = new FormData()
        formData.append('token', this.token)
        formData.append('key', 'img5.jpg')
        formData.append('file', this.file)

        axios({
          url: 'http://upload.qiniup.com/',
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': this.token
          }
        }).then(res => {
          console.log('%c[QiNiuUpload-res]', 'color: #63ADD1', res)
        })
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
