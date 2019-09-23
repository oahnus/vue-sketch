<style scoped lang="less">
  #ImageCropper {
    .label {
      color: #999;
      font-size: 16px;
      margin-left: 20px;
    }
    .origin-con {
      display: flex;
      justify-content: center;
      align-items: center;
      .origin-img-con {
        .hint {
          width: 400px;
          height: 200px;
          border: 1px dashed #ddd;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #999;
        }

        img {
          border: 1px dashed #ddd;
        }
      }
    }
    .dest-img-con {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        border: 1px dashed #ddd;
      }
    }
    .operate-con {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      text-align: center;
      .btn {
        display: inline-block;
        margin-left: 10px;
      }
    }
  }
</style>

<template>
  <div id="ImageCropper">
    <el-dialog
            id="cropDialog"
            title="更换logo"
            :visible.sync="dialogVisible"
            ref="dialog"
            width="61.8%"
            :modal-append-to-body="false">

      <div class="label">原始图片</div>
      <div class="origin-con">
        <div class="origin-img-con" :style="customImgStyle">
          <img ref="originImg"
               v-if="originImgSrc"
               :style="customImgStyle"
               alt="origin img"
               :src="originImgSrc">
          <div class="hint" v-else>请点击[选择图片]</div>
        </div>
      </div>
      <div class="label">预览</div>
      <div class="dest-img-con" v-if="destImgSrc">
        <img alt="dest img" :style="customImgStyle" :src="destImgSrc">
      </div>

      <div class="operate-con">
        <file-selector inline @change="onFileChange">
          <el-button size="small" type="primary" slot="trigger">选择图片</el-button>
        </file-selector>
        <el-button size="small" type="primary" class="btn" @click="crop">裁剪</el-button>
        <el-button size="small" type="danger" class="btn"  @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  /**
   *
   * Live Template 0.1.0
   * ImageCropper oahnus 2019/9/23
   * PROP: {}
   * EVENT: {
   *   cropFinish({file, dataUrl})
   * }
   */
  import {mapGetters} from 'vuex'
  import Cropper from 'cropperjs'
  // https://github.com/fengyuanchen/cropperjs/blob/master/README.md#options
  import Compressor from 'compressorjs'
  // https://github.com/fengyuanchen/compressorjs

  import FileSelector from './FileSelector'

  export default {
    components: {
      FileSelector
    },
    props: {
      // 原始图片容器宽度
      containerWidth: {
        type: Number,
        default: 400
      },
      // 原始图片容器高度
      containerHeight: {
        type: Number,
        default: 300,
      },
      // 裁剪图片最小高度
      cropMinHeight: {
        type: Number,
        default: 90,
      },
      // 裁剪图片最小宽度
      cropMinWidth: {
        type: Number,
        default: 160,
      },
      // 是否裁剪任意宽高
      cropRandom: {
        type: Boolean,
        default: false,
      },
      // 是否压缩原始图片
      needCompressOriImg: {
        type: Boolean,
        default: true
      },
      // 压缩质量
      compQuality: {
        type: Number,
        default: 0.8
      },
    },
    data() {
      return {
        // visible
        dialogVisible: true,
        isCropperInit: true,
        // options
        // form
        // data
        originImgSrc: '',
        originImgFilename: '',
        destImgSrc: '',
        cropper: null,
      }
    },
    computed: {
      ...mapGetters({}),
      customImgStyle() {
        let clientWidth = document.body.clientWidth;

        let dlgWidth = clientWidth * 0.6;
        const MAX_HEIGHT = 500

        let maxWidth = this.containerWidth
        let maxHeight = this.containerHeight

        // 横图
        if (this.containerWidth > this.containerHeight) {
          maxWidth = dlgWidth
          maxHeight = (dlgWidth * this.containerHeight / this.containerWidth)
        }
        // 竖图
        else {
          maxHeight = MAX_HEIGHT
          maxWidth = this.containerHeight / this.containerWidth * maxHeight
        }
        return {
          maxWidth: maxWidth + 'px',
          maxHeight: maxHeight + 'px'
        }
      }
    },
    methods: {
      // handler 事件处理
      async onFileChange(files) {
        let imgFile = files[0]
        this.originImgFilename = imgFile.name
        // 压缩文件
        if (this.needCompressOriImg) {
          imgFile = await this.compress(imgFile)
        }

        let reader = new FileReader()
        reader.onload = () => {
          this.originImgSrc = reader.result
          // 如果是Cropper初始化流程， 等待300ms(待dom节点接在完成)，调用初始化函数
          if (this.isCropperInit) {
            let img = this.$refs.originImg
            if (!img) {
              setTimeout(() => {
                img = this.$refs.originImg
                this.initCrop()
              }, 300)
            } else {
              this.initCrop()
            }
          } else {
            // 如果Cropper已经初始化过, 调用replace方法 替换原始图片src
            this.cropper.replace(this.originImgSrc)
          }
        }
        reader.readAsDataURL(imgFile)
      },
      // biz 业务逻辑
      // 压缩图片
      compress(imgFile) {
        return new Promise((resolve, reject) => {
          new Compressor(imgFile, {
            quality: this.compQuality,
            // maxWidth: this.containerWidth,  // 压缩到指定大小
            // maxHeight: this.containerHeight, // 压缩到指定大小
            success(result) {
              resolve(result)
            },
            error(err) {
              console.error(err.message);
              reject(err.message)
            },
          });
        })
      },
      // 初始化cropper
      initCrop() {
        let img = this.$refs.originImg

        let options = {
          zoomable: false,
          scalable: false,
          minContainerHeight: 90,
          minContainerWidth: 160,
          minCropBoxWidth: this.cropMinWidth,  // 裁剪图片的最小width
          minCropBoxHeight: this.cropMinHeight,
          // aspectRatio: this.cropMinWidth / this.cropMinHeight,  // 裁剪图片的比例 18:7  W:H
          crop: () => {
            const canvas = this.cropper.getCroppedCanvas();
            this.destImgSrc = canvas.toDataURL();
          }
        }
        // 截取任意比例
        if (this.cropRandom) {
          options.aspectRatio = this.cropMinWidth / this.cropMinHeight
        }
        this.cropper = new Cropper(img, options);
        this.isCropperInit = false
      },
      // canvas.toDataUrl 转换为文件
      dataUrl2ImgFile(dataUrl, filename) {
        let arr = dataUrl.split(',')
        let data = window.atob(arr[1])
        let mime = arr[0].match(/:(.*?);/)[1]
        let ia = new Uint8Array(data.length)
        for (let i = 0; i < data.length; i++) {
          ia[i] = data.charCodeAt(i)
        }
        let blob = new Blob([ia], {type: mime})
        return new window.File([blob], filename, {type: mime})
      },
      // ui 组件UI显示控制
      show() {
        this.originImgSrc = ''
        this.destImgSrc = ''
        if (this.cropper) {
          // 如果组件内的cropper实例不为null, 销毁实例
          this.cropper.destroy()
        }
        this.isCropperInit = true
        this.dialogVisible = true
      },
      // api 接口调用
      async crop() {
        let fileDataUrl = this.destImgSrc
        let file = this.dataUrl2ImgFile(fileDataUrl, this.originImgFilename)
        let destImgSrc = this.destImgSrc
        this.$emit('cropFinish', {file: file, dataUrl: destImgSrc})
        this.dialogVisible = false
      },
    }
  }
</script>
