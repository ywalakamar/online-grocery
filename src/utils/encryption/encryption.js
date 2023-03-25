import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateSalt = async () => {
  return await bcrypt.genSalt();
};

const generatePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

const validatePassword = async (userInput, savedPassword, salt) => {
  return (await generatePassword(userInput, salt)) === savedPassword;
};

const generateSignature = (payload) => {
  try {
    return jwt.sign(payload, "SweetSecret", { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
  }
};

const validateSignature = (req) => {
  try {
    const signature = req.get("Authorization");
    const payload = jwt.verify(signature.split(" ")[1], "SweetSecret");
    req.user = payload;

    const user = req.user;

    return { success: true, data: user };
  } catch (error) {
    return { success: false, data: error };
  }
};

const formatData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not Found");
  }
};

export {
  generateSalt,
  generatePassword,
  validatePassword,
  validateSignature,
  generateSignature,
  formatData,
};
