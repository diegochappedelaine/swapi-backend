import {
  Request,
  ResponseToolkit,
  ResponseObject,
  ServerRoute,
} from "@hapi/hapi";
import { SwapiRessources, Sharship } from "../types";
import { fetchApiRoute } from "../utils/fetch-api";

async function fetchDatas(
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  const result = await fetchApiRoute<Sharship>(
    SwapiRessources.STARSHIPS,
    request.params.id,
    request.query.page
  );

  return h.response(result);
}

const starshipRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/starship",
    handler: fetchDatas,
  },
  {
    method: "GET",
    path: "/starship/{id}",
    handler: fetchDatas,
  },
];

export default starshipRoutes;
