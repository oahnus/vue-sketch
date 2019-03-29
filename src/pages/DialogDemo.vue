<style scoped>
  #DialogDemo {
  }
</style>

<template>
  <div id="DialogDemo">
    <!--<drag-dialog :only-title-drag="false"></drag-dialog>-->
    <drag-dialog2 only-drag-title :visible.sync="visible">
      <p>
        asfasdfasdfsdf
      </p>
      <p>
        asfsfad
      </p>
    </drag-dialog2>
    <el-button @click="visible = true" style="margin: 100px">Show</el-button>
  </div>
</template>

<script>

  import DragDialog from '../components/draggable-dialog/DragDialog'
  import DragDialog2 from '../components/draggable-dialog/DragDialog2'

  export default {
    components: {
      DragDialog,
      DragDialog2
    },
    props: {},
    data() {
      return {
        // visible
        visible: false,

        // options

        // form

        // data

      }
    },
    methods: {},
    computed: {},
    watch: {
      '$route'(to, from) {
      }
    },
    created() {
    },
  }
</script>
