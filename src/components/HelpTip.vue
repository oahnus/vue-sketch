<style scoped>

</style>

<template>
  <span style="margin-left: 0;">
    <el-popover
      :placement="placement"
      :title="title"
      :width="width"
      trigger="hover"
      content="">
      <slot name="content"/>
      <span style="cursor: pointer;" size="mini" slot="reference">
        <i style="color: #0077db;" class="el-icon-question"></i>
        <span style="color: #aaa;">{{title}}</span>
      </span>
    </el-popover>
  </span>
</template>

<script>
  export default {
    components: {},
    props: {
      title: {
        type: String,
        default: '帮助'
      },
      content: {
        type: String,
        default: ''
      },
      width: {
        type: Number,
        default: 200
      },
      placement: {
        type: String,
        default: 'bottom-start'
      }
    },
    data() {
      return {
        // visible

        // options

        // form

        // data

      }
    },
    methods: {},
    filters: {},
    computed: {},
    watch: {
      '$route'(to, from) {
      }
    },
    created() {
    },
    mounted() {
    },
    updated() {
    },
  }
</script>
