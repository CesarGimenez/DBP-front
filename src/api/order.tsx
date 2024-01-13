import { Order } from "../types/order";
import { API_URL, X_API_KEY } from "../utils/constants";

export const getOrdersAPI = async (): Promise<Order[]> => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        "x-api-key": X_API_KEY,
      },
    });
    const data: Order[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la lista de ordenes:", error);
    throw error;
  }
};

export const getTopCustomersAPI = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_URL}/orders/top-customers`, {
      headers: {
        "x-api-key": X_API_KEY,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getOrderAnalyticsAPI = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/orders/analytics`, {
      headers: {
        "x-api-key": X_API_KEY,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las estadísticas de ventas:", error);
    throw error;
  }
};

export const getOrderDetailAPI = async (id: string): Promise<Order> => {
  try {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      headers: {
        "x-api-key": X_API_KEY,
      },
    });
    const data: Order = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const createOrderAPI = async (Order: Order): Promise<Order> => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": X_API_KEY,
      },
      body: JSON.stringify(Order),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al registrar la orden:", error);
    throw error;
  }
};

export const updateOrderAPI = async (
  id: string,
  Order: Order
): Promise<Order> => {
  try {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": X_API_KEY,
      },
      body: JSON.stringify(Order),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al editar la orden:", error);
    throw error;
  }
};

export const deleteOrderAPI = async (id: string): Promise<Order> => {
  try {
    const response = await fetch(`${API_URL}/Orders/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": X_API_KEY,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    throw error;
  }
};
