<style scoped lang="less">
  #ImageCropperDemo {

  }
</style>

<template>
  <div id="ImageCropperDemo">
    <div style="display: flex;justify-content: center">
      <img :src="croppedImgSrc" alt="">
    </div>
    <el-button @click="$refs.imageCropper.show()">Show</el-button>
    <image-cropper
            ref="imageCropper"
            :need-compress-ori-img="true"
            :comp-quality="0.8"
            @cropFinish="onCropFinish"
    ></image-cropper>
  </div>
</template>

<script>
  /**
   * Live Template 0.0.2
   * 2019/9/23
   * ImageCropperDemo
   * EVENT: {}
   *
   */
  import {mapGetters} from 'vuex'
  import ImageCropper from '../components/ImageCropper'

  export default {
    components: {
      ImageCropper
    },
    props: {},
    data() {
      return {
        // visible
        // options
        // form
        // data
        croppedImgSrc: '',
      }
    },
    computed: {
      ...mapGetters({}),
    },
    methods: {
      onCropFinish({file, dataUrl}) {
        this.croppedImgSrc = dataUrl
      }
    },
  }
</script>
