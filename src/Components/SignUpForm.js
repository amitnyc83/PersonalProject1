import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

class SignUpForm extends Component {
  state ={
    user: {
      username: '',
      password: '',
      name: '',
      type: ''
    }
  }



  signUphandleChange = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  }

  signUphandleSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        user: this.state.user
      })
    }).then(resp => resp.json())
    .then(user => {
      if (user.error !== "does not work"){
        this.props.currentUser(user)
        localStorage.setItem('token', user.jwt)
        if (user.type === "Customer"){
         this.props.history.push("/cart")
        }
        else if (user.type === "Seller") {
          this.props.history.push("/seller")
        }
        else {
          const noUser = ""
          this.props.currentUser(noUser)
        }
      }
    })
  }



  render() {
    return(
      <React.Fragment>
        <div class="ui middle aligned center aligned grid">
          <div class="column">
            <h2 class="ui image header">
              <div class="content">
                Sign Up
              </div>
            </h2>
            <form onSubmit={this.signUphandleSubmit} class="ui large form" >
              <div class="ui stacked secondary segment">
                <select onChange={this.signUphandleChange} name="type" id="signup-select">
                  <option value="">Account Type</option>
                  <option  value="Customer">Customer</option>
                  <option  value="Seller" >Seller</option>
                </select>
                <div class="field">
                  <div class="ui left icon input">
                    <i class="user icon"></i>
                    <input name="username" type="text" onChange={this.signUphandleChange} value={this.state.value} placeholder="Username"/>
                  </div>
                  <div class="field">
                    <div class="ui left icon input">
                      <i class="lock icon"></i>
                      <input name="password" type="password" onChange={this.signUphandleChange} value={this.state.value} placeholder="Password"/>
                    </div>
                    <div class="field">
                      <div class="ui left icon input">
                        <i class="user icon"></i>
                        <input name="name" type="text" onChange={this.signUphandleChange} value={this.state.value} placeholder="Name"/>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="ui green button">Sign Up</button>
              </div>
              <div class="ui error message"></div>
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentUser: (theuser) => {dispatch({type: "CURRENT_USER", payload: theuser})},
  }
}



export default withRouter (connect(null, mapDispatchToProps)(SignUpForm));
