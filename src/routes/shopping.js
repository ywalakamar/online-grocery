import { Router } from "express";
import { getOrdersByCustomer, placeOrder } from "../controllers/shopping";
import userAuth from "../middleware/auth";

const shoppingRouter = Router();

shoppingRouter.post("/shopping/order", userAuth, placeOrder);
shoppingRouter.get("/shopping/orders", userAuth, getOrdersByCustomer);

export { shoppingRouter };
