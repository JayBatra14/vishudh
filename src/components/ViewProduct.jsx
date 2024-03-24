import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getProductById } from '../services/ProductService';

const ViewProduct = (props) => {
  const [product, setProduct] = useState(null);
  let { productId } = useParams();
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const productData = await getProductById(productId);
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-center mt-3">View Product</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="card w-50">
            <div className="card-body text-center">
              <h5 className="card-title">Name : {product.name}</h5>
              <h5 className="card-title">HSN Code : {product.hsnCode}</h5>
              <h5 className="card-title">GST : {product.gstPercentage}%</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
