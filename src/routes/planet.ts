import {
  Request,
  ResponseToolkit,
  ResponseObject,
  ServerRoute,
} from "@hapi/hapi";
import { SwapiRessources, Planet } from "../types";
import { fetchApiRoute } from "../utils/fetch-api";

async function fetchDatas(
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  const result = await fetchApiRoute<Planet>(
    SwapiRessources.PLANETS,
    request.params.id,
    request.query.page
  );

  return h.response(result);
}

const planetRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/planets",
    handler: fetchDatas,
  },
  {
    method: "GET",
    path: "/planets/{id}",
    handler: fetchDatas,
  },
];

export default planetRoutes;
