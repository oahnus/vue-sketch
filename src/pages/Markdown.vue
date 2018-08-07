<style scoped>

</style>

<template>
  <div>
    <div v-html="markdown"></div>
  </div>
</template>

<script>
  import {markdown} from 'markdown'

  export default {
    components: {},
    props: {},
    data() {
      return {
        // visible

        // options

        // form

        // data
        markdown: ''
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
      let md_content = "## Hello *World*! \n - [ ] sdfasd\n - [ ] sdfsa \n - [x] aisdfn";
      this.markdown = markdown.toHTML(md_content)
    },
    updated() {
    },
  }
</script>
