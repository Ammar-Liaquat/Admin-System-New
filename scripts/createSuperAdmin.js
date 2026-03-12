require("dotenv").config({quiet:true});
const mongoose = require("mongoose");
const connectdb = require("../configs/db");
const admin = require("../models/adminmodel");
const { hashpassword } = require("../utils/bcrypt");
const { refreshToken } = require("../utils/token");

const createSuperAdmin = async () => {
  try {
    await connectdb();
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    let user = await admin.findOne({ email });

    if (user) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashPassword = await hashpassword(password, 12);

    user = await admin.create({
      email,
      password: hashPassword,
      role: "admin",
    });
    console.log("Admin Created Successfully");

    let refreshtoken = await refreshToken(user);

    user.refreshtoken = refreshtoken;
    await user.save();
    await mongoose.connection.close()
  } catch (error) {
    console.log("error", error);
    mongoose.connection.close();
  }
};
createSuperAdmin();
