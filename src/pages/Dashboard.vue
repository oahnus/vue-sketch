<style scoped="">
  /* -------------------- Page Styles (not required) */
  div { margin: 20px; }

</style>

<style lang="less">
  #dashboard {
    .el-card__body {
      padding: 10px;
    }
  }
</style>

<style lang="less">
  #dashboard {
    color: #333;

    .header {
      display: flex;
      flex: 1;
      justify-content: center;
      height: 30px;
      align-items: center;
      font-size: 30px;
      font-weight: 800;
    }

    .container {
      display: flex;
      flex-direction: column;
      border: 1px solid #6cf;

      .title {
        font-size: 20px;
      }

      .content {
        display: flex;
        border: 1px solid #7cf;

        .card-item {
          width: 22%;
          max-width: 250px;
          min-width: 200px;
          margin: 10px 1%;
          height: 100px;
          cursor: pointer;

          .card-name {
            font-size: 16px;
            color: #6CF;
            margin: 0;
          }
          .card-desc {
            margin: 10px 0;
            font-size: 14px;
          }
        }
        flex-wrap: wrap;
      }

      .vue-components-con {

      }
      .native-con {

      }
    }
  }
</style>

<template>
  <div id="dashboard">
    <div class="header">
      DashBoard
    </div>
    <div class="container">
      <div v-for="navigator in navigators" :key="navigator.title">
        <div class="title">{{navigator.title}}</div>
        <div class="content">
          <el-card class="card-item"
                   v-for="item in navigator.children"
                   :key="item.name"
                   @click.native="selectCard(item.path)">
            <div class="card-name">█ {{item.name}}</div>
            <div class="card-desc">
              {{item.desc}}
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <!--<router-link to="/ElemeFEPopup">Blu-Aside</router-link><br>-->
    <!--<router-link to="/ElemeFEDialog">ElemeFE-Dialog</router-link><br>-->
    <!--<router-link to="/Audio">ElemeFE-Audio</router-link><br>-->
    <!--<router-link to="/FileUpload">ElemeFE-Upload</router-link><br>-->
    <!--<router-link to="/MarqueeTips">Marquee</router-link><br>-->
    <!--<router-link to="/LoginDemo">LoginDemo</router-link><br>-->
    <!--<router-link to="/1024">Img 1024</router-link><br>-->
    <!--<router-link to="/markdown">MarkdownJs</router-link><br>-->
    <!--<router-link to="/scroll">BetterScroll</router-link><br>-->

  </div>
</template>

<script>
  import Originator from '../domain/memento/originator'
  import CareTaker from '../domain/memento/catetaker'

  export default {
    components: {
    },
    props: {},
    data() {
      return {
        selected: '',
        countries: [
          {
            countryName: '中国',
            value: 'China'
          }
        ],

        navigators: {
          vue: {
            title: 'Vue Components',
            children: [
              {
                path: '/aside',
                name: '侧边展开栏',
                desc: '利用模态框实现的弹出侧边栏'
              },
              {
                path: '/eleAudio',
                name: 'Audio 组件',
                desc: 'Based On ElementUI'
              },
              {
                path: '/scanner',
                name: 'Scanner',
                desc: '扫描仪demo'
              },
              {
                path: '/calendar',
                name: 'Calendar',
                desc: '日历'
              },

            ]
          },
          native: {
            title: 'Native HTML-CSS-JS',
            children: [
              {
                path: '/native/styledSelect',
                name: '带样式的原生select',
                desc: '原生select美化'
              },
            ]
          },
          mobile: {
            title: 'Mobile',
            children: [
              {
                path: '/mobile/scrollTabBar',
                name: '滑动TabBar',
                desc: 'TabBar Vue Component Base On BScroll.js'
              },
            ],
          }
        }
      }
    },
    created() {
      this.testMementoPattern()

      this.testClipboard()
    },
    mounted() {
    },
    updated() {
    },
    beforeRouteUpdate() {
    },
    methods: {

      selectCard(routerPath) {
        console.log('%c[Home-selectCard]', 'color: #63ADD1', routerPath)
        this.$router.push(routerPath)
      },

      testClipboard() {
        navigator.clipboard.readText()
                .then(text => {
                  console.log('Pasted content: ', text);
                })
                .catch(err => {
                  console.error('Failed to read clipboard contents: ', err);
                });
      },

      testMementoPattern() {
        let o = new Originator()
        let c = new CareTaker()
        console.log(c)
        o.setState('state1')
        o.setState('state2')
        let m = o.createMemento()
        c.saveMemento(m)
        o.setState('state3')
        console.log(o.getState())
        c.saveMemento(o.createMemento())
        console.log(c)
        o.setState('state4')
        c.saveMemento(o.createMemento())
        o.restoreMemento(c.retire(2))
        console.log(o.getState())

      }
    },
    filters: {},
    computed: {},
    watch: {}
  }
</script>
