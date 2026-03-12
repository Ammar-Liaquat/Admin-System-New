const Park = require("../models/parkModel");

const addPark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    const park = await Park.create({
      userId,
      name,
    });

    res.status(201).json({
      message: "park add successfully",
      code: 201,
      data: park,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      code: 500,
      error: error.message,
    });
  }
};

const blockPark = async (req, res) => {
  try {
    const { active } = req.body;

    const park = await Park.findById(req.params.id);

    if (!park)
      return res.status(401).json({
        message: "invalid id",
        code: 401,
      });

    if (park.isActive === active)
      return res.status(400).json({
        message: `park already ${active ? "Active" : "inActive"}`,
        code: 400,
      });
    park.isActive = active;

    res.status(200).json({
      message: active ? "park is Active" : "park is inActive",
      code: 200,
      active,
    });
    await park.save();
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      code: 500,
      error: error.message,
    });
  }
};

const getAllParks = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page - 1) * limit;
    const park = await Park.find().skip(skip).limit(limit);

    let totalparks = await Park.countDocuments();
    let totalPages = Math.ceil(totalparks / limit);

    if (park.length === 0)
      return res.status(200).json({
        message: "Empty photos",
        code: 200,
      });

    res.status(200).json({
      message: "all photos fetched successfully",
      code: 200,
      data: park,
      park: {
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

const deletepark = async (req, res) => {
  try {
    const park = await Park.findByIdAndDelete(req.params.id);

    if (!park)
      return res.status(401).json({
        message: "invlid id",
        code: 401,
      });
    res.status(200).json({
      message: "park delete sucessfully",
      code: 200,
      data: park,
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
  addPark,
  getAllParks,
  deletepark,
  blockPark,
};
