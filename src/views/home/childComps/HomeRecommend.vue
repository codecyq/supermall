<template>
  <div class="home-recommend" >
      <div class="home-recommend-item" v-for="item in recommends">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .home-recommend{
  display: flex;
    width: 100%;
    text-align: center;
    border-bottom: 10px solid #eeeeee;
    padding: 5px;
  }
.home-recommend-item{
  flex: 1;
}
  .home-recommend-item img{
    height: 65px;
    width: 70px;
    border-radius: 100%;
  }

</style>
