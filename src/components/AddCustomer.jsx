import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getAllProducts } from '../services/ProductService';
import { getCustomerById, addCustomer, updateCustomer } from '../services/CustomerService';

const AddCustomer = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    gstNo: '',
    address: '',
    mobileNumber: '',
    invoiceNo: '',
    date: '',
    items: []
  });
  let { customerId } = useParams();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [prices, setPrices] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (customerId) {
      // Fetch customer details if customerId is provided 
      fetchCustomerDetails(customerId);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const productsData = await getAllProducts(); // Call the service function to fetch products
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCustomerDetails = async () => {
    try {
      const customerData = await getCustomerById(customerId);
      const { name, gstNo, address, mobileNumber } = customerData;
      setFormData({ ...formData, name, gstNo, address, mobileNumber });
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities({
      ...quantities,
      [productId]: quantity
    });
  };

  const handlePriceChange = (productId, price) => {
    setPrices({
      ...prices,
      [productId]: price
    });
  };

  const handleAddItem = (product) => {
    const newItem = {
      hsnCode: product.hsnCode,
      name: product.name,
      quantity: quantities[product.productId] || '',
      price: prices[product.productId] || '',
      gstPercentage: product.gstPercentage
    };
    setFormData({
      ...formData,
      items: [...formData.items, newItem]
    });
    alert('Item added');
  };

  const handleRemoveItem = (productId, index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData({
      ...formData,
      items: updatedItems
    });
    setQuantities({
      ...quantities,
      [productId]: ''
    });
    setPrices({
      ...prices,
      [productId]: ''
    });
    alert('Item removed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.gstNo || !formData.address || !formData.mobileNumber || !formData.invoiceNo || !formData.date) {
      alert('Please fill in all the fields.');
      return; // Prevent saving if any input field is empty
    }

    if(formData.items.length === 0){
      alert('Please add at least one item.');
      return; // Prevent saving if there are no items
    }

    if(formData.mobileNumber.length !== 10){
      alert('Please enter valid mobile number.');
      return; // Prevent saving if mobile number is invalid
    }

    try {
      // Send POST or PUT request based on whether customerId is provided
      if (customerId) {
        // Send PUT request to update customer details
        //await axios.put(`http://localhost:8083/customer/${customerId}`, formData);
        await updateCustomer(customerId, formData);
        alert('Customer details updated successfully');
      } else {
        // Send POST request to add new customer
        //await axios.post('http://localhost:8083/customer/', formData);
        await addCustomer(formData);
        alert('Customer added successfully');
      }
      // Clear form fields after successful submission
      setFormData({
        name: '',
        gstNo: '',
        address: '',
        mobileNumber: '',
        invoiceNo: '',
        date: '',
        items: []
      });
      setQuantities({});
      setPrices({});
      navigate('/');
    } catch (error) {
          // Handle API error
    if (error.response) {
      // The request was made and the server responded with a status code
      alert(`Error adding customer: ${error.response.data.detail}`);
    } else if (error.request) {
      // The request was made but no response was received
      alert('No response from server. Please try again later.');
    } else {
      // Something else happened while setting up the request
      alert(`Error: ${error.message}`);
    }
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to the Customers page if cancel button is clicked
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <div className="container ms-5">
              <div className="row justify-content-center mt-5">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title text-center">{customerId ? 'Update Customer' : 'Add Customer'}</h5>
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">GST Number</label>
                        <input type="text" className="form-control" name="gstNo" value={formData.gstNo} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Mobile Number</label>
                        <input type="text" className="form-control" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Invoice Number</label>
                        <input type="text" className="form-control" name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Date</label>
                        <input type="text" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
                      </div>
                      <div className="form-group text-center mt-3">
                        <button type="submit" className="btn btn-primary me-2">{customerId ? 'Update Customer' : 'Add Customer'}</button>
                        <button type="button" onClick={handleCancel} className="btn btn-danger">Cancel</button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <h1 className="text-center mt-3">List Of Products</h1>
            {products.map((product, index) => (
              <div className="container" key={product.productId}>
                <div className="row justify-content-center">
                  <div className="card w-75">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <h5 className="card-title">{product.name}</h5>
                        </div>
                        <div className="col-md-6">
                          <h5 className="card-title">HSN CODE : {product.hsnCode} GST : {product.gstPercentage}%</h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <input type="number" className="form-control" placeholder="Quantity" value={quantities[product.productId] || ''} onChange={(e) => handleQuantityChange(product.productId, e.target.value)} />
                        </div>
                        <div className="col-md-4">
                          <input type="number" className="form-control" placeholder="Price" value={prices[product.productId] || ''} onChange={(e) => handlePriceChange(product.productId, e.target.value)} />
                        </div>
                        <div className="col-md-4">
                          <button type="button" className="btn btn-success me-2" onClick={() => handleAddItem(product)}>Add</button>
                          <button type="button" className="btn btn-danger" onClick={() => handleRemoveItem(product.productId, index)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
