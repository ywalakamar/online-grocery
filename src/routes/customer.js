import { Router } from "express";
import {
  signUp,
  addCustomerAddress,
  getCustomerProfile,
  signIn,
  getAllCustomers,
} from "../controllers/customer";
import { getAllOrders } from "../controllers/shopping";
import userAuth from "../middleware/auth";

const customerRouter = Router();

customerRouter.post("/customers/signup", signUp);
customerRouter.post("/customers/login", signIn);
customerRouter.post("/customers/address", userAuth, addCustomerAddress);
customerRouter.get("/customers/profile", userAuth, getCustomerProfile);
customerRouter.get("/customers/orders", userAuth, getAllOrders);
customerRouter.get("/customers", getAllCustomers);

export default customerRouter;
