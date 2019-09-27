const initialState = {
  allProducts: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "FETCH_PRODUCTS":
    const fetchedProducts = action.payload
    return {...state,allProducts: fetchedProducts}


    case "ADD_PRODUCT":
    const newproduct = action.payload
    return {...state, allProducts: [...state.allProducts, newproduct]}



    default:
    return state

  }



}


export default reducer;
