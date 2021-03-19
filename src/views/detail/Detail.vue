<template>
  <div id="detail">
<!--    创建顶部导航-->
    <DetailNavBar @titleClick="titleClick" ref="nav"/>
    <Bscroll class="content" ref="scroll" @bsscroll="bScroll" :probetype="3">
      <!--      创建轮播图-->
      <DetailSwiper :topImages="topImages"/>
      <!--    商品基本信息-->
      <DetailBaseInfo :goods="goodsInfo"/>
      <!--    商家基本信息-->
      <DetailShopInfo :shop="shop" />
      <!--    商品详情展示-->
      <DetailGoodsInfo :detail-info="detailInfo" @imgload="imageLoad"/>
<!--      商品参数展示-->
      <DetailParamsInfo :params-info="paramsInfo" ref="goods"/>
<!--      评论信息展示-->
      <DetailCommentInfo :comment-info="commentInfo" ref="comment"/>
<!--      热门推荐展示-->
      <DetailRecommendInfo  :recommend-info="recommendInfo" ref="recommend"/>
    </Bscroll>
<!--    底部导航展示-->
    <DetailBottomBar @addCart="addCart"/>
    <BackTop v-show="isShowTop" @click.native="backTop"></BackTop>
  </div>
</template>

<script>
  import Bscroll from '../../components/common/better-scroll/BetterScroll'

  import {getDetailData,getRecommendData,GoodsInfo,GoodsParams} from "../../network/detail";
  import DetailNavBar from  './children-components/DetailNavBar'
  import DetailSwiper from './children-components/DetailSwiper'
  import DetailBaseInfo from './children-components/DetailBaseInfo'
  import DetailShopInfo from './children-components/DetailShopInfo'
  import DetailGoodsInfo from './children-components/DetailGoodsInfo'
  import DetailParamsInfo from './children-components/DetailParamsInfo'
  import DetailCommentInfo from './children-components/DetailCommentInfo'
  import DetailRecommendInfo from './children-components/DetailRecommendInfo'
  import DetailBottomBar from './children-components/DetailBottomBar'
  import {debounce} from   "../../commont/fangdou";
  import {backTopMixin} from "../../commont/mixin";

  export default {
    name: "Detail",
    data(){
      return{
        iid:null,
        topImages:[],
        goodsInfo:{},
        shop:{},
        detailInfo:{},
        paramsInfo:{},
        commentInfo:{},
        recommendInfo:[],
        positionY:[],
        getPositionY:null,
        currentIndex:0,

      }
    },
    mixins:[backTopMixin],
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      Bscroll,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      DetailBottomBar,
    },
    created() {
      this.iid  = this.$route.params.id
      //请求详情页基本数据
      getDetailData(this.iid).then(res => {
        console.log(res);
        let data = res.result
        //获取轮播图数据
        this.topImages = data.itemInfo.topImages
        //获取商品信息
        this.goodsInfo = new GoodsInfo(data.columns,data.itemInfo,data.shopInfo)
        //获取商家信息
        this.shop = data.shopInfo
        //获取商品的详情展示
        this.detailInfo = data.detailInfo
        //获取商品参数信息
        this.paramsInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)
        //获取评论数据
        if(data.rate.list){
          this.commentInfo = data.rate.list[0]
        }

      })
      //请求热门推荐数据
      getRecommendData().then(res => {
        console.log(res);
        this.recommendInfo = res.data.list
      })
      this.getPositionY = debounce(() => {
        this.positionY = []
        this.positionY.push(0)
        this.positionY.push(-this.$refs.goods.$el.offsetTop + 44)
        this.positionY.push(-this.$refs.comment.$el.offsetTop + 44)
        this.positionY.push(-this.$refs.recommend.$el.offsetTop + 44)
        console.log(this.positionY);
      },300)
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.bs.refresh()
        this.getPositionY()
      },
      titleClick(index){
        this.$refs.scroll.bs.scrollTo(0,this.positionY[index],1000)
      },
      bScroll(position){
        let y = position.y
        for(let i in this.positionY){
          // console.log(typeof i);
          if(this.currentIndex != i&&(y < this.positionY[+i] && y > this.positionY[+i+1]&&i<this.positionY.length-1 || i==this.positionY.length-1&&y<this.positionY[+i])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = i
            console.log(i);
          }
        }
        this.getBackTopShow(position)
      },
      addCart(){
        //获取购物车需要展示的信息
        let cartInfo = {}
        cartInfo.img = this.topImages[0]
        cartInfo.title = this.goodsInfo.title
        cartInfo.desc = this.goodsInfo.desc
        cartInfo.price = this.goodsInfo.highNowPrice
        cartInfo.iid = this.iid
        //将商品加入到购物车
        this.$store.dispatch('addCart',cartInfo)
      }


    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 104px);
  }
</style>
