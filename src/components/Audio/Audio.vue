<template>
  <section v-bind:class="{border: border}"
           v-bind:style="{borderColor: color}"
           class="di main-wrap"
           v-loading="audio.waiting">
    <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
    <div class="audio-container">
      <el-button type="text" @click="startPlayOrPause">
        <span v-if="displayType === 'text'"
              v-bind:style="{color: color}">
          {{audio.playing | transPlayPause}}
        </span>
        <span v-else>
            <img class="audio-icon" src="../../assets/pause.png" v-show="audio.playing" >
            <img class="audio-icon" src="../../assets/play.png" v-show="!audio.playing" >
        </span>
      </el-button>

      <el-button v-show="!controlList.noSpeed"
                 type="text"
                 v-bind:style="{color: color}"
                 @click="changeSpeed">
        {{audio.speed | transSpeed}}
      </el-button>

      <el-tag size="small"
              v-bind:style="{color: color}"
              v-show="!controlList.noTime"
              class="audio-tag"
              type="info">
        {{ audio.currentTime | formatSecond}}
      </el-tag>

      <el-slider v-show="!controlList.noProgress"
                 v-model="sliderTime"
                 v-bind:style="{color: color + '!important'}"
                 :format-tooltip="formatProcessToolTip"
                 @change="changeCurrentTime"
                 class="slider"></el-slider>

      <el-tag size="small"
              class="audio-tag"
              v-bind:style="{color: color}"
              v-show="!controlList.noTime"
              type="info">
        {{ audio.maxTime | formatSecond }}
      </el-tag>

      <el-button v-show="!controlList.noMuted"
                 type="text"
                 @click="startMutedOrNot">
        <span v-if="displayType === 'text'"
              v-bind:style="{color: color}">
          {{audio.muted | transMutedOrNot}}
        </span>
        <span v-else>
            <img class="audio-icon" src="../../assets/mute.png" v-show="audio.muted">
            <img class="audio-icon" src="../../assets/unmute.png" v-show="!audio.muted">
        </span>
      </el-button>

      <el-slider v-show="!controlList.noVolume"
                 v-model="volume"
                 :format-tooltip="formatVolumeToolTip"
                 @change="changeVolume"
                 v-bind:style="{color: color}"
                 class="slider">
      </el-slider>

      <a :href="url"
         v-show="!controlList.noDownload"
         target="_blank"
         class="download"
         download>
        <span v-if="displayType === 'text'" v-bind:style="{color: color}">下载</span>
        <span v-else>
            <img class="audio-icon" src="../../assets/download.png" >
        </span>
      </a>
    </div>
    <audio ref="audio"
           class="dn"
           :src="url"
           :preload="audio.preload"
           :autoplay="autoPlay"
           :loop="loop"

           @play="onPlay"
           @error="onError"
           @waiting="onWaiting"
           @pause="onPause"
           @timeupdate="onTimeupdate"
           @loadedmetadata="onLoadedmetadata"
           @canplaythrough="canPlayThrough"
    ></audio>
  </section>
</template>

