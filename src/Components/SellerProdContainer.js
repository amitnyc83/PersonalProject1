import React, { Component } from 'react';
import AddProduct from './AddProduct';
import { connect } from 'react-redux';
import { sellerDeleteProduct } from '../Store/Actions/product_action'



class SellerProdContainer extends Component {


  deleteOwnProduct = (e, product) => {
    e.preventDefault()
    this.props.sellerDeleteProduct(product)
    fetch(`http://localhost:3001/products/${product.id}`, {
      method: "delete"
    }).then(response => response.json())
    .then(resp => console.log(resp))
  }


  sellersProducts = () => {
    return this.props.product.filter(product => {
      return product["seller_id"] === this.props.currentUser["user_id"]
    }).map(productInfo => {
      return <div class="main-sellerpage-container">
        <label class="label-seller-product-brand-info">Brand:</label>
        <span class="seller-product-info-brand"> {productInfo.brand} </span>
        <br></br>
        <label class="label-seller-product-info">Name:</label>
        <span class="seller-product-info"> {productInfo.name} </span>
        <br></br>
        <label class="label-seller-product-info">Price:</label>
        <span class="seller-product-info"> ${productInfo.price} </span>
        <br></br>
        <label class="label-seller-product-info">Description:</label>
        <span class="seller-product-description"> {productInfo.description} </span>
        <br></br>
        <label class="label-seller-product-brand-info">Cost:</label>
        <span class="label-seller-product-brand"> ${productInfo.cost} </span>
        <br></br>
        <label class="label-seller-product-brand-info">Profit Margin/item</label>
        <span class='label-seller-product-brand'>{((productInfo.cost / productInfo.price) * 100).toFixed(2)}%</span>
        <img class="seller-product-info-image" src={productInfo.image} />
         <button class="seller-deletebutton" onClick={(e) => this.deleteOwnProduct(e, productInfo)}>Delete</button>
      </div>
    })
  }


  render() {
    let totalProducts;
    if(this.props.currentUser) {
      totalProducts = this.props.product.map(product => product.seller_id === this.props.currentUser["user_id"]).filter (product => product === true).length
    }
    return(
      <React.Fragment>
        <p class="seller-username">{this.props.currentUser.username}</p>
        <AddProduct />
        <p class="seller-currentProducts">{this.props.currentUser.username} Current Products</p>
        <p class="seller-totalProducts">Total Amount of Products: {totalProducts}</p>
        {this.sellersProducts()}
      </React.Fragment>
    )
  }
}


const mapStateToProps = ({user}) => {
  return {
    currentUser: user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sellerDeleteProduct: (deletedProduct) => dispatch({
      type: "DELETE_PRODUCT",
      payload: deletedProduct
    })
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SellerProdContainer);
