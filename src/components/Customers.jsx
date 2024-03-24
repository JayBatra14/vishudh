import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCustomers, deleteCustomer, deleteBillByInvoiceNo } from '../services/CustomerService';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [gstNo, setGstNo] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  useEffect(() => {
    // Fetch all customers on component mount
    fetchCustomers();
  }, []);

  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const customersData = await getAllCustomers(); // Call the service function to fetch customers
      setCustomers(customersData);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDelete = async (customerId) => {
    try {
      await deleteCustomer(customerId); // Call the service function to delete customer
      setCustomers(prevCustomers => prevCustomers.filter(customer => customer.customerId !== customerId));
      console.log('Customer deleted successfully:', customerId);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleFindCustomerByGstNo = () => {
    navigate(`/find-customer?gstNo=${gstNo}`);
  };

  const handleFindCustomerByInvoiceNo = () => {
    navigate(`/find-customer?invoiceNo=${invoiceNo}`);
  };

  const handleDeleteBill = async () => {
    try {
      // Make API call to delete bill using invoice number
      await deleteBillByInvoiceNo(invoiceNo);
      alert(`Bill with invoice number ${invoiceNo} deleted successfully.`);
      // Clear the invoice number input field after successful deletion
      setInvoiceNo('');
      navigate('/');
    } catch (error) {
      console.log('Error deleting bill:', error);
      alert('Error deleting bill. Please Enter the Correct Invoice Number');
    }
  };

  return (
    <div>
      <h1 className="text-center mt-3">Find Customer</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center">
            <input className="form-control" type="text" placeholder="Enter GST Number" value={gstNo} onChange={(e) => setGstNo(e.target.value)} />
            <button className="btn btn-primary mt-2" onClick={handleFindCustomerByGstNo}>Find by GST No</button>
          </div>
          <div className="col-md-6 text-center">
            <input className="form-control" type="text" placeholder="Enter Invoice Number" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
            <button className="btn btn-primary me-2 mt-2" onClick={handleFindCustomerByInvoiceNo}>Find by Invoice No</button>
            <button className="btn btn-danger mt-2" onClick={handleDeleteBill}>Delete Bill</button>
          </div>
        </div>
      </div>
      <h1 className="text-center mt-3">List Of Customers</h1>
      {customers.map(customer => (
        <div className="container" key={customer.customerId}>
          <div className="row justify-content-center">
            <div className="card w-50">
              <div className="card-body">
                <p><b>NAME : </b>{customer.name}</p>
                <p><b>GST NO : </b>{customer.gstNo}</p>
                <p><b>MOBILE NO : </b>{customer.mobileNumber}</p>
                <p><b>ADDRESS : </b>{customer.address}</p>
                <p className="card-text">
                  <Link className="btn btn-warning me-2" to={`/view-bills/${customer.customerId}`} state={{ bills: customer.bills }}>View</Link>
                  <Link className="btn btn-primary me-2" to={`/update-customer/${customer.customerId}`}>Update</Link>
                  <button onClick={() => handleDelete(customer.customerId)} className="btn btn-danger">Delete</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Customers;
