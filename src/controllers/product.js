import { create, getAll, getOne } from "../services/product";
import {
  BadRequestError,
  NotFoundError,
  STATUS_CODES,
} from "../utils/appErrors";
import { isEmpty } from "../utils/validation/functions";
import { productKeys } from "../utils/validation/keys";
import {
  checkBlankValues,
  checkKeys,
  checkProperties,
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

    const results = await create(inputData);

    if (!results.success) {
      throw new BadRequestError(`${results.error}`);
    }
    return res
      .status(STATUS_CODES.CREATED)
      .send({ status: "Created", code: STATUS_CODES.CREATED });
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
  try {
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

export { createProduct, getAllProducts, getProductById };
