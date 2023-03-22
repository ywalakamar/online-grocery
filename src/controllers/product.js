import { create, getAll, getOne } from "../services/product";

const getAllProducts = async (req, res) => {
  try {
    const products = await getAll();
    res.json({ data: products, status: "success" });
  } catch (error) {}
};

const getProductById = async (req, res) => {
  try {
    const product = await getOne(req.params.id);
    res.json({ data: product, status: "success" });
  } catch (error) {}
};

const createProduct = async (req, res) => {
  try {
    const product = await create(req.body);
    res.json({ data: product, status: "success" });
  } catch (error) {}
};

export { createProduct, getAllProducts, getProductById };
