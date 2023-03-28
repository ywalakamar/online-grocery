import {
  createCustomer,
  createAddress,
  getCustomerById,
  getCustomerByEmail,
  getCustomers,
  manageCart,
} from "../services/customer";
import { getOne } from "../services/product";
import { NotFoundError, STATUS_CODES } from "../utils/appErrors";
import {
  formatData,
  generatePassword,
  generateSalt,
  generateSignature,
  validatePassword,
} from "../utils/encryption/encryption";
import { customerKeys, loginKeys, addressKeys } from "../utils/validation/keys";
import { BadRequestError } from "../utils/appErrors";

import {
  checkBlankValues,
  checkKeys,
  checkProperties,
  isValidId,
} from "../utils/validation/validations";

const signUp = async (req, res, next) => {
  const userInput = req.body;

  /* data validations */
  const invalidKeys = checkKeys(userInput, customerKeys);
  const missingProperties = checkProperties(userInput, customerKeys);
  const blankValues = checkBlankValues(userInput);

  const { email, password, phone } = userInput;
  const salt = await generateSalt();
  const userPassword = await generatePassword(password, salt);

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

    const results = await createCustomer({
      email,
      password: userPassword,
      salt,
      phone,
    });

    if (results.error) {
      throw new BadRequestError(`${results.error}`);
    }

    const token = generateSignature({ email: email, _id: results.data._id });
    var { data } = formatData({ id: results.data._id, token });

    return res.status(STATUS_CODES.CREATED).send({
      message: "Created",
      code: STATUS_CODES.CREATED,
      success: results.success,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const userInput = req.body;
  const { email, password } = userInput;

  /* data validations */
  const invalidKeys = checkKeys(userInput, loginKeys);
  const missingProperties = checkProperties(userInput, loginKeys);
  const blankValues = checkBlankValues(userInput);

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

    const { error, success, data } = await getCustomerByEmail(email);
    if (data === null) {
      throw new NotFoundError(`Customer With Email ${email} Not Registered`);
    }
    if (error) {
      throw new BadRequestError(`${results.error}`);
    }

    const validPassword = await validatePassword(
      password,
      data.password,
      data.salt
    );

    if (!validPassword) {
      throw new BadRequestError(`Invalid Password`);
    }
    const token = generateSignature({
      email: data.email,
      _id: data._id,
    });
    const results = formatData({
      id: data._id,
      token,
    });

    return res.status(STATUS_CODES.OK).send({
      message: "OK",
      code: STATUS_CODES.OK,
      success,
      data: results.data,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCustomers = async (req, res, next) => {
  try {
    const { success, data } = await getCustomers();
    return res
      .status(STATUS_CODES.OK)
      .send({ message: "OK", code: STATUS_CODES.OK, success, data });
  } catch (error) {
    next(error);
  }
};

const getCustomerProfile = async (req, res, next) => {
  try {
    const _id = req.user;
    const { success, data } = await getCustomerById(_id);
    return res
      .status(STATUS_CODES.OK)
      .send({ message: "OK", code: STATUS_CODES.OK, success, data });
  } catch (error) {
    next(error);
  }
};

const addCustomerAddress = async (req, res, next) => {
  const { _id } = req.user;
  const userInput = req.body;
  const { street, postalCode, city, country } = userInput;
  /* data validations */
  const invalidKeys = checkKeys(userInput, addressKeys);
  const missingProperties = checkProperties(userInput, addressKeys);
  const blankValues = checkBlankValues(userInput);
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

    const { success } = await createAddress({
      _id,
      street,
      postalCode,
      city,
      country,
    });

    if (!success) {
      throw new BadRequestError(`${data.error}`);
    }

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Created", code: STATUS_CODES.CREATED, success });
  } catch (error) {
    next(error);
  }
};

export {
  signUp,
  addCustomerAddress,
  getCustomerProfile,
  signIn,
  getAllCustomers,
};
