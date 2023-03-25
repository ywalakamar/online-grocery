import { STATUS_CODES } from "../utils/appErrors";
import { validateSignature } from "../utils/encryption/encryption";

const userAuth = (req, res, next) => {
  const { success, data } = validateSignature(req);
  if (success) {
    return next();
  }

  return res
    .status(STATUS_CODES.UNAUTHORISED)
    .send({ message: "Not Authorized", data });
};

export default userAuth;
