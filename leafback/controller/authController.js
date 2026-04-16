const jwt = require("jsonwebtoken");
const User = require("../model/User");
const validator = require("validator");

console.log(validator.isEmail("test@gmail.com")); // true

exports.logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    })
    .status(200)
    .json({ success: true, message: "Logged out." });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, state, district, city, agreeToTerms } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(409).json({ success: false, message: "Email is not Valid." });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: "Email already registered." });
    }

    const user = await User.create({
      name, email, phone, password,
      state, district, city, agreeToTerms,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
      .status(200)
      .json({ success: true, token, user: user.toPublicJSON() });

  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    console.error("Register error:", error);
    return res.status(500).json({ success: false, message: "Registration failed." });
  }
};

exports.loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {

      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: "Account has been deactivated." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {

      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: user.toPublicJSON(),
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Login failed." });
  }
};