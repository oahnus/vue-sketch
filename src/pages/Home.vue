<style scoped="">
  /* -------------------- Page Styles (not required) */
  div { margin: 20px; }


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


</style>

<template>
  <div>
    <router-link to="/ElemeFEPopup">Blu-Aside</router-link><br>
    <router-link to="/ElemeFEDialog">ElemeFE-Dialog</router-link><br>
    <router-link to="/Audio">ElemeFE-Audio</router-link><br>
    <router-link to="/FileUpload">ElemeFE-Upload</router-link><br>
    <router-link to="/MarqueeTips">Marquee</router-link><br>
    <router-link to="/LoginDemo">LoginDemo</router-link><br>
    <router-link to="/1024">Img 1024</router-link><br>
    <router-link to="/markdown">MarkdownJs</router-link><br>
    <router-link to="/scroll">BetterScroll</router-link><br>

    <select id="soflow-color">
      <!-- This method is nice because it doesn't require extra div tags, but it also doesn't retain the style across all browsers. -->
      <option>Select an Option</option>
      <option>Option 1</option>
      <option>Option 2</option>
    </select>

    <div class="styled-select blue semi-square" style="width: 100px">
      <select  style="width: 100px">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </div>
  </div>
</template>

<script>
  import Select from '../components/select/SelectDemo'

  import Originator from '../domain/memento/originator'
  import CareTaker from '../domain/memento/catetaker'

  export default {
    components: {
      'o-select': Select
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
        ]
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
