const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required : [true, 'This is required']
    },
    email: {
        type: String,
        required: [true, 'This is required'],
        unique: [true, 'This is required']
    },
    password: {
        type: String,
        required: [true, 'This is required'],
    },
    avatar: {
        type:String 
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);