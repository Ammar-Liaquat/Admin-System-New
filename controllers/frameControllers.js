const Template = require("../models/framesTemplatesModel");
const fs = require("fs");
const uploadTemplate = async (req, res) => {
  try {
    const userId = req.user.id;
    const template = await Template.create({
      userId,
      avatar: req.file.path,
    });
    res.status(200).json({
      message: "frame upload successfully",
      code: 200,
      data: template,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      code: 500,
      error: error.message,
    });
  }
};
const getallTemplate = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;

    const skip = (page - 1) * limit;

    const template = await Template.find().limit(limit).skip(skip);

    const totalTemplate = await Template.countDocuments();
    const totalPage = Math.ceil(totalTemplate / limit);

    if (template.length === 0)
      return res.status(200).json({
        message: "Empty templates",
        code: 200,
      });

    res.status(200).json({
      message: "templates fetched successfully",
      code: 200,
      data: template,
      template: {
        page,
        limit,
        totalTemplate,
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

const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);

    if (!template)
      return res.status(404).json({
        message: "invalid id",
        code: 404,
      });
    res.status(200).json({
      message: "template delete successfully",
      code: 200,
      data:template
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
  uploadTemplate,
  getallTemplate,
  deleteTemplate,
};
