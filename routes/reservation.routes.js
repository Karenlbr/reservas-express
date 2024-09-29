import { Router } from "express";
import {
  GetAllReservation,
  GetOneReservationById,
  CreateReservation,
  UpdateReservationById,
  DeleteReservationById,
} from "../controller/reservation.controller.js";
import { body } from "express-validator";
import validateDataMiddleware from "../middlewares/validation/validateData.middleware.js";
import checkIdNumber from "../middlewares/users/checkIdNumber.middleware.js";
import reservationExists from "../middlewares/users/userExists.middleware.js";
import authorizateUser from "../middlewares/users/authorizateUser.middeware.js";

export const reservationRouter = Router();

reservationRouter.use(authorizateUser);

reservationRouter.get("/", GetAllReservation);

reservationRouter.get(
  "/:id",
  [checkIdNumber, reservationExists],
  GetOneReservationById
);

reservationRouter.post(
  "/",
  [
    body("name", "Name not valid").exists().isString(),
    body("place", "Place not valid").exists().isString(),
    body("hour", "Hour not valid").exists().isString(),
    body("date", "Date not valid").exists().isString(),
    body("duration", "Duration not valid").exists().isNumeric(),
    body("department", "Department invalid").exists().isString().isLength({
      min: 1,
      max: 50,
    }),
    validateDataMiddleware,
  ],
  CreateReservation
);

reservationRouter.patch(
  "/:id",
  [
    checkIdNumber,
    validateDataMiddleware,
    body("name", "Name not valid").optional().isString(),
    body("place", "Place not valid").optional().isString(),
    body("hour", "Hour not valid").optional().isString(),
    body("date", "Date not valid").optional().isString(),
    body("duration", "Duration not valid").optional().isNumeric(),
    body("department", "Department invalid").optional().isString(),
  ],
  UpdateReservationById
);

reservationRouter.delete("/:id", [checkIdNumber], DeleteReservationById);

export default reservationRouter;
