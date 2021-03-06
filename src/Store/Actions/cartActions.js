export const addProductCart = (cartProduct) => {
  return {
    type: "ADD_PRODUCT_CART",
    payload: cartProduct
  }
}

export const deletedCart = (cart) => {
  return {
    type: "DELETE_CART",
    payload: cart
  }
}

export const cartOrdered = () => {
  return {
    type: "CART_ORDERED",
    payload: []
  }
}



export function fetchCart() {
  return (dispatch) => {
    return  fetch(`http://localhost:3001/carts`)
      .then(response => response.json())
      .then((data) => dispatch({type: "FETCH_CART", payload: data}))
  }
}
