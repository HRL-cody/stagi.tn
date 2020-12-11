const mongoose = require("mongoose");
const User = require('./User');
const Schema = mongoose.Schema;


const studentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// const studentSchema = new mongoose.Schema({
//   status: {
//     type: String,
//     required: true,
//   },
//   skills: {
//     type: [String],
//     required: true,
//   },
//   bio: {
//     type: String,
//     required: true
//   },
//   experience: [
//     {
//       title: {
//         type: String,
        
//       },
//       company: {
//         type: String,
        
//       },
//       location: {
//         type: String,
//       },
//       from: {
//         type: Date,
        
//       },
//       to: {
//         type: Date,
//       },
//       current: {
//         type: Boolean,
//         default: false,
//       },
//       description: {
//         type: String,
//       },
//     },
//   ],
//   education: [
//     {
//       school: {
//         type: String,
//         required: true,
//       },
//       degree: {
//         type: String,
//         required: true,
//       },
//       fieldofstudy: {
//         type: String,
//         required: true,
//       },
//       from: {
//         type: Date,
//         required: true,
//       },
//       to: {
//         type: Date,
//       },
//       current: {
//         type: Boolean,
//         default: false,
//       },
//       description: {
//         type: String,
//       },
//     },
//   ],
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });



module.exports = Studentprofile = User.discriminator('student', studentSchema)