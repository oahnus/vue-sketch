<style scoped lang="less">
  #FileSelector {
    #fileInput {
      display: none;
    }
  }
</style>

<template>
  <div id="FileSelector" :class="customClass">
    <div @click="onTrigger">
      <slot name="trigger" ></slot>
    </div>
    <input
      id="fileInput"
      type="file"
      :accept="accept"
      @change="onFileChange"/>
  </div>
</template>

<script>
  /**
   * Live Template 0.0.2
   * 2019/9/22
   * FileSelector
   * EVENT: {}
   */
  export default {
    components: {},
    props: {
      inline: {
        type: Boolean,
        default: true,
      },
      accept: {
        type: String,
        default: '*/*'
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
    computed: {
      customClass() {
        if (this.inline) {
          return {
            display: 'inline-block'
          }
        } else {
          return {}
        }
      }
    },
    methods: {
      // handler
      onFileChange(e) {
        let files = e.target.files
        if(!files || files.length === 0) {
          return
        }

        this.$emit('change', files)
      },
      onTrigger() {
        console.log('%c[FileSelector-onTrigger]', 'color: #63ADD1', )
        let dom = document.getElementById('fileInput')
        if (dom) {
          dom.click()
        }
      }
      // biz
      // ui
    },
  }
</script>
