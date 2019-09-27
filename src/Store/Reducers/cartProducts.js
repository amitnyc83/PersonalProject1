const inititalState = {
  cartProducts: []
}

const reducer = (state = inititalState, action ) => {
  switch(action.type) {
    case "ADD_PRODUCT_CART":
    const productToCart = action.payload
    const addArray = [...state.cartProducts.carts, productToCart]
    return {cartProducts: {carts: addArray}}

    case "FETCH_CART":
    const fetchedCart = action.payload
    let filteredCurrentCarts = fetchedCart.carts.filter(cart => cart.ordered === false)
    return {cartProducts: {carts:filteredCurrentCarts}}

    case "DELETE_CART":
    const newArray = state.cartProducts.carts.filter(cart => {
      return cart !== action.payload
    })
    return {cartProducts: {carts: newArray}}

    case "CART_ORDERED":
    return {cartProducts: {carts: []}}

    default:
    return state
  }
}




export default reducer;
