<style scoped lang="less">
  #ClipboardDemo {
    .text-box {
      margin-top: 10px;
      border: 1px solid #ddd;
      padding: 10px;
    }
  }
</style>

<template>
  <div id="ClipboardDemo">
    <div style="margin: 30px;">
      <div>读取到的剪贴板内容：</div>
      <div class="text-box">
        {{clipboardText}}
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *
   * Live Template 0.1.0
   * ClipboardDemo oahnus 2019/9/23
   * PROP: {}
   * EVENT: {}
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
        clipboardText: '',
      }
    },
    computed: {
      ...mapGetters({}),
    },
    created() {
      this.testClipboard()
      // this.$nextTick(() => {})
    },
    methods: {
      // handler 事件处理
      testClipboard() {
        navigator.clipboard.readText()
                .then(text => {
                  this.clipboardText = text
                })
                .catch(err => {
                  console.error('Failed to read clipboard contents: ', err);
                });
      },
      // biz 业务逻辑

      // ui 组件UI显示控制

      // api 接口调用
    },
  }
</script>
