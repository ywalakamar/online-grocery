import Address from "../models/address";
import Customer from "../models/customer";
const createCustomer = async ({ email, password, salt, phone }) => {
  try {
    const customer = await Customer.create({ email, password, salt, phone });
    return { success: true, data: customer };
  } catch (error) {
    return { success: false, error };
  }
};

const getCustomers = async () => {
  try {
    return {
      success: true,
      data: await Customer.find().populate("address"),
    };
  } catch (error) {
    return { success: false, error };
  }
};

const getCustomerById = async (id) => {
  try {
    return {
      success: true,
      data: await Customer.findById(id)
        .populate("address")
        .populate("cart.product"),
    };
  } catch (error) {
    return { success: false, error };
  }
};

const getCustomerByEmail = async (email) => {
  try {
    return {
      success: true,
      data: await Customer.findOne({ email: email }),
    };
  } catch (error) {
    return { success: false, error };
  }
};

const createAddress = async ({ _id, street, postalCode, city, country }) => {
  try {
    const customer = await Customer.findById(_id);
    if (customer) {
      const addr = await Address.create({
        street,
        postalCode,
        city,
        country,
      });
      customer.address.push(addr);
    }
    await customer.save();
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

const addCartItem = async (custId, product, quantity, isRemove) => {
  try {
    //get customer
    const customer = await Customer.findById(custId);
    if (customer) {
      const cartItem = { product, unit: quantity };

      // get carts
      let cartItems = customer.cart;

      //check if item already exists in cart
      if (cartItems.length > 0) {
        var isExist = false;
        cartItems.map((item) => {
          if (item.product._id.toString() === product._id.toString()) {
            if (isRemove) {
              // remove item from cart if need be
              cartItems.splice(cartItems.indexOf(item), 1);
            } else {
              // if item already exists, update quantity
              item.unit = quantity;
            }
            isExist = true;
          }
        });
        if (!isExist) {
          // push item to cart
          cartItems.push(cartItem);
        }
      } else {
        // push item to cart
        cartItems.push(cartItem);
      }
      // save items in customer's cart
      customer.cart = cartItems;
      const data = await customer.save();

      return { success: true, data };
    }
  } catch (error) {
    return { success: false, error };
  }
};

const getShoppingDetails = async (id) => {
  try {
    return {
      success: true,
      data: await Customer.findById(id)
        .populate("address")
        .populate("cart.product")
        .populate("orders"),
    };
  } catch (error) {
    return { success: false, error };
  }
};

export {
  createCustomer,
  createAddress,
  getCustomerById,
  getCustomerByEmail,
  getCustomers,
  addCartItem,
  getShoppingDetails,
};
