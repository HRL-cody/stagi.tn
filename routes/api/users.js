const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const Student = require("../../Models/Student")
const User = require("../../Models/User");
const { JsonWebTokenError } = require("jsonwebtoken");
const Company = require("../../Models/Company");
//@route         Post api/users
//@desc          Register route
//@access        Public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valide email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password , type } = req.body;
    try {
      //See if the User exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      //Get users Gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      if(type === 'student'){
        user = new Student({
          name,
          email,
          avatar,
          password,
        });
      } else{
        user = new Company({
          name,
          email,
          avatar,
          password,
        });
      }
     
      //encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      //Rturn jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload, 
        config.get("jwtSecret"), 
        { expiresIn: 360000 }, (err , token) =>{
          if(err) throw err;
          res.json({ token }); 
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
