<style scoped lang="less">

</style>

<template>
  <div>
    <!--<card header footer></card>-->
    <b-card>
      <div>
        长安一片月，万户捣衣声
      </div>
    </b-card>
  </div>
</template>

<script>
  import Card from '../components/mobile/Card'
  import BCard from '../components/mobile/BCard'

  export default {
    components: {
      Card,
      'b-card': BCard
    },
    props: {
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
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
    methods: {},
    computed: {},
    watch: {
      '$route'(to, from) {
      }
    },
    created() {
    },
  }
</script>
