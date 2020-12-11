const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");

const User = require("../../Models/User");
const Company = require("../../Models/Company");
const Student = require("../../Models/Student");

//@route GET api/me
//@desc Get current users profiles
//@ access Public

router.get("/me", auth, async (req, res) => {
  console.log(req.user.id);
  try {
    const user = await User.findOne({
      _id: req.user.id,
    }).populate("user", ["name", "avatar", "_t"]);

    if (!user) {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    if (user.__t == "ProfileStudent") {
      res.json("its a Student");
    } else {
      res.json("its a Company");
    }
    // res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/profile
// @desc  Create or Update users profiles
// @ access Private

router.post(
  "/",
  [
    auth,
    check("status", "status is required").not().isEmpty(),
    check("skills", "skills is require").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      status,
      location,
      website,
      skills,
    } = req.body;

    const studentprofileFields = {};
    if (name) studentprofileFields.name = name;
    // if (email) StudentprofileFields.email = email;
    // if (password) StudentprofileFields.password = location;
    if (website) studentprofileFields.website = website;
    if (status) studentprofileFields.status = status;
    if (location) studentprofileFields.location = location;
    if (skills) {
      studentprofileFields.skills = skills
        .split(",")
        .map((skill) => skill.trim());
    }
    try {
      //update
      profile = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: studentprofileFields },
        {useFindAndModify: false}
      );
      profile.save();
      return res.json(studentprofile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get('/' , auth , async (req , res) =>{
  try {
    const profiles = await User.find().populate('user' , ['name' , 'avatar']);
    res.json(profiles)
  } catch (err) {
    res.status(500).send('server Error')
  }
} )
module.exports = router;
