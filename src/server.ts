"use strict";

import Hapi from "@hapi/hapi";
import { Server, Request } from "@hapi/hapi";

import { helloRoutes, peopleRoutes, planetRoutes } from "./routes";

export let server: Server;

function index(request: Request): string {
  console.log("Processing request", request.info.id);
  return "Hello! Nice to have met you.";
}

export const init = async function (): Promise<Server> {
  server = Hapi.server({
    port: process.env.PORT || 4000,
    host: "localhost",
  });

  server.route(helloRoutes);
  server.route(peopleRoutes);
  server.route(planetRoutes);

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
