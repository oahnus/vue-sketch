<style scoped>
  #Excel {
  }
</style>

<template>
  <div id="Excel">
    <input type="file" id="file" ref="fileInput" v-on:change="change">
    <img :src="imgUrl">
  </div>   
</template>

<script>
  /**
   * Live Template 0.0.2
   * 2019/4/24
   * Excel
   *
   */

  import Compressor from 'compressorjs'
  import imageCompression from 'browser-image-compression'

  export default {
    components: {},
    props: {},
    data() {
      return {
        // visible

        // options

        // form

        // data
        file: null,
        table: '',

        imgUrl: '',
      }
    },
    computed: {
    },
    created() {
      // this.fetchData()
      // this.$nextTick(() => {})
    },
    mounted() {
      let vm = this
      document.getElementById('file').addEventListener('change', async (e) => {
        const file = e.target.files[0];

        if (!file) {
          return;
        }
        // 压缩
        // vm.testCompress(file)
        // 旋转
        vm.testRotate(file)

      });
    },
    methods: {
      async testCompress(file) {
        let vm = this
        console.log('%c[Compressorjs-fle]', 'color: #63ADD1', file)

        let img = await vm.com(file)
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let base64data
        reader.onloadend = function() {
          base64data = reader.result;
          vm.imgUrl = base64data
        }
      },

      // handler
      async testRotate(file) {
        let vm = this
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let base64data
        reader.onloadend = function() {
          base64data = reader.result;

          vm.rotate(base64data, 90, (url) => {
            vm.imgUrl = url
          })
        }
      },

      /**
       * 只旋转90 180 270 360 其他角度需要使用translate 修改坐标系
       * @param src base64
       * @param degrees 角度
       * @param callback
       */
      rotate(src, degrees, callback) {
        this._loadImage(src, (image) => {
          let w = image.naturalWidth;
          let h = image.naturalHeight;

          let cvs = this._getCanvas(w, h);
          let ctx = cvs.getContext('2d');

          // ctx.save();
          let x = 0, y = 0;
          degrees %= 360;
          if (degrees === 0) {
            return callback(src, w, h);
          }
          if (degrees === 180) {
            x = -w
            y = -h
          } else {
            cvs.height = w
            cvs.width = h
            if (degrees === 90) {
              y = -h
            }
            if (degrees === 270) {
              x = -w
            }
          }

          ctx.rotate(degrees * (Math.PI / 180));
          ctx.drawImage(image, x, y, w, h);
          const mimeType = this._getImageType(image.src);
          const data = cvs.toDataURL(mimeType, 1);
          callback(data, w, h);
          cvs = null;
          ctx = null;
        });
      },
      _getImageType(str) {
        let mimeType = 'image/jpeg';
        const outputType = str.match(/(image\/[\w]+)\.*/)[0];
        if (typeof outputType !== 'undefined'){
          mimeType = outputType;
        }
        return mimeType;
      },

      _loadImage(data, callback) {
        const image = new Image();
        image.src = data;
        image.onload = function () {
          callback(image);
        };
        image.onerror = function () {
          console.log('Error: image error!');
        };
      },

      _getCanvas(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
      },


      async com(img) {

        console.log('%c[Compressorjs-com]', 'color: #63ADD1', img.size)
        let result = await imageCompression(img, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1366,
          useWebWorker: true,
        })

        console.log('%c[Compressorjs-com]', 'color: #63ADD1', result.size)
        return result

        // return new Promise((resolve) => {
        //   console.log('%c[Compressorjs-]', 'color: #63ADD1', img.name, img.size)
        //   new Compressor(img, {
        //     quality: 0.6,
        //     success(result) {
        //       console.log('%c[Compressorjs-success]', 'color: #63ADD1', result.name, result.size)
        //       resolve(result)
        //     },
        //     error(err) {
        //       console.log(err.message);
        //     },
        //   });
        // })
      },

      // biz

      // ui

      // api
      async change() {

      }
    },
    watch: {
      '$route'(to, from) {
      }
    },
  }
</script>
