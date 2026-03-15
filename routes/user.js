import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  getUsers,
  loginUser,
  createUser,
  getUserProfile,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

import {
  validateSignin,
  validateSignup,
  validateUpdateMe,
} from "../middlewares/validation.js";

const router = Router();

router.get("/", auth, getUsers);
router.get("/me", auth, getUserProfile);
router.delete("/me", auth, deleteUser);
router.post("/signin", validateSignin, loginUser);
router.post("/signup", validateSignup, createUser);
router.patch("/me", auth, validateUpdateMe, updateUser);

export default router;
