import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteUser } from '../Store/Actions/userActions'

// import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem } from "react-bootstrap";


class Header extends Component {

  deleteToken = () => {
    localStorage.removeItem('token')
    this.props.deleteUser()
  }

  render() {
    return(
      <div class="ui huge menu">
        <div class="header item">
          SneakerX
        </div>
        <a class="item" href="/">
          Our Products
        </a>
        <NavLink to="/seller" style={{width: "100px"}}>
          Seller Page
        </NavLink>
        <div>
          <NavLink to="/" style={{width: "100px"}}>
            Home
          </NavLink>
        </div>
        <NavLink to="/cart" style={{width: "100px"}}>
          Cart
        </NavLink>
        <NavLink to="/login" style={{width: "100px"}}>
          Log-in
        </NavLink>
        <NavLink to="/signup" style={{width: "100px"}}>
          Sign-up
        </NavLink>
        <NavLink to="/" onClick={this.deleteToken} style={{width: "100px"}}>
          Log Out
        </NavLink>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: () => dispatch({type: "DELETE_USER"})
  }
}

export default connect(null, mapDispatchToProps)(Header);
