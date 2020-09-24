const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const router = express.Router();

// @route   GET api/v1/auth
// @desc
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

// @route   POST api/v1/auth/login
// @desc    Login user
// @access  Private
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid email or password" }] });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid email or password" }] });

      const payload = {
        user: { id: user.id }
      };

      jwt.sign(
        payload,
        config.get("jwt_secret_key"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({ token });
        }
      );
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  }
);

module.exports = router;
