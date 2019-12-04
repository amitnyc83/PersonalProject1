import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deletedCart } from '../Store/Actions/cartActions';
// import Checkout from './Checkout'




class CartProductsContainer extends Component {

  state = {
    count: 0,
    priceperItem: (this.props.productCart["total_price"]/ this.props.productCart.quantity),
    totalprice: this.props.productCart.total_price
  }





  deleteCart = (e, cart) => {
    const cartId = cart.id
    this.props.deletedCart(cart)

    fetch(`http://localhost:3001/carts/${cartId}`, {
      method: "delete"
    })
  }


  componentDidMount() {
    this.setState({
      count: this.props.productCart.quantity
    })
  }

  minusQuantity = (cart) => {
    let priceperitem = cart.total_price / cart.quantity

    this.setState({
      count: --this.state.count,
      priceperItem: priceperitem,
      totalprice: this.state.count * priceperitem
    }
    , () => {
      let updatedQuantity = this.state.count.toString()

      fetch(`http://localhost:3001/carts/${cart.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          quantity: updatedQuantity,
          total_price: this.state.totalprice
        })
      }).then(response => response.json())
    })
  }

  plusQuantity = (cart) => {
    let priceperitem = cart.total_price / cart.quantity

    this.setState({
      count: ++this.state.count,
      priceperItem: priceperitem,
      totalprice: this.state.count * priceperitem
    }, () => {
      let addingOne = this.state.count.toString()

      fetch(`http://localhost:3001/carts/${cart.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          quantity: addingOne,
          total_price: this.state.totalprice
        })
      }).then(response => response.json())
    })
  }



  render() {
    return(
      <React.Fragment>
        {this.props.productCart.length != 0 ?
          <React.Fragment>

            <div className="cart-page-main-container">
              <div className="secondary-cart-container">
                <p className="cart-page-name">{this.props.productCart.name}</p>
                <p className="cart-page-size">{this.props.productCart.size}</p>
                <img className="cart-page-image"src={this.props.productCart.image}/>
                <p className="cart-page-quantity"> Quantity: {this.state.count}</p>
                <p className="cart-page-price-per-item">Price per Item: ${this.state.priceperItem.toFixed(2)}</p>
                <p className="cart-page-totalprice">Total Price: ${parseFloat(this.state.totalprice).toFixed(2)} </p>
                <button className="minus-cart-button" onClick={() => this.minusQuantity(this.props.productCart)}>-</button>
                <div className="cart-quantity-form">{this.state.count}</div>
                <button className="plus-cart-button" onClick={() => this.plusQuantity(this.props.productCart)} >+</button>
                <button className="cart-delete-button" onClick={(event) => this.deleteCart(event, this.props.productCart)}>Delete</button>
              </div>
            </div>
          </React.Fragment>
        : <div>Your Cart is Currently Empty</div>}
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.user.user,
    productCarts: state.cartProducts.cartProducts.carts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletedCart: (cart) => dispatch(deletedCart(cart))
  }
}

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(CartProductsContainer));
