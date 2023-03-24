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
      data: await Customer.findById(id).populate("address"),
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

export {
  createCustomer,
  createAddress,
  getCustomerById,
  getCustomerByEmail,
  getCustomers,
};
