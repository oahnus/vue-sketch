<style scoped lang="less">
  #img-1024 {
    #canvas {
      width: 256px;
      height: 256px;
    }
  }
</style>

<template>
  <div id="img-1024">
    <canvas id="canvas" ref="canvas"></canvas>
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
    methods: {
      draw() {
        let can = this.$refs.canvas
        let cans = can.getContext('2d')

        cans.clearRect(0, 0, 256, 256)
        // for (let x = 0; x < 256; x++) {
        //   for (let y = 0; y < 256; y++) {
        //     console.log('[x,y]', x, y)
        //     cans.fillStyle = `rgba(${x}, ${y}, 255, 255)`
        //     cans.fillRect(x, y, 1, 1)
        //   }
        // }
        cans.stroke()
      },
      getRGBA() {
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)
        return `rgba(${r}, ${g}, ${b}, 255)`
      }
    },
    filters: {},
    computed: {},
    watch: {
      '$route'(to, from) {
      }
    },
    created() {

    },
    mounted() {
      this.draw()
    },
    updated() {
    },
  }
</script>
