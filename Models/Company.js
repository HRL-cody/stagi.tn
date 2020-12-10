const mongoose = require("mongoose");
const User = require("./User");



const CompanySchema = new mongoose.Schema({
    field: {
    type: String,
   
},
 
foundation:{ 
    type: Date,
}

});

module.exports = CompanyProfile = User.discriminator(
  "CompanyProfile",
  CompanySchema
);
