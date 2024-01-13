import { ResponseError } from "./responseError";

export interface Brand extends ResponseError {
  _id: string;
  name: string;
  country: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  is_active: boolean;
}

export interface partialBrand {
  name: string;
  country: string;
  _id?: string;
}
