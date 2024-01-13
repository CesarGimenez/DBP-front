import { useState } from "react";
import { Order } from "../types/order";
import {
  createOrderAPI,
  deleteOrderAPI,
  getOrderAnalyticsAPI,
  getOrderDetailAPI,
  getOrdersAPI,
  updateOrderAPI,
} from "../api/order";

interface UseOrder {
  loading: boolean;
  error: any;
  Orders: Order[];
  Order: Order;
  orderAnalytics: any[];
  getOrdersData: () => Promise<void>;
  createOrder: (Order: Order) => Promise<Order | undefined>;
  updateOrder: (id: string, Order: Order) => Promise<Order | undefined>;
  deleteOrder: (id: string) => Promise<Order | undefined>;
  getOrderDetail: (id: string) => Promise<Order | undefined>;
  getOrderAnalytics: () => Promise<void>;
}

const useOrder = (): UseOrder => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [Orders, setOrders] = useState<Order[]>([]);
  const [Order, setOrder] = useState<Order>({} as Order);
  const [orderAnalytics, setOrderAnalytics] = useState<any[]>([]);

  const getOrdersData = async () => {
    try {
      setLoading(true);
      const data = await getOrdersAPI();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getOrderAnalytics = async () => {
    try {
      const data = await getOrderAnalyticsAPI();
      setOrderAnalytics(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getOrderDetail = async (id: string): Promise<Order | undefined> => {
    try {
      setLoading(true);
      const data = await getOrderDetailAPI(id);
      setOrder(data);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (Order: Order) => {
    try {
      setLoading(true);
      const data = await createOrderAPI(Order);
      setOrders([...Orders, data]);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (id: string, Order: Order) => {
    try {
      setLoading(true);
      const data = await updateOrderAPI(id, Order);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      setLoading(true);
      const data = await deleteOrderAPI(id);
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
    Orders,
    Order,
    orderAnalytics,
    getOrdersData,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderDetail,
    getOrderAnalytics,
  };
};

export default useOrder;
