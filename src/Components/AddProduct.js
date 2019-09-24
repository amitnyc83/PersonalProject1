import React, { Component } from 'react';
import { addProduct } from '../Store/Actions/product_action'
import { connect } from 'react-redux'

class AddProduct extends Component {

  state = {
    brand: "",
    name: "",
    price: null,
    description: "",
    cost: null,
    quantity: null,
    seller_id: 1
  }

handleChange = (event) => {
  // console.log(event.target.value)
  this.setState({
    [event.target.name] : event.target.value
  })
}

handleSubmit = (event) => {
 event.preventDefault()
 this.props.addProduct(this.state)
 fetch(`http://localhost:3001/products`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({
    name: this.state.name,
    brand: this.state.brand,
    price: this.state.price,
    description:this.state.description,
    cost: this.state.cost,
    quantity: this.state.quantity,
    seller_id: this.state.seller_id

  })
}).then(response => response.json())
.then(product => console.log(product))
}


render() {
  return(

    <React.Fragment>
      <form onSubmit={this.handleSubmit}>
        <label>Brand</label>
        <input name="brand" type="text" onChange={this.handleChange} placeholder="Brand" value={this.state.value}/>
        <label>Name</label>
        <input name="name" type="text" onChange={this.handleChange} placeholder="Name" value={this.state.value}/>
        <label>Price</label>
        <input name="price" type="number" onChange={this.handleChange} placeholder="Price" value={this.state.value}/>
        <label>Description</label>
        <input name="description" type="text" onChange={this.handleChange} placeholder="Description" value={this.state.value}/>
        <label>Cost</label>
        <input name="cost" type="text" onChange={this.handleChange} placeholder="Cost" value={this.state.value}/>
        <label>Quantity</label>
        <input name="quantity" type="text" onChange={this.handleChange} placeholder="quantity" value={this.state.value}/>
        <button>Submit</button>
      </form>
    </React.Fragment>
  )
}
}

const mapDispatchToProps = (dispatch) => {
  return {
  addProduct: (newproduct) => dispatch({
    type: "ADD_PRODUCT",
    payload: newproduct
  })
}
}

export default connect(null, mapDispatchToProps)(AddProduct);
