import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProductCart } from '../Store/Actions/cartActions';
import ProductPage from './ProductPage'


class ProductContainer extends Component {

  state = {
    clickedProduct: null
  }




  mapProduct = () => {
    return this.props.product.map(product => {
      return <div><ProductPage key={product.id} product={product} productClicked={this.clickedProduct}/></div>
    })
  }

  clickedProduct = (productClicked) => {
    this.setState({
      clickedProduct: productClicked
    })
  }


  clearState = () => {
    this.setState({
      clickedProduct: null
    })
  }

  render() {
    // console.log(this.props.product)
    return (
      <div>
        {this.state.clickedProduct === null ? this.mapProduct() :
          <div>
            <div>Selected product</div>
            <button onClick={this.clearState}>All Products</button>
          </div>
        }
      </div>
    )
  }
}





export default ProductContainer;
