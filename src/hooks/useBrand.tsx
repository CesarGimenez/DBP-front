import { useState } from "react";
import { Brand, partialBrand } from "../types/brand";
import {
  createBrandAPI,
  deleteBrandAPI,
  getBrandsAPI,
  updateBrandAPI,
} from "../api/brand";

interface UseBrand {
  loading: boolean;
  error: any;
  brands: Brand[];
  getBrandsData: () => Promise<void>;
  createBrand: (brand: partialBrand) => Promise<Brand | undefined>;
  updateBrand: (id: string, brand: partialBrand) => Promise<Brand | undefined>;
  deleteBrand: (id: string) => Promise<Brand | undefined>;
}

const useBrand = (): UseBrand => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [brands, setBrands] = useState<Brand[]>([]);

  const getBrandsData = async () => {
    try {
      setLoading(true);
      const data = await getBrandsAPI();
      setBrands(data);
      setLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const createBrand = async (brand: partialBrand) => {
    try {
      setLoading(true);
      const data = await createBrandAPI(brand);
      setBrands([...brands, data]);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateBrand = async (id: string, brand: partialBrand) => {
    try {
      setLoading(true);
      const data = await updateBrandAPI(id, brand);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBrand = async (id: string) => {
    try {
      setLoading(true);
      const data = await deleteBrandAPI(id);
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
    brands,
    getBrandsData,
    createBrand,
    updateBrand,
    deleteBrand,
  };
};

export default useBrand;
