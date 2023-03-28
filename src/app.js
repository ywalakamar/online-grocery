import express from "express";
import productRouter from "./routes/product.js";
import ErrorHandler from "./middleware/errorHandler.js";
import customerRouter from "./routes/customer.js";
import { shoppingRouter } from "./routes/shopping.js";
import cors from "cors";

const createApp = async (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  app.use(productRouter);
  app.use(customerRouter);
  app.use(shoppingRouter);

  app.use(ErrorHandler);
};

export default createApp;
