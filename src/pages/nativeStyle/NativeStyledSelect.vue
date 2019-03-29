<style scoped lang="less">

  #native-styled-select {

    margin: 30px;

    .styled-select select {
      background: #3b8ec2;
      color: #fff;
      border: none;
      font-size: 14px;
      height: 29px;
      padding: 5px; /* If you add too much padding here, the options won't show in IE */
      width: 10px;
    }

    .semi-square {
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
    }

    /* -------------------- Colors: Text */
    /*.blue select    { color: #fff; }*/
  }

</style>

<template>
  <div id="native-styled-select">
    <div class="styled-select blue semi-square" style="width: 100px">
      <label>
        <select style="width: 100px">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </label>
    </div>
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
    methods: {},
    computed: {},
    watch: {
      '$route'(to, from) {
      }
    },
    created() {
    },
    mounted() {
    },
  }
</script>
