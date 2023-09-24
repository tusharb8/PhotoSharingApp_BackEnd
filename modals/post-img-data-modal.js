const mongoose = require("mongoose");

const userImageDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imagedata: {
        type: String,
        required: true
    }
})

const userImageData = mongoose.model("userImageData", userImageDataSchema);
module.exports = userImageData;