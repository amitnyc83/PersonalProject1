import React, { Component } from 'react';
import { connect } from 'react-redux';



class Checkout extends Component {

  render() {
    let productsInCart;
    let totalPriceInCart;
    if (this.props.cartProducts.carts) {
      productsInCart = this.props.cartProducts.carts.filter(product => product.user_id === this.props.currentUser.user_id)
    }

    let total = 0;
    if (productsInCart) {
      totalPriceInCart = productsInCart.forEach(product => {
        total += parseFloat(product.total_price)
      })
    }

    let totalQuantityInCart;
    let totalQuantity = 0;
    if (productsInCart) {
      totalQuantityInCart = productsInCart.forEach(product => {
        totalQuantity += parseInt(product.quantity)
      })
    }


    return(
      <div className="cart-total-information-container">
        <span className="cart-total-price">Total Price ${total.toFixed(2)}</span>
        <span className="cart-total-price">Total Quantity {totalQuantity}</span>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartProducts: state.cartProducts.cartProducts,
    currentUser: state.user.user
  }
}

export default connect(mapStateToProps)(Checkout);
