import { manageCart, getShoppingDetails } from "../services/customer";
import { create, getAll, getOne } from "../services/product";
import {
  BadRequestError,
  NotFoundError,
  STATUS_CODES,
} from "../utils/appErrors";
import { isEmpty } from "../utils/validation/functions";
import { productKeys, cartKeys } from "../utils/validation/keys";
import {
  checkBlankValues,
  checkKeys,
  checkProperties,
  isValidId,
} from "../utils/validation/validations";

const createProduct = async (req, res, next) => {
  const inputData = req.body;

  /* data validation */
  const invalidKeys = checkKeys(inputData, productKeys);
  const missingProperties = checkProperties(inputData, productKeys);
  const blankValues = checkBlankValues(inputData);

  try {
    if (invalidKeys.length) {
      throw new BadRequestError(`Invalid Keys:(${invalidKeys})`);
    }
    if (missingProperties.length) {
      throw new BadRequestError(`Missing Properties:(${missingProperties})`);
    }
    if (blankValues.length) {
      throw new BadRequestError(`Blank Values:(${blankValues})`);
    }

    if (req.file) {
      inputData.banner = req.file.path;
    }

    const { success } = await create(inputData);

    if (!success) {
      throw new BadRequestError(`${results.error}`);
    }
    return res
      .status(STATUS_CODES.CREATED)
      .send({ status: "Created", code: STATUS_CODES.CREATED, success });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const { success, data } = await getAll();
    if (isEmpty(data)) {
      throw new NotFoundError("No Product Record Found");
    }
    return res
      .status(STATUS_CODES.OK)
      .json({ status: "OK", code: STATUS_CODES.OK, success, data });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const id = req.params.id;
  const validId = isValidId(id);
  try {
    /* check if the provided id is valid */
    if (!validId) {
      throw new BadRequestError(`Invalid Id:(${id})`);
    }

    const { success, data } = await getOne(id);

    /*check if the returned json object is empty */
    if (!Object.keys(data).length) {
      throw new NotFoundError("No Product Record Found");
    }
    return res
      .status(STATUS_CODES.OK)
      .json({ status: "OK", code: STATUS_CODES.OK, success, data });
  } catch (error) {
    next(error);
  }
};

const addCartItem = async (req, res, next) => {
  const userInput = req.body;
  const { _id, quantity } = userInput;
  const customer = req.user;

  /* data validation */
  const invalidKeys = checkKeys(userInput, cartKeys);
  const missingProperties = checkProperties(userInput, cartKeys);
  const blankValues = checkBlankValues(userInput);
  const validId = isValidId(_id);

  try {
    //validation

    if (!validId) {
      throw new BadRequestError(`Invalid Id:(${_id})`);
    }

    if (invalidKeys.length) {
      throw new BadRequestError(`Invalid Keys:(${invalidKeys})`);
    }
    if (missingProperties.length) {
      throw new BadRequestError(`Missing Properties:(${missingProperties})`);
    }
    if (blankValues.length) {
      throw new BadRequestError(`Blank Values:(${blankValues})`);
    }

    const product = await getOne(_id);

    /*check if the returned json object is empty */
    if (!Object.keys(product.data).length) {
      throw new NotFoundError("No Product Record Found");
    }

    const { success } = await manageCart(
      customer._id,
      product.data,
      quantity,
      false
    );

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Created", code: STATUS_CODES.CREATED, success });
  } catch (error) {
    next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  //const userInput = req.body;
  const id = req.params.id;
  const { _id } = req.user;
  const validId = isValidId(id);
  try {
    /* check if the provided id is valid */
    if (!validId) {
      throw new BadRequestError(`Invalid Id:(${id})`);
    }
    const product = await getOne(id);
    const { success } = await manageCart(_id, product.data, 0, true);
    if (!success) {
      throw new BadRequestError(`No Such Item In Cart`);
    }
    return res
      .status(STATUS_CODES.OK)
      .send({ message: "OK", code: STATUS_CODES.OK, success });
  } catch (error) {
    next(error);
  }
};

const getCartItems = async (req, res, next) => {
  const { _id } = req.user;

  const {
    success,
    data: { cart },
  } = await getShoppingDetails(_id);
  return res
    .status(STATUS_CODES.OK)
    .json({ status: "OK", code: STATUS_CODES.OK, success, data: cart });
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  addCartItem,
  getCartItems,
  removeCartItem,
};
