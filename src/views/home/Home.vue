<template>
  <div id="home">
    <Navbar class="nav-bar">
      <div slot="center">蘑菇街</div>
    </Navbar>
    <TabControl :titles="['流行','新款','精选']" class="tab-control" @tabclick="tabClick"
                v-show="isTabFixed" ref="tabFixed">
    </TabControl>
    <BetterScroll :click="true" :pullupload="true" :probetype="3" class="better-scroll1"
                  ref="scroll"
                  @bsscroll="homeScroll" @pullingup="loadMore">
      <HomeSwiper :banners="banners"></HomeSwiper>
      <home-recommend :recommend="recommend" />
      <HomePopular />
      <TabControl :titles="['流行','新款','精选']" class="tab-control" @tabclick="tabClick"
                  v-show="!isTabFixed" ref="tabContent"></TabControl>
      <GoodsList :goods="goods[currentType].list" @imageload="imageLoad"></GoodsList>
    </BetterScroll>
    <BackTop v-show="isShowTop" @click.native="backTop"></BackTop>
  </div>
</template>

<script>
  //公共组件
  import Navbar from '../../components/common/nav-bar/Navbar'
  import TabControl from '../../components/content/tabControl/TabControl'
  import GoodsList from '../../components/content/goods/GoodsList'
  import BetterScroll from '../../components/common/better-scroll/BetterScroll'
  import {backTopMixin} from "../../commont/mixin";

  //home的子组件
  import HomeSwiper from './children-components/HomeSwiper'
  import {getHomeMultidata,getHomeGoods} from "../../network/home";
  import HomeRecommend from './children-components/HomeRecommend'
  import HomePopular from './children-components/HomePopular'

  export default {
    name: "Home",
    mixins:[backTopMixin],
    data(){
      return {
        banners:[], //轮播图数据
        recommend:[], //推荐数据
        goods:{ //详细列表展示数据
          pop:{page:0,list:[]}, //流行数据
          new:{page:0,list:[]}, //新款数据
          sell:{page:0,list:[]} //精选数据
        },
        currentType:'pop', //用于保存当前选中项
        isTabFixed:false,  //用于代替的tabControl的显示与隐藏
      }
    },
    components:{
      Navbar,
      HomeSwiper,
      HomeRecommend,
      HomePopular,
      TabControl,
      GoodsList,
      BetterScroll,
    },
    created() {
      //请求轮播及推荐数据
      this.getHomeMultiData()
      //请求所有goods中的数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods:{
      //网络请求相关的方法
        //封装请求轮播及推荐数据的方法
      getHomeMultiData(){
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommend = res.data.recommend.list
        })
      },
        //封装请求goods数据的方法
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishpullup()
        }).catch(err => {
          this.$refs.scroll.finishpullup()
        })
      },
      //常规事件处理的方法
        //tabControl的点击执行事件
      tabClick(index){
        switch (index) {
          case 0 : this.currentType = "pop"
            break
          case 1 : this.currentType = 'new'
            break
          case 2 : this.currentType = 'sell'
        }
        this.$refs.tabFixed.currentIndex = index
        this.$refs.tabContent.currentIndex = index
    },
        //goods图片完全加载事件
      imageLoad(){
        this.$refs.scroll.bs.refresh()
      },
        // home页的滚动监听事件
      homeScroll(position){
        // console.log(position);
        this.isTabFixed = position.y < -651
        this.getBackTopShow(position)
      },

        // 上拉加载更多事件
      loadMore(){
        this.getHomeGoods(this.currentType)
      }
    }
  }

</script>

<style scoped>
  #home{
    height:100vh;
  }
  .nav-bar{
    background: hotpink;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
  .tab-control{
    /*position: sticky;*/
    /*top: 44px;*/
    /*z-index: 10;*/
  }
  .better-scroll1{
    height: calc(100% - 94px);
    overflow: hidden;
  }
</style>


