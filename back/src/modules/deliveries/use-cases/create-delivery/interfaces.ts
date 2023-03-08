import { Delivery } from '@prisma/client';

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

export type CreateDeliveryOutput = Delivery;
