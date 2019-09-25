import React, { Component } from 'react';
import { addProduct } from '../Store/Actions/product_action';
import { connect } from 'react-redux';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class AddProduct extends Component {

  state = {
    brand: "",
    name: "",
    price: null,
    description: "",
    image: "",
    cost: "",
    quantity: "",
    seller_id: 1
  }

  handleChange = (event) => {
    // console.log(event.target.value)
    this.setState({
      [event.target.name] : event.target.value
    }, () => console.log(this.state))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state)
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
        description: this.state.description,
        image: this.state.image,
        cost: this.state.cost,
        quantity: this.state.quantity,
        seller_id: this.state.seller_id

      })
    }).then(response => response.json())
    .then(product => console.log(product))
  }


  imageSubmit = () => {
    var myUploadWidget;
    myUploadWidget = window.cloudinary.openUploadWidget({
      cloudName: 'amitscloudmanager',
      uploadPreset: 'gugnl3kp'},
      (error, result) => {
        if (result.info.secure_url){
         this.setState({
           image: result.info.secure_url
          }, ()=> {
           console.log(this.state)})
          }
        }
      );
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
          <input name="cost" type="number" onChange={this.handleChange} placeholder="Cost" value={this.state.value}/>
          <label>Quantity</label>
          <input name="quantity" type="text" onChange={this.handleChange} placeholder="quantity" value={this.state.value}/>
            <CloudinaryContext cloudName="deq2mkfpe">
             <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
             <script>cloudinary.setCloudName(amitscloudmanager);</script>
             <a href="#" id="upload_widget_opener" onClick={this.imageSubmit} >Upload multiple images</a>
            </CloudinaryContext>
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
