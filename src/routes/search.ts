import {
  Request,
  ResponseToolkit,
  ResponseObject,
  ServerRoute,
} from "@hapi/hapi";
import {
  SwapiRessources,
  Character,
  Planet,
  Film,
  Specie,
  Vehicle,
  Sharship,
} from "../types";
import { fetchSearchResults } from "../utils/fetch-api";

async function fetchDatas(
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject | unknown> {
  const search = request.query.value;

  try {
    const filmSearchResults = await fetchSearchResults<Film>(
      SwapiRessources.FILMS,
      search
    );
    const peopleSearchResults = await fetchSearchResults<Character>(
      SwapiRessources.PEOPLE,
      search
    );
    const planetSearchResults = await fetchSearchResults<Planet>(
      SwapiRessources.PLANETS,
      search
    );
    const specieSearchResults = await fetchSearchResults<Specie>(
      SwapiRessources.SPECIES,
      search
    );
    const starshipSearchResults = await fetchSearchResults<Sharship>(
      SwapiRessources.STARSHIPS,
      search
    );
    const vehicleSearchResults = await fetchSearchResults<Vehicle>(
      SwapiRessources.VEHICLES,
      search
    );

    const result = [
      { films: filmSearchResults.results },
      { peoples: peopleSearchResults.results },
      { planets: planetSearchResults.results },
      { species: specieSearchResults.results },
      { starships: starshipSearchResults.results },
      { vehicles: vehicleSearchResults.results },
    ];

    const response = h.response(result);
    return response;
  } catch (error) {
    return error;
  }
}

const searchRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/search",
    handler: fetchDatas,
  },
];

export default searchRoutes;
