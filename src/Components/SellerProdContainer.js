import React, { Component } from 'react';
import AddProduct from './AddProduct';
import { connect } from 'react-redux'


class SellerProdContainer extends Component {

  sellersProducts = () => {
    return this.props.product.filter(product => {
      return product["seller_id"] === this.props.currentUser["user_id"]
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
        <img src={productInfo.image} />
      </div>
    })
  }


  render() {
    return(
      <React.Fragment>
        {this.sellersProducts()}
        <AddProduct />
      </React.Fragment>
    )
  }
}


const mapStateToProps = ({user}) => {
  return {
    currentUser: user.user
  }
}


export default connect(mapStateToProps)(SellerProdContainer);
