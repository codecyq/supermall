<template>
  <detail-nav-bar></detail-nav-bar>
</template>

<script>
  import DetailNavBar from "./childComponents/DetailNavBar";
  import {getDetail} from "../../network/detail";

  export default {
        name: "Detail",
      components:{
        DetailNavBar
      },

      data(){
          return{
            iid:null
          }

      },
      created(){
          this.iid=this.$route.params.iid
        getDetail(this.iid).then(res =>{
          console.log(res)
        })
      }
    }
</script>

<style scoped>

</style>
