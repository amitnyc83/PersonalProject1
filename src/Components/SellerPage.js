import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../Store/Actions/product_action';
import SellerProdContainer from './SellerProdContainer';
import { withRouter } from 'react-router-dom'

class SellerPage extends Component{

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      fetch(`http://localhost:3001/current_user`, {
        // method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
          Authorization: token
        }
      }).then(response => response.json())
      .then(resp => {
        this.props.fetchProducts()
      })
    }
    else {
      this.props.history.push('/login')
    }
  }

  componentDidUpdate(prevProps, prevState) {
   if (prevProps.sneakerProducts.allProducts.length !== this.props.sneakerProducts.allProducts.length) {
     this.props.fetchProducts()
    }
  }

  mapProducts = () => {
     return (this.props.sneakerProducts.allProducts ? <SellerProdContainer product={this.props.sneakerProducts.allProducts} /> : null )
  }

render() {
  return(
    <React.Fragment>
      <div class="seller-message">Welcome to Your Seller's Account</div>
      {this.mapProducts()}
    </React.Fragment>
  )
}
}
const mapStateToProps = ({products}) => {
  return {
    sneakerProducts: products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SellerPage));
