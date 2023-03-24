import { createOrder } from "../services/order";
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

const checkOrders = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const { data } = await getShoppingDetails(_id);
    return res.status(STATUS_CODES.OK).send(data.orders);
  } catch (error) {
    next(error);
  }
};

export { placeOrder, checkOrders };
