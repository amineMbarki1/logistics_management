import axios from "axios";
import { LatLng } from "react-native-maps";

const token = "pk.be02a68052a90baaa66be848842c9760";
const BASE_URL = `https://api.locationiq.com/v1/autocomplete?key=${token}`;

export async function fetchLocationSuggestions(searchQuery: string) {
  const url = `${BASE_URL}&q=${searchQuery}`;

  const { data } = await axios.get<LocationResponse[]>(url);
  return data;
}

export async function reverseGeoCode(coordinates: LatLng) {
  const url = `https://us1.locationiq.com/v1/reverse?key=${token}`;

  const { data } = await axios.get<LocationResponse>(
    `${url}&lat=${coordinates.latitude}&lon=${coordinates.longitude}&format=json`
  );

  return data;
}

export interface LocationResponse {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
}

export interface Address {
  attraction: string;
  house_number: string;
  road: string;
  city_block: string;
  suburb: string;
  city_district: string;
  city: string;
  state: string;
  region: string;
  postcode: string;
  country: string;
  country_code: string;
}
