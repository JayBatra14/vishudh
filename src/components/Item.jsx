import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Item = (props) => {
  let { billId } = useParams(); // Get the bill ID from URL params
  let { state } = useLocation();
  const items = state.items; // Get the list of items from props

  return (
    <div>
      <h1 className="text-center mt-3">All Items for Bill ID: {billId}</h1>
      {items.map(item => (
        <div className="container" key={item.itemId}>
          <div className="row justify-content-center">
            <div className="card w-50">
              <div className="card-body">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{item.name}</div>
                  <div><b>HSN CODE : </b>{item.hsnCode}</div>
                  <div><b>PRICE : </b>₹{item.price}</div>
                  <div><b>QUANTITY : </b>{item.quantity} Kg</div>
                  <div><b>GST : </b>{item.gstPercentage}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Item;
