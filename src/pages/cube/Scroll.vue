<template>

  <div>
    <div class="tab" ref="tab">
      <ul class="tab_content" ref="tabWrapper">
        <li class="tab_item" @click="clickTab" v-for="item in itemList" ref="tabitem">
          {{item.title}}
        </li>
      </ul>
    </div>

    <div style="width: 300px;">
      <o-tab-bar @click="tabClick" type="obj" obj-prop-name="title" :tab-items="itemList"></o-tab-bar>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';

  import TabBar from './TabBar'

  export default {
    components: {
      'o-tab-bar': TabBar
    },
    data() {
      return{
        itemList:[
          {'title':'新时代'},
          {'title':'娱乐'},
          {'title':'头条号'},
          {'title':'问答'},
          {'title':'图片'},
          {'title':'科技'},
          {'title':'体育'},
          {'title':'财经'},
          {'title':'军事'},
          {'title':'国际'}
        ]
      }
    },
    created() {
      this.$nextTick(() => {
        this.InitTabScroll();
      });
    },
    methods:{
      tabClick(item, idx) {
        alert(item + '' + idx)
      },
      clickTab() {
        console.log('sfsfsd')
      },
      InitTabScroll(){
        let width=0
        for (let  i = 0; i <this.itemList.length; i++) {
          width+=this.$refs.tabitem[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
        }
        this.$refs.tabWrapper.style.width=width+'px'
        this.$nextTick(()=>{
          if (!this.scroll) {
            this.scroll=new BScroll(this.$refs.tab, {
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
    }
  };
</script>
<style scoped>
  .tab{
    width: 100vw;
    overflow: hidden;
    padding:5px;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }
  .tab_content{
    line-height: 2rem;
    display: flex;
  }
  .tab_item{
    flex: 0 0 60px;
    width:60px;
    list-style: none;
  }
</style>
