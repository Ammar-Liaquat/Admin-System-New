const Picture = require("../models/PictureModels")
const fs = require("fs");
const uploadPicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const picture = await Picture.create({
      userId,
      avatar: req.file.path,
    });
    res.status(200).json({
      message: "Picture upload successfully",
      code: 200,
      data: picture,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      code: 500,
      error: error.message,
    });
  }
};
const getallPicture = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;

    const skip = (page - 1) * limit;

    const picture = await Picture.find().limit(limit).skip(skip);

    const totalPicture = await Picture.countDocuments();
    const totalPage = Math.ceil(totalPicture / limit);

    if (picture.length === 0)
      return res.status(200).json({
        message: "Empty picture",
        code: 200,
      });

    res.status(200).json({
      message: "picture fetched successfully",
      code: 200,
      data: picture,
      picture: {
        page,
        limit,
        totalPicture,
        totalPage,
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

const deletePicture = async (req, res) => {
  try {
    const picture = await Picture.findByIdAndDelete(req.params.id);

    if (!picture)
      return res.status(404).json({
        message: "invalid id",
        code: 404,
      });
    res.status(200).json({
      message: "picture delete successfully",
      code: 200,
      data:picture
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      code: 500,
      error:error.message
    });
  }
};
module.exports = {
  uploadPicture,
  getallPicture,
  deletePicture
};
