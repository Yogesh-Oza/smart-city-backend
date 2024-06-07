import express from "express";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createCarousel,
  deleteCarousel,
  getAllPhotos,
} from "../controllers/carousel.controller.js";

const carouselrouter = express.Router();

carouselrouter.get("/", getAllPhotos);
carouselrouter.post("/", createCarousel);
carouselrouter.delete("/:id", deleteCarousel);

export default carouselrouter;
