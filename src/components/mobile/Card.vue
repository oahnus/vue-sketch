<style scoped lang="less">
  .card {
    border: 1px solid #3d4;
    display: flex;
    flex-direction: column;

    height: 500px;

    .card__header {
      height: 80px;
      border: 1px solid red;
    }
    .card__content {
      flex: 1;
      border: 1px solid #0077db;
      display: block;
      flex-direction: row;
    }
    .card__footer {
      height: 60px;
      border: 1px solid orangered;
    }
  }
</style>

<template>
  <div class="card">
    <div v-if="header" class="card__header">
      <slot name="header"></slot>
    </div>
    <div class="card__content">
      <slot></slot>
    </div>
    <div v-if="footer" class="card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    components: {

    },
    props: {
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      header: {
        type: Boolean,
        default: false
      },
      footer: {
        type: Boolean,
        default: false
      },
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
    computed: {},
    watch: {
      '$route'(to, from) {
      }
    },
    created() {
    },
  }
</script>
