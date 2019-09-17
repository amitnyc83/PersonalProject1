export function fetchProducts() {
  return (dispatch) => {
    return  fetch(`http://localhost:3001/products`)
      .then(response => response.json())
      // .then(data => console.log(data))
      .then((data) => dispatch({type: "FETCH_PRODUCTS", payload: data}))

  }
}
