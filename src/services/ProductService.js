import axios from 'axios';

const PRODUCT_API_BASE_URL = 'http://localhost:8083/product/';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(PRODUCT_API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${PRODUCT_API_BASE_URL}${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const addProduct = async (Product) => {
  try {
    const response = await axios.post(PRODUCT_API_BASE_URL, Product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (productId, Product) => {
  try {
    const response = await axios.put(`${PRODUCT_API_BASE_URL}${productId}`, Product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${PRODUCT_API_BASE_URL}${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
