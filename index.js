import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/users.routes.js";
import { dbConnection } from "./config/db.js";
import ApiRateLimit from "./middlewares/ratelimite/apiRateLimit.middleware.js";

const app = express();

app.use(cors());
app.use(bodyParser());
app.use(ApiRateLimit);

app.use("/users", userRouter);

try {
  dbConnection.authenticate();
  console.log("Connected to DB");
} catch (error) {
  console.log(error);
}

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
