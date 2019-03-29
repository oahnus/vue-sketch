<style scoped>
  #mobile-container {
    width: 375px;
    height: 667px;
    text-align: center;
    border: 2px solid #333;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
  }
</style>

<template>
  <div id="mobile-container">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {
        // visible

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
    mounted() {
    },
  }
</script>
