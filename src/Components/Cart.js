import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../Store/Actions/cartActions';
import CartProductsContainer from './CartProductsContainer'


class Cart extends Component {

  componentDidMount() {
   console.log("i have mounted")
   this.props.fetchCart()
  }

  render() {
    // console.log(this.props.cartProducts)
    return(
      <div>
      Welcome to your Cart!
       {this.props.cartProducts.carts ? this.props.cartProducts.carts.map(cart => <CartProductsContainer key={cart.id} productCart={cart} />) : <div>Your Cart is empty</div> }
      </div>
    )
  }
}


const mapStateToProps = ({cartProducts}) => {
  return {
    cartProducts: cartProducts.cartProducts
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Cart);
