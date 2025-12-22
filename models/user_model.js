const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: [true,"Enter username"],
        trim: true
    },
    email: {
        type: String,
        required: [true,"Enter emial"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true,"Enter password"]
    },
    mobileNumber: {
        type: String,
        required: [true,"Enter mobile number"],
    },
},
    {
        timestamps: true, 
    });

module.exports = mongoose.model('User', userSchema);