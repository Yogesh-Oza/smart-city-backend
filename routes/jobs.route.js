import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addJobs,
  deleteJob,
  getJobs,
  getJobsByCategory,
} from "../controllers/jobs.controller.js";

import prisma from "../lib/prisma.js";
const router = express.Router();

router.get("/", verifyToken, getJobs);
router.get("/category", verifyToken, getJobsByCategory);
router.post("/", verifyToken, addJobs);
router.delete("/:id", verifyToken, deleteJob);
router.get("/categories", async (req, res) => {
  try {
    // Retrieve unique job categories using Prisma
    const jobCategories = await prisma.job.findMany({
      where: {
        jobCategory: {
          not: null,
        },
      },
      select: {
        jobCategory: true,
      },
      distinct: ["jobCategory"],
    });

    // Extract unique job categories from the result
    const categories = jobCategories.map((job) => job.jobCategory);

    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to retrieve job categories" });
  }
});

export default router;
