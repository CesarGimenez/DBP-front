import { useState } from "react";
import { Product, partialProduct } from "../types/product";
import {
  createProductAPI,
  deleteProductAPI,
  getProductsAPI,
  getProductsAnalyticsAPI,
  updateProductAPI,
} from "../api/product";

interface UseProduct {
  loading: boolean;
  error: any;
  Products: Product[];
  productsAnalytics: any[];
  getProductsData: () => Promise<void>;
  createProduct: (Product: partialProduct) => Promise<Product | undefined>;
  updateProduct: (
    id: string,
    Product: partialProduct
  ) => Promise<Product | undefined>;
  deleteProduct: (id: string) => Promise<Product | undefined>;
  getProductAnalytics: () => Promise<void>;
}

const useProduct = (): UseProduct => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [Products, setProducts] = useState<Product[]>([]);
  const [productsAnalytics, setProductsAnalytics] = useState<any[]>([]);

  const getProductsData = async () => {
    try {
      setLoading(true);
      const data = await getProductsAPI();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getProductAnalytics = async () => {
    try {
      const data = await getProductsAnalyticsAPI();
      setProductsAnalytics(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (Product: partialProduct) => {
    try {
      setLoading(true);
      const data = await createProductAPI(Product);
      setProducts([...Products, data]);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, Product: partialProduct) => {
    try {
      setLoading(true);
      const data = await updateProductAPI(id, Product);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      const data = await deleteProductAPI(id);
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
    Products,
    productsAnalytics,
    getProductsData,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductAnalytics,
  };
};

export default useProduct;
