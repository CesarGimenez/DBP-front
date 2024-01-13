import { Product, partialProduct } from "../types/product";
import { API_URL } from "../utils/constants";

export const getProductsAPI = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    throw error;
  }
};

export const getProductsAnalyticsAPI = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/products/analytics`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las estadísticas de productos:", error);
    throw error;
  }
};

export const createProductAPI = async (
  Product: partialProduct
): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Product),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al registrar la marca:", error);
    throw error;
  }
};

export const updateProductAPI = async (
  id: string,
  Product: partialProduct
): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Product),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al editar la marca:", error);
    throw error;
  }
};

export const deleteProductAPI = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar la marca:", error);
    throw error;
  }
};
