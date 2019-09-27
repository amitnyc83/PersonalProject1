import React, { Component } from 'react';
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
    return (
      <React.Fragment>
        {this.state.clickedProduct === null ? this.mapProduct() :
          <React.Fragment>
            <div id="product-info-main-container">
              <img id="product-info-image" src={this.state.clickedProduct.image} alt="sorry"/>
              <div>
                <div id="product-info-title">{this.state.clickedProduct.title}</div>
                <div id="product-info-name">{this.state.clickedProduct.name}</div>
                <div id="product-info-price"> ${this.state.clickedProduct.price}</div>
                <div id="product-info-description"> {this.state.clickedProduct.description}</div>
              </div>
            </div>
            <button onClick={this.clearState}>All Products</button>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}





export default ProductContainer;
