import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'

// import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem } from "react-bootstrap";


class Header extends Component {

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
      </div>
    )
  }
}




export default Header;
