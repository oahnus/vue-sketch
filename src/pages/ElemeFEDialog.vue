<style scoped="">

</style>

<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="80%"
            fullscreen
            :modal-append-to-body="false"
            center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <button class="button is-primary">fsdasdf</button>
  </div>
</template>

<script>

  export default {
    components: {},
    props: {},
    data() {
      return {
        dialogVisible: false
      }
    },
    created() {
    },
    mounted() {
    },
    updated() {
    },
    methods: {},
    filters: {},
    computed: {},
    watch: {}
  }
</script>
