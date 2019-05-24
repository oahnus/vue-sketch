<style scoped>
  #Excel {
  }
</style>

<template>
  <div id="Excel">
    <input type="file" ref="fileInput" v-on:change="change">

    <div id="content" v-html="table"></div>
  </div>   
</template>

<script>
  /**
   * Live Template 0.0.2
   * 2019/4/24
   * Excel
   *
   */
  export default {
    components: {},
    props: {},
    data() {
      return {
        // visible

        // options

        // form

        // data
        file: null,
        table: ''

      }
    },
    computed: {
    },
    created() {
      // this.fetchData()
      // this.$nextTick(() => {})
    },
    mounted() {
    },
    methods: {
      // handler

      // biz

      // ui

      // api
      async change() {
        console.log('%c[Excel-change]', 'color: #68E868', )
        let f = this.$refs.fileInput.files[0]

        console.log('%c[Excel-change]', 'color: #63ADD1', f)
        let vm = this
        let fileReader = new FileReader()
        fileReader.onload = function(e) {
          let data = e.target.result;
          let workbook = XLSX.read(data, {type: 'binary'});
          let sheet_name_list = workbook.SheetNames;
          let result = [];
          let headItem=[];
          let dataItem=[];
          let dataFormulae=[];
          let dataCsv=[];
          let headCode=[];
          let rowNum=0;
          sheet_name_list.forEach(function(y) {
            let worksheet = workbook.Sheets[y];
            let json = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
            let formulae = XLSX.utils.sheet_to_formulae(workbook.Sheets[y]);
            let csv = XLSX.utils.sheet_to_formulae(workbook.Sheets[y]);
            if(json.length > 0){
              result=json;
              dataCsv=csv;
            }
          });
          console.log('%c[Excel-onload]', 'color: #63ADD1', dataCsv)

          dataCsv.forEach(d => {
            let headlist = d.split("='")
            rowNum=/^[A-Z]+(\d+)$/.exec(headlist[0])[1];
            headCode.indexOf(/^([A-Z]+)\d+$/.exec(headlist[0])[1])==-1?headCode.push(/^([A-Z]+)\d+$/.exec(headlist[0])[1]):'';
          })

          headCode=headCode.sort();

          headCode.forEach(head => {
            headItem[head]='';
          })

          for(let i=0;i<Number(rowNum)-1;i++){
            let obj={};
            headCode.forEach(head => {
              obj[head] = ''
            })

            dataItem[i]=obj;
          }

          dataCsv.forEach(d => {
            let headlist=d.split("='")
            let code= /^([A-Z]+)\d+$/.exec(headlist[0])[1];
            let row= /^[A-Z]+(\d+)$/.exec(headlist[0])[1];
            if(row==1){
              headItem[code]=headlist[1]
            }else{
              dataItem[row-2][code]=headlist[1];
            }
          })

          let headstr='';
          let datastr='';

          headItem.forEach(head => {
            headstr=headstr+'<th style="border: 1px solid #cccccc">'+head+'</th>'
          })

          dataItem.forEach(d => {
            datastr=datastr+'<tr >';
            console.log('%c[Excel-d]', 'color: #63ADD1', d)
            Object.keys(d).forEach(key => {
              datastr=datastr+'<td style="border: 1px solid #cccccc">'+d[key]+'</td>'
            })
            datastr=datastr+'</tr>';
          })

          let table='<table style="border: 1px solid #cccccc;border-collapse: collapse;"><thead><tr style="font-weight: bold">'+headstr+'</tr></thead><tbody>'+datastr+ '</tbody></table>'


          vm.table = table
        };
        fileReader.readAsBinaryString(f);
      }
    },
    watch: {
      '$route'(to, from) {
      }
    },
  }
</script>
