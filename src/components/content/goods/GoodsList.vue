<template>
  <div class="goods">
    <GoodsListItem v-for="(item,index) in goods":key="index" :goodsitem="item" @imageload="imageLoad"></GoodsListItem>
  </div>
</template>

<script>
  import GoodsListItem from './GoosListItem'
  export default {
    name: "GoodsList",
    props:{
      goods:{
        type:Array,  //30个数组项
        default(){
          return []
        }
      }
    },
    components:{
      GoodsListItem
    },
    methods:{
      imageLoad(){
        this.$emit('imageload')
      }
    }

  }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 3px 3px 50px 3px;
  }
</style>
