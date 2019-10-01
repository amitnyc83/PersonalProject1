import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../Store/Actions/product_action';
import ProductContainer from './ProductContainer';
import SaleHeader from './SaleHeader'


class HomePage extends Component {

  state = {
    search: false,
    searchWord: null
  }


  componentDidMount() {
    this.props.fetchProducts()
  }

  handleChange = (event) => {
   this.setState({
     searchWord: event.target.value
    })
  }

  mapProducts = () => {
    let filteredArray;
    if (this.state.searchWord == null) {
      return (this.props.sneakerProducts.allProducts ? <ProductContainer product={this.props.sneakerProducts.allProducts} /> : null )
    }
    else {
     filteredArray = this.props.sneakerProducts.allProducts.filter(product => {
       return product.brand.toLowerCase().search(this.state.searchWord.toLowerCase()) !== -1
      })
      return (filteredArray.length !== 0  ? <ProductContainer product={filteredArray} /> : <div className="home-product-search-noresults">No Matches Found. Try Again</div> )
    }
  }

  render() {
    return(
      <div>
        <SaleHeader />
          <div class="ui category search" >
            <div class="ui icon input">
              <input onChange={(event) => this.handleChange(event)} class="prompt" type="text" name="searchWord" placeholder="Search Product..."/>
              <i class="search icon"></i>
            </div>
          </div>
        <div className="home-message">SNEAKERX!</div>
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
