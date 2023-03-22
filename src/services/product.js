// import ProductRepository from "../database/repositories/product";
// import formatData from "../utils";

import Product from "../models/Product";

// class ProductService {
//   constructor() {
//     this.repository = new ProductRepository();
//   }

//   async createProduct(product) {
//     try {
//       const results = await this.repository.createProduct(product);
//       return formatData(results);
//     } catch (error) {}
//   }
// }

// export default ProductService;

const create = async (product) => {
  return await Product.create(product);
};

const getAll = async () => {
  return await Product.find();
};

const getOne = async (id) => {
  return await Product.findById(id);
};

export { create, getAll, getOne };
