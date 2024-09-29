import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CONFIG } from "../config/config.js";

export const GetAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

export const GetOneUserById = async (req, res) => {
  const user = await User.findOne({
    id: +req.params.id,
  });

  res.json(user);
};

export const CreateUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, CONFIG.SALT_ROUNDS);
  const userToCreate = { username, password: hashedPassword };

  await User.create(userToCreate);

  res.status(201).json(userToCreate);
};

export const UpdateUserById = async (req, res) => {
  await User.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  const userUpdated = await User.findOne({
    where: {
      id: +req.params.id,
    },
  });

  res.json(userUpdated);
};

export const DeleteUserById = async (req, res) => {
  const userToDelete = await User.findOne({
    where: {
      id: +req.params.id,
    },
  });

  await User.destroy({
    where: {
      id: +req.params.id,
    },
  });

  res.json(userToDelete);
};

export const Login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    return res
      .status(401)
      .json({ message: "Usuario y/o contraseña incorrecto" });
  }

  const matchPassword = await bcrypt.compareSync(password, user.password);

  if (!matchPassword) {
    return res
      .status(401)
      .json({ message: "Usuario y/o contraseña incorrecto" });
  }

  const token = jwt.sign({ userId: user.id }, "bolivar-2024", {
    expiresIn: 60 * 60,
  });

  res.json({ token: token });
};
