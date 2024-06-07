import prisma from "../lib/prisma.js";

export const addPlace = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  console.log(body);
  try {
    const newPlace = await prisma.place.create({
      data: {
        ...body.placeData,
        userId: tokenUserId,
        category: body.category,
        placeName: body.placeName,
        photos: body.photos,
        state: body.state,
        city: body.city,
        address: body.address,
        description: body.description,
      },
    });
    res.status(200).json(newPlace);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create place" });
  }
};

// Get all places
// export const getPlaces = async (req, res) => {
//   try {
//     // Retrieve all places using Prisma
//     const places = await prisma.place.findMany();

//     res.status(200).json(places);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to retrieve places" });
//   }
// };

export const getPlaces = async (req, res) => {
  try {
    // Retrieve query parameters for state, city, and category
    const { state, city, category } = req.query;

    // Define filters based on query parameters
    const filters = {};
    if (state) filters.state = state;
    if (city) filters.city = city;
    if (category) filters.category = category;

    // Retrieve places using Prisma with applied filters
    const places = await prisma.place.findMany({
      where: filters,
    });

    res.status(200).json(places);
    console.log(places);
  } catch (err) {
    console.error("Error retrieving places:", err);
    res.status(500).json({ message: "Failed to retrieve places" });
  }
};

// Delete a place by ID
export const deletePlace = async (req, res) => {
  const id = req.params.id;

  console.log("placeid ", id);

  try {
    // Delete the place using Prisma
    await prisma.place.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Place deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete place" });
  }
};

export const getPlacesByCategory = async (req, res) => {
  const category = req.query.category;
  console.log("category founds by", category);
  try {
    // Retrieve places by category using Prisma
    const places = await prisma.place.findMany({
      where: {
        category: category,
      },
    });

    res.status(200).json(places);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to retrieve places by category" });
  }
};

// Update a place by ID
export const updatePlace = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const updatedPlace = await prisma.place.update({
      where: { id: id },
      data: {
        ...body.placeData,
        category: body.category,
        placeName: body.placeName,
        photos: body.photos,
        state: body.state,
        city: body.city,
        address: body.address,
        description: body.description,
      },
    });
    res.status(200).json(updatedPlace);
  } catch (err) {
    console.error("Error updating place:", err);
    res.status(500).json({ message: "Failed to update place" });
  }
};
