export interface Customer {
  id: string;
  name: string;
}

export interface Delivery {
  id: string;
  weight: number;
  houseNumber: string;
  district: string;
  adjunct: string;
  street: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  customerId: string;
  customer: Customer
}

export interface GetDeliveriesResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  totalWeight: number;
  averageWeight: number;
  data: Delivery[];
}

export interface CreateDeliveryInput {
  customer: {
    name: string;
  };
  weight: number;
  houseNumber: string;
  district: string;
  adjunct: string;
  street: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}
