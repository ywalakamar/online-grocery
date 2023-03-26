import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  getCartItems,
  addCartItem,
  removeCartItem,
} from "../controllers/product.js";
import userAuth from "../middleware/auth.js";

const productRouter = Router();

productRouter.get("/products", getAllProducts);
productRouter.get("/products/:id", getProductById);
productRouter.post("/products", createProduct);
productRouter.put("/cart", userAuth, addCartItem);
productRouter.get("/cart", userAuth, getCartItems);
productRouter.delete("/cart/:id", userAuth, removeCartItem);

export default productRouter;
