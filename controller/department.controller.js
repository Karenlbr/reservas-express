import Department from "../models/department.js";

export const CreateDepartment = async (req, res) => {
  try {
    const { department, responsible } = req.body;

    const existsDeparment = await Department.findOne({
      department: department,
    });

    if (!department || !responsible) {
      return res.status(400).json({
        message: "El nombre y el responsable del departamento son requeridos",
      });
    }

    if (existsDeparment) {
      return res.status(400).json({
        message: "El departamento ya existe",
      });
    }

    const newDepartment = await Department.create({
      department,
      responsible,
    });

    return res.status(201).json({
      data: newDepartment,
      message: "Departamento creado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
