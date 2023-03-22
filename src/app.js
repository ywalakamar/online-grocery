import express from "express";
import productRouter from "./routes/product.js";

const createApp = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  app.use(productRouter);
};

export default createApp;
