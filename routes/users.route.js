import express from "express";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const userrouter = express.Router();

userrouter.get("/", verifyToken, getUsers);
userrouter.get("/:id", verifyToken, getUserById);
userrouter.post("/", verifyToken, createUser);
userrouter.put("/:id", verifyToken, updateUser);
userrouter.delete("/:username", verifyToken, deleteUser);

export default userrouter;