<script>
  function realFormatSecond(second) {
    let secondType = typeof second
    if (secondType === 'number' || secondType === 'string') {
      second = parseInt(second)
      let hours = Math.floor(second / 3600)
      second = second - hours * 3600
      let minutes = Math.floor(second / 60)
      second = second - minutes * 60
      return hours + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
      return '0:00:00'
    }
  }
  export default {
    props: {
      src: {
        type: String,
        required: true,
      },
      theSpeeds: {
        type: Array,
        default () {
          return [1, 1.5, 2]
        }
      },
      theControlList: {
        type: String,
        default: ''
      },
      border: {
        type: Boolean,
        default: false
      },
      displayType: {
        type: String,
        default: 'normal' // text, simple, normal
      },
      color: {
        type: String,
        default: '#0077db'
      },
      // 原生属性
      autoPlay: {
        type: Boolean,
        default: false
      },
      loop: {
        type: Boolean,
        default: false
      },
//      preload: {
//        type: String,
//        default: 'auto'
//      }
    },
    name: 'VueAudio',
    data() {
      return {
        url: this.src || 'https://mp3-1253653901.cos.ap-shanghai.myqcloud.com/%E5%A4%A7%E8%AF%9D%E8%A5%BF%E6%B8%B8%20-%20%E4%B8%AD%E5%9B%BD%E6%AD%8C%E5%89%A7%E8%88%9E%E5%89%A7%E9%99%A2%E4%BA%A4%E5%93%8D%E4%B9%90%E5%9B%A2.mp3',
        audio: {
          currentTime: 0,
          maxTime: 0,
          playing: false,
          muted: false,
          speed: 1,
          waiting: true,
          preload: 'auto'
        },
        DISPLAY_TYPE: {
          TEXT: 'text',
          SIMPLE: 'simple',
          NORMAL: 'normal'
        },
        sliderTime: 0,
        volume: 100,
        oldVolume: 0,
        speeds: this.theSpeeds,
        controlList: {
          // 不显示下载
          noDownload: false,
          // 不显示静音
          noMuted: false,
          // 不显示音量条
          noVolume: false,
          // 不显示进度条
          noProgress: false,
          // 只能播放一个
          onlyOnePlaying: false,
          // 不要快进按钮
          noSpeed: false,
          // 不显示时间
          noTime: false,
        }
      }
    },
    computed: {
      muteImgSrc() {
        return this.audio.muted ? '../../assets/mute.png' : '../../assets/play.png'
      }
    },
    methods: {
      setControlList () {
        let controlList = this.theControlList.split(' ')
        controlList.forEach((item) => {
          if(this.controlList[item] !== undefined){
            this.controlList[item] = true
          }
        })
      },
      changeSpeed() {
        let index = this.speeds.indexOf(this.audio.speed) + 1
        this.audio.speed = this.speeds[index % this.speeds.length]
        this.$refs.audio.playbackRate = this.audio.speed
      },
      startMutedOrNot() {
        this.$refs.audio.muted = !this.$refs.audio.muted
        this.audio.muted = this.$refs.audio.muted
        console.log('muted=', this.audio.muted)
        if (this.audio.muted) {
          this.oldVolume = this.volume
          this.volume = 0
        } else {
          this.volume = this.oldVolume
        }
      },
      // 音量条toolTip
      formatVolumeToolTip(index) {
        return '音量条: ' + index
      },
      // 进度条toolTip
      formatProcessToolTip(index = 0) {
        index = parseInt(this.audio.maxTime / 100 * index)
        return '进度条: ' + realFormatSecond(index)
      },
      // 音量改变
      changeVolume(index = 0) {
        console.log(index)
        this.$refs.audio.volume = index / 100
        this.volume = index
        this.audio.muted = index === 0
      },
      // 播放跳转
      changeCurrentTime(index) {
        this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
      },
      startPlayOrPause() {
        return this.audio.playing ? this.pausePlay() : this.startPlay()
      },
      // 开始播放
      startPlay() {
        this.$refs.audio.play()
      },
      // 暂停
      pausePlay() {
        this.$refs.audio.pause()
      },
      // 当音频暂停
      onPause (res) {
        console.log(res)
        this.audio.playing = false
      },
      // 当发生错误, 就出现loading状态
      onError (res) {
        console.log(res)
        this.audio.waiting = true
      },
      // 当音频开始等待
      onWaiting (res) {
        console.log(res)
      },
      // 当音频开始播放
      onPlay (res) {
        console.log(res)
        this.audio.playing = true
        this.audio.loading = false
        if(!this.controlList.onlyOnePlaying){
          return
        }
        let target = res.target
        let audios = document.getElementsByTagName('audio');
        [...audios].forEach((item) => {
          if(item !== target){
            item.pause()
          }
        })
      },
      // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
      onTimeupdate(res) {
//         console.log('timeupdate')
//         console.log(res)
        this.audio.currentTime = res.target.currentTime
        this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
      },
      // 当加载语音流元数据完成后，会触发该事件的回调函数
      // 语音元数据主要是语音的长度之类的数据
      onLoadedmetadata(res) {
        console.log('loadedmetadata')
        console.log(res)
        this.audio.waiting = false
        this.audio.maxTime = parseInt(res.target.duration)
      },
      // 当音频下载完成会调用此事件
      canPlayThrough(res) {
        console.log(res)
      }
    },
    filters: {
      formatSecond(second = 0) {
        return realFormatSecond(second)
      },
      transPlayPause(value) {
        return value ? '暂停' : '播放'
      },
      transMutedOrNot(value) {
        return value ? '放音' : '静音'
      },
      transSpeed(value) {
        return '快进: x' + value
      }
    },
    created() {
      this.setControlList()
//      if (this.preload === 'none') {
//        this.audio.waiting = false
//      }
      if (this.color) {
        document.body.style.setProperty('--custom-color', this.color, 'important')
      }
    },
    beforeDestroy() {
      console.log('beforeDestroy')
      this.pausePlay()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-wrap{
    padding: 0 10px;
    display: flex;
    align-items: center;
  }

  .audio-container {
    display: flex;
    align-items: center;
  }

  .audio-icon {
    width: 14px;
    height: 14px
  }
  .audio-tag {
    margin: 0 5px;
  }

  .slider {
    display: inline-block;
    width: 100px;
    position: relative;
    margin-left: 15px;
    margin-right: 10px;
  }
  .di {
    display: inline-block;
  }
  .download {
    color: #409EFF;
    margin-left: 15px;
  }
  .dn{
    display: none;
  }

  .border {
    border: 1px solid #0077db;
  }
</style>

<!-- 修改element 组件的color-->
<style>
  :root {
    --custom-color: '#0077db';
  }
  .audio-container .slider .el-slider__bar {
    background-color: var(--custom-color);
  }
  .audio-container .slider .el-slider__button {
    border-color: var(--custom-color);
  }
</style>
