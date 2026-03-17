const User = require("../models/userModel");
const { hashpassword } = require("../utils/bcrypt");
const fs = require("fs")
const deleteFile = require("../utils/deleteFile")
 
const usercreate = async (req, res) => {
  try {
    const { name, email, password, park} = req.body;

    const userId = req.user.id;

     if (!name || !email || !password || !park) {
      if (req.file) deleteFile(req.file.path); // image delete
      return res.status(400).json({
        message: "name, email,password and park are required",
        code: 400,
      });
    }
    let user = await User.findOne({ email });
     if (user) {
      if (req.file) {
        deleteFile(req.file.path);
      }

      return res.status(400).json({
        message: "user already exist",
        code: 400,
      });
    }
    const hashed = await hashpassword(password);
    user = await User.create({
      userId,
      name,
      email,
      password: hashed,
      avatar: req.file.path,
      park,
    });
    const userData = await User.findById(user._id).select("-password");
    await user.save();
    res.status(201).json({
      message: "user create successfully",
      code: 201,
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      code: 500,
      error: error.message,
    });
  }
};
const getalluser = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page - 1) * limit;
    const user = await User.find().skip(skip).limit(limit).select("-password").select("-isBlock").select("-park");

    let totalUser = await User.countDocuments();
    let totalPages = Math.ceil(totalUser / limit);

    if (user.length === 0)
      return res.status(200).json({
        message: "Empty Users",
        code: 200,
      });

    res.status(200).json({
      message: "all user fetched successfully",
      code: 200,
      data: user,
      user: {
        page,
        limit,
        totalUser,
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

const edituser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    if (!user)
      return res.status(401).json({
        message: "invalid Id",
        code: 401,
      });

    res.status(200).json({
      message: "user update successfully",
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      code: 500,
      error: error.message,
    });
  }
};

const paidUser = async (req,res)=>{

      try {
      const {paid} = req.body

      const user = await User.findById(req.params.id)

      if(!user) return res.status(404).json({
        message:"invalid id",
        code:404
      })

      if (user.isPaid === paid)
      return res.status(400).json({
        message: `user already ${paid ? "Paid" : "unPaid"}`,
        code: 400,
      });

      user.isPaid = paid
      await user.save()
      res.status(200).json({
        message: paid ? "user is Paid" : "user is unPaid",
        code:200,
        paid
      })
    } catch (error) {
      res.status(500).json({
        messgae:"internal server error",
        code:500,
        error:error.message
      })
    }
}

const getPaidUser = async(req,res)=>{
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page - 1) * limit;
    const user = await User.find({isPaid:true}).skip(skip).limit(limit).select("-password").select("-isBlock").select("-park");

    let totalUser = await User.countDocuments({isPaid:true});
    let totalPages = Math.ceil(totalUser / limit);

    if (user.length === 0)
      return res.status(200).json({
        message: "Empty Users",
        code: 200,
      });

    res.status(200).json({
      message: "all paidUser fetched successfully",
      code: 200,
      data: user,
      user: {
        page,
        limit,
        totalUser,
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
}

const deleteuser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user)
      return res.status(401).json({
        message: "invalid id",
        code: 401,
      });
    res.status(200).json({
      message: "user delete sucessfully",
      code: 200,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      code: 500,
      error: error.message,
    });
  }
};
  const blockUser = async(req,res)=>{

    try {
      const {block} = req.body

      const user = await User.findById(req.params.id)

      if(!user) return res.status(401).json({
        message:"invalid id",
        code:401
      })

      if(user.isBlock === block) return res.status(400).json({
        message:`user already ${block ? "Blocked": "unBlocked"}`,
        code:400
      })
      user.isBlock = block
      await user.save()
      res.status(200).json({
        message: block ? "user is blocked" : "user is unblocked",
        code:200,
        block
      })
    } catch (error) {
      res.status(500).json({
        messgae:"internal server error",
        code:500,
        error:error.message
      })
    }
  }

module.exports = {
  usercreate,
  getalluser,
  edituser,
  deleteuser,
  blockUser,
  paidUser,
  getPaidUser
};
