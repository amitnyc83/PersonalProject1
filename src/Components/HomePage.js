import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../Store/Actions/product_action';
import ProductContainer from './ProductContainer';
import SaleHeader from './SaleHeader'


class HomePage extends Component {

componentDidMount() {
  this.props.fetchProducts()
}

mapProducts = () => {

  return (this.props.sneakerProducts.allProducts ? <ProductContainer product={this.props.sneakerProducts.allProducts} /> : null )

}

render() {
  return(
    <div>
      <SaleHeader />
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
