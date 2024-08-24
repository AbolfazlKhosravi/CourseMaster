const UsersModels = require("../models/users-models");
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { tryCatchHandler } = require("../utilities/tryCatch_Handler");
const AppErrores = require("../utilities/app_errores");
require("dotenv").config();

const register = tryCatchHandler(async (req, res) => {
  const schema = {
    name: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.min": "تعداد کاراکتر",
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  };
  const validateResult = Joi.object(schema).validate(req.body);

  if (validateResult.error) {
    throw new AppErrores(101,400,validateResult.error.details[0].message);
    // return res.status(404).send(validateResult.error.details[0].message);
  }
  const { name, email, password } = req.body;
  const isEmail = await UsersModels.getUsersByEmail(email);

  if (isEmail)  throw new AppErrores(101,400,"email already hass benn");

  const hashPassword = await bcrypt.hash(password, 10);
  await UsersModels.insertUser(name, email, hashPassword);
  const newUser = await UsersModels.getUsersByEmail(email);
  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);
  res.setHeader("accessToken", `Bearer ${accessToken}`);
  res.setHeader("refreshToken", `Bearer ${refreshToken}`);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
  });
  res.status(201).send(_.pick(newUser, ["id", "name", "email"]));
});

const login = tryCatchHandler(async (req, res) => {
  const schema = {
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  };
  const validateResult = Joi.object(schema).validate(req.body);

  if (validateResult.error) {
    // return res.status(400).send(validateResult.error.details[0].message);
    // throw validateResult.error;
    
    
    throw new AppErrores(101,400,validateResult.error.details[0].message)
  }
  const { email, password } = req.body;
  const validateByEmail = await UsersModels.getUsersByEmail(email);
  if (!validateByEmail) {
    throw new AppErrores(101,400,"email or passworld in invalidate")
  }
  const validatePassword = await bcrypt.compare(
    password,
    validateByEmail.password
  );
  if (!validatePassword)
    throw new AppErrores(101,400,"email or passworld in invalidate")

  const accessToken = generateAccessToken(validateByEmail);
  const refreshToken = generateRefreshToken(validateByEmail);
  res.setHeader("accessToken", `Bearer ${accessToken}`);
  res.setHeader("refreshToken", `Bearer ${refreshToken}`);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
  });
  res.status(201).send("ok");
});

function generateAccessToken(user) {
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
}
function generateRefreshToken(user) {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
}

module.exports = {
  register,
  login,
};
