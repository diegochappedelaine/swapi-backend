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
  const response = h.response(
    await fetchApiRoute<Planet>(
      SwapiRessources.PLANETS,
      request.params.id,
      request.query.page
    )
  );
  return response;
}

const planetRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/planet",
    handler: fetchDatas,
  },
  {
    method: "GET",
    path: "/planet/{id}",
    handler: fetchDatas,
  },
];

export default planetRoutes;
