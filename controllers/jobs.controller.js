// Import Prisma client
import prisma from "../lib/prisma.js";

// Controller to retrieve jobs
export const getJobs = async (req, res) => {
  try {
    // Retrieve all jobs using Prisma
    const jobs = await prisma.job.findMany();

    res.status(200).json(jobs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to retrieve jobs" });
  }
};

// Controller to add a new job

export const addJobs = async (req, res) => {
  const body = req.body;
  console.log(body);
  const tokenUserId = req.userId;

  try {
    // Create a new job using Prisma
    const newJob = await prisma.job.create({
      data: {
        ...body.jobData,
        userId: tokenUserId,
        jobCategory: body.jobCategory,
        companyName: body.companyName,
        jobDescription: body.jobDescription,
        vacancies: body.vacancies,
        contactNumber: body.contactNumber,
        state: body.state,
        city: body.city,
        address: body.address,
        description: body.description,
      },
    });

    res.status(201).json(newJob);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add job" });
  }
};

// Controller to delete a job by ID
export const deleteJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    // Delete the job using Prisma
    await prisma.job.delete({
      where: {
        id: jobId,
      },
    });

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete job" });
  }
};

export const getJobsByCategory = async (req, res) => {
  const category = req.query.category; // Retrieve the category from query parameters

  console.log("this is category: ", category);
  
  try {
    let jobs;
    if (category) {
      // If category is provided, filter jobs by category
      jobs = await prisma.job.findMany({
        where: {
          jobCategory: category,
        },
      });
    } else {
      // If category is not provided, retrieve all jobs
      jobs = await prisma.job.findMany();
    }

    res.status(200).json(jobs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to retrieve jobs" });
  }
};
