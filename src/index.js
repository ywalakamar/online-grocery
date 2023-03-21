import express from "express";
import createApp from "./app.js";
import dbConn from "./database/connection.js";

const server = async () => {
  const app = express();

  await dbConn();

  await createApp(app);

  app.listen(8000, () => {
    console.log(`listening at port 8000`);
  });
};

server();
