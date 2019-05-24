<style scoped>
  #Scanner {
  }
</style>

<template>
  <div id="Scanner">
    <div style="margin: 20px 500px;">
      <el-button type="primary" @click="scanToJPG">扫描</el-button>
    </div>

    <div style="display: none">
      <img ref="img" src="../assets/test/test.jpg" style="border: 2px solid red;max-width: 1080px;width: 1080px;">
    </div>
    <canvas ref="canvas" style="display: none"></canvas>

    <div>
      <img style="border: 2px solid red;max-width: 1080px;width: 1080px;" :src="imgSrc">
    </div>
  </div>
</template>

<script>
  /**
   * Scanner
   *
   */

  import Scanner from 'scanner'
  import { VueCropper }  from 'vue-cropper'

  export default {
    components: {
      VueCropper
    },
    props: {},
    data() {
      return {
        // visible

        // options

        // form

        // data
        imgSrc: ''

      }
    },
    methods: {
      scanToJPG() {
        let vm = this
        scanner.scan(vm.resultHandler,
                {
                  "output_settings": [
                    {
                      "type": "return-base64",
                      "format": "jpg"
                    }
                  ],

                  // --------------- Processing Settings ---------------
                  // Blank page detection/discard
                  // "detect_blank_pages": "true", /** Default value: false */
                  // "blank_page_threshold": "0.02",
                  // "blank_page_margin_percent": "8",
                  // "blank_page_policy": "remove", /** "keep" (default) or "remove" */
                  'i18n': {
                    lang: 'zh' // zh es ja
                  }
                }
        );
      },
      resultHandler(successful, mesg, response) {
        let vm = this
        if(!successful) { // On error
          console.error('Failed: ' + mesg);
          return;
        }
        if(successful && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User cancelled.
          console.info('User cancelled');
          return;
        }
        let scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
        for(let i = 0; (scannedImages instanceof Array) && i < scannedImages.length; i++) {
          let scannedImage = scannedImages[i];
          console.log('%c[Scanner-resultHandler] - scannedImages', 'color: #6927D8', scannedImages)
          console.log('%c[Scanner-resultHandler] - scannedImage', 'color: #6927D8', scannedImage)
          vm.processScannedImage(scannedImage);
        }
      },

      async processScannedImage(scannedImage) {
        console.log('%c[Scanner-processScannedImage]', 'color: #63ADD1', scannedImage)
        this.imgSrc = await this.cutImage(scannedImage.src)
        console.log('%c[Scanner-processScannedImage]', 'color: #63ADD1', 'fin')
      },
      async fetchData() {

      },

      async cutImage(originSrc) {
        return new Promise((resolve, reject) => {
          // 初始化 图片容器
          console.time('cut')
          const image = new Image()
          image.src = originSrc

          // 监听图片加载完成 图片越大，越耗时
          image.onload = () => {
            // 创建canvas
            let canvas
            if (!window.originCanvas) {
              console.log('%c[Scanner-onload]', 'color: orangered', 'need create c1')
              canvas = document.createElement('canvas')
              window.originCanvas = canvas
            }
            canvas = window.originCanvas

            // 检测是否支持canvas
            if (!canvas.getContext) {
              reject('NOT SUPPORT CANVAS')
            }

            canvas.width = image.width
            canvas.height = image.height
            let context = canvas.getContext('2d');
            // 绘制原始图片
            context.drawImage(image, 0, 0, image.width, image.height)
            // 获取原始图片数据
            let imgData = context.getImageData(0, 0, image.width, image.height).data;

            let noBlankMaxHeight = image.height

            // 测试点, 在水平方面取 (_width, [height]), (_width * 2, [height]), (_width * 3, [height])
            // 三个点判断当前高度 是否为空白页部分
            let _width = 100

            // 二分查找图片非空白区域的最大高度 noBlankMaxHeight
            let start = 0
            let end = image.height  // 取图片原始高度作为end
            let e = 10 // 精度值
            let count = 0 // 计数器
            console.time('bin')
            while (count < 1000) {
              let halfH = start + ((end - start) >> 1)
              let pos = (image.width * halfH + _width) * 4
              // 测试水平三个点的位置是否为空白像素点
              // 如果是空白点，二分，将end高度降低, 不是， 则将start 高度提高
              if (imgData[pos] === 255
                      || imgData[pos + _width] === 255
                      || imgData[pos + _width] === 255) {
                end = halfH
              } else {
                start = halfH
              }
              // 如果end - start < e 直接跳出二分
              // 小范围二分没太大意义
              if (end - start < e) {
                noBlankMaxHeight = end
                break
              }
              count += 1
            }
            console.timeEnd('bin')
            console.log('%c[Scanner-onload] - count', 'color: #6927D8', count)

            // 创建第二个canvas 用于存在裁剪后的图片
            let canvas2
            if (!window.newCanvas) {
              console.log('%c[Scanner-onload]', 'color: orangered', 'need create c2')
              canvas2 = document.createElement('canvas')
              window.newCanvas = canvas2
            }
            canvas2 = window.newCanvas

            // 旋转
            let context2 = canvas2.getContext('2d');
            let x = 0, y = 0, w = image.naturalWidth, h = image.naturalHeight;
            h = noBlankMaxHeight

            let degrees = 90; // 改为变量值
            if (degrees === 180) {
              x = -w
              y = -h
            } else {
              canvas2.height = w
              canvas2.width = h
              if (degrees === 90) {
                y = -h
              }
              if (degrees === 270) {
                x = -w
              }
            }

            context2.rotate(degrees * (Math.PI / 180));


            // 绘制图片， 转为base64
            context2.drawImage(image, 0, 0, w, h, x, y, w, h)



            let dataUrl = canvas2.toDataURL();
            console.timeEnd('cut')

            resolve(dataUrl)
          }
        })
      }
    },
    computed: {},
    watch: {
      '$route'(to, from) {
      }
    },
    created() {
      this.fetchData()
    },
    mounted() {
      // const image = new Image()
      // let img = this.$refs.img;
      // image.src = img.src


    }
  }
</script>
