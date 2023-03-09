import { NominatimSearchResponse } from './interfaces';
import axios from "axios";
import { isNumber } from "lodash"

type GeolocationRequest = LatAndLngRequest | AddressRequest

interface LatAndLngRequest {
  lat: number;
  lng: number;
}

interface AddressRequest {
  address: string;
}

function initApi() {
  return axios.create({
    baseURL: "https://nominatim.openstreetmap.org",
    params: {
      format: "json"
    }
  });
}

export async function searchGeolocation(input: GeolocationRequest): Promise<NominatimSearchResponse | null> {
  if ((input as AddressRequest).address?.length) {
    return forward(input as AddressRequest);
  } else if (
    isNumber((input as LatAndLngRequest).lat) &&
    isNumber((input as LatAndLngRequest).lat)
  ) {
    return reverse(input as LatAndLngRequest);
  }

  return null;
}

async function forward(input: AddressRequest) {
  const api = initApi();

  const response = await api.get(`/search`, {
    params: {
      q: input.address
    }
  });

  return response.data;
}

async function reverse(input: LatAndLngRequest) {
  const api = initApi();

  const response = await api.get(`/reverse`, {
    params: {
      lat: input.lat,
      lng: input.lng
    }
  });

  return response.data;
}
