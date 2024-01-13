import { Brand, partialBrand } from "../types/brand";
import { API_URL } from "../utils/constants";

export const getBrandsAPI = async (): Promise<Brand[]> => {
  try {
    const response = await fetch(`${API_URL}/brands`);
    const data: Brand[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la lista de marcas:", error);
    throw error;
  }
};

export const createBrandAPI = async (brand: partialBrand): Promise<Brand> => {
  try {
    const response = await fetch(`${API_URL}/brands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brand),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al registrar la marca:", error);
    throw error;
  }
};

export const updateBrandAPI = async (
  id: string,
  brand: partialBrand
): Promise<Brand> => {
  try {
    const response = await fetch(`${API_URL}/brands/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brand),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al editar la marca:", error);
    throw error;
  }
};

export const deleteBrandAPI = async (id: string): Promise<Brand> => {
  try {
    const response = await fetch(`${API_URL}/brands/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar la marca:", error);
    throw error;
  }
};
