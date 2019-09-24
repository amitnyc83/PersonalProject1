import React, { Component } from 'react';
import AddProduct from './AddProduct'


class SellerProdContainer extends Component {

sellersProducts = () => {
  return this.props.product.filter(product => {
    return product["seller_id"] === 1
  }).map(productInfo => {
    return <div>
      <label>Name</label>
      <h5> {productInfo.name}</h5>
      <label>Price</label>
      <h5> {productInfo.price}</h5>
      <label>Description</label>
      <h5> {productInfo.description}</h5>
      <label>Brand</label>
      <h5> {productInfo.brand}</h5>
    </div>
  })
}


render() {
  console.log(this.props.product)
  return(
    <React.Fragment>
     {this.sellersProducts()}
    <AddProduct />
    </React.Fragment>
  )
}
}

export default SellerProdContainer;
