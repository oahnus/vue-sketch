<style scoped lang="less">
  #scroll-tab-bar {
    width: 375px;
    height: 667px;
  }
</style>

<template>
  <div id="scroll-tab-bar">
    <o-tab-bar @click="tabClick"
               type="obj"
               obj-prop-name="title"
               :tab-items="itemList"></o-tab-bar>

    <div style="margin-top: 20px;">
      {{selectedTitle}}
    </div>
  </div>
</template>

<script>
  import TabBar from '../../components/mobile/TabBar'

  export default {
    components: {
      'o-tab-bar': TabBar
    },
    props: {},
    data() {
      return {
        // visible

        // options

        // form

        // data
        itemList:[
          {'title':'新时代'},
          {'title':'娱乐'},
          {'title':'头条号'},
          {'title':'问答'},
          {'title':'图片'},
          {'title':'科技'},
          {'title':'体育'},
          {'title':'财经'},
          {'title':'军事'},
          {'title':'国际'}
        ],
        selectedTitle: ''
      }
    },
    methods: {
      tabClick(item, idx) {
        console.log('%c[ScrollTabBar-tabClick]', 'color: #63ADD1', item, idx)
        this.selectedTitle = item.title
      }
    },
    computed: {

    },
    watch: {
      '$route'(to, from) {
      }
    },
    created() {
    },
    mounted() {
    },
  }
</script>
