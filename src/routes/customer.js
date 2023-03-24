import { Router } from "express";
import {
  signUp,
  addCustomerAddress,
  getCustomerProfile,
  signIn,
  getCustomerProfiles,
} from "../controllers/customer";
import userAuth from "../middleware/auth";

const customerRouter = Router();

customerRouter.post("/customers/signup", signUp);
customerRouter.post("/customers/login", signIn);
customerRouter.post("/customers/address", userAuth, addCustomerAddress);
customerRouter.get("/customers/profile", userAuth, getCustomerProfile);
customerRouter.get("/customers", getCustomerProfiles);

export default customerRouter;
