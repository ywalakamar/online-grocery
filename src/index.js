import "dotenv/config";
import express from "express";
import createApp from "./app.js";
import dbConn from "./database/connection.js";

const port = process.env.PORT;

const server = async () => {
  const app = express();

  await dbConn();

  await createApp(app);

  app.listen(port);
};

server();
