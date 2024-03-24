import React from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { updatePaymentStatus } from '../services/CustomerService';

const Bill = (props) => {
  let { customerId } = useParams(); // Get the customer ID from URL params
  let { state } = useLocation();
  const bills = state.bills; // Get the list of bills from props
  const navigate = useNavigate(); 

  const handlePaymentStatusUpdate = async (billId, paid) => {
    try {
      if (!paid) {
        // If the bill is unpaid, consume the API to update the payment status
        await updatePaymentStatus(billId);
        alert('Payment status updated successfully!');
        navigate('/');
        // You may want to update the UI after updating the payment status
      } else {
        // If the bill is already paid, display a message
        alert('Bill is already paid!');
      }
      
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-3">All Bills for Customer ID: {customerId}</h1>
      {bills.map(bill => (
        <div className="container" key={bill.billId}>
          <div className="row justify-content-center">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <p className="card-title"><b>INVOICE NO : </b>{bill.invoiceNo}</p>
                  </div>
                  <div className="col-md-3">
                    <p className="card-title"><b>DATE : </b>{bill.date}</p>
                  </div>
                  <div className="col-md-2">
                  <p className="card-title"><b>STATUS : </b>{bill.paid ? 'Paid' : 'Unpaid'}</p>
                  </div>
                  <div className="col-md-4">
                  <Link className="btn btn-warning me-2" to={`/view-items/${bill.billId}`} state={{ items: bill.items }}>View Items</Link>
                  <button className="btn btn-primary" onClick={() => handlePaymentStatusUpdate(bill.billId, bill.paid)}>Update Payment Status</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        ))}

    </div>
  );
};

export default Bill;
