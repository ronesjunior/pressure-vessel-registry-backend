import { Router } from "express";
import auth from "../middlewares/auth.js";

import {
  getVessel,
  createVessel,
  deleteVessel,
  getVesselById,
} from "../controllers/vesselController.js";

import {
  validateCreateVessel,
  validateDeleteVessel,
  validateVesselId,
} from "../middlewares/validation.js";

const router = Router();

router.get("/", auth, getVessel);
router.post("/cadastrarVaso", auth, validateCreateVessel, createVessel);
router.delete("/:id", auth, validateDeleteVessel, deleteVessel);
router.get("/:id", auth, validateVesselId, getVesselById);

export default router;
