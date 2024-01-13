import { ResponseError } from "./responseError";

export interface Customer extends ResponseError {
  _id?: string;
  first_name: string;
  last_name: string;
  dni: string;
  email: string;
  img?: string;
  phone: string;
  address: string;
  amount?: number;
  createdAt?: string;
  updatedAt?: string;
}
