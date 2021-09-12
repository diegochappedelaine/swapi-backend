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
    path: "/starships",
    handler: fetchDatas,
  },
  {
    method: "GET",
    path: "/starships/{id}",
    handler: fetchDatas,
  },
];

export default starshipRoutes;
