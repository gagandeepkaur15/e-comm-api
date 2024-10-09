const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    cart: {   // or cart: []
        type: Array,
        default:[]
    },
    isadmin: Boolean,
    orders: {
        type: Array,
        default:[]
    },
    contact: Number,
    picture: String,
});

MediaSourceHandle.exports = mongoose.model("user", userSchema);