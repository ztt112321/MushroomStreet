<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <Bscroll class="content" :click="true">
      <cart-list />
    </Bscroll>

    <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from '../../components/common/nav-bar/Navbar'
  import Bscroll from '../../components/common/better-scroll/BetterScroll'

  import CartList from './children-components/CartList'
  import CartBottomBar from './children-components/CartBottomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar,
      Bscroll
    },
    computed:{
      ...mapGetters({
        length:'cartLength',
        list:'cartList'
      })
    }
  }
</script>

<style scoped>
  .nav-bar{
    background: hotpink;
    color: #fff;
  }
.cart{
  height: 100vh;
}
  .content{
    height: calc(100% - 138px);
  }
</style>
