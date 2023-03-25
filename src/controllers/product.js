import { addCartItem } from "../services/customer";
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
    const { data } = await getAll();
    if (isEmpty(data)) {
      throw new NotFoundError("No Product Record Found");
    }
    return res
      .status(STATUS_CODES.OK)
      .json({ status: "OK", code: STATUS_CODES.OK, data });
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

    const { data } = await getOne(req.params.id);

    /*check if the returned json object is empty */
    if (!Object.keys(data).length) {
      throw new NotFoundError("No Product Record Found");
    }
    return res
      .status(STATUS_CODES.OK)
      .json({ status: "OK", code: STATUS_CODES.OK, data });
  } catch (error) {
    next(error);
  }
};

const manageCart = async (req, res, next) => {
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

    // const product = data;
    const { data } = await addCartItem(
      customer._id,
      product.data,
      quantity,
      false
    );
    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Created", code: STATUS_CODES.CREATED, data });
  } catch (error) {
    next(error);
  }
};

export { createProduct, getAllProducts, getProductById, manageCart };
