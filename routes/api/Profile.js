const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  check,validationResult} = require("express-validator");
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

router.post('/' , [auth , check('status' , 'status is required').not().isEmpty(),
check('skills' , "skills is require").not().isEmpty()
], async( req , res)=> {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  const {
    name,
    email,
    __t,
    password,
    company,
    location,
    website,
    skills
  } = req.body;
  const profileFields = {};
  profileFields.user = req.user.__t.id;
  if(company) profileFields.company = company;
  if(name) profileFields.name = name;
  if(email) profileFields.email = email;
  if(password) profileFields.password = location;
  if(website) profileFields.website = website;
  if(skills) profileFields.skills = skills;
  if(location) profileFields.location = location;


})
// router.get('/' , async (req , res) =>{
//   try {
//     const profiles = await Profile.find().populate('user' , ['name' , 'avatar']);
//     res.json(profiles)
//   } catch (err) {
//     res.status(500).send('server Error')
//   }
// } )
module.exports = router;
