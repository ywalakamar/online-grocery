import express from "express";
import productRouter from "./routes/product.js";
import ErrorHandler from "./middleware/errorHandler.js";

const createApp = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  app.use(productRouter);

  app.use(ErrorHandler);
};

export default createApp;
