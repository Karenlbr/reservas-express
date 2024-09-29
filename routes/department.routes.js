import { Router } from "express";
import { CreateDepartment } from "../controller/department.controller.js";
import { body } from "express-validator";
import validateDataMiddleware from "../middlewares/validation/validateData.middleware.js";
import authorizateUser from "../middlewares/users/authorizateUser.middeware.js";

const departamentRouter = Router();

departamentRouter.post(
  "/",
  [
    body(["department", "Nombre del departamento es obligatorio"])
      .exists()
      .isString(),
    body(["responsible", "Nombre del responsable es obligatorio"])
      .exists()
      .isString(),
    authorizateUser,
  ],
  CreateDepartment
);

export default departamentRouter;
