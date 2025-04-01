const { name } = require("ejs");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requireed: true,
    },
    email: {
        type: String,
        requireed: true,
    },
    phone: {
        type: String,
        requireed: true,
    },
    image: {
        type: String,
        requireed: true,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
module.exports = mongoose.model("User",userSchema);