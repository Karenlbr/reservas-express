import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/users.routes.js";
import { dbConnection } from "./config/db.js";
import reservationRouter from "./routes/reservation.routes.js";
import departamentRouter from "./routes/department.routes.js";
const app = express();

app.use(cors());
app.use(bodyParser());

app.use("/users", userRouter);
app.use("/reservations", reservationRouter);
app.use("/department", departamentRouter);

try {
  dbConnection.authenticate();
  console.log("Connected to DB");
} catch (err) {
  console.log(err);
}

app.listen(8080, () => {
  console.log("server running on http://localhost:8080");
});
