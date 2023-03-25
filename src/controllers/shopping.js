import { checkOrdersById, createOrder, orders } from "../services/order";
import { formatData } from "../utils/encryption/encryption";
import { STATUS_CODES } from "../utils/appErrors";
import { getShoppingDetails } from "../services/customer";

const placeOrder = async (req, res, next) => {
  const { _id } = req.user;
  const { transactionId } = req.body;

  try {
    const order = await createOrder(_id, transactionId);
    const results = formatData(order);

    const { data } = results.data;

    return res.status(STATUS_CODES.CREATED).send({ data });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const results = await orders();
    return res.status(STATUS_CODES.OK).send(results);
  } catch (error) {
    next(error);
  }
};

const getOrdersByCustomer = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { data } = await checkOrdersById(_id);
    return res.status(STATUS_CODES.OK).send({ data });
  } catch (error) {
    next(error);
  }
};

const checkOrders = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const { data } = await getShoppingDetails(_id);
    return res.status(STATUS_CODES.OK).send(data.orders);
  } catch (error) {
    next(error);
  }
};

export { placeOrder, checkOrders, getOrders, getOrdersByCustomer };
