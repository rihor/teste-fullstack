import axios, { AxiosInstance } from "axios";
import { CreateDeliveryInput, GetDeliveriesResponse } from "./interfaces";

class DeliveriesService {
  private api: AxiosInstance;

  constructor() {
    let envUrl: string | undefined = import.meta.env.VITE_API_URL
    if (!envUrl || envUrl?.length === 0) {
      throw new Error("front .env does not have a api url.");
    }

    this.api = axios.create({
      baseURL: envUrl
    });
  }

  async getDeliveries(page?: number, perPage?: number): Promise<GetDeliveriesResponse> {
    const response = await this.api.get('/deliveries', {
      params: {
        page: page || 1,
        perPage: perPage || 3,
      }
    });

    return response.data;
  }

  async createDelivery(input: CreateDeliveryInput) {
    const response = await this.api.post("/deliveries", input);

    return response.data;
  }

  async resetDb() {
    const response = await this.api.delete('/deliveries');

    return response.data;
  }
}

export const deliveriesService = new DeliveriesService();
