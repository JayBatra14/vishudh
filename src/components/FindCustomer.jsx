import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCustomerByGstNo, getCustomerByInvoiceNo } from '../services/CustomerService';
import { deleteCustomer } from '../services/CustomerService';

const FindCustomer = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const gstNo = queryParams.get('gstNo');
  const invoiceNo = queryParams.get('invoiceNo');
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        let response;
        if (gstNo) {
          response = await getCustomerByGstNo(gstNo);
        } else if (invoiceNo) {
          response = await getCustomerByInvoiceNo(invoiceNo);
        }
        setCustomer(response);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    if (gstNo || invoiceNo) {
      fetchCustomerDetails();
    }
  }, [gstNo, invoiceNo]);

  const handleDelete = async (customerId) => {
    try {
      await deleteCustomer(customerId); // Call the service function to delete customer
      console.log('Customer deleted successfully:', customerId);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
    navigate('/');
  };

  return (
    <div>
      
      {customer ? (
        <div>
          <h1 className="text-center mt-3">Customer Details</h1>
          <div className="container">
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
        </div>
      ) : (
        <h1 className="text-center mt-3">Customer Doesn't Exists</h1>
      )}
    </div>
  );
};

export default FindCustomer;
