<style>
  @import "../../static/css/aside.less";
</style>

<template>
  <div>
    <o-aside :width="800"
             :is-show="isShowRight"
             title="Right Aside!"
             :showFooter="false"
             placement="right"
             :backdrop="true"
             @close="isShowRight=false">
      <h3>Dolor sit amet</h3>
      <p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,
        fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
      </p>
      <h3>Dolor sit amet</h3>
      <p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,
        fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
      </p>
      <p><code>右侧Aside并且不显示footer</code></p>
    </o-aside>
    <div style="display: flex;justify-content: center;height: 500px;align-items: center">
      <el-button type="primary" @click="isShowRight = true" >右侧模态框</el-button>
    </div>
  </div>
</template>

<script>

  import Aside from '../components/Aside/Aside.vue'

  export default {
    components: {
      'o-aside': Aside
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
