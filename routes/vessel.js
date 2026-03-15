import { Router } from "express";
import {
  getVessel,
  createVessel,
  deleteVessel,
} from "../controllers/vesselController.js";

const router = Router();

router.get("/", getVessel);
router.post("/cadastrarVaso", createVessel);
router.delete("/:id", deleteVessel);

export default router;
