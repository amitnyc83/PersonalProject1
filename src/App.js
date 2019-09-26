import React, { Component } from 'react';
import './App.css';
import UserForm from '../src/Components/UserForm';
import SignUpForm from '../src/Components/SignUpForm';
import HomePage from '../src/Components/HomePage';
import Header from '../src/Components/Header';
import Cart from '../src/Components/Cart';
import SellerPage from '../src/Components/SellerPage';
import LoginForm from '../src/Components/LogInForm';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, withRouter, Route } from 'react-router-dom';





class App extends Component {
  render() {

    return (
      <React.Fragment>

          <Header />
          <Switch>
          <Route path="/login" exact render={(renderProps) => (<LoginForm renderProps={renderProps}/>)} />
          <Route path="/signup" exact render={(renderProps) => (<SignUpForm renderProps={renderProps}/>)} />
          <Route path="/" exact render={() => (<HomePage />)} />
          <Route path="/cart" exact render={(renderProps) => (<Cart />)} />
          <Route path="/seller" exact render={() => (<SellerPage />)} />
          </Switch>


      </React.Fragment>
    );
  }
}

export default withRouter(App);
