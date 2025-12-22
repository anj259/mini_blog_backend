const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter post title"],
        trim: true,
    },

    content: {
        type: String,
        required: [true, "Enter post content"],
    },
    image: {
        type: String,
        default: "",
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postSchema);
