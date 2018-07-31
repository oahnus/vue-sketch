<style scoped="">

</style>

<template>
  <div>
    <o-audio :src="url"
             :theControlList="controlList"
             displayType="text"
             border
    ></o-audio>
    <audio :src="url" controls></audio>
  </div>
</template>

<script>
  import Audio from '../components/Audio/Audio.vue'

  export default {
    components: {
      'o-audio': Audio
    },
    props: {},
    data() {
      return {
//        url: 'https://ks3-cn-beijing.ksyun.com/yimi-record-1-year/15751774919_17621206740_3_20180522_145101_145122_21_3611483.mp3?Expires=1526979138&response-content-type=application%2Foctet-stream&response-content-disposition=attachment%3B%20filename%3D15751774919_17621206740_3_20180522_145101_145122_21_3611483.mp3&KSSAccessKeyId=AKLT0ChC2dqZRK6viMM8BwGZLQ&Signature=4Mpv%2BXka0qv06wjElwCLYdy2WJE%3D',
        url: 'https://mp3-1253653901.cos.ap-shanghai.myqcloud.com/%E5%A4%A7%E8%AF%9D%E8%A5%BF%E6%B8%B8%20-%20%E4%B8%AD%E5%9B%BD%E6%AD%8C%E5%89%A7%E8%88%9E%E5%89%A7%E9%99%A2%E4%BA%A4%E5%93%8D%E4%B9%90%E5%9B%A2.mp3',
//        controlList: 'onlyOnePlaying noVolume noMuted noDownload noProgress noTime',
        controlList: 'onlyOnePlaying',
      }
    },
    created() {
    },
    mounted() {
    },
    updated() {
    },
    methods: {},
    filters: {},
    computed: {},
    watch: {}
  }
</script>
