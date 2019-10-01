import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProductCart } from '../Store/Actions/cartActions';
import IndividualProductInfo from './IndividualProductInfo';
import { withRouter } from 'react-router-dom';


class ProductPage extends Component {

  state = {
    selectedProduct: "",
    quantitySelected: ""
  }


  handleChange = (event, product) => {
    this.setState({
      quantitySelected: event.target.value
    })
  }


  handleSubmit = (e, cartProduct) => {
    e.preventDefault()
    if (this.props.currentUser){
      let quantitySel = this.state.quantitySelected;
      let productPrice = cartProduct.price ;
      let totalCartPrice = quantitySel * productPrice;
      this.setState({
        selectedProduct: cartProduct
      })
      fetch(`http://localhost:3001/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
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
    else {
      alert("Need to log in to add to cart")
      this.props.history.push("/login")
    }
  }

  clickedProduct = (event, clickedProduct) => {
    this.props.productClicked(clickedProduct)
  }


  render(){
    const {product} = this.props

    let quantityArray = [];
    for (let i = 1; i < parseInt(product.quantity); i++){
      quantityArray.push(i)
    }
    return (
      <div class="main-home-product-container">
        <div class="secondary-home-container">
          <form onSubmit={(e) => this.handleSubmit(e, product)}>
            <div class="product-image-home">
             <img class="home-product-image" src={product.image} onClick={(event) => this.clickedProduct(event, product)}/>
            </div>
            <a id="main-title">{product.title}</a>
            <p class="home-product-name">{product.name}</p>
            <p class="home-product-price">${product.price}</p>
            <div>
            </div>
            { parseInt(product.quantity) > 1 ?
              <React.Fragment>
                <select onChange={(event) => this.handleChange(event, product)} name="quantitySelected" class="ui dropdown"><option value="0">Qty</option>
                 {quantityArray.map(num => <option value={num.toString()}>{num}</option>)}
                </select>
                {this.props.currentUser.type !== "Seller" ?
                  <button class="add-to-cart-button"><i class="shop icon"></i>Add To Cart</button> :
                  <div className="seller-addtocart">Customer Account Needed To Buy</div>
                }
              </React.Fragment> :
            <span className="soldout">Sold Out</span>}
          </form>
        </div>
      </div>
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



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductPage));
