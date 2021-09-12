import {
  Request,
  ResponseToolkit,
  ResponseObject,
  ServerRoute,
} from "@hapi/hapi";
import { SwapiRessources, Vehicle } from "../types";
import { fetchApiRoute } from "../utils/fetch-api";

async function fetchDatas(
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  const result = await fetchApiRoute<Vehicle>(
    SwapiRessources.VEHICLES,
    request.params.id,
    request.query.page
  );

  return h.response(result);
}

const vehicleRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/vehicles",
    handler: fetchDatas,
  },
  {
    method: "GET",
    path: "/vehicles/{id}",
    handler: fetchDatas,
  },
];

export default vehicleRoutes;
