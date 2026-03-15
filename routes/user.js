import { Router } from "express";
import {
  getUsers,
  loginUser,
  createUser,
  getUserProfile,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.get("/me", getUserProfile);
router.delete("/:id", deleteUser);
router.post("/signin", loginUser);
router.post("/signup", createUser);
router.patch("/:id", updateUser);

export default router;
