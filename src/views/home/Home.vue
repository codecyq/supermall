<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control  :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabcontrol1"
                  class="tab-control"v-show="isTabFixed"
    ></tab-control>

    <scroller class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperItemLoad="swiperItemLoad"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature-view></home-feature-view>
      <tab-control  :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabcontrol2"

      ></tab-control>
      <goods-list  :goods="showGoods"></goods-list>
      <back-top  @click.native="backClick"></back-top>
    </scroller>




  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommend from "./childComps/HomeRecommend";
  import HomeFeatureView from "./childComps/HomeFeatureView";
  import TabControl from "../../components/contents/tabControl/TabControl";
  import GoodsList from "../../components/contents/good/GoodsList";
  import Scroller from "../../components/common/scroller/Scroller";
  import BackTop from "../../components/contents/backTop/BackTop";



  import {getHomeMultiData,getHomeGoods} from "../../network/home"

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomeFeatureView,
      TabControl,
      GoodsList,
      Scroller,
      BackTop

    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},

        },
        currentType: 'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    computed:{
      showGoods() {
        return this.goods[this.currentType].list
      },
      isTabFixed() {
        return this.offsetTop >= this.tabOffsetTop;
      }
    },
    created() {
      this.getHomeMultiData();


      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

      this.$bus.$on('itemImageLoad',() =>{

      })
    },
    mounted() {
      const refresh =this.debounce(this.$refs.scroll.refresh,200)

      this.$bus.$on('itemImageLoad',() =>{
        refresh()

      })
      this.tabOffsetTop=this.$refs.tabcontrol2.$el.offsetTop

    },
    methods: {

      debounce(func,delay){
        let timer=null
        return function (...args) {
          if (timer) clearTimeout(timer)
          timer=setTimeout(() =>{
            func.apply(this,args)
          },delay)
        }
      },
      backClick(){
      this.$refs.scroll.scrollTo(0,0)
      },

      getHomeMultiData() {
        getHomeMultiData().then(res => {

            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;

          }
        )
      },

      getHomeGoods(type){
        const page =this.goods[type].page+1;
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page+=1;
      })
      },

      tabClick(index){
        switch (index) {
            case 0: this.currentType='pop'
                break;
            case 1:this.currentType='new'
                break;
            case 2:this.currentType='sell'
                break;
        }
        this.$refs.tabcontrol1.currentIndex=index;
        this.$refs.tabcontrol2.currentIndex=index;

      },

      contentScroll(position){
        this.isShowBackTop=(-position.y)>1000

        this.isTabFixed=(-position.y)>this.tabOffsetTop
      },

      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperItemLoad(){
        console.log(this.$refs.tabControl.$el.offsetTop)
      }

    },
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },

    deactivated() {
      this.saveY=this.$refs.scroll.getScrollY()
    }
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: white;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.fixed{*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*}*/
</style>
