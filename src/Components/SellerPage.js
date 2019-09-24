import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchProducts } from '../Store/Actions/product_action'
import SellerProdContainer from './SellerProdContainer'

class SellerPage extends Component{

  componentDidMount() {
    console.log("i have mounted")
    this.props.fetchProducts()

  }

  mapProducts = () => {
     return (this.props.sneakerProducts.allProducts ? <SellerProdContainer product={this.props.sneakerProducts.allProducts} /> : null )
  }

render() {
  console.log(this.props.sneakerProducts.allProducts)
  return(

    <React.Fragment>
      This is seller Central
      {this.mapProducts()}
    </React.Fragment>
  )
}
}
const mapStateToProps = ({products}) => {
  console.log(products)
  return {
    sneakerProducts: products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SellerPage);
