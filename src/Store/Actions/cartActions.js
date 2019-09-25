export const addProductCart = (cartProduct) => {
  console.log("cart_action", cartProduct)
  return {
    type: "ADD_PRODUCT_CART",
    payload: cartProduct
  }
}
