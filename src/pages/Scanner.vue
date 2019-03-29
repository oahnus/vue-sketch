<style scoped>
  #Scanner {
  }
</style>

<template>
  <div id="Scanner">
    <div style="margin: 20px 500px;">
      <el-button type="primary" @click="scanToJPG">扫描</el-button>
    </div>

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

      processScannedImage(scannedImage) {
        console.log('%c[Scanner-processScannedImage]', 'color: #63ADD1', scannedImage)
        this.imgSrc = scannedImage.src
      },
      async fetchData() {

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
  }
</script>
