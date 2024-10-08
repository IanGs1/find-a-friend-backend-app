import fastify, { FastifyReply } from "fastify";

import { appRoutes } from "./http/routes";

import env from "./env";

import { ZodError } from "zod";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _, reply: FastifyReply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation Error",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry;
  }

  return reply.status(500).send({
    message: "Internal Server Error",
  });
});
