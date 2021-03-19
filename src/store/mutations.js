export default {
  //每一个方法尽可能地只处理一件事情
  addToCart(state,payload){
    payload.check = true
    payload.count = 1
    state.cartList.push(payload)
  },
  addCount(state,payload){
    payload.count += 1
    // state.cartList[state.cartList.indexOf(payload)] = payload
  },
  changeCheck(state,payload){
    payload.check = !payload.check
  },
  clearCheck(state){
    state.cartList.forEach(item => item.check=false)
  },
  allCheck(state){
    state.cartList.forEach(item => item.check=true)
  }
}
