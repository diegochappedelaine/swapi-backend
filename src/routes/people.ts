import {
  Request,
  ResponseToolkit,
  ResponseObject,
  ServerRoute,
} from "@hapi/hapi";
import { SwapiRessources, Character } from "../types";
import { fetchApiRoute } from "../utils/fetch-api";

async function fetchDatas(
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  const result = await fetchApiRoute<Character>(
    SwapiRessources.PEOPLE,
    request.params.id,
    request.query.page
  );

  return h.response(result);
}

const peopleRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/people",
    handler: fetchDatas,
  },
  {
    method: "GET",
    path: "/people/{id}",
    handler: fetchDatas,
  },
];

export default peopleRoutes;
