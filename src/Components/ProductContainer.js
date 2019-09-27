import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProductCart } from '../Store/Actions/cartActions';
import ProductPage from './ProductPage'


class ProductContainer extends Component {




  mapProduct = () => {
    return this.props.product.map(product => {
      return <div><ProductPage key={product.id} product={product} /></div>
    })
  }

  render() {
    // console.log(this.props.product)
    return (
      <div>
        {this.mapProduct()}
      </div>
    )
  }
}





export default ProductContainer;
