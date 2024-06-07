import prisma from "../lib/prisma.js";

// Create a new carousel
export const createCarousel = async (req, res) => {
  const body = req.body;
  try {
    const newCarousel = await prisma.carousel.create({
      data: {
        photos: body.photos,
      },
    });
    res.status(200).json(newCarousel);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create carousel" });
  }
};

// Get all photos from the carousel
export const getAllPhotos = async (req, res) => {
  try {
    const photos = await prisma.carousel.findMany();

    if (!photos) {
      return res.status(404).json({ message: "No photos found" });
    }

    res.status(200).json(photos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch photos" });
  }
};

// Delete a carousel photo
export const deleteCarousel = async (req, res) => {
  const { id } = req.params;
  console.log({ id });
  try {
    await prisma.carousel.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "Carousel deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete carousel" });
  }
};
