import { Customer } from "./customer";
import { Product } from "./product";
import { ResponseError } from "./responseError";

export interface Order extends ResponseError {
  _id?: string;
  customer: string | Customer;
  orderDetail: OrderDetail[];
  amount?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  paymentMethod?: string;
  order?: Order;
}

export interface OrderDetail {
  _id?: string;
  product: string | Product;
  amount: number;
  quantity: number;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  total?: number;
  percent?: number;
}
