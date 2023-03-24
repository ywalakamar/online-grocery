import { Router } from "express";
import { checkOrders, placeOrder } from "../controllers/shopping";
import userAuth from "../middleware/auth";

const shoppingRouter = Router();

shoppingRouter.post("/shopping/order", userAuth, placeOrder);
shoppingRouter.get("/shopping/orders", userAuth, checkOrders);

export { shoppingRouter };
