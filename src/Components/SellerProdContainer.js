import React, { Component } from 'react';
import AddProduct from './AddProduct';
import { connect } from 'react-redux';
import { sellerDeleteProduct } from '../Store/Actions/product_action'



class SellerProdContainer extends Component {

  state = {
    name: null,
    price: null,
    description: null,
    brand: null,
    cost: null,
    quantity: null
  }

  handleChange = (event, productInfo) => {
    this.setState({
      name: productInfo.name,
      price: productInfo.price,
      description: productInfo.description,
      brand: productInfo.brand,
      cost: productInfo.cost,
      quantity: productInfo.quantity
    })
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleUpdateSubmit = (e, product) => {
    e.preventDefault()
    fetch(`http://localhost:3001/products/${product.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Accepts: "application/json"
    },
    body: JSON.stringify({
      name: this.state.name,
      brand: this.state.brand,
      price: this.state.price,
      description: this.state.description,
      cost: this.state.cost,
      quantity: this.state.quantity
    })
  }).then(resp => resp.json())
    .then(response => console.log(response))
  }


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
        <form  className="seller-update-form" onSubmit={(e) => this.handleUpdateSubmit(e, productInfo)}>
          <label class="label-seller-product-info">Name:</label>
          <input class="seller-product-info" placeholder={productInfo.name}  onChange={(event) => this.handleChange(event, productInfo)} name="name"/>
          <br></br>
          <label class="label-seller-product-info">Price:$</label>
          <input class="seller-product-info-price" placeholder={productInfo.price}  onChange={(event) => this.handleChange(event, productInfo)} name="price" />
          <br></br>
          <label class="label-seller-product-brand-info">Brand:</label>
          <input class="seller-product-info-brand" placeholder={productInfo.brand} onChange={(event) => this.handleChange(event, productInfo)} name="brand"/>
          <br></br>
          <label class="label-seller-product-info">Description:</label>
          <textarea class="seller-product-description" placeholder={productInfo.description} onChange={(event) => this.handleChange(event, productInfo)} name="description"/>
          <br></br>
          <label class="label-seller-product-brand-info">Cost:$</label>
          <input class="seller-product-info-price" placeholder={productInfo.cost} onChange={(event) => this.handleChange(event, productInfo)} name="cost"/>
          <br></br>
          <label class="label-seller-product-brand-info">Profit Margin per Item:</label>
          <span class="seller-product-info-brand">{((( productInfo.price - productInfo.cost )/ productInfo.price) * 100).toFixed(2)}%</span>
          <br></br>
          <label class="label-seller-product-brand-info">Current Quantity:</label>
          <input class="seller-product-info-price" placeholder={productInfo.quantity} onChange={(event) => this.handleChange(event, productInfo)} name="quantity"/>
          <br></br>
          <img class="seller-product-info-image" src={productInfo.image} />
          <button class="seller-editbutton" >Update</button>
        </form>
        <div className="deletebutton-div">
          <button class="seller-deletebutton" onClick={(e) => this.deleteOwnProduct(e, productInfo)}>Delete</button>
        </div>
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
