import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct } from '../services/ProductService';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products on component mount
    fetchProducts();
  }, []);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const productsData = await getAllProducts(); // Call the service function to fetch products
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleView = (productId) => {
    navigate(`/view-product/${productId}`);
  };

  const handleUpdate = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId); // Call the service function to delete product
      setProducts(prevProducts => prevProducts.filter(product => product.productId !== productId));
      console.log('Product deleted successfully:', productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-3">Products</h1>
      {/* <Link to="/add-product">Add Product</Link> */}
      {products.map(product => (
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
                <p className="card-text">
                  <button className="btn btn-warning me-2" onClick={() => handleView(product.productId)}>View</button>
                  <button className="btn btn-primary me-2" onClick={() => handleUpdate(product.productId)}>Update</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(product.productId)}>Delete</button>
                </p>
              </div>
            </div>
          </div>
        </div>
        ))}
    </div>
  );
};

export default Products;
