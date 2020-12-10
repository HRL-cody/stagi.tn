const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../Models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");
const { exists } = require("../../Models/User");

//@route GET api/Auth
//@desc test route
//@ access Public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@route         Post api/Auth
//@desc          Authenticate user & get token
//@access        Public

router.post(
  "/",
  [
    check("email", "Please include a valide email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      //See if the User exists
      let user = await User.findOne({ email });

    if (!user) {
        return res
        .status(400)
        .json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res
        .status(400)
        .json({ errors: [{ msg: "Invalid Credentials" }] });
    }
      //Rturn jsonwebtoken
    const payload = {
        user: {
        id: user.id,
        },
    };
    jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
module.exports = router;
