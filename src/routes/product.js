import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  manageCart,
  getCartItems,
} from "../controllers/product.js";
import userAuth from "../middleware/auth.js";

const productRouter = Router();

productRouter.get("/products", getAllProducts);
productRouter.get("/products/:id", getProductById);
productRouter.post("/products", createProduct);
productRouter.post("/cart", userAuth, manageCart);
productRouter.get("/cart", userAuth, getCartItems);

export default productRouter;
