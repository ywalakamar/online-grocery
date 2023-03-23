import Product from "../models/product";

const create = async (product) => {
  try {
    const results = await Product.create(product);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

const getAll = async () => {
  try {
    return {
      success: true,
      data: await Product.find(),
    };
  } catch (error) {
    return { success: false, error };
  }
};

const getOne = async (id) => {
  try {
    return {
      success: true,
      data: await Product.findById(id),
    };
  } catch (error) {
    return { success: false, error };
  }
};

export { create, getAll, getOne };
