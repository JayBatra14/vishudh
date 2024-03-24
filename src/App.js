import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import Customers from './components/Customers';
import Products from './components/Products';
import AddCustomer from './components/AddCustomer';
import AddProduct from './components/AddProduct';
import ViewProduct from './components/ViewProduct';
import FindCustomer from './components/FindCustomer';
import Bill from './components/Bill';
import Item from './components/Item';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/update-customer/:customerId" element={<AddCustomer />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:productId" element={<AddProduct />} />
          <Route path="/view-product/:productId" element={<ViewProduct />} />
          <Route path="/find-customer" element={<FindCustomer />} />
          <Route path="/view-bills/:customerId" element={<Bill />} />
          <Route path="/view-items/:billId" element={<Item />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
