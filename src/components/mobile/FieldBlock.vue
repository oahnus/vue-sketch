<style scoped lang="less">
  #FieldBlock {
    .field-label {
      margin-left: 15px;
      padding: 2px 0;
      color: #999;
      font-size: 13px;
    }
    /*border-top: 1px solid #dc3;*/
    border-bottom: 1px solid #ddd;
    background: #eee;
  }
</style>

<template>
  <section id="FieldBlock" :style="customStyle">
    <div class="field-label">{{label}}</div>
    <slot></slot>
  </section>
</template>

<script>
  export default {
    components: {

    },
    props: {
      label: {
        type: String,
        required: true,
      },
      background: {
        type: String,
        required: false,
      }
    },
    computed: {
      customStyle() {
        let _backgroundColor
        if (typeof this.background === "string") {
          _backgroundColor = this.background
        } else {
          _backgroundColor = '#eee'
        }

        return {
          background: _backgroundColor
        }
      }
    },
    data() {
      return {
        // visible

        // options

        // form

        // data

      }
    }
  }
</script>
