import { getOrdersByCustomerId, createOrder, orders } from "../services/order";
import { formatData } from "../utils/encryption/encryption";
import { STATUS_CODES } from "../utils/appErrors";
import { getShoppingDetails } from "../services/customer";

const placeOrder = async (req, res, next) => {
  const { _id } = req.user;
  const { transactionId } = req.body;

  try {
    const { success, data } = await createOrder(_id, transactionId);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Created", code: STATUS_CODES.CREATED, success, data });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const { success, data } = await orders();
    return res
      .status(STATUS_CODES.OK)
      .send({ message: "OK", code: STATUS_CODES.OK, success, data });
  } catch (error) {
    next(error);
  }
};

const getOrdersByCustomer = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { success, data } = await getOrdersByCustomerId(_id);
    return res
      .status(STATUS_CODES.OK)
      .send({ message: "OK", code: STATUS_CODES.OK, success, data });
  } catch (error) {
    next(error);
  }
};

export { placeOrder, getAllOrders, getOrdersByCustomer };
