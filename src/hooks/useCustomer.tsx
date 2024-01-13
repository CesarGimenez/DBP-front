import { useState } from "react";
import {
  createCustomerAPI,
  deleteCustomerAPI,
  getCustomerAnalyticsAPI,
  getCustomers,
  updateCustomerAPI,
} from "../api/customer";
import { Customer } from "../types/customer";
import { getTopCustomersAPI } from "../api/order";

interface UseCustomer {
  loading: boolean;
  error: any;
  customers: Customer[];
  topDealCustomers: any[];
  customerAnalytics: any[];
  getCustomersData: () => Promise<void>;
  getTopDealCustomersData: () => Promise<void>;
  createCustomer: (customer: Customer) => Promise<Customer | undefined>;
  updateCustomer: (
    id: string,
    customer: Customer
  ) => Promise<Customer | undefined>;
  deleteCustomer: (id: string) => Promise<Customer | undefined>;
  getCustomerAnalytics: () => Promise<void>;
}

const useCustomer = (): UseCustomer => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [topDealCustomers, setTopDealCustomers] = useState<any[]>([]);
  const [customerAnalytics, setCustomerAnalytics] = useState<any[]>([]);

  const getCustomersData = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getCustomerAnalytics = async () => {
    try {
      const data = await getCustomerAnalyticsAPI();
      setCustomerAnalytics(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getTopDealCustomersData = async () => {
    try {
      const data = await getTopCustomersAPI();
      setTopDealCustomers(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async (Customer: Customer) => {
    try {
      setLoading(true);
      const data = await createCustomerAPI(Customer);
      setCustomers([...customers, data]);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (id: string, Customer: Customer) => {
    try {
      setLoading(true);
      const data = await updateCustomerAPI(id, Customer);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
      setLoading(true);
      const data = await deleteCustomerAPI(id);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    customers,
    topDealCustomers,
    customerAnalytics,
    getCustomersData,
    getTopDealCustomersData,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerAnalytics,
  };
};

export default useCustomer;
