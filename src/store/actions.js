export default {
  addCart(context,payload){
    let oldCartInfo = context.state.cartList.find((item) => item.iid == payload.iid)
    if(oldCartInfo){
      context.commit('addCount',oldCartInfo)
    }else{
      context.commit('addToCart',payload)
    }
  }
}
