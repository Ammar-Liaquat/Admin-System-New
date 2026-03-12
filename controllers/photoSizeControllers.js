const Photo = require("../models/photoSizeModel");

const createPhotoSize = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, price, description, resolution } = req.body;

    const photo = await Photo.create({
      userId,
      title,
      price,
      description,
      resolution,
    });

    res.status(201).json({
      message: "photo size add successfully",
      code: 201,
      data: photo,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      code: 500,
      error: error.message,
    });
  }
};

const getAllPhotos = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page - 1) * limit;
    const photo = await Photo.find().skip(skip).limit(limit);

    let totalparks = await Photo.countDocuments();
    let totalPages = Math.ceil(totalparks / limit);

    if (photo.length === 0)
      return res.status(200).json({
        message: "Empty photos",
        code: 200,
      });

    res.status(200).json({
      message: "all photos fetched successfully",
      code: 200,
      data: photo,
      photo: {
        page,
        limit,
        totalparks,
        totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      code: 500,
      error: error.message,
    });
  }
};

const deletephoto = async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);

    if (!photo)
      return res.status(401).json({
        message: "invlid id",
        code: 401,
      });
    res.status(200).json({
      message: "photo delete sucessfully",
      code: 200,
      data: photo,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      code: 500,
      error: error.message,
    });
  }
};

module.exports = {
  createPhotoSize,
  getAllPhotos,
  deletephoto,
};
