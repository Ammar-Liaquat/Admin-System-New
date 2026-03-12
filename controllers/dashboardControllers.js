const User = require("../models/userModel");

const dashboardStats = async (req, res) => {
  try {
    const now = new Date();

    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const totalUsers = await User.countDocuments();

    const todayUsers = await User.countDocuments({
      createdAt: { $gte: todayStart },
    });

    const monthUsers = await User.countDocuments({
      createdAt: { $gte: monthStart },
    });

    const yearUsers = await User.countDocuments({
      createdAt: { $gte: yearStart },
    });

    const lastMonthUsers = await User.countDocuments({
      createdAt: {
        $gte: lastMonthStart,
        $lte: lastMonthEnd,
      },
    });

    // park wise users
    const parkUserStats = await User.aggregate([
      {
        $group: {
          _id: "$park",
          totalUsers: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      message: "dashboard stats fetched",
      data: {
        totalUsers,
        todayUsers,
        monthUsers,
        lastMonthUsers,
        yearUsers,
        parkUserStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  dashboardStats,
};
