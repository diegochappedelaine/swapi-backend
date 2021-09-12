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
  const result = await fetchApiRoute<Film>(
    SwapiRessources.FILMS,
    request.params.id,
    request.query.page
  );

  return h.response(result);
}

const filmRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/films",
    handler: fetchDatas,
  },
  {
    method: "GET",
    path: "/films/{id}",
    handler: fetchDatas,
  },
];

export default filmRoutes;
