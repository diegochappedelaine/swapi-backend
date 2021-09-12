import { SwapiRessources, SwapiResponseScheme } from "../types";
import axios from "axios";

export const fetchApiRoute = async <T>(
  ressource: SwapiRessources,
  id: string | undefined,
  page: string | undefined
) => {
  let url = `https://swapi.dev/api/${ressource}/`;
  if (id) {
    url += id;
  }
  if (page) {
    url += `?page=${page}`;
  }

  const response = await axios.get<SwapiResponseScheme & { results: T[] }>(url);
  return response.data;
};

export const fetchSearchResults = async <T>(
  ressource: SwapiRessources,
  value: string
) => {
  const url = `https://swapi.dev/api/${ressource}/?search=${value}`;

  const response = await axios.get<SwapiResponseScheme & { results: T[] }>(url);
  return response.data;
};
