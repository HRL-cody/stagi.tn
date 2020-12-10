const mongoose = require("mongoose");
const User = require('./User');

const studentSchema = new mongoose.Schema({
  status: {
    type: String,
    
  },
  skills: {
    type: [String],
    
  },
  bio: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        
      },
      company: {
        type: String,
        
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});



module.exports = Profile = User.discriminator('student', studentSchema)