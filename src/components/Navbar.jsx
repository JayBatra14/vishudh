import React from 'react';
import logo from '../logo.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
        <img src={logo} alt="Vishudh" width="200" height="80" class="d-inline-block align-text-top" />
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">Customers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products">Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/add-customer">Add Customer</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/add-product">Add Product</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

