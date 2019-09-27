import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchProducts } from '../Store/Actions/product_action'
import ProductContainer from './ProductContainer'


class HomePage extends Component {

componentDidMount() {
  console.log("i have mounted")
  this.props.fetchProducts()

}

mapProducts = () => {

  return (this.props.sneakerProducts.allProducts ? <ProductContainer product={this.props.sneakerProducts.allProducts} /> : null )

}

render() {
  // console.log(this.props.coffeeProducts.allProducts)
  return(
    <div>
      <h2>WELCOME TO SNEAKERX! YOUR ONE STOP TO BUY AND SELL SNEAKERS</h2>
    {this.mapProducts()}
    </div>
  )
}
}

const mapStateToProps = ({products}) => {
  // console.log(products)
  return {
    sneakerProducts: products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
