const initialState = {
  allProducts: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "FETCH_PRODUCTS":
    const fetchedProducts = action.payload
    return {allProducts: fetchedProducts}



    case "ADD_PRODUCT":
    const newproduct = action.payload
    return {allProducts: [...state.allProducts, newproduct]}


    case "DELETE_PRODUCT":
    let filteredArray = state.allProducts.filter(product => {
      return product.id !== action.payload.id
    })
    return {
      allProducts: filteredArray
    }


    default:
    return state
  }



}


export default reducer;
