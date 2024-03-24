import axios from 'axios';

const CUSTOMER_API_BASE_URL = 'http://localhost:8083/customer/';

export const getAllCustomers = async () => {
  try {
    const response = await axios.get(CUSTOMER_API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const getCustomerById = async (customerId) => {
  try {
    const response = await axios.get(`${CUSTOMER_API_BASE_URL}${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};

export const addCustomer = async (Customer) => {
  try {
    const response = await axios.post(CUSTOMER_API_BASE_URL, Customer);
    return response.data;
  } catch (error) {
    console.error('Error adding customer:', error);
    throw error;
  }
};

export const updateCustomer = async (customerId, Customer) => {
  try {
    const response = await axios.put(`${CUSTOMER_API_BASE_URL}${customerId}`, Customer);
    return response.data;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

export const deleteCustomer = async (customerId) => {
  try {
    const response = await axios.delete(`${CUSTOMER_API_BASE_URL}${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

export const getCustomerByGstNo = async (gstNo) => {
  try {
    const response = await axios.get(`${CUSTOMER_API_BASE_URL}byGstNumber/${gstNo}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};

export const getCustomerByInvoiceNo = async (invoiceNo) => {
  try {
    const response = await axios.get(`${CUSTOMER_API_BASE_URL}byInvoiceNumber/${invoiceNo}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};

export const updatePaymentStatus = async (billId) => {
  try {
    const response = await axios.put(`${CUSTOMER_API_BASE_URL}updatePaymentStatus/${billId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};

export const deleteBillByInvoiceNo = async (invoiceNo) => {
  try {
    const response = await axios.delete(`${CUSTOMER_API_BASE_URL}byInvoiceNumber/${invoiceNo}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};
