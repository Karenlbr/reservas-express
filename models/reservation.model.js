import { DataTypes } from "sequelize";
import { dbConnection } from "../config/db.js";

const Reservation = dbConnection.define("Reservations", {
  name: { type: DataTypes.STRING, allowNull: false },
  place: { type: DataTypes.STRING, allowNull: false },
  hour: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false },
  department: { type: DataTypes.STRING, allowNull: false },
});

Reservation.sync();
export default Reservation;
