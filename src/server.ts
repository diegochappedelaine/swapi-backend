"use strict";

import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";

import {
  peopleRoutes,
  planetRoutes,
  filmRoutes,
  speciesRoutes,
  vehicleRoutes,
} from "./routes";

export let server: Server;

export const init = async function (): Promise<Server> {
  server = Hapi.server({
    port: process.env.PORT || 4000,
    host: "localhost",
  });

  server.route(peopleRoutes);
  server.route(planetRoutes);
  server.route(filmRoutes);
  server.route(speciesRoutes);
  server.route(vehicleRoutes);

  return server;
};

export const start = async function (): Promise<void> {
  console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
  return server.start();
};

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection");
  console.error(err);
  process.exit(1);
});
