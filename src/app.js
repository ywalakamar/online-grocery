import express from "express";

const createApp = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
};

export default createApp;
