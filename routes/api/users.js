const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const config = require("config");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// @route   POST api/v1/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 characters or above"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(res.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    console.log(name, email);

    try {
      //  Check if user exist
      let user = await User.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({ name, email, avatar, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: user.id,
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
      console.log(error);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
