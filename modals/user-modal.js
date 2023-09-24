const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default:0,
        required: true
    },
    PostImage: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

})

const userData = mongoose.model("userData", userDataSchema);
module.exports = userData;