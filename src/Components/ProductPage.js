import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProductCart } from '../Store/Actions/cartActions';
import IndividualProductInfo from './IndividualProductInfo';


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
    cartProduct["quantity"] = this.state.quantitySelected
    this.setState({
      selectedProduct: cartProduct
    })

    this.props.addProductCart(cartProduct)

    fetch(`http://localhost:3001/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: cartProduct.name,
        quantity: cartProduct.quantity,
        total_price: 10,
        ordered: false,
        user_id: this.props.currentUser.user_id,
        product_id: cartProduct.id
      })
    }).then(response => response.json())
    .then(cart => {
      this.props.addProductCart(cart)
    })
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
      <div>
        <form onSubmit={(e) => this.handleSubmit(e, product)}>
          <div class="ui divided items">
            <div class="item">
              <div class="image">
                <img src={product.image}  onClick={(event) => this.clickedProduct(event, product)}/>
              </div>
              <div className="content">
                <a class="header">{product.title}</a>
                <div class="meta">
                  <span class="cinema">{product.name} </span>
                </div>
                <label>Description</label>
                <div class="description">
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </div>
          { parseInt(product.quantity) > 0 ?
            <React.Fragment>
              <select onChange={(event) => this.handleChange(event, product)} name="quantitySelected" class="ui dropdown"><option value="0">Quantity</option>
                {quantityArray.map(num => <option value={num.toString()}>{num}</option>)}
              </select>
              <div class="extra">
                <button class="ui primary button"><i class="shop icon"></i>Add To Cart</button>
              </div>
            </React.Fragment> : <span id="soldout">Sold Out</span>
          }
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentuser: state.user.user,
    productInCart: state.cartProducts.cartProducts
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addProductCart: (selectedProduct) => dispatch(addProductCart(selectedProduct))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
