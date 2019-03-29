<style scoped lang="less">
  .b-card {
    .card {
      display: flex;
      justify-content: center;
      align-items: center;

      .custom-text {
        color: #0077db;
      }
    }
  }
</style>

<template>
  <div class="b-card">
    <card class="card">
      <div class="custom-text">
        <slot></slot>
      </div>
    </card>
  </div>
</template>

<script>
  import Card from './Card'
  export default {
    components: {
      Card
    },
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
  }
</script>
