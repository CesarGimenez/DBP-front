import { Customer } from "../types/customer";
import { API_URL } from "../utils/constants";

// Función para obtener la lista de clientes
export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await fetch(`${API_URL}/customers`);
    const data: Customer[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la lista de clientes:", error);
    throw error;
  }
};

export const createCustomerAPI = async (
  customerData: Customer
): Promise<Customer> => {
  try {
    const response = await fetch(`${API_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al registrar el cliente:", error);
    throw error;
  }
};

export const updateCustomerAPI = async (
  id: string,
  customerData: Customer
): Promise<Customer> => {
  try {
    const response = await fetch(`${API_URL}/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al editar el cliente:", error);
    throw error;
  }
};

export const deleteCustomerAPI = async (
  customerId: string
): Promise<Customer> => {
  try {
    const response = await fetch(`${API_URL}/customers/${customerId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    throw error;
  }
};

export const getCustomerAnalyticsAPI = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/customers/analytics`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las estadísticas de clientes:", error);
    throw error;
  }
};
