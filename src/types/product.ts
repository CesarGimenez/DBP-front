import { ResponseError } from "./responseError";

export interface Product extends ResponseError {
  _id: string;
  brand: string;
  createdAt: string;
  description: string;
  img: string;
  is_active: boolean;
  name: string;
  oam: string;
  unit_cost: number;
  unit_cost_sale: number;
  recomended_price: number;
  updatedAt: string;
  quantity: number;
  stock: number;
  code: string;
}

export interface partialProduct {
  _id?: string;
  brand: string;
  description: string;
  name: string;
  oam: string;
  unit_cost: number;
  recomended_price: number;
  is_active: boolean;
  unit_cost_sale: number;
  stock: number;
}
