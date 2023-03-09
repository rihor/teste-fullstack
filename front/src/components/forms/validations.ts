import { z } from "zod";

export const createDeliverySchema = z
  .object({
    name: z.string().min(1),
    weight: z.number().min(0),
    houseNumber: z.string().optional(), // could not get a house number
    district: z.string().min(1),
    adjunct: z.string().min(1),
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    latitude: z.number(),
    longitude: z.number(),
    address: z.string().min(1),
  });
