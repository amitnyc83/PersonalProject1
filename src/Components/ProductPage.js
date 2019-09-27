import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProductCart } from '../Store/Actions/cartActions'


class ProductPage extends Component {

  state = {
    selectedProduct: "",
    quantitySelected: ""
  }


  handleChange = (event, product) => {
    console.log(event.target.value, product)
    this.setState({
      quantitySelected: event.target.value
    })
  }


  handleSubmit = (e, cartProduct) => {
    e.preventDefault()
    cartProduct["quantity"] = this.state.quantitySelected
    console.log(cartProduct)
    this.setState({
      selectedProduct: cartProduct
    })

    this.props.addProductCart(cartProduct)

    fetch(`http://localhost:3001/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: cartProduct.name,
        quantity: cartProduct.quantity,
        total_price: 10,
        ordered: false,
        user_id: this.props.currentUser.user_id,
        product_id: cartProduct.id
      })
    }).then(response => response.json())
    .then(cart => {
      this.props.addProductCart(cart)
    })
  }


  render(){
    // console.log(this.props.product)
    const {product} = this.props
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e, product)}>
         <div>Name: {product.name}</div>
         <div>Price: {product.price}</div>
         <div>Quantity: {product.quantity}</div>
         <div><img src={product.image}/></div>
         <input value={this.state.value} type="text" onChange={(event) => this.handleChange(event, product)} />
         <button class="ui basic button"><i class="shop icon"></i>Add To Cart</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentuser: state.user.user,
    productInCart: state.cartProducts.cartProducts
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addProductCart: (selectedProduct) => dispatch(addProductCart(selectedProduct))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
