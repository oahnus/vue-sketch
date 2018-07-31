<style>
  @import "../../static/css/aside.less";
</style>

<template>
  <div>
    <b-aside :width="800" :is-show="isShowRight" title="Right Aside!" :showFooter="false" placement="right" :backdrop="false" @close="isShowRight=false">
      <h3>Dolor sit amet</h3>
      <p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,
        fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
      </p>
      <h3>Dolor sit amet</h3>
      <p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,
        fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
      </p>
      <p><code>右侧Aside并且不显示footer</code></p>
    </b-aside>
    <el-button @click="isShowRight = true" >右侧模态框</el-button>
  </div>
</template>

<script>

  import Aside from '../components/Aside/Aside.vue'

  export default {
    components: {
      'b-aside': Aside
    },
    props: {},
    data() {
      return {
        isShowRight: false
      }
    },
    created () {
    },
    mounted () {
    },
    updated () {
    },
    methods: {},
    filters: {},
    computed: {},
    watch: {}
  }
</script>
