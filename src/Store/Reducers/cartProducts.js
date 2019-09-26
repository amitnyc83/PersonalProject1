const inititalState = {
  cartProducts: []
}

const reducer = (state = inititalState, action ) => {
  switch(action.type) {
    case "ADD_PRODUCT_CART":
    const productToCart = action.payload
    console.log(productToCart)
    return {cartProducts: [...state.cartProducts.carts, productToCart]}

    case "FETCH_CART":
    const fetchedCart = action.payload
    return {cartProducts: fetchedCart}

    default:
    return state
  }
}




export default reducer;
