const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    // User: {
    //     // this mean that have a relation with User
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Users",
    //     required: true
    // },
    productName: {
        type: String,
        require: true,
        trim: true
    },
    lDescription: {
        type: String,
        require: true,
        trim: true
    },
    sDescription: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: Number,
        require: true,
        trim: true
    },
    offer: {
        type: Number,
        trim: true
    },
    recommendedAge: {
        type: String,
        require: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    inStock: {
        type: Number,
        required: true,
        trim: true
    },
    images: {
        type: [String],
        required: true,
        trim: true
    },
},
{timestamps: true}
);

module.exports = mongoose.model("Products", productSchema)