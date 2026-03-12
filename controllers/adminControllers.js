const Admin = require("../models/adminmodel");
const { hashpassword, comparepassword } = require("../utils/bcrypt");
const { refreshToken, accessToken } = require("../utils/token");

// const createadmin = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     let user = await Admin.findOne({ email });

//     if (user)
//       return res.status(400).json({
//         message: "admin already exist",
//         code: 400,
//       });

//     const hashed = await hashpassword(password, 12);

    
//     user = await Admin.create({
//       email,
//       password: hashed,
//       role,
//     });
//     const payload = {
//       id: user._id,
//       email: user.email,
//     };
//     let refreshtoken = await refreshToken(payload, process.env.TOKEN_KEY);

//      user.refreshtoken = refreshtoken

//     await user.save()
//     res.status(201).json({
//       message: "admin create successfully",
//       code: 201,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "internal server error",
//       code: 500,
//       error: error.message,
//     });
//   }
// };

const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Admin.findOne({ email });

    if (!user)
      return res.status(401).json({
        message: "Invalid user",
        code: 401,
      });

    const compare = await comparepassword(password, user.password);

    if (!compare)
      return res.status(401).json({
        message: "password is wrong",
        code: 401,
      });



    let accesstoken = await accessToken(user)

    // const [username, domain] = email.split("@");
    // const firstPart = username.slice(0, 3); // first 3 letters
    // const stars = "*".repeat(Math.max(username.length - 3, 0)); // rest as stars
    // const maskedEmail = `${firstPart}${stars}@${domain}`;

    res.status(200).json({
      message: "login sucessfull",
      code: 200,
      data: email,
      accesstoken,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      code: 500,
    });
  }
};
module.exports = {
  adminlogin,
};
