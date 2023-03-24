import { STATUS_CODES } from "../utils/appErrors";
import { validateSignature } from "../utils/encryption/encryption";

const userAuth = (req, res, next) => {
  const isAuthorized = validateSignature(req);
  if (isAuthorized) {
    return next();
  }
  //   return res
  //     .status(STATUS_CODES.UNAUTHORISED)
  //     .json({ message: "Not Authorized" });
};

export default userAuth;
