const User = require("../models/user.model");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -__v -createdAt -updatedAt",
    );

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error fetching profile",
    });
  }
};
