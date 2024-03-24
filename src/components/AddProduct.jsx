import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getProductById, addProduct, updateProduct } from '../services/ProductService';

const AddProduct = (props) => {
  const [product, setProduct] = useState({
    name: '',
    hsnCode: '',
    gstPercentage: ''
  });
  let { productId } = useParams();
  const [isNewProduct, setIsNewProduct] = useState(true); // Track whether it's a new product or existing product
  const navigate = useNavigate(); 

  useEffect(() => {
    // Check if productId is provided in the URL params, indicating an existing product
    if (productId) {
      fetchProduct(productId);
      setIsNewProduct(false);
    }
  }, []);

  const fetchProduct = async () => {
    try {
      const productData = await getProductById(productId);
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNewProduct) {
        // If it's a new product, send a POST request to create it
        await addProduct(product);
      } else {
        // If it's an existing product, send a PUT request to update it
        await updateProduct(productId, product);
      }
      navigate('/products'); // Redirect to the Products page after saving or updating 
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleCancel = () => {
    navigate('/products'); // Redirect to the Products page if cancel button is clicked
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">{isNewProduct ? 'Add Product' : 'Edit Product'}</h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">HSN Code</label>
                    <input type="text" className="form-control" name="hsnCode" value={product.hsnCode} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">GST Percentage</label>
                    <input type="number" className="form-control" name="gstPercentage" value={product.gstPercentage} onChange={handleChange} required />
                  </div>
                  <div className="form-group text-center mt-3">
                    <button type="submit" className="btn btn-primary me-2">{isNewProduct ? 'Save' : 'Update'}</button>
                    <button type="button" onClick={handleCancel} className="btn btn-danger">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
