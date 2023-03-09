import axios from "axios";
import { GetDeliveriesResponse } from "./interfaces";



function initApi() {
  let envUrl: string | undefined = import.meta.env.VITE_API_URL
  console.log('import.meta.env', import.meta.env)
  if (!envUrl || envUrl?.length === 0) {
    throw new Error("front .env does not have a url.");
  }

  return axios.create({
    baseURL: envUrl
  });
}

export async function getDeliveries(page?: number, perPage?: number): Promise<GetDeliveriesResponse> {
  const api = initApi();

  const response = await api.get('/deliveries', {
    params: {
      page: page || 1,
      perPage: perPage || 10,
    }
  });

  return response.data;
}

export async function createDelivery() {
  const api = initApi();

  const response = await api.post("/deliveries");

  return response.data;
}
