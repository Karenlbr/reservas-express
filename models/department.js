import { DataTypes } from "sequelize";
import { dbConnection } from "../config/db.js";

const Department = dbConnection.define("departments", {
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  responsible: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Department.sync();
export default Department;
