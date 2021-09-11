import {
  Request,
  ResponseToolkit,
  ResponseObject,
  ServerRoute,
} from "@hapi/hapi";
import { SwapiRessources, Film } from "../types";
import { fetchApiRoute } from "../utils/fetch-api";

async function fetchDatas(
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  const response = h.response(
    await fetchApiRoute<Film>(
      SwapiRessources.FILMS,
      request.params.id,
      request.query.page
    )
  );
  return response;
}

const filmRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/film",
    handler: fetchDatas,
  },
  {
    method: "GET",
    path: "/film/{id}",
    handler: fetchDatas,
  },
];

export default filmRoutes;
