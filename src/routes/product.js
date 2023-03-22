import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
} from "../controllers/product.js";

const productRouter = Router();

productRouter.get("/products", getAllProducts);
productRouter.get("/products/:id", getProductById);
productRouter.post("/products", createProduct);

export default productRouter;
