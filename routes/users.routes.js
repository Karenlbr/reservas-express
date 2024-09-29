import { Router } from "express";
import {
  CreateUser,
  DeleteUserById,
  GetAllUsers,
  GetOneUserById,
  Login,
  UpdateUserById,
} from "../controller/user.controller.js";
import authorizateUser from "../middlewares/users/authorizateUser.middeware.js";
import { body, param } from "express-validator";
import validateDataMiddleware from "../middlewares/validation/validateData.middleware.js";
import checkIdNumber from "../middlewares/users/checkIdNumber.middleware.js";
import userExists from "../middlewares/users/userExists.middleware.js";

export const userRouter = Router();

userRouter.get("/", GetAllUsers);

userRouter.get("/:id", [checkIdNumber, userExists], GetOneUserById);

userRouter.post("/login", Login);

userRouter.post(
  "/",
  [
    body("username", "Username not valid").exists().isString(),
    body("password", "Password invalid").exists().isString().isLength({
      min: 1,
      max: 10,
    }),
    validateDataMiddleware,
  ],
  CreateUser
);

userRouter.patch("/:id", [checkIdNumber, userExists], UpdateUserById);

userRouter.delete("/:id", [checkIdNumber, userExists], DeleteUserById);

export default userRouter;
