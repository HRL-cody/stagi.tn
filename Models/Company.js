const mongoose = require("mongoose");
const User = require("./User");

const Schema = mongoose.Schema;


const CompanySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  companyName: {
    type: String
  },
  field: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
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
  foundation: {
    type: Date,
    default: Date.now
  }
});

// const CompanySchema = new mongoose.Schema({
//     field: {
//     type: String,
   
// },
 
// foundation:{ 
//     type: Date,
// }

// });

module.exports = CompanyProfile = User.discriminator(
  "CompanyProfile",
  CompanySchema
);
