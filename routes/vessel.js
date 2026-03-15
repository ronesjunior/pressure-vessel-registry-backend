import { Router } from "express";
import {
  getVessel,
  //   getVesselById,
  createVessel,
  //   updateVessel,
  deleteVessel,
} from "../controllers/vesselController.js";

const router = Router();

router.get("/", getVessel);
// router.get("/:id", getVesselById);
router.post("/cadastrarVaso", createVessel);
// router.put("/:id", updateVessel);
router.delete("/:id", deleteVessel);

export default router;
