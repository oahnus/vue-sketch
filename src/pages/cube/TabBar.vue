<style scoped>
  #tab-bar{
    width: 100vw;
    overflow: hidden;
    padding:5px;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }
  .tab-content{
    display: flex;
    padding-left: 15px;
  }
  .tab-item{
    flex: 0 0 60px;
    width:60px;
    list-style: none;
  }
</style>

<template>
  <div id="tab-bar" ref="tabBar" v-bind:style="{height: tabBarHeight, lineHeight: tabBarHeight}">
    <div class="tab-content" ref="tabContent">
      <div class="tab-item" @click="clickTab(item, index)" v-for="(item, index) in tabItems" ref="tabItem">
        <div v-if="type === 'text'">
          {{ item }}
        </div>
        <div v-if="type === 'obj'">
          {{item[objPropName]}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    components: {},
    props: {
      tabItems: {
        type: Array,
        default: []
      },
      type: {
        type: String,
        default: 'text' // text object
      },
      objPropName: {
        type: String,
        default: 'title'
      },
      height: {
        type: String,
        default: '40px'
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
    methods: {
      clickTab(item, index) {
        this.$emit('click', item, index)
      },
      initTabScroll(){
        let width=0
        for (let  i = 0; i <this.tabItems.length; i++) {
          width += this.$refs.tabItem[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
        }
        this.$refs.tabContent.style.width=width+'px'
        this.$nextTick(()=>{
          if (!this.scroll) {
            this.scroll=new BScroll(this.$refs.tabBar, {
              startX:0,
              click:true,
              scrollX:true,
              scrollY:false,
              eventPassthrough:'vertical',
            });
          }else{
            this.scroll.refresh()
          }
        });
      }
    },
    filters: {},
    computed: {
      tabBarHeight() {
        if (typeof(this.height) === 'string') {
          return this.height
        } else {
          return this.height + 'px'
        }
      }
    },
    watch: {
      '$route'(to, from) {
      }
    },
    created() {
      this.$nextTick(()=>{
        this.initTabScroll()
      })
    },
    mounted() {
    },
    updated() {
    },
  }
</script>
