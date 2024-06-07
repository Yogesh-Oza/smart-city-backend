import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addPlace,
  deletePlace,
  getPlaces,
  getPlacesByCategory,
  updatePlace,
} from "../controllers/place.controller.js";

const router = express.Router();

router.get("/", verifyToken, getPlaces);
router.post("/", verifyToken, addPlace);
router.delete("/:id", verifyToken, deletePlace);
router.put("/:id", verifyToken, updatePlace);
router.get("/category", verifyToken, getPlacesByCategory);

export default router;
