import { v4 as uuidv4 } from "uuid";
import Customer from "../models/customer";
import Order from "../models/order";

const createOrder = async (custId, transactionId) => {
  const customer = await Customer.findById(custId).populate("cart.product");

  try {
    if (customer) {
      let amount = 0;
      let cartItems = customer.cart;

      /* check if cart is not empty */
      if (cartItems.length > 0) {
        /*process order */
        cartItems.map((item) => {
          amount += parseInt(item.product.price) * parseInt(item.unit);
        });
        const orderId = uuidv4();
        const order = await Order.create({
          orderId,
          custId,
          amount,
          transactionId,
          status: `received`,
          items: cartItems,
        });

        customer.cart = [];

        order.populate("items.product");

        const data = await order.save();
        customer.orders.push(data);
        customer.save();
        return { success: true, data };
      }
    }
  } catch (error) {
    return { success: false, error };
  }
};

export { createOrder };
