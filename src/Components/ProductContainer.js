import React, { Component } from 'react';
import { addProductCart } from '../Store/Actions/cartActions';
import ProductPage from './ProductPage';
import { connect } from 'react-redux'



class ProductContainer extends Component {

  state = {
    clickedProduct: null,
    selectedProduct: "",
    quantitySelected: ""

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

  handleChange = (event, product) => {
   this.setState({
     quantitySelected : event.target.value
    })
  }

  handleSubmit = (e, cartProduct ) => {
    e.preventDefault()
    cartProduct["quantity"] = this.state.quantitySelected
    let quantitySel = this.state.quantitySelected
    let productPrice = cartProduct.price
    let totalCartPrice = quantitySel * productPrice

    this.setState({
      selectedProduct: cartProduct
    })

    fetch(`http://localhost:3001/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "applicatoin/json"
      },
      body: JSON.stringify({
        name: cartProduct.name,
        quantity: this.state.quantitySelected,
        total_price: totalCartPrice,
        ordered: false,
        user_id: this.props.currentUser.user_id,
        product_id: cartProduct.id,
        image: cartProduct.image
      })
    }).then(response => response.json())
    .then(cart => {
      this.props.addProductCart(cart)
    })
  }

  render() {
   let quantityArray = [];
   if (this.state.clickedProduct) {
     for (let i = 1; i < parseInt(this.state.clickedProduct.quantity); i++) {
       quantityArray.push(i);
      }
    }

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
                  {parseInt(this.state.clickedProduct.quantity) > 1 ?
                    <React.Fragment>
                      <form onSubmit={(e) => this.handleSubmit(e, this.state.clickedProduct)}>
                        <select onChange={(event) => this.handleChange(event, this.state.clickedProduct)} name="quantitySelected" class="ui dropdown"><option value="0">Qty</option>
                         {quantityArray.map(num => <option value={num.toString()}>{num}</option> )}
                        </select>
                        <button class="add-to-cart-button" ><i class="shop icon"></i>Add To Cart</button>
                      </form>
                    </React.Fragment> : <span className="soldout">Sold Out</span>
                }
              </div>
            </div>
            <button class="back-allproducts-button"onClick={this.clearState}>Back to Products</button>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => {
  return {
    currentUser: state.user.user,
    productInCart: state.cartProducts.cartProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProductCart: (selectedProduct) => dispatch(addProductCart(selectedProduct))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
