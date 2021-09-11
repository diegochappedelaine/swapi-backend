import {
  Request,
  ResponseToolkit,
  ResponseObject,
  ServerRoute,
} from "@hapi/hapi";
import { SwapiRessources, Specie } from "../types";
import { fetchApiRoute } from "../utils/fetch-api";

async function fetchDatas(
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  const response = h.response(
    await fetchApiRoute<Specie>(
      SwapiRessources.SPECIES,
      request.params.id,
      request.query.page
    )
  );
  return response;
}

const speciesRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/specie",
    handler: fetchDatas,
  },
  {
    method: "GET",
    path: "/specie/{id}",
    handler: fetchDatas,
  },
];

export default speciesRoutes;
